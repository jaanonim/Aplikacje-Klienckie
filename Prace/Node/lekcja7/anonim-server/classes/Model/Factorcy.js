const Model = require('./Class')

class ModelFactory {
    static Model = Model;

    constructor(name) {
        this.name = name;
    }

    create(obj) {
        const c = class extends Model { }
        Object.defineProperty(c, "name", { value: this.name });
        if (obj.find)
            c.find = obj.find
        if (obj.findAll)
            c.findAll = obj.findAll
        if (obj.create)
            c.create = obj.create
        if (obj.update)
            c.update = obj.update
        if (obj.delete)
            c.delete = obj.delete
        return c;
    }
}

module.exports = ModelFactory
