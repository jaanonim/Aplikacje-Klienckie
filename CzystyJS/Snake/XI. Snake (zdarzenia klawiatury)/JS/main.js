class GameManager {
    constructor(size_x, size_y, rate) {
        document.documentElement.style.setProperty('--x_size', size_x);
        document.documentElement.style.setProperty('--y_size', size_y);
        this.map = new Map(size_x, size_y, document.getElementById("board"), this)
        this.rate = rate;
        document.addEventListener("keydown", this.start.bind(this))
        document.addEventListener("keydown", this.map.snake.keydown.bind(this.map.snake))
    }

    start() {
        if (this.interval === undefined) {
            this.interval = setInterval(this.update.bind(this), 1000 / this.rate);
        }
    }

    update() {
        this.map.snake.move();
    }

    stop() {
        clearInterval(this.interval)
    }
}

class Map {
    constructor(size_x, size_y, boardHTML, GM) {
        this.GM = GM
        this.size_x = size_x
        this.size_y = size_y
        this.map = []
        this.freez = false

        boardHTML.innerText = ""

        for (let x = 0; x < this.size_x; x++) {
            this.map[x] = []
        }

        for (let y = 0; y < this.size_y; y++) {
            for (let x = 0; x < this.size_x; x++) {
                if (x == 0 || x == this.size_x - 1 || y == 0 || y == this.size_y - 1) {
                    this.map[x][y] = new Tile(x, y, boardHTML, this, true)
                } else {
                    this.map[x][y] = new Tile(x, y, boardHTML, this, false)
                }
            }
        }
        this.snake = new Snake(Math.floor(this.size_x / 2), Math.floor(this.size_y / 2), this)
        this.snake.update()
        this.makeFood()
    }

    makeFood() {
        let o;
        do {
            o = this.map[Math.floor(Math.random() * this.size_x)][Math.floor(Math.random() * this.size_y)]
        }
        while (o.isFood || o.isWall || o.isSanke)

        o.isFood = true
        o.update()
    }

    updateAll() {
        for (let x = 0; x < this.size_x; x++) {
            for (let y = 0; y < this.size_y; y++) {
                this.map[x][y].update()
            }
        }
    }

}

class Snake {
    constructor(x, y, map) {
        this.x = x
        this.y = y
        this.map = map
        this.body = []
        this.body.push(this.map.map[this.x][this.y])
        this.direction = {
            x: 0,
            y: -1
        }
        this.new_direction = {
            x: 0,
            y: -1
        }
    }

    move() {
        this.direction = this.new_direction
        this.x += this.direction.x
        this.y += this.direction.y
        let isFood = true;

        if (!this.map.map[this.x][this.y].isFood) {
            let remove = this.body.pop()
            remove.setSnake(0);
            if (this.map.map[this.x][this.y].isWall || this.map.map[this.x][this.y].isSanke) {
                this.lose()
                return
            }
            remove.update()
            isFood = false;
        }

        let new_body = [this.map.map[this.x][this.y]]
        for (let i = 0; i < this.body.length; i++) {
            new_body.push(this.body[i])
        }
        this.body = new_body
        this.update()

        if (isFood) {
            this.map.makeFood()
        }
    }

    lose() {
        this.map.GM.stop()
        alert("You lose")
    }

    update() {
        if (this.body.length == 1) {
            this.body[0].setSnake(4)
        } else {
            this.body[0].setSnake(1)
            for (let i = 1; i < this.body.length - 1; i++) {
                this.body[i].setSnake(2)
            }
            this.body[this.body.length - 1].setSnake(3)
        }
        for (let i = 0; i < this.body.length; i++) {
            if (i === 0) this.calcDirForHead()
            else if (i === this.body.length - 1) this.calcDirForTail()
            else this.calcDirForBody(i)

            this.body[i].update()
        }
    }

    keydown(e) {
        if ((e.keyCode == 37 || e.keyCode == 65) && this.direction.x !== 1) {
            this.new_direction = {
                x: -1,
                y: 0
            }
        } else if ((e.keyCode == 38 || e.keyCode == 87) && this.direction.y !== 1) {
            this.new_direction = {
                x: 0,
                y: -1
            }
        } else if ((e.keyCode == 39 || e.keyCode == 68) && this.direction.x !== -1) {
            this.new_direction = {
                x: 1,
                y: 0
            }
        } else if ((e.keyCode == 40 || e.keyCode == 83) && this.direction.y !== -1) {
            this.new_direction = {
                x: 0,
                y: 1
            }
        }
    }

