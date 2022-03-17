const Context = require('./Context')
const logger = require('../utilities/Logger')

module.exports = class Endpoint {
    constructor(url, method, callback) {
        this.url = url;
        this.method = method;
        this.callback = callback;
    }

    async handler(req, res) {
        logger.info(this.method + "[200] OK: " + this.url);
        const ctx = new Context(req, res);
        await this.callback(ctx);
    }
}
