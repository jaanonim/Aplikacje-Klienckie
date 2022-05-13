class MiddlewareManager {
    static #middlewares = {};

    static register(middleware) {
        this.#middlewares[middleware.name] = middleware;
    }

    static getMiddleware(name) {
        return this.#middlewares[name];
    }
}

module.exports = MiddlewareManager;
