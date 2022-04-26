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
    static find(ctx) {
        ctx.sendJson(this.Model.find((v) => v.id == ctx.getUrlParam("id")));
    }
    static findAll(ctx) {
        ctx.sendJson(this.Model.findAll((e) => true));
    }
    static create(ctx) {
        ctx.sendJson(this.Model.create(ctx.getBody()));
    }
    static update(ctx) {
        ctx.sendJson(
            this.Model.update((e) => v.id == ctx.getUrlParam("id")),
            ctx.getBody()
        );
    }
    static delete(ctx) {
        ctx.sendJson(this.Model.delete((v) => v.id == ctx.getUrlParam("id")));
    }
}

module.exports = { Controler, ModelControler };
