var express = require("express")
var app = express()

app.listen(5000, () => console.log("Listening on http://localhost:5000"))

app.get("/", (req, res) => {
    // CODE
})