    calcDirForHead() {

        const list = [{
            x: 0,
            y: 1
        }, {
            x: -1,
            y: 0
        }, {
            x: 1,
            y: 0
        }, {
            x: 0,
            y: -1
        }]

        for (let i = 0; i < list.length; i++) {
            if (list[i].x === this.map.snake.direction.x && list[i].y === this.map.snake.direction.y) {
                this.body[0].elementHTML.style.setProperty("--clip", i)
                return
            }
        }
    }

    calcDirForBody(index) {

        let code = ""

        const list = [{
            x: 1,
            y: 0
        }, {
            x: -1,
            y: 0
        }, {
            x: 0,
            y: 1
        }, {
            x: 0,
            y: -1
        }]

        for (let i = 0; i < list.length; i++) {
            if (this.body[index].x - this.body[index - 1].x == list[i].x && this.body[index].y - this.body[index - 1].y == list[i].y) {
                code += i
                break
            }
        }
        for (let i = 0; i < list.length; i++) {
            if (this.body[index].x - this.body[index + 1].x == list[i].x && this.body[index].y - this.body[index + 1].y == list[i].y) {
                code += i
                break
            }
        }

        const lookup = [
            "23",
            "10",
            "13",
            "12",
            "02",
            "30",
        ]

        for (let i = 0; i < lookup.length; i++) {
            if (code == lookup[i] || code == lookup[i].split("").reverse().join("")) {
                this.body[index].elementHTML.style.setProperty("--clip", i)
                return
            }
        }

    }

    calcDirForTail() {
        const list = [{
            x: 0,
            y: 1
        }, {
            x: -1,
            y: 0
        }, {
            x: 1,
            y: 0
        }, {
            x: 0,
            y: -1
        }]


        for (let i = 0; i < list.length; i++) {
            if (this.body[this.body.length - 1].x - this.body[this.body.length - 2].x == list[i].x && this.body[this.body.length - 1].y - this.body[this.body.length - 2].y == list[i].y) {
                this.body[this.body.length - 1].elementHTML.style.setProperty("--clip", i)
                return
            }
        }

    }
}

class Tile {
    constructor(x, y, parent, map, wall) {
        this.x = x
        this.y = y
        this.map = map
        this.isWall = wall
        this.isSanke = false
        this.isHead = false
        this.isTail = false
        this.isFood = false
        this.isSmall = false
        this.elementHTML = this.getElement(parent)
        this.update()
    }

    getElement(parent) {
        let e = document.createElement("div")
        e.classList.add("tile")
        parent.appendChild(e)
        return e
    }

    resetClass() {
        this.elementHTML.classList.remove("wall")
        this.elementHTML.classList.remove("body")
        this.elementHTML.classList.remove("head")
        this.elementHTML.classList.remove("tail")
        this.elementHTML.classList.remove("food")
        this.elementHTML.classList.remove("small")
    }

    update() {

        this.resetClass()

        if (this.isWall) {
            this.elementHTML.classList.add("wall")
        } else if (this.isFood) {
            this.elementHTML.classList.add("food")
        } else if (this.isSanke) {
            if (this.isHead) {
                if (this.isSmall) {
                    this.elementHTML.classList.add("small")
                } else {
                    this.elementHTML.classList.add("head")
                }
            } else if (this.isTail) {
                this.elementHTML.classList.add("tail")
            } else {
                this.elementHTML.classList.add("body")
            }
        }
    }

    setSnake(type) {
        this.isFood = false
        if (type == 0) {
            this.isSanke = false
            this.isHead = false
            this.isTail = false
        } else {
            this.isSanke = true
            this.isSmall = false
            if (type == 1) {
                this.isHead = true
                this.isTail = false
            } else if (type == 2) {
                this.isHead = false
                this.isTail = false
            } else if (type == 3) {
                this.isHead = false
                this.isTail = true
            } else if (type == 4) {
                this.isHead = true
                this.isTail = false
                this.isSmall = true
            }
        }
    }
}


window.addEventListener('DOMContentLoaded', (event) => {
    window.GM = new GameManager(25, 15, 5)
});
