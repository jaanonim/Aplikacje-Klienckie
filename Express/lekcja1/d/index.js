const { response } = require("express");
var express = require("express")
var path = require("path")
var app = express()
const PORT = 5500;
app.use(express.static('static'))


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

app.get("/produkty/:id", function (req, res) {
    let id = req.params.id
    if (4 > id > 0) {
        res.sendFile(path.join(__dirname + `/static/pages/produkt${id}.html`))
    }
    else {
        res.send("Nie  ma takiego produktu")

    }

})
