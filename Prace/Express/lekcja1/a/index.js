var express = require("express")
var path = require("path")
var app = express()
const PORT = 5500;
app.use(express.static('static'))


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

app.get("/koty", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/koty.html"))
})

app.get("/auta", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/auta.html"))
})

app.get("/drzewa", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/drzewa.html"))
})