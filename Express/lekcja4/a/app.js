var express = require("express")
var hbs = require('express-handlebars');

var app = express()

app.use(express.static('static'))
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));

app.listen(5000, () => console.log("Listening on http://localhost:5000"))

const context = {
    subject: "ćwiczenie 4 - dane z tablicy, select",
    fields: [
        { name: "title" },
        { name: "author" },
        { name: "lang" }
    ],
    books: [
        { title: "Lalka", author: "B Prus", lang: "PL" },
        { title: "Hamlet", author: "W Szekspir", lang: "ENG" },
        { title: "Pan Wołodyjowski", author: "H Sienkiewicz", lang: "PL" },
        { title: "Zamek", author: "F Kafka", lang: "CZ" }
    ]
}


app.get("/", (req, res) => {

    res.render('page.hbs', context);
})

app.get("/data", (req, res) => {
    let c = context
    c["f"] = req.query.f
    res.render('response.hbs', c);
})