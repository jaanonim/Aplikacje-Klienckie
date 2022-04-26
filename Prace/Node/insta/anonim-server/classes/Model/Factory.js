const Model = require("./Class");

class ModelFactory {
    static Model = Model;

    constructor(name) {
        this.name = name;
    }

    create(obj, model) {
        let c = class extends Model {};
        c.model = Model.name;
        if (model) {
            c = class extends model {};
            c.model = model.name;
        }
        Object.defineProperty(c, "name", { value: this.name });
        if (obj.find) {
            c.find = obj.find.bind(c);
        } else {
            c.find = c._find;
        }

        if (obj.findAll) {
            c.findAll = obj.findAll.bind(c);
        } else {
            c.findAll = c._findAll;
        }

        if (obj.create) {
            c.create = obj.create.bind(c);
        } else {
            c.create = c._create;
        }

        if (obj.update) {
            c.update = obj.update.bind(c);
        } else {
            c.update = c.update;
        }
        if (obj.delete) {
            c.delete = obj.delete.bind(c);
        } else {
            c.delete = c._delete;
        }

        c.setup();
        return c;
    }
}

module.exports = ModelFactory;
