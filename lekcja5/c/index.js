var express = require("express")
var app = express()
const PORT = 5500;


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

app.get("/", function (req, res) {


    let value = +req.query["value"]
    let toRad = req.query["toRad"]

    if (toRad == "true") {
        let wynik = (value / 180.0) * Math.PI
        res.send(`${value} stopni to ${wynik} radianów`)
    }
    else {
        let wynik = value * (180.0 / Math.PI)
        res.send(`${value} radianów to ${wynik} stopni`)
    }


})