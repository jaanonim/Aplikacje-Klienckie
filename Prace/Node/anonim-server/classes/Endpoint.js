const Context = require("./Context");
const logger = require("../utilities/Logger");
const processBody = require("../utilities/BodyHandler");
const MiddlewareManager = require("../../anonim-server/classes/Middleware/Manager");

module.exports = class Endpoint {
    constructor(url, method, callback, options = {}) {
        this.setUrl(url);
        this.method = method;
        this.callback = callback;
        this.options = options;
    }

    getUrl() {
        return this.url.join("/");
    }

    setUrl(url) {
        this.url = url.split("/");
    }

    async handler(reqRaw, resRaw, config) {
        const { req, res } = await processBody(
            reqRaw,
            resRaw,
            config,
            this.options
        );

        logger.info(this.method + "[200] OK: " + this.getUrl());
        let ctx = new Context(req, res, this.url);
        if (this.options.middlewares)
            for (let i = 0; i < this.options.middlewares.length; i++) {
                const middleware = MiddlewareManager.getMiddleware(
                    this.options.middlewares[i]
                );
                if (!middleware) {
                    throw new Error(
                        `Middleware ${this.options.middlewares[i]} not found.`
                    );
                }
                if (await middleware.use(ctx)) return;
            }
        await this.callback(ctx);
    }
};
