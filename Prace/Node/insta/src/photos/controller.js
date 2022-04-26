const ControlerFactory = require("../../anonim-server/classes/Controler/");
const PhotoModel = require("./model");
const config = require("../../config");

const PhotoControler = new ControlerFactory("Photo", PhotoModel).create({
    async find(ctx) {
        ctx.sendJson(await this.Model.find(ctx.getUrlParam("id")));
    },
    async findAll(ctx) {
        ctx.sendJson(await this.Model.findAll({}));
    },
    async create(ctx) {
        const form = formidable({});
        form.uploadDir = config.uploadPath;

        form.parse(ctx.nodeReqest, (err, fields, files) => {
            console.log(files);
        });

        ctx.sendJson(await this.Model.create(ctx.getBody()));
    },
    async update(ctx) {
        ctx.sendJson(
            await this.Model.update(ctx.getUrlParam("id"), ctx.getBody())
        );
    },
    async delete(ctx) {
        ctx.sendJson(await this.Model.delete(ctx.getUrlParam("id")));
    },
});

module.exports = PhotoControler;
