const Middleware = require("./Class");
const MiddlewareManager = require("./Manager");

class MiddlewareFactory {
    constructor(name) {
        this.name = name;
    }

    create(fun) {
        let c = class extends Middleware {};
        Object.defineProperty(c, "name", { value: this.name });
        c["use"] = fun;
        MiddlewareManager.register(c);
        return c;
    }
}

module.exports = MiddlewareFactory;
