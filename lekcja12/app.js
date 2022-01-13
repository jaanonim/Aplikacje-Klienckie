var express = require("express")
var hbs = require('express-handlebars');
var formidable = require('formidable');
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

var ID = 0
var DB = []

const get_by_id = (id) => {
    for (let i = 0; i < DB.length; i++) {
        if (DB[i].id == id) {
            return i
        }
    }
    return -1
}


app.listen(PORT, () => console.log("Listening on http://localhost:" + PORT))

app.get("/", (req, res) => {
    res.render('main.hbs',)
});

app.get("/filemanager", (req, res) => {
    res.render('filemanager.hbs', { files: DB });
})

app.get("/info", (req, res) => {
    let data = {}
    const index = get_by_id(req.query.id)
    if (index !== -1) {
        data = DB[index]
    }
    res.render('info.hbs', data);
})

app.get('/reset', (req, res) => {
    DB = []
    res.redirect("/filemanager")
})

app.get('/donwload', (req, res) => {
    const index = get_by_id(req.query.id)
    if (index !== -1) {
        res.download(DB[index].path)
        return
    }
    res.redirect("/filemanager")
})

app.get('/delete', (req, res) => {
    const index = get_by_id(req.query.id)
    if (index !== -1) {
        DB.splice(index, 1)
    }
    res.redirect("/filemanager")
})

app.post('/upload', (req, res) => {

    let form = formidable({});

    form.uploadDir = __dirname + '/static/upload/'
    form.keepExtensions = true
    form.multiples = true

    form.parse(req, function (err, fields, files) {

        if (err) {
            console.log("ERROR: " + err)
            res.send("Error")
        }

        let filesDB = files.files
        if (!Array.isArray(files.files)) {
            filesDB = [files.files]
        }

        for (let i = 0; i < filesDB.length; i++) {
            filesDB[i].id = ID
            filesDB[i].date = Date.now()

            filesDB[i].img = filesDB[i].type.split("/")[0]
            if (filesDB[i].img !== "image" && filesDB[i].img !== "text") { filesDB[i].img = "unk" }

            ID++
            DB.push(filesDB[i])
        }

        res.redirect("/filemanager")
    });
})