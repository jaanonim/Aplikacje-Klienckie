const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000;
const path = require("path")
const fs = require("fs")
app.use(express.static('static'))
app.use(express.static('static/cwiczenia'))


app.get("/", function (req, res) {
    res.sendFile(path.join(dirname + "/static/index.html"))
})

app.get("/", function (req, res) {
    res.sendFile(path.join(dirname + "/static/index.html"))
})

app.get("/cwiczenia", function (req, res) {
    fs.readdir(__dirname + "/static/cwiczenia", function (err, files) {
        if (err) {
            return console.log(err);
        }
        res.send(files)
    });

})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
