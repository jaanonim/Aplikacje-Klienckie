var express = require("express")
var app = express()

app.listen(5000, () => console.log("Listening on http://localhost:5000"))

let data = [
    { name: "audi" },
    { name: "ee" },
    { name: "jakias marka" },
    { name: "ford" },
    { name: "fords" },
]

app.get("/", (req, res) => {
    let elements = ""
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        elements += `
        <tr>
            <td>${i + 1} -> ${element.name}</td>
            <td><input type="radio" name="${i}" value="0"></td>
            <td><input type="radio" name="${i}" value="1"></td>
            <td><input type="radio" name="${i}" value="2"></td>
        </tr>
        `
    }



    const html = `
    <form method="GET" action="/handle">
    <table>
        <tr>
            <th></th>
            <th>nowych</th>
            <th>urzywanych</th>
            <th>powypadkowych</th>
        </tr>
        ${elements}
    </table>
    <input type="submit">
    </form>
    `
    res.send(html)
})

app.get("/handle", (req, res) => {
    const keys = Object.keys(req.query)
    let response = { nowych: 0, urzywanych: 0, powpatkowych: 0 }
    for (let i = 0; i < keys.length; i++) {
        if (req.query[keys[i]] == 0) {
            response.nowych += 1
        }
        if (req.query[keys[i]] == 1) {
            response.urzywanych += 1
        }
        if (req.query[keys[i]] == 2) {
            response.powpatkowych += 1
        }
    }
    res.send(response)

})