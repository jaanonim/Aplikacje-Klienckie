var express = require("express")
var app = express()
var path = require("path")
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(5000, () => console.log("Listening on http://localhost:5000"))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/formularz.html"))
})

app.post("/handle", (req, res) => {
    console.log(req.body)
    res.send(req.body)
})