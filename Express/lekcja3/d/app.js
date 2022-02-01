var express = require("express")
var app = express()
app.use(express.json());


app.listen(5000, () => console.log("Listening on http://localhost:5000"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})


var start_v = null
var objs = []
var id = 0

app.post("/post", function (req, res) {
    console.log(req.body)

    let top = req.body.top
    let left = req.body.left

    if (req.body.up) {
        if (start_v !== null) {
            objs[id] = {
                top: start_v.top,
                left: start_v.left,
                width: left - start_v.left,
                height: top - start_v.top,
            }
            start_v = null
            id++
        }
    }
    else {
        if (start_v == null) {
            start_v = { top: top, left: left }
        }
        objs[id] = {
            top: start_v.top,
            left: start_v.left,
            width: left - start_v.left,
            height: top - start_v.top,
        }
    }


    res.send(JSON.stringify({ o: objs }))

})
