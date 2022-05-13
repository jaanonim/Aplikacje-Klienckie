const createServer = require("../utilities/Server");
const logger = require("../utilities/Logger");

const Route = require("./Route");

require("dotenv").config();

module.exports = class Server {
    static config = {
        jsonParser: false,
        port: process.env.PORT || 3000,
        static: "./static",
        formidable: {
            uploadDir: "./static/uploads",
        },
        middlewares: [],
        JWT: {
            expires: "1d",
        },
    };

    constructor() {
        this.endpoints = [];
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
        Server.config.middlewares.forEach((mid) => {
            if (mid[0] === "@") {
                mid = "./Middleware/default/" + mid.slice(1);
            }
            require(mid);
        });
    }

    listen() {
        this.initMiddlewares();
        this.endpoints = this.root.translate("");
        this.server = createServer(Server.config, this.endpoints);
        this.server.listen(Server.config.port, () => {
            logger.info(
                `Server is listening on http://localhost:${Server.config.port}`
            );
        });
    }

    setConfig(key, value) {
        Server.config[key] = value;
    }
};
