
const createServer = require('../utilities/Server')
const Endpoint = require('./Endpoint')
const logger = require('../utilities/Logger')

module.exports = class Server {

    constructor() {
        this.endpoints = [];
        this.config = {
            jsonParser: false,
            port: process.env.PORT || 3000,
            static: './static'
        };
        /*
            Options for config:
            - jsonParser:bool
            - port:number
            - static:string
        */

        this.server = createServer(this.config, this.endpoints);
    }

    listen() {
        this.server.listen(this.config.port, () => {
            logger.info(`Server is listening on http://localhost:${this.config.port}`);
        });
    }

    setConfig(key, value) {
        this.config[key] = value;
    }

    add(endpoint) {
        if (endpoint instanceof Endpoint)
            this.endpoints.push(endpoint);
        else
            throw Error("Must be instance of Endpoint");
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
}