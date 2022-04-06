const http = require("http");
const handleFile = require("./Files");
const parseBody = require("./BodyParser");

module.exports = createServer = (config, endpoints) => {
    return http.createServer(async (req, res) => {
        let urlObj = new URL("http://server.pl" + decodeURI(req.url));

        req.url = urlObj.pathname;
        req.param = urlObj.searchParams;
        let body = "";
        req.on("data", (data) => {
            body += data.toString();
        });

        req.on("end", async () => {
            req.body = parseBody(body, config);

            for (let i = 0; i < endpoints.length; i++) {
                const element = endpoints[i];
                if (req.method == element.method) {
                    const url = req.url.split("/");
                    const match = url.filter((v, i) =>
                        element.url != "" &&
                        element.url[i] &&
                        element.url[i][0] === ":"
                            ? true
                            : v === element.url[i]
                    );
                    if (match.length === element.url.length) {
                        await element.handler(req, res);
                        return;
                    }
                }
            }

            await handleFile(req, res, config);
        });
    });
};
