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

const server = http.createServer((req, res) => {
    req.url = decodeURI(req.url);

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
                                logger.error("[404] Not found: " + req.url);
                                res.writeHead(404, "Not Found");
                                res.write("<h1>404 Not Found</h1>");
                                res.end();
                                return;
                            }

                            logger.info("[200] OK: " + req.url);
                            res.writeHead(200, {
                                'Content-Type': getContentType(`${static}${req.url}index.html`)
                            });

                            res.write(data);
                            res.end();
                        }

                    );
                    return;
                }

                logger.info("[200] OK: " + req.url);
                res.writeHead(200, {
                    'Content-Type': getContentType(`${static}${req.url}.html`)
                });

                res.write(data);
                res.end();
            });
            return;

        }

        logger.info("[200] OK: " + req.url);
        res.writeHead(200, {
            'Content-Type': getContentType(`${static}${req.url}`)
        });

        res.write(data);
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
