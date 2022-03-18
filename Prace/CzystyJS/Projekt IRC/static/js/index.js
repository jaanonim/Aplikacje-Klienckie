var author = prompt("Podaj swoje imię: ");

class Chat {
    constructor() {
        new Form()

        this.html = document.querySelector('#main');
        this.messages = [];
        this.addMessage("ja", "Hello World!");
        this.addMessage("ja", "Hello World!");
        this.addMessage("ja", "Hello World!");
        this.addMessage("ja", "Hello World!");
        this.getMessages(this);
    }

    addMessage(author, message) {
        const m = new Message(author, message, this.html)
        this.messages.push(m);
    }

    getMessages() {
        fetch('/get').then(res => res.json()).then(res => {
            res.forEach(m => {
                this.addMessage(m.author, m.message);
            });
            this.getMessages();
        }).catch(err => {
            console.log(err);
            this.getMessages();
        });
    }
}


class Form {
    constructor() {
        document.querySelector('#send').onclick = this.submit.bind(this);
    }

    submit(e) {
        const message = document.querySelector('#input').value;
        fetch('/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: "ja",
                message
            })
        })
    }
}

class Message {
    constructor(author, message, parent) {
        this.author = author;
        this.message = message;
        this.createMessage(parent);
    }

    createMessage(parent) {
        let message = document.createElement('div');
        message.classList.add('message');
        message.innerHTML = `${this.author}: ${this.message}`;
        parent.appendChild(message);
    }
}

new Chat();
