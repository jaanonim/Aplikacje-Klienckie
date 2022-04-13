const Route = require("../Route");

const defaultRouter = [
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
        method: "post",
        func: "update",
    },
    {
        url: "/:id/",
        method: "delete",
        func: "delete",
    },
];

class RouterFactory {
    static create(controler, data = defaultRouter) {
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
