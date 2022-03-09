const http = require("http");
const fs = require("fs").promises;
const logger = require('tracer').colorConsole({
    format: '{{timestamp}} <{{title}}> {{message}}',
    dateformat: 'HH:MM:ss.L',
    preprocess: (data) => {
        data.title = data.title.toUpperCase()
    }
});

const PORT = process.env.PORT || 3000;
const static = "./static";
const contentTypes = {
    html: "text/html",
    css: "text/css",
    js: "text/javascript",
    jpg: "image/jpeg",
    png: "image/png",
    ico: "image/x-icon"
};

class Endpoint {
    constructor(url, method, callback) {
        this.url = url;
        this.method = method;
        this.callback = callback;
    }

    static get(url, callback) {
        return new Endpoint(url, "GET", callback);
    }

    static post(url, callback) {
        return new Endpoint(url, "POST", callback);
    }

    static delete(url, callback) {
        return new Endpoint(url, "DELETE", callback);
    }

    handler(req, res) {
        logger.info(this.method + "[200] OK: " + this.url);
        this.callback(req, res);
    }
}

class Server {
    static endpoints = []

    /*
        Options for config:
        - jsonParser:bool
    */
    static config = {}

    static setConfig(data) {
        Server.config = data
    }

    static add(endpoint) {
        if (endpoint instanceof Endpoint)
            Server.endpoints.push(endpoint)
        else
            throw Error("Must be instance of Endpoint")
    }

    static get(...args) {
        Server.add(Endpoint.get(...args))
    }
    static post(...args) {
        Server.add(Endpoint.post(...args))
    }
    static delete(...args) {
        Server.add(Endpoint.delete(...args))
    }
}

const server = http.createServer(async (req, res) => {
    let urlObj = new URL("http://server.pl" + decodeURI(req.url))

    req.url = urlObj.pathname
    req.param = urlObj.searchParams
    let body = "";
    req.on("data", (data) => {
        body += data.toString();
    })

    req.on("end", async (data) => {
        if (Server.config.jsonParser) {
            try {
                req.body = JSON.parse(body);
            }
            catch (error) {
                req.body = body;
            }
        } else {
            req.body = body;
        }

        for (let i = 0; i < Server.endpoints.length; i++) {
            const element = Server.endpoints[i];
            if (req.method == element.method && req.url == element.url) {
                element.handler(req, res);
                return;
            }
        }

        let fileData = null;
        if (req.method == 'GET') {
            try {
                fileData = await fs.readFile(`${static}${req.url}`)
            }
            catch (e) {
                try {
                    fileData = await fs.readFile(`${static}${req.url}.html`)
                }
                catch (e) {
                    if (req.url[req.url.length - 1] !== "/") {
                        req.url = req.url + "/";
                    }
                    try {
                        fileData = await fs.readFile(`${static}${req.url}index.html`)
                    }
                    catch (e) {
                        logger.error(req.method + "[404] Not found: " + req.url);
                        res.writeHead(404, "Not Found");
                        res.write("<h1>404 Not Found</h1>");
                        res.end();
                        return;
                    }

                    logger.info(req.method + "[200] OK: " + req.url);
                    res.writeHead(200, {
                        'Content-Type': getContentType(`${static}${req.url}index.html`)
                    });

                    res.write(fileData);
                    res.end();
                    return;
                }
                logger.info(req.method + "[200] OK: " + req.url);
                res.writeHead(200, {
                    'Content-Type': getContentType(`${static}${req.url}.html`)
                });

                res.write(fileData);
                res.end();
                return;
            }
            logger.info(req.method + "[200] OK: " + req.url);
            res.writeHead(200, {
                'Content-Type': getContentType(`${static}${req.url}`)
            });

            res.write(fileData);
            res.end();
            return;
        }

        logger.error(req.method + "[404] Not found: " + req.url);
        res.writeHead(404, "Not Found");
        res.write("<h1>404 Not Found</h1>");
        res.end();
    });
});


const getContentType = (fileName) => {
    let extention = fileName.split(".");
    extention = extention[extention.length - 1];

    const content = contentTypes[extention] ? contentTypes[extention] : "text/plain";
    return content
}

server.listen(PORT, () => {
    logger.info(`Server is listening on http://localhost:${PORT}`);
});


module.exports = {
    Endpoint,
    Server,
    logger
}