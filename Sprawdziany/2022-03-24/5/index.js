const http = require("http");
const fs = require("fs");
const formidable = require("formidable");
const PORT = 3000;
const path = require("path");
const static = "./static";

const server = http.createServer((req, res) => {
    req.url = decodeURI(req.url);
    console.log(req.url);
    console.log(req.url.startsWith(`/static/upload/`))

    if (req.url == "/") {
        res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
        res.end(fs.readFileSync("./static/index.html"));
    }
    else if (req.url == "/send") {
        const form = formidable({ multiples: true });
        form.uploadDir = "static/upload/"


        form.parse(req, function (err, fields, files) {
            let pliki = Array.isArray(files.file) ? files.file : [files.file];
            let dir = path.join("static/upload/" + fields.name)
            try {
                fs.mkdirSync(dir);
            } catch { }
            let data = []
            pliki.forEach((ele) => {
                let p = path.join(dir, ele.name)
                fs.renameSync(ele.path, p);
                data.push({ "path": p, "name": ele.name })
            })
            res.writeHead(200, { "content-type": "application/json;charset=utf-8" })
            res.end(JSON.stringify(data))
        });
    }
    else if (req.url.startsWith("/upload")) {
        let p = "static" + req.url;
        res.writeHead(200, { "content-type": "image/png" })
        res.end(fs.readFileSync(p));
    }

});

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
