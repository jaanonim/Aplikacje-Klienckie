const Endpoint = require("./Endpoint");

class Route {
    constructor() {
        this.endpoints = [];
    }

    add(endpoint) {
        if (endpoint instanceof Endpoint) this.endpoints.push(endpoint);
        else throw Error("Must be instance of Endpoint");
    }

    get(url, callback) {
        this.add(new Endpoint(url, "GET", callback));
    }

    post(url, callback) {
        this.add(new Endpoint(url, "POST", callback));
    }

    delete(url, callback) {
        this.add(new Endpoint(url, "DELETE", callback));
    }

    patch(url, callback) {
        this.add(new Endpoint(url, "PATCH", callback));
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
