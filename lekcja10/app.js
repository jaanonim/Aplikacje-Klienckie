var express = require("express")
var app = express()
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))

app.get("/", (req, res) => {
    res.send(`<h1>Hello!</h1> Przejdz do <a href="/data">/data</a>`)
})

app.get("/data", (req, res) => {
    res.send(`{imie: "Mateusz", nazwisko: "Mrowiec", klasa: "3i2", grupa: "a"}`)
})
