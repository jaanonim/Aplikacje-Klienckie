const Context = require("./Context");
const logger = require("../utilities/Logger");

module.exports = class Endpoint {
    constructor(url, method, callback) {
        this.setUrl(url);
        this.method = method;
        this.callback = callback;
    }

    getUrl() {
        return this.url.join("/");
    }

    setUrl(url) {
        this.url = url.split("/");
    }

    async handler(req, res) {
        logger.info(this.method + "[200] OK: " + this.getUrl());
        const ctx = new Context(req, res, this.url);
        await this.callback(ctx);
    }
};
