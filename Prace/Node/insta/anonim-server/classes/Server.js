const createServer = require("../utilities/Server");
const logger = require("../utilities/Logger");

const Route = require("./Route");

module.exports = class Server {
    constructor() {
        this.endpoints = [];
        this.config = {
            jsonParser: false,
            port: process.env.PORT || 3000,
            static: "./static",
            formidable: {
                uploadDir: "./static/uploads",
            },
            middlewares: [],
        };
        /*
            Options for config:
            - jsonParser:bool
            - port:number
            - static:string
            - formidable:object
            - middlewares:list of strings
        */

        this.root = new Route();
    }

    initMiddlewares() {
        this.config.middlewares.forEach((mid) => {
            if (mid[0] === "@") {
                mid = "./Middleware/default/" + mid.slice(1);
            }
            require(mid);
        });
    }

    listen() {
        this.initMiddlewares();
        this.endpoints = this.root.translate("");
        this.server = createServer(this.config, this.endpoints);
        this.server.listen(this.config.port, () => {
            logger.info(
                `Server is listening on http://localhost:${this.config.port}`
            );
        });
    }

    setConfig(key, value) {
        this.config[key] = value;
    }
};
