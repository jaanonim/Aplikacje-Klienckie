var path = require("path")
const express = require('express');
const { version } = require("process");
var app = express()
app.use(express.urlencoded({
    extended: true
}));


var data = {
    error: null,
    data: "",
    pesel: "",
    plec: ""
}


app.listen(5000, () => console.log("Listening on http://localhost:5000"))

app.get("/", function (req, res) {
    res.send(
        `
    <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        
        <body>
            <form method="POST" action="/">
            <input type="text" name="pesel" value="${data.pesel}">
            <input type="submit" value="sprawdz">
        </form>

        ${data.error == null ? (data.pesel == "" ? "" : "pesel poprawny") : data.error}<br>
        PESEL: ${data.pesel == "" ? "---" : data.pesel}<br>
        Data: ${data.data == "" ? "---" : data.data}<br>
        Plec: ${data.plec == "" ? "---" : data.plec}<br>
    </body>

    </html>
`
    )
})

app.post("/", (req, res) => {
    pesel = req.body.pesel

    if (pesel.length == 11) {
        let v = (pesel[0] * 1 + pesel[1] * 3 + pesel[2] * 7 + pesel[3] * 9 + pesel[4] * 1 + pesel[5] * 3 + pesel[6] * 7 + pesel[7] * 9 + pesel[8] * 1 + pesel[9] * 3) % 10

        if (10 - v == pesel[10] || (v == 0 && pesel[10] == 0)) {

            const lata = {
                8: '18',
                9: '18',
                0: '19',
                1: '19',
                2: '20',
                3: '20',
                4: '21',
                5: '21',
                6: '22',
                7: '22',
            }

            let miesiac = pesel[2] + pesel[3]
            let dzien = pesel[4] + pesel[5]
            let rok = lata[pesel[2]] + pesel[0] + pesel[1]
            if (rok > 1800 && rok < 1899) {
                miesiac -= 80
            }
            else if (rok > 1900 && rok < 1999) {
                miesiac = miesiac
            }
            else if (rok > 2000 && rok < 2099) {
                miesiac -= 20
            }
            else if (rok > 2100 && rok < 2199) {
                miesiac -= 40
            }
            else {
                miesiac -= 60
            }
            data.data = dzien + "-" + miesiac + "-" + rok
            data.pesel = pesel
            data.error = null
            data.plec = pesel[9] % 2 == 0 ? "men" : "female"

            res.redirect('/');
            return
        }
    }

    data.data = ""
    data.pesel = pesel
    data.error = "Niepoprawny pesel!"
    data.plec = ""
    res.redirect('/');

})
