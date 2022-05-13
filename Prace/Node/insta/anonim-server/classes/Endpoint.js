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
        if (options.middlewares)
            for (let i = 0; i < options.middlewares.length; i++) {
                const middleware = MiddlewareManager.getMiddleware(
                    options.middlewares[i]
                );
                if (!middleware) {
                    throw new Error(
                        `Middleware ${options.middlewares[i]} not found.`
                    );
                }
                ctx = middleware.use(ctx);
            }
        await this.callback(ctx);
    }
};
