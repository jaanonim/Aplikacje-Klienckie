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
        let body = "";

        req.on("data", function (data) {
            body += data.toString();
        })

        req.on("end", function () {

            let data = JSON.parse(body)
            data.a = data.a / 100;
            console.log(data);
            res.writeHead(200, { "content-type": "application/json;charset=utf-8" });
            res.end(JSON.stringify(data))
        })
    }

});

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
