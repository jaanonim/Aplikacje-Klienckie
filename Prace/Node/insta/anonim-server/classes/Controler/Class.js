class Controler {
    static find(ctx) {
        throw Error(`Find is not implemented on ${this.name}`);
    }
    static findAll() {
        throw Error(`FindAll is not implemented on ${this.name}`);
    }
    static create() {
        throw Error(`Create is not implemented on ${this.name}`);
    }
    static update() {
        throw Error(`Update is not implemented on ${this.name}`);
    }
    static delete() {
        throw Error(`Delete is not implemented on ${this.name}`);
    }
}

class ModelControler extends Controler {
    static async find(ctx) {
        ctx.sendJson(this.Model.find((v) => v.id == ctx.getUrlParam("id")));
    }
    static async findAll(ctx) {
        ctx.sendJson(this.Model.findAll((e) => true));
    }
    static async create(ctx) {
        ctx.sendJson(this.Model.create(ctx.getBody()));
    }
    static async update(ctx) {
        ctx.sendJson(
            this.Model.update((e) => v.id == ctx.getUrlParam("id")),
            ctx.getBody()
        );
    }
    static async delete(ctx) {
        ctx.sendJson(this.Model.delete((v) => v.id == ctx.getUrlParam("id")));
    }
}

class MongoControler extends ModelControler {
    static async find(ctx) {
        const obj = await this.Model.find(ctx.getUrlParam("id"));
        if (obj) ctx.sendJson(obj);
        else ctx.sendCodeJson(404, { error: "Not found" });
    }
    static async findAll(ctx) {
        ctx.sendJson(await this.Model.findAll({}));
    }
    static async create(ctx) {
        ctx.sendCodeJson(201, await this.Model.create(ctx.getBody()));
    }
    static async update(ctx) {
        ctx.sendJson(
            await this.Model.update(ctx.getUrlParam("id"), ctx.getBody())
        );
    }
    static async delete(ctx) {
        ctx.sendCodeJson(204, await this.Model.delete(ctx.getUrlParam("id")));
    }
}

module.exports = { Controler, ModelControler, MongoControler };
