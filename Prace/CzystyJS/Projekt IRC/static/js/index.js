import checkText from "./emoi.js";


var AUTHOR = prompt("Podaj swoje imię: ");
if (AUTHOR == null) {
    AUTHOR = "Anonim";
}
let c = Math.floor(Math.random() * 16777215).toString(16);
while (c.length < 6) {
    c = "0" + c;
}
var COLOR = '#' + c

class Chat {
    constructor() {
        new Form()

        this.html = document.querySelector('#main');
        this.messages = [];
        this.getMessages(this);
    }

    addMessage(author, message, timestamp) {
        const m = new Message(author, message, timestamp, this.html)
        this.messages.push(m);
    }

    async getMessages() {
        try {
            let res = await fetch(`/get?timestamp=${this.messages[this.messages.length-1]?this.messages[this.messages.length-1].timestamp:Date.now()}`)
            res = await res.json();
            res.forEach(m => {
                this.addMessage(m.author, m.message, m.timestamp);
            });
            this.getMessages();
        } catch (err) {
            console.log(err);
            this.getMessages();
        }

    }
}


class Form {
    constructor() {
        document.querySelector('#send').onclick = this.submit.bind(this);
        document.querySelector('#input').onkeydown = (e) => {
            if (e.keyCode == 13) {
                this.submit();
            }
        }
    }

    async submit(e) {
        const message = document.querySelector('#input').value;
        document.querySelector('#input').value = "";
        if (message.length == 0) return;
        if (message[0] == '/') {
            this.command(message);
            return;
        }
        await fetch('/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: `<span style="color: ${COLOR}">${AUTHOR}</span>`,
                message: checkText(message)
            })
        })
    }

    command(message) {
        if (message.startsWith("/color")) {
            COLOR = message.split(" ")[1];
            this.osMessage(`Uzytkownik ${AUTHOR} ustawiono kolor niku na ${COLOR}`);

        } else if (message.startsWith("/nick")) {
            let last = AUTHOR
            AUTHOR = message.split(" ")[1];
            this.osMessage(`Uzytkownik ${last} od teraz nazywa sie ${AUTHOR}`);
        } else {
            this.osMessage(`Uzytkownik ${AUTHOR} wpisał nieznaną komende ${message}`);
        }
    }

    async osMessage(message) {
        await fetch('/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: `<span style="color: #f00; font-weight: bold;">SYSTEM</span>`,
                message: checkText(message),
            })
        })
    }
}

class Message {
    constructor(author, message, timestamp, parent) {
        this.author = author;
        this.message = message;
        this.timestamp = timestamp
        this.createMessage(parent);
    }

    createMessage(parent) {
        let message = document.createElement('div');
        message.classList.add('message');
        message.innerHTML = `[${new Date(this.timestamp).toUTCString()}] ${this.author}: ${this.message}`;
        parent.appendChild(message);
        parent.scrollTo(0, parent.scrollHeight);
    }
}

new Chat();
