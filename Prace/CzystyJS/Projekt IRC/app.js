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
        this.timestamp = Date.now();
    }
}

app.get("/get", async (req, res) => {
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 1));
        if (messages.length > 0) {
            if (messages[messages.length - 1].timestamp > req.query.timestamp) {
                break;
            }
        }
    }
    res.send(messages.filter((e) => e.timestamp > req.query.timestamp));
})


app.post("/post", (req, res) => {
    messages.push(new Message(req.body.author, req.body.message));
    res.send({
        "error": false
    });
})

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
