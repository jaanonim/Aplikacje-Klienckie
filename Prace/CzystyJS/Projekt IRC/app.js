var express = require("express")

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("static"));
app.use(express.urlencoded({
    extended: false
}));



var messages = [];
class Message {
    constructor(author, message) {
        this.author = author;
        this.message = message;
    }
}

app.get("/get", async (req, res) => {
    const len = messages.length;
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 1));
        if (messages.length != len) {
            break;
        }
    }
    res.send(messages.splice(len));
})


app.post("/post", (req, res) => {
    messages.push(new Message(req.body.author, req.body.message));
    res.send({
        "error": false
    });
})

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
