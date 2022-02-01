class GameManager {
    constructor(size_x, size_y, mines) {
        document.documentElement.style.setProperty('--y_size', size_x);
        document.documentElement.style.setProperty('--x_size', size_y);

        this.mines = mines
        this.map = new Map(size_x, size_y, document.getElementById("board"))
        this.map.pleace_mines(this.mines)
    }
}

class Map {
    constructor(size_x, size_y, boardHTML) {
        this.size_x = size_x
        this.size_y = size_y
        this.map = []

        for (let x = 0; x < this.size_x; x++) {
            this.map[x] = []
            for (let y = 0; y < this.size_y; y++) {
                this.map[x][y] = new Tile(x, y, this, boardHTML)
            }
        }
    }

    pleace_mines(count) {
        let list = []
        let mines = []
        for (let x = 0; x < this.size_x; x++) {
            for (let y = 0; y < this.size_y; y++) {
                list.push(this.map[x][y])
            }
        }
        for (let i = 0; i < count; i++) {
            let index = Math.round(Math.random() * (list.length - 1))
            list[index].mine = true
            list[index].update()
            mines.push(list[index])
            list.splice(index, 1)
        }
        mines.forEach((e) => { e.update_value() })
    }

    update_all() {
        for (let x = 0; x < this.size_x; x++) {
            for (let y = 0; y < this.size_y; y++) {
                this.map[x][y].update()
            }
        }
    }

}

class Tile {
    constructor(x, y, map, parent) {
        this.x = x
        this.y = y
        this.map = map
        this.showed = false
        this.value = 0
        this.mine = false
        this.flag = false
        this.question = false
        this.elementHTML = this.getElement(parent)
    }

    on_click() {
        if (this.showed || this.flag || this.question) {
            return
        }
        if (this.mine) {
            alert("U died!")
            return
        }
        this.reveal()

    }

    reveal() {
        this.showed = true
        this.update()
        if (this.value === 0) {
            for (let sx = -1; sx < 2; sx++) {
                for (let sy = -1; sy < 2; sy++) {
                    if (
                        (sx == 0 && sy == 0) ||
                        (sx + this.x < 0 || sx + this.x > this.map.size_x - 1) ||
                        (sy + this.y < 0 || sy + this.y > this.map.size_y - 1)

                    ) {
                        continue
                    }
                    if (!this.map.map[this.x + sx][this.y + sy].showed) {
                        this.map.map[this.x + sx][this.y + sy].reveal()
                    }
                }
            }

        }
    }

    update_value() {
        for (let sx = -1; sx < 2; sx++) {
            for (let sy = -1; sy < 2; sy++) {
                if (
                    (sx == 0 && sy == 0) ||
                    (sx + this.x < 0 || sx + this.x > this.map.size_x - 1) ||
                    (sy + this.y < 0 || sy + this.y > this.map.size_y - 1)
                ) {
                    continue
                }
                this.map.map[this.x + sx][this.y + sy].value++
                this.map.map[this.x + sx][this.y + sy].update()

            }
        }
    }

    on_left_click() {
        if (this.flag) {
            window.GM.mines++
            this.flag = false
            this.question = true
            this.update()
        }
        else if (this.question) {
            this.flag = false
            this.question = false
            this.update()
        }
        else if (window.GM.mines > 0) {
            window.GM.mines--
            this.flag = true
            this.question = false
            this.update()
        }
    }

    getElement(parent) {
        let e = document.createElement("div")
        e.classList.add("tile")

        e.onclick = () => { this.on_click() }
        e.oncontextmenu = (event) => { event.preventDefault(); this.on_left_click() }

        parent.appendChild(e)
        return e
    }


    reset_class() {
        this.elementHTML.classList.remove("mine")
        this.elementHTML.classList.remove("flag")
        this.elementHTML.classList.remove("question")
        this.elementHTML.classList.remove("showed")
    }

    update() {
        const COLORS = ["blue", "green", "red", "darkslateblue", "yellow", "orange", "pink", "magenta"]

        this.reset_class()
        if (this.mine) {
            this.elementHTML.classList.add("mine")
        }
        if (this.flag) {
            this.elementHTML.classList.add("flag")
        }
        if (this.question) {
            this.elementHTML.classList.add("question")
        }
        if (this.showed) {
            this.elementHTML.classList.add("showed")
        }
        if (this.value != 0 && this.showed) {
            this.elementHTML.innerText = this.value
            this.elementHTML.style.color = COLORS[this.value - 1]
        }
        //this.elementHTML.innerText = `${this.value} (${this.x}:${this.y})`
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    window.GM = new GameManager(20, 15, 50)
});