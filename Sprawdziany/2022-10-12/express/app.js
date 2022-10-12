var express = require("express");
var cors = require("cors");
var app = express();
app.use(express.json());
app.use(cors());

app.listen(5000, () => console.log("Listening on http://localhost:5000"));

const DATA = {
    data: [
        {
            zgodnoosc: 3,
            wysylka: 3,
            koszt: 3,
            obsluga: 3,
        },
    ],
    form: [
        {
            name: "Zgodność z opisem",
            key: "zgodnoosc",
            values: ["a", "b", "c", "d", "e"],
        },
        {
            name: "Czas wysyłki",
            key: "wysylka",
            values: ["a", "b", "c", "d", "e"],
        },
        {
            name: "Koszt wysyłki",
            key: "koszt",
            values: ["a", "b", "c", "d", "e"],
        },
        {
            name: "Obsługa kupującego",
            key: "obsluga",
            values: ["a", "b", "c", "d", "e"],
        },
    ],
};

app.get("/", (req, res) => {
    res.send(DATA);
});

app.post("/", (req, res) => {
    console.log(req.body);
    DATA.data = req.body.data;
    res.send(DATA);
});
