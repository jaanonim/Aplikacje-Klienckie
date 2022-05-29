const ControlerFactory = require("../../anonim-server/classes/Controler/");
const PhotoModel = require("./model");
const logger = require("../../anonim-server/utilities/Logger");
const fs = require("fs").promises;
const sharp = require("sharp");
const FILTERS = require("./filters");
const TagModel = require("../tags/model");

const PhotoControler = new ControlerFactory("Photo", PhotoModel).create({
    async create(ctx) {
        const files = ctx.getFile("file");
        const description = ctx.getBodyValue("description");
        const user = ctx.getUser();
        if (!files || files.length < 1) {
            ctx.sendCodeJson(400, { error: "Missing or invalid image files." });
            return;
        }
        const res = await Promise.all(
            files.map(async (ele) => {
                const newObj = await this.Model.create({
                    user: user._id,
                    description: description || "",
                    url: ele.filepath,
                    orginalName: ele.originalFilename,
                    lastChange: 0,
                    history: [
                        {
                            id: 0,
                            url: ele.filepath,
                            status: "original",
                            timestamp: Date.now(),
                        },
                    ],
                    tags: [],
                });
                return newObj;
            })
        );

        ctx.sendCodeJson(201, res);
    },

    async delete(ctx) {
        const id = ctx.getUrlParam("id");
        const photo = await this.Model.find(id);
        const user = ctx.getUser();

        if (!photo) {
            ctx.sendCodeJson(404, { error: "Not found" });
            return;
        }
        if ("" + photo.user !== "" + user._id) {
            ctx.sendCodeJson(403, { error: "Forbitten" });
            return;
        }
        const url = photo.url;

        try {
            await fs.unlink(url);
        } catch (e) {
            logger.error(e);
        }

        ctx.sendCodeJson(204, await this.Model.delete(id));
    },

    async find(ctx) {
        const obj = await this.Model.find(ctx.getUrlParam("id"));

        if (obj) {
            if (Array.isArray(obj.tags))
                obj.tags = await Promise.all(
                    obj.tags.map(async (tagId) => {
                        return await TagModel.find(tagId);
                    })
                );
            ctx.sendJson(obj);
        } else ctx.sendCodeJson(404, { error: "Not found" });
    },

    async findAll(ctx) {
        const obj = await this.Model.findAll({});
        const res = await Promise.all(
            obj.map(async (ele) => {
                if (Array.isArray(ele.tags))
                    ele.tags = await Promise.all(
                        ele.tags.map(async (tagId) => {
                            return await TagModel.find(tagId);
                        })
                    );
                return ele;
            })
        );
        ctx.sendJson(res);
    },

    async update(ctx) {
        const method = ctx.getBodyValue("method");
        const value = ctx.getBodyValue("value");
        const id = ctx.getUrlParam("id");
        let tags = ctx.getBodyValue("tags");
        const user = ctx.getUser();

        const photo = await this.Model.find(id);
        if (!photo) {
            ctx.sendCodeJson(404, { error: "Not found" });
            return;
        }

        if ("" + photo.user !== "" + user._id) {
            ctx.sendCodeJson(403, { error: "Forbitten" });
            return;
        }

        const url = photo.url;
        if (!url) {
            ctx.sendCodeJson(400, { error: "Something went wrong." });
            return;
        }

        if (tags) {
            if (!Array.isArray(tags)) {
                tags = [tags];
            }
            for (let i = 0; i < tags.length; i++) {
                if (!(await TagModel.find(tags[i]))) {
                    ctx.sendCodeJson(400, { error: "Invalid tag id." });
                    return;
                }
            }
            photo.tags = tags;
        }

        if (method) {
            if (!FILTERS.some((ele) => method === ele.name)) {
                ctx.sendCodeJson(400, { error: "Invalid method." });
                return;
            }

            if (!photo.history) {
                ctx.sendCodeJson(400, { error: "Something went wrong." });
                return;
            }

            photo.lastChange = photo.history.length;
            const newUrl = `${url}-${photo.lastChange}`;

            const img = await sharp(url);
            try {
                img[method](value).toFile(newUrl);
            } catch (e) {
                logger.error(e);
                ctx.sendCodeJson(400, {
                    error: "Something went wrong. May be missing args for selected method",
                });
                return;
            }

            photo.history.push({
                id: photo.lastChange,
                url: newUrl,
                status: method,
                timestamp: Date.now(),
            });
        }

        ctx.sendJson(
            await this.Model.update(id, {
                lastChange: photo.lastChange,
                history: photo.history,
                tags: photo.tags,
            })
        );
    },

    async deleteMany(ctx) {
        const ids = ctx.getBodyValue("ids");
        const res = [];
        const user = ctx.getUser();

        ids.forEach(async (id) => {
            const photo = await this.Model.find(id);
            if (photo && "" + photo.user !== "" + user._id) {
                res.push({
                    id: photo.id,
                    error: "Forbitten",
                });
            } else {
                try {
                    await fs.unlink(photo.url);
                } catch (e) {
                    logger.error(e);
                }
                res.push(await this.Model.delete(id));
            }
        });
        ctx.sendJson(res);
    },

    async filterOptions(ctx) {
        ctx.sendJson(FILTERS);
    },

    async metadata(ctx) {
        const id = ctx.getUrlParam("id");
        const url = (await this.Model.find(id)).url;
        if (!url) {
            ctx.sendCodeJson(404, { error: "Not found" });
            return;
        }

        const metadata = await sharp(url).metadata();
        ctx.sendJson(metadata);
    },
});

module.exports = PhotoControler;
