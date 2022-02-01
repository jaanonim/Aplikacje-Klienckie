var path = require("path")
const express = require('express');
var app = express()
app.use(express.urlencoded({
    extended: true
}));

var users = [
    { nick: "111", email: "111@w.pl" },
    { nick: "222", email: "222@w.pl" },
    { nick: "333", email: "333@w.pl" }
]

const html1 = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    
    <body>
        <form method="POST" action="/remove">
    `

const html2 = `
        <input type="submit" value="Usun">
    </form>
</body>

</html>
`

app.listen(5000, () => console.log("Listening on http://localhost:5000"))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index.html"))
})

app.post("/add-email", function (req, res) {
    if (req.body.nick == "" || req.body.email == "") {
        res.send("Nie podano nicku albo emaila")
        return
    }
    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        if (element.email == req.body.email) {
            res.send("Ten email jest juz w bazie")
            return
        }
    }
    users.push({ nick: req.body.nick, email: req.body.email })
    res.send(`hej ${req.body.nick} Dodano emaila: ${req.body.email}`)

})

app.get("/removeUserBySelect", function (req, res) {
    let option = ""
    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        option += `<option value="${i}">${element.nick} - ${element.email}</option>`
    }

    text = `<select name="users">${option}</select>`

    res.send(html1 + text + html2)
})

app.get("/removeUserByRadio", function (req, res) {
    let option = ""
    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        option += `<label><input type="radio" name=
        "users" value="${i}">${element.nick} - ${element.email}</label><br>`
    }

    res.send(html1 + option + html2)
})

app.get("/removeUserByCheckbox", function (req, res) {
    let option = ""
    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        option += `<label><input type="checkbox" name=
        "users" value="${i}">${element.nick} - ${element.email}</label><br>`
    }

    res.send(html1 + option + html2)
})

app.post("/remove", (req, res) => {
    console.log(typeof req.body.users, req.body.users)
    if (typeof req.body.users == "object") {
        for (let i = 0; i < req.body.users.length; i++) {
            const element = parseInt(req.body.users[i]);
            users.splice(element, 1)
        }
        res.send(`usuniento ${req.body.users.length} userów`)
    }
    else {
        users.splice(parseInt(req.body.users), 1)
        res.send("usuniento 1 usera")
    }
})