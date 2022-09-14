var express = require("express")
var app = express()
var data = require("./data.json")
var cors = require('cors')
app.use(cors())

app.listen(5000, () => console.log("Listening on http://localhost:5000"))

app.get("/", (req, res) => {
    res.send(data);
})
