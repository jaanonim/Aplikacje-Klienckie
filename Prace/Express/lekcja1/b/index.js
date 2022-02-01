var express = require("express")
var app = express()
const PORT = 5500;


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

app.get("/", function (req, res) {


    let count = parseInt(req.query["count"])
    let bg = req.query["bg"]
    let content = ""

    for (let i = 0; i < count; i++) {
        content += `<div style="background-color: ${bg};
        width: 100px;
        height: 100px;">${i}</div>`
    }

    let html = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            display: flex;
        }
        div{
            margin: 10px;
        }
    </style>
</head>

<body>
    ${content}
</body>

</html>
    `

    res.send(html)
})