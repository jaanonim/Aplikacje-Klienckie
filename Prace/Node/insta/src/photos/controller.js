const ControlerFactory = require("../../anonim-server/classes/Controler/");
const PhotoModel = require("./model");
const logger = require("../../anonim-server/utilities/Logger");
const fs = require("fs").promises;
const sharp = require("sharp");
const FILTERS = require("./filters");

const PhotoControler = new ControlerFactory("Photo", PhotoModel).create({
    async create(ctx) {
        const files = ctx.getFile("file");
        const album = ctx.getBodyValue("album");
        if (!album || album.length < 4) {
            ctx.sendCodeJson(400, { error: "Missing or invalid album." });
            return;
        }
        if (!files || files.length < 1) {
            ctx.sendCodeJson(400, { error: "Missing or invalid image files." });
            return;
        }
        const res = await Promise.all(
            files.map(async (ele) => {
                console.log(ele);
                const newObj = await this.Model.create({
                    album: album,
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
                });
                return newObj;
            })
        );

        ctx.sendCodeJson(201, res);
    },

    async delete(ctx) {
        const id = ctx.getUrlParam("id");
        const photo = await this.Model.find(id);
        if (!photo) {
            ctx.sendCodeJson(404, { error: "Not found" });
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

    async update(ctx) {
        const method = ctx.getBodyValue("method");
        const value = ctx.getBodyValue("value");
        const id = ctx.getUrlParam("id");

        const photo = await this.Model.find(id);
        if (!photo) {
            ctx.sendCodeJson(404, { error: "Not found" });
            return;
        }
        const history = photo.history;
        const url = photo.url;

        if (!method) {
            ctx.sendCodeJson(400, { error: "Missing method." });
            return;
        }
        if (!FILTERS.some((ele) => method === ele.name)) {
            ctx.sendCodeJson(400, { error: "Invalid method." });
            return;
        }

        if (!history) {
            ctx.sendCodeJson(400, { error: "Something went wrong." });
            return;
        }
        if (!url) {
            ctx.sendCodeJson(400, { error: "Something went wrong." });
            return;
        }

        const newId = history.length;
        const newUrl = `${url}-${newId}`;

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

        history.push({
            id: newId,
            url: newUrl,
            status: method,
            timestamp: Date.now(),
        });
        ctx.sendJson(
            await this.Model.update(id, {
                lastChange: newId,
                history: history,
            })
        );
    },

    async deleteMany(ctx) {
        const ids = ctx.getBodyValue("ids");
        const res = [];
        ids.forEach(async (id) => {
            try {
                const url = (await this.Model.find(id)).url;

                await fs.unlink(url);
            } catch (e) {
                logger.error(e);
            }
            res.push(await this.Model.delete(id));
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
