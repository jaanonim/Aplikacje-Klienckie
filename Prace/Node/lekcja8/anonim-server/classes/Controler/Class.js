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
        this.Model.find(ctx.getUrlParam("id"));
    }
    static findAll(ctx) {
        this.Model.findAll((e) => true);
    }
    static create(ctx) {
        ctx.sendJson(this.Model.create(ctx.getBody()));
    }
    static update(ctx) {
        this.Model.update((e) => true, ctx.getBody());
    }
    static delete() {
        this.Model.delete(ctx.getUrlParam("id"));
    }
}

module.exports = { Controler, ModelControler };
