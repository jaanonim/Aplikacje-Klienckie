const http = require("http");
const fs = require("fs");
const formidable = require("formidable");
const PORT = 3000;
const static = "./static";
var x = 0;

const server = http.createServer((req, res) => {
    req.url = decodeURI(req.url);
    console.log(req.url);
    console.log(req.url.startsWith(`/static/upload/`))

    if (req.url == "/") {
        res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
        res.end(fs.readFileSync("./static/index.html"));
    }
    else if (req.url == "/send") {
        const form = formidable({});
        form.uploadDir = "static/upload/"


        form.parse(req, function (err, fields, files) {
            const path = files.file.path;
            x++;
            fs.renameSync(path, `static/upload/img${x}.png`)
            res.writeHead(200, { "content-type": "application/json;charset=utf-8" })
            res.end(JSON.stringify({ path: `static/upload/img${x}.png` }))
        });
    }
    else if (req.url.startsWith(`/static/upload/`)) {
        console.log("ok")
        try {
            let data = fs.readFileSync(`static/upload/img${x}.png`)
            res.writeHead(200, { "content-type": "image/png" })
            res.end(data);
        } catch {
            res.end();
        }
    }


});

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
