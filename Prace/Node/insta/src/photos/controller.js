const ControlerFactory = require("../../anonim-server/classes/Controler/");
const PhotoModel = require("./model");

const PhotoControler = new ControlerFactory("Photo", PhotoModel).create({
    async create(ctx) {
        ctx.sendJson(ctx.getFile("file"));

        //ctx.sendJson(await this.Model.create(ctx.getBody()));
    },
});

module.exports = PhotoControler;
