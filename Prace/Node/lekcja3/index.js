const http = require("http");
const fs = require("fs");
const formidable = require("formidable");
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

var progres = -1;
var bReceived = 0;
var bExpected = 0;

const endpoints = [
    Endpoint.post("/upload", (req, res) => {
        const form = formidable({
            maxFileSize: 20 * 1024 * 1024 * 1024,
        });
        form.uploadDir = __dirname + "\\static\\upload\\"
        console.log(form.uploadDir);

        form.on("progress", function (bytesReceived, bytesExpected) {
            bReceived = bytesReceived;
            bExpected = bytesExpected;
            console.log("progress", parseInt(bytesReceived / bytesExpected * 100))
            progres = parseInt(bytesReceived / bytesExpected * 100);
        })


        form.parse(req, function (err, fields, files) {
            console.log(err, fields, files);
            progres = -1;

            res.writeHead(200, {
                'content-type': 'application/json'
            });
            res.end(JSON.stringify({
                bReceived: bReceived,
                bExpected: bExpected,
            }));
        });

    }),
    Endpoint.get("/progres", (req, res) => {
        res.writeHead(200, {
            'content-type': 'application/json'
        });
        res.end(JSON.stringify({
            progress: progres
        }));
    })
]



const server = http.createServer((req, res) => {
    const url = req.url
    req.url = decodeURI(req.url);


    for (let i = 0; i < endpoints.length; i++) {
        const element = endpoints[i];
        if (req.method == element.method && req.url == element.url) {
            req.url = url

            element.handler(req, res);
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


const getContentType = (fileName) => {
    let extention = fileName.split(".");
    extention = extention[extention.length - 1];

    const content = contentTypes[extention] ? contentTypes[extention] : "text/plain";
    return content
}

server.listen(PORT, () => {
    logger.info(`Server is listening on http://localhost:${PORT}`);
});
