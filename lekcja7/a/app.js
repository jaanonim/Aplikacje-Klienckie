var express = require("express")
var app = express()
app.use(express.json());


app.listen(5000, () => console.log("Listening on http://localhost:5000"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})


app.post("/post", function (req, res) {
    console.log(req.body)
    res.send(JSON.stringify(req.body))
})
