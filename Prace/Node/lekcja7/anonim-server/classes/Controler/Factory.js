const Model = require('./Class')

class ControlerFactory {
    static Controler = Controler;

    constructor(name) {
        this.name = name;
    }

    create(obj) {
        const c = class extends Controler { }
        Object.defineProperty(c, "name", { value: this.name });
        for (const [key, value] of Object.entries(obj)) {
            c[key] = value;
        }
        return c;
    }
}

module.exports = ControlerFactory
