var express = require("express")
var hbs = require('express-handlebars');

var app = express()

app.use(express.static('static'))
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.engine('hbs', hbs({
    defaultLayout: 'main.hbs',
    extname: '.hbs',
    partialsDir: "views/partials",
    helpers: {
        shortTitle: function (title) {
            return title.substring(0, 10) + "...";
        }
    }

}));

app.listen(5000, () => console.log("Listening on http://localhost:5000"))

var text = "Lorem ipsum"

app.get("/", (req, res) => {
    res.render('page.hbs', { text: text });
})

app.get("/data", (req, res) => {
    text = req.query.text
    res.redirect('/');
})