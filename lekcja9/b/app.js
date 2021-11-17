var express = require("express")
var app = express()
app.use(express.static('static'))
const formidable = require('formidable');

app.listen(5000, () => console.log("Listening on http://localhost:5000"))

app.post("/api", (req, res) => {
    const form = formidable({});
    form.uploadDir = __dirname + '/static/upload/'

    form.parse(req, (err, fields, files) => {
        res.setHeader("content-type", "application/json")
        console.log(files)
        res.send(JSON.stringify({
            title: "file upladed",
            fileName: files.file.name
        }, null, 4));
    });
})
