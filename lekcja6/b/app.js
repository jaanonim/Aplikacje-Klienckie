var express = require("express")
var app = express()
var path = require("path")
app.listen(5000, () => console.log("Listening on http://localhost:5000"))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/formularz.html"))
})

app.get("/handle", (req, res) => {
    console.log(req.query)
    res.send(`<html><body style="background-color: ${req.query.color}">${req.query.color}`)
})