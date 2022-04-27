const Route = require("../Route");

class RouterFactory {
    static defaultRouter = [
        {
            url: "/",
            method: "get",
            func: "findAll",
        },
        {
            url: "/:id/",
            method: "get",
            func: "find",
        },
        {
            url: "/",
            method: "post",
            func: "create",
        },
        {
            url: "/:id/",
            method: "patch",
            func: "update",
        },
        {
            url: "/:id/",
            method: "delete",
            func: "delete",
        },
    ];

    static create(controler, data) {
        if (Array.isArray(data))
            data = RouterFactory.defaultRouter.concat(data);
        let route = new Route();
        for (const [key, value] of Object.entries(data)) {
            route[value.method](
                value.url,
                controler[value.func].bind(controler)
            );
        }
        return route;
    }

    static createWithOverrite(controler, data) {
        if (!Array.isArray(data)) throw Error("Invalid router data");
        let route = new Route();
        for (const [key, value] of Object.entries(data)) {
            route[value.method](
                value.url,
                controler[value.func].bind(controler)
            );
        }
        return route;
    }
}

module.exports = RouterFactory;
