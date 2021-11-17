var express = require("express")
const formidable = require('formidable');
var app = express()

app.listen(5000, () => console.log("Listening on http://localhost:5000"))

app.get('/', (req, res) => {
    res.send(`
      <form action="/upload" enctype="multipart/form-data" method="post">
        Text field title: <input type="text" name="title" /><br>
        File: <input type="file" name="files" multiple="multiple" /><br>
        <input type="submit" value="Upload" />
      </form>
    `);
});

app.post('/upload', (req, res) => {
    const form = formidable(
        {
            multiples: true,
        });
    form.uploadDir = __dirname + '/static/upload/'
    form.keepExtensions = true

    form.parse(req, (err, fields, files) => {
        let data = []
        for (let i = 0; i < files.files.length; i++) {
            const element = files.files[i];
            console.log(element)
            data.push({
                size: element.size,
                path: element.path,
                type: element.type,
                name: element.name
            })
            console.log(data)
        }

        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify([fields, data], null, 4));
    });
});