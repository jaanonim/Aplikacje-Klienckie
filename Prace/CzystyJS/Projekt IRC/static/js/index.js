import checkText from "./emoi.js";
import randomJoke from "./jokes.js";

var AUTHOR = prompt("Podaj swoje imię: ");
if (AUTHOR == null) {
    AUTHOR = "Anonim";
}
let c = Math.floor(Math.random() * 16777215).toString(16);
while (c.length < 6) {
    c = "0" + c;
}
var COLOR = "#" + c;

class Chat {
    constructor() {
        new Form();

        this.html = document.querySelector("#main");
        this.messages = [];
        this.getMessages(this);
    }

    addMessage(author, message, timestamp) {
        const m = new Message(author, message, timestamp, this.html);
        this.messages.push(m);
    }

    async getMessages() {
        try {
            let res = await fetch(
                `/get?timestamp=${
                    this.messages[this.messages.length - 1]
                        ? this.messages[this.messages.length - 1].timestamp
                        : Date.now()
                }`
            );
            res = await res.json();
            res.forEach((m) => {
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
        document.querySelector("#send").onclick = this.submit.bind(this);
        document.querySelector("#input").onkeydown = (e) => {
            if (e.keyCode == 13) {
                this.submit();
            }
        };
    }

    async submit(e) {
        const message = document.querySelector("#input").value;
        document.querySelector("#input").value = "";
        if (message.length == 0) return;
        if (message[0] == "/") {
            this.command(message);
            return;
        }
        await fetch("/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                author: `<span style="color: ${COLOR}">${AUTHOR}</span>`,
                message: checkText(message),
            }),
        });
    }

    command(message) {
        if (message.startsWith("/color")) {
            COLOR = message.split(" ")[1];
            this.osMessage(
                `Uzytkownik ${AUTHOR} ustawiono kolor niku na ${COLOR}`
            );
        } else if (message.startsWith("/nick")) {
            let last = AUTHOR;
            AUTHOR = message.split(" ")[1];
            this.osMessage(`Uzytkownik ${last} od teraz nazywa sie ${AUTHOR}`);
        } else if (message.startsWith("/random")) {
            this.osMessage(
                `${AUTHOR} oto losowa liczba: ${Math.round(
                    Math.random() * 100
                )}`
            );
        } else if (message.startsWith("/joke")) {
            this.osMessage(
                `Dowcip specjalnie dla ${AUTHOR}:\n\t${randomJoke()}`
            );
        } else if (message.startsWith("/help")) {
            this.osMessage(
                `Jak zwykle ${AUTHOR} nie zna komend.\n\t Oto przypomninie: \n\t  /color <kolor> - ustawia kolor niku \n\t  /nick <imie> - zmienia imie niku \n\t  /random - wyswietla losowa liczbe \n\t  /joke - wyswietla losowy dowcip \n\t  /sing - nie wpisuj tego \n\t and more...`
            );
        } else if (message.startsWith("/godmode")) {
            this.osMessage("ED7BA470-8E54-465E-825C-99712043E01C");
        } else if (
            message.startsWith("/answer to life the universe and everything")
        ) {
            this.osMessage(`42`);
        } else if (message.startsWith("/sing")) {
            var audio = new Audio("music.mp3");
            audio.play();
            this.osMessage(
                `\nWe're no strangers to love 
You know the rules and so do I 
A full commitment's what I'm thinking of 
You wouldn't get this from any other guy \n
I just wanna tell you how I'm feeling 
Gotta make you understand \n
Never gonna give you up 
Never gonna let you down 
Never gonna run around and desert you 
Never gonna make you cry 
Never gonna say goodbye 
Never gonna tell a lie and hurt you \n
We've known each other for so long 
Your heart's been aching but you're too shy to say it 
Inside we both know what's been going on 
We know the game and we're gonna play it 
And if you ask me how I'm feeling 
Don't tell me you're too blind to see \n
Never gonna give you up 
Never gonna let you down 
Never gonna run around and desert you 
Never gonna make you cry 
Never gonna say goodbye 
Never gonna tell a lie and hurt you \n
Never gonna give you up 
Never gonna let you down 
Never gonna run around and desert you 
Never gonna make you cry 
Never gonna say goodbye 
Never gonna tell a lie and hurt you \n
Never gonna give, never gonna give 
(Give you up) \n
We've known each other for so long 
Your heart's been aching but you're too shy to say it 
Inside we both know what's been going on 
We know the game and we're gonna play it \n
I just wanna tell you how I'm feeling 
Gotta make you understand \n
Never gonna give you up 
Never gonna let you down 
Never gonna run around and desert you 
Never gonna make you cry 
Never gonna say goodbye 
Never gonna tell a lie and hurt you \n
Never gonna give you up 
Never gonna let you down 
Never gonna run around and desert you 
Never gonna make you cry 
Never gonna say goodbye 
Never gonna tell a lie and hurt you \n
Never gonna give you up 
Never gonna let you down 
Never gonna run around and desert you 
Never gonna make you cry 
Never gonna say goodbye`
            );
        } else {
            this.osMessage(
                `Uzytkownik ${AUTHOR} wpisał nieznaną komende ${message}. Ale z niego idiota. ehhh...\n\t (Uzyj /help aby zobaczyć listę komend)`
            );
        }
    }

    async osMessage(message) {
        await fetch("/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                author: `<span style="color: #f00; font-weight: bold;">SYSTEM</span>`,
                message: message,
            }),
        });
    }
}

class Message {
    constructor(author, message, timestamp, parent) {
        this.author = author;
        this.message = message;
        this.timestamp = timestamp;
        this.createMessage(parent);
    }

    createMessage(parent) {
        let message = document.createElement("div");
        message.classList.add("message");
        message.innerHTML = `[${new Date(this.timestamp).toUTCString()}] ${
            this.author
        }: ${this.message}`;
        parent.appendChild(message);
        parent.scrollTo(0, parent.scrollHeight);
    }
}

new Chat();
