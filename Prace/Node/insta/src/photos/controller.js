const ControlerFactory = require("../../anonim-server/classes/Controler/");
const PhotoModel = require("./model");
const logger = require("../../anonim-server/utilities/Logger");
const fs = require("fs").promises;

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
                const newObj = await this.Model.create({
                    album: album,
                    url: ele.path,
                    orginalName: ele.name,
                    lastChange: "original",
                    history: [
                        {
                            status: "original",
                            timestamp: Date.now(),
                        },
                    ],
                });
                return newObj.ops[0];
            })
        );

        ctx.sendJson(res);
    },

    async delete(ctx) {
        const id = ctx.getUrlParam("id");
        const url = (await this.Model.find(id))[0].url;
        try {
            await fs.unlink(url);
        } catch (e) {
            logger.error(e);
        }

        ctx.sendJson(await this.Model.delete(id));
    },

    async update(ctx) {
        const status = ctx.getBodyValue("status");
        const id = ctx.getUrlParam("id");
        const history = (await this.Model.find(id))[0].history;
        if (!status || status.length < 4) {
            ctx.sendCodeJson(400, { error: "Missing or invalid status." });
            return;
        }
        if (!history) {
            ctx.sendCodeJson(400, { error: "Invalid ID." });
            return;
        }
        history.push({
            status: status,
            timestamp: Date.now(),
        });
        ctx.sendJson(
            await this.Model.update(id, {
                lastChange: status,
                history: history,
            })
        );
    },

    async deleteMany(ctx) {
        const ids = ctx.getBodyValue("ids");
        const res = [];
        ids.forEach(async (id) => {
            try {
                const url = (await this.Model.find(id))[0].url;

                await fs.unlink(url);
            } catch (e) {
                logger.error(e);
            }
            res.push(await this.Model.delete(id));
        });
        ctx.sendJson(res);
    },
});

module.exports = PhotoControler;
