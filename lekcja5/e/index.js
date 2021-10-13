var express = require("express")
var cookieParser = require("cookie-parser")
var app = express()
app.use(cookieParser())
const PORT = 5500;


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})



app.get('/', function (req, res) {
    let first = req.cookies["first"]
    if (first) {
        res.cookie("first", Date.now(), { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), httpOnly: true })
    }
    let last = req.cookies["last"]

    res.cookie("last", Date.now(), { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), httpOnly: true })

    res.send('Cookie zostało ustawione')

    console.log("cookies :  ", req.cookies);

});