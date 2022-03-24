const http = require("http");
const fs = require("fs");
const PORT = 3000;
const static = "./static";

const server = http.createServer((req, res) => {
    req.url = decodeURI(req.url);
    console.log(req.url);

    if (req.url == "/") {
        res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
        res.end(fs.readFileSync("./static/index.html"));
    }
    else if (req.url == "/send") {
        let dirs = []
        let files = []
        let elements = fs.readdirSync("node_modules\\nedb")
        for (let i = 0; i < elements.length; i++) {
            if (fs.statSync("node_modules\\nedb\\" + elements[i]).isDirectory()) {
                dirs.push("/" + elements[i])
            }
            else {
                files.push(elements[i])
            }
        }

        res.writeHead(200, { "content-type": "application/json;charset=utf-8" });
        res.end(JSON.stringify({ dirs, files }))

    }

});

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
