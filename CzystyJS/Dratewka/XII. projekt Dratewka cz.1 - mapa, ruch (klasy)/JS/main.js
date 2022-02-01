class GameManager {
    constructor() {
        this.dispay = new Dispay()
        this.input = new Input()
        this.dispay.dispayLocation(new Location({
            img: "IMG/11.gif",
            color: "#f00",
            text: "jej"
        }, this))
    }

}

class Input {
    constructor() {
        this.inputHTML = document.getElementById('input')
        this.inputHTML.onkeydown = this.keydown.bind(this)
    }

    keydown(e) {
        if (e.key === 'Enter') {
            alert(this.inputHTML.value); // TODO: Handle Input
            this.inputHTML.value = ""
        }
    }
}

class Dispay {
    constructor() {
        this.imgHTML = document.getElementById('image')
        this.textHTML = document.getElementById('text')
    }

    dispayLocation(location) {
        this.textHTML.innerText = location.text
        this.imgHTML.src = location.img
        this.imgHTML.style.setProperty("--color", location.color)
    }
}

class Location {
    constructor(data, GM) {
        this.GM = GM
        this.img = data.img
        this.color = data.color
        this.text = data.text
        this.actions = []
    }

    addLink(dirction) {
        this.actions.push(new Move(dirction.key, this.GM, dirction))
    }
}

class Direction {
    constructor(d) {
        // 0 up 
        // 1 rigth 
        // 2 down 
        // 3 left
        const lookup = [
            { x: 0, y: -1, k: "w" },
            { x: 1, y: 0, k: "d" },
            { x: 0, y: 1, k: "s" },
            { x: -1, y: 0, k: "a" },
        ]
        this.x = lookup[x].x
        this.y = lookup[x].y
        this.key = lookup[x].k
        this.v = d
    }
    static vectroToDir(x, y) {
        if (x == 0 || y == -1) {

        }
        else if (x == 1 || y == 0) {

        }
        else if (x == -1 || y == 0) {

        } else if (x == 0 || y == 1) {

        }
    }
}

class Action {
    constructor(value, GM) {
        this.value = value
        this.GM = GM
    }
}

class Move extends Action {
    constructor(value, GM, direction) {
        this.dirction = direction
        super(value, GM)
    }

}

window.addEventListener('DOMContentLoaded', (event) => {
    window.GM = new GameManager()
});
