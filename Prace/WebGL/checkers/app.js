const express = require("express")
const app = express()
const router = require("./api")

const PORT = process.env.PORT || 3000;


app.use(express.static('static'))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

app.use("/api", router);

app.listen(PORT, () => console.log("Listening on http://localhost:" + PORT))