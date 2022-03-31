class Model {
    static find() {
        throw Error(`Find is not implemented on ${this.name}`)
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
