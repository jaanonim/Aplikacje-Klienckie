var express = require("express")
var hbs = require('express-handlebars');
const PORT = process.env.PORT || 5000;

var app = express()

app.use(express.static('static'))
app.use(express.urlencoded({
    extended: true
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.engine('hbs', hbs({
    defaultLayout: 'main.hbs',
    extname: '.hbs',
    partialsDir: __dirname + "/views/partials",

}));

var users = [{
    id: 1,
    student: false,
    login: "aa",
    password: "aa",
    age: 1,
    plec: "m"
}]
var user_id = 0
var id = 2


function get_data(data) {
    d = {}
    if (user_id == 0) {
        d.user_id = user_id

    } else {
        d.user_id = user_id
        d.user = users[user_id - 1]
    }
    if (data !== undefined) {
        d.data = data
    }
    return d
}

app.listen(PORT, () => console.log("Listening on http://localhost:" + PORT))

app.get("/", (req, res) => {
    res.render('main.hbs', get_data())
});

app.get("/admin", (req, res) => {
    res.render('admin.hbs', get_data());
})

app.get("/login", (req, res) => {
    res.render('login.hbs', get_data());
})

app.get("/register", (req, res) => {
    res.render('register.hbs', get_data());
})

app.get("/sort", (req, res) => {
    if (req.query.sort === "m") {
        res.render('sort.hbs', get_data({
            u: users.sort((a, b) => b.age - a.age),
            s: 1
        }))
    } else {
        res.render('sort.hbs', get_data({
            u: users.sort((a, b) => a.age - b.age),
            s: 0
        }))
    }
})

app.get("/gender", (req, res) => {
    let m = []
    let k = []
    users.forEach((e) => {
        if (e.plec === "m") {
            m.push(e)
        } else if (e.plec === "k") {
            k.push(e)
        }
    })
    res.render('gender.hbs', get_data({
        k: k,
        m: m
    }));
})

app.get("/show", (req, res) => {
    res.render('show.hbs', get_data(users));
})


app.post("/register", (req, res) => {

    let obj = {
        student: req.body["student"],
        login: req.body["login"],
        password: req.body["password"],
        age: parseInt(req.body["age"]),
        plec: req.body["plec"]
    }

    if (obj.student == "on") {
        obj.student = true
    } else {
        obj.student = false
    }
    if (obj.login == undefined || obj.password == undefined || obj.age == undefined || obj.plec == undefined) {

        res.send('Niepoprawne dane <a href="/">home</a>')
        return
    }
    if (obj.login.length > 30 || obj.password.length > 30) {
        res.send('Za długi login lub hasło <a href="/">home</a>')
        return
    }
    if (!(obj.plec === 'm' || obj.plec === 'k') || typeof (obj.login) !== "string" || typeof (obj.password) !== "string" || typeof (obj.login) !== "string" || typeof (obj.login) !== "string" || obj.age < 1 || obj.age > 20 || isNaN(obj.age)) {
        res.send('Nie hakuj mi tego! Niepoprawne dane <a href="/">home</a>')
        return
    }
    for (let i = 0; i < users.length; i++) {
        if (users[i].login == obj.login) {
            res.send('Login zajęty <a href="/">home</a>')
            return
        }
    }
    obj.id = id
    id++
    users.push(obj)
    res.send('Zarejestrowano uzytkownika ' + obj.login + ' <a href="/">home</a>')
})

app.post("/login", (req, res) => {
    let obj = {
        login: req.body["login"],
        password: req.body["password"]
    }
    if (obj.login == undefined || obj.password == undefined) {
        res.send('Niepoprawne dane <a href="/">home</a>')
        return
    }
    for (let i = 0; i < users.length; i++) {
        if (users[i].login == obj.login && users[i].password == obj.password) {
            user_id = users[i].id
            break
        }
    }
    if (user_id == 0) {
        res.send('Niepoprawne dane <a href="/">home</a>')
        return
    }

    res.send("Zalogowano jako " + obj.login + " <a href='/'>home</a>")
})

app.get("/logout", (req, res) => {
    user_id = 0
    res.send("Wylogowano <a href='/'>home</a>")
})
