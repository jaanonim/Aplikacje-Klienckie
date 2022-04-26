const { Controler, ModelControler } = require("./Class");

class ControlerFactory {
    static Controler = Controler;

    constructor(name, model) {
        this.name = name;
        this.model = model;
    }

    create(obj) {
        let c = class extends Controler {};
        if (this.model) {
            c = class extends ModelControler {};
            c.Model = this.model;
        }
        Object.defineProperty(c, "name", { value: this.name });
        for (const [key, value] of Object.entries(obj)) {
            c[key] = value;
        }
        return c;
    }
}

module.exports = ControlerFactory;
