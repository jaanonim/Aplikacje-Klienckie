class Controler {
    static Model = null

    static find(ctx) {
        ctx.getParam("id")
    }
    static findAll() {
        throw Error(`FindAll is not implemented on ${this.name}`)
    }
    static create() {
        throw Error(`Create is not implemented on ${this.name}`)
    }
    static update() {
        throw Error(`Update is not implemented on ${this.name}`)
    }
    static delete() {
        throw Error(`Delete is not implemented on ${this.name}`)
    }
}

module.exports = Model;
