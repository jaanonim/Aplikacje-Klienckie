var express = require("express")
var app = express()
var data = require("./data.json")
var cors = require('cors')
app.use(cors())

app.listen(5000, () => console.log("Listening on http://localhost:5000"))

const selcted = []

app.get("/", (req, res) => {
    console.log(selcted)
    res.send(data.map((e,i)=>selcted.indexOf(i)==-1?{...e,selcted: false}:{...e,selcted: true}));
})

app.post("/set", (req, res) => {
    req.query.id = parseInt(req.query.id)
    if(selcted.indexOf(req.query.id)===-1)
    selcted.push(req.query.id)
    res.send(selcted);
})

app.post("/unset", (req, res) => {
    req.query.id = parseInt(req.query.id)
    const i = selcted.indexOf(req.query.id)
    if(i!==-1)
    selcted.splice(i,1)
    res.send(selcted);
})

app.get("/sel", (req,res)=>{
    res.send(selcted.map((i)=>data[i]));
})
