const ControlerFactory = require("../../anonim-server/classes/Controler/");
const TagModel = require("./model");

const TagControler = new ControlerFactory("Tag", TagModel).create({
    async findAll(ctx) {
        const tags = await this.Model.findAll({});
        ctx.sendCodeJson(200, tags);
    },
    async create(ctx) {
        const name = ctx.getBodyValue("name");
        if (!name || name.length < 2) {
            ctx.sendCodeJson(400, { error: "Missing or invalid name." });
            return;
        }
        const tag = await this.Model.create({
            name: name,
            popularity: Math.round(Math.random() * 10000),
        });
        ctx.sendCodeJson(201, tag);
    },
});

module.exports = TagControler;
