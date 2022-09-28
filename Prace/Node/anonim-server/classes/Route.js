const Endpoint = require("./Endpoint");

class Route {
    constructor() {
        this.endpoints = [];
    }

    add(endpoint) {
        if (endpoint instanceof Endpoint) this.endpoints.push(endpoint);
        else throw Error("Must be instance of Endpoint");
    }

    get(url, callback, options) {
        this.add(new Endpoint(url, "GET", callback, options));
    }

    post(url, callback, options) {
        this.add(new Endpoint(url, "POST", callback, options));
    }

    delete(url, callback, options) {
        this.add(new Endpoint(url, "DELETE", callback, options));
    }

    patch(url, callback, options) {
        this.add(new Endpoint(url, "PATCH", callback, options));
    }

    put(url, callback, options) {
        this.add(new Endpoint(url, "PUT", callback, options));
    }

    options(url, callback, options) {
        this.add(new Endpoint(url, "OPTIONS", callback, options));
    }

    route(url, router) {
        router.translate(url).forEach((element) => {
            this.endpoints.push(element);
        });
    }

    translate(url) {
        this.endpoints.forEach((endpoint) => {
            endpoint.setUrl(url + endpoint.getUrl());
        });
        return this.endpoints;
    }
}

module.exports = Route;
