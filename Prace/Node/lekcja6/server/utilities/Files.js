const fs = require("fs").promises;
const getContentType = require('./Content')
const logger = require('../utilities/Logger')

module.exports = handleFile = async (req, res, config) => {
    let fileData = null;
    if (req.method == 'GET') {
        try {
            fileData = await fs.readFile(`${config.static}${req.url}`)
        }
        catch (e) {
            try {
                fileData = await fs.readFile(`${config.static}${req.url}.html`)
            }
            catch (e) {
                if (req.url[req.url.length - 1] !== "/") {
                    req.url = req.url + "/";
                }
                try {
                    fileData = await fs.readFile(`${config.static}${req.url}index.html`)
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
                    'Content-Type': getContentType(`${config.static}${req.url}index.html`)
                });

                res.write(fileData);
                res.end();
                return;
            }
            logger.info(req.method + "[200] OK: " + req.url);
            res.writeHead(200, {
                'Content-Type': getContentType(`${config.static}${req.url}.html`)
            });

            res.write(fileData);
            res.end();
            return;
        }
        logger.info(req.method + "[200] OK: " + req.url);
        res.writeHead(200, {
            'Content-Type': getContentType(`${config.static}${req.url}`)
        });

        res.write(fileData);
        res.end();
        return;
    }

    logger.error(req.method + "[404] Not found: " + req.url);
    res.writeHead(404, "Not Found");
    res.write("<h1>404 Not Found</h1>");
    res.end();
}