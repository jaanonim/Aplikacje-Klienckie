const Route = require("../Route");

class RouterFactory {
    static defaultRouter = {
        findAll: {
            url: "/",
            method: "get",
            options: {},
        },
        find: {
            url: "/:id/",
            method: "get",
            options: {},
        },
        create: {
            url: "/",
            method: "post",
            options: {},
        },
        update: {
            url: "/:id/",
            method: "patch",
            options: {},
        },
        delete: {
            url: "/:id/",
            method: "delete",
            options: {},
        },
    };

    static create(controler, data) {
        if (data) data = { ...RouterFactory.defaultRouter, ...data };
        let route = new Route();
        for (const [key, value] of Object.entries(data)) {
            route[value.method](
                value.url,
                controler[key].bind(controler),
                value.options
            );
        }
        return route;
    }

    static createWithOverrite(controler, data) {
        if (data) throw Error("Invalid router data");
        let route = new Route();
        for (const [key, value] of Object.entries(data)) {
            route[value.method](
                value.url,
                controler[key].bind(controler),
                value.options
            );
        }
        return route;
    }
}

module.exports = RouterFactory;
