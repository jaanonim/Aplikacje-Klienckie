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
            const params = new URLSearchParams(body);
            console.log(params)
            let num1 = params.get("nr1")
            let num2 = params.get("nr2")
            let op = params.get("operation")
            res.writeHead(200, { "content-type": "application/json;charset=utf-8" });
            let data;
            if (op == 'plus') {
                data = {
                    op: "dodawnie",
                    value: num1 + num2
                }

            } else if (op == 'minus') {
                data = {
                    op: "odejmowanie",
                    value: num1 - num2
                }

            } else if (op == 'multi') {
                data = {
                    op: "mnorzenie",
                    value: num1 * num2
                }

            } else if (op == 'div') {
                data = {
                    op: "dzielenie",
                    value: num1 / num2
                }

            } else {
                data = [{
                    op: "dodawnie",
                    value: num1 + num2
                }, {
                    op: "odejmowanie",
                    value: num1 - num2
                }, {
                    op: "mnorzenie",
                    value: num1 * num2
                }, {
                    op: "dzielenie",
                    value: num1 / num2
                }]

            }
            res.end(JSON.stringify(data, null, 4))

        })
    }

});

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
