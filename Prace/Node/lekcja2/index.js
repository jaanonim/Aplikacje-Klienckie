const http = require("http");
const fs = require("fs");
const logger = require('tracer').colorConsole({
    format: '{{timestamp}} <{{title}}> {{message}}',
    dateformat: 'HH:MM:ss.L',
    preprocess: (data) => {
        data.title = data.title.toUpperCase()
    }
});

const PORT = 3000;
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

    handler(req, res) {
        logger.info(this.method + "[200] OK: " + this.url);
        this.callback(req, res);
    }

}

const endpoints = [
    Endpoint.post("/post", (res, req) => {
        console.log(req.body);

        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.end(req.body);
    })
]



const server = http.createServer((req, res) => {
    req.url = decodeURI(req.url);
    let body = "";
    req.on("data", function (data) {
        body += data.toString();
    })

    req.on("end", function (data) {
        req.body = body

        for (let i = 0; i < endpoints.length; i++) {
            const element = endpoints[i];
            if (req.method == element.method && req.url == element.url) {
                element.handler(res, req);
                return;
            }
        }

        if (req.method == 'GET') {

            fs.readFile(`${static}${req.url}`, (error, data) => {
                if (error) {
                    fs.readFile(`${static}${req.url}.html`, (error, data) => {
                        if (error) {
                            if (req.url[req.url.length - 1] !== "/") {
                                req.url = req.url + "/";
                            }

                            fs.readFile(
                                `${static}${req.url}index.html`,
                                (error, data) => {
                                    if (error) {
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

                                    res.write(data);
                                    res.end();
                                    return;
                                }


                            );
                            return;

                        }

                        logger.info(req.method + "[200] OK: " + req.url);
                        res.writeHead(200, {
                            'Content-Type': getContentType(`${static}${req.url}.html`)
                        });

                        res.write(data);
                        res.end();
                        return;

                    });
                    return;

                }

                logger.info(req.method + "[200] OK: " + req.url);
                res.writeHead(200, {
                    'Content-Type': getContentType(`${static}${req.url}`)
                });

                res.write(data);
                res.end();
                return;
            });
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
