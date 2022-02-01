class Form {
    constructor() {
        this.GM = undefined
        CookieControler.prologate()

        this.i_heigth = document.getElementById("i_heigth")
        this.i_wigth = document.getElementById("i_wigth")
        this.i_min = document.getElementById("i_min")
        this.i_nick = document.getElementById("i_nick")
        this.button = document.getElementById("gen")

        this.button.onclick = () => {
            this.click()
        }
    }

    click() {

        this.min = parseInt(this.i_min.value)
        this.nick = this.i_nick.value
        this.heigth = parseInt(this.i_heigth.value)
        this.wigth = parseInt(this.i_wigth.value)

        if (Number.isNaN(this.min) || Number.isNaN(this.heigth) || Number.isNaN(this.wigth)) {
            alert("Niepoprawne dane0")
            return
        }
        if (this.heigth < 3 || this.wigth < 3 || this.min < 1) {
            alert("Niepoprawne dane1")
            return
        }
        if (this.heigth * this.wigth <= this.min) {
            alert("Niepoprawne dane2")
            return
        }
        if (this.nick.length < 1) {
            alert("Niepoprawne dane3")
            return
        }


        if (this.GM !== undefined) {
            this.GM.del()
            delete this.GM
        }
        if (this.LB !== undefined) {
            this.LB.del()
            delete this.LB
        }

        this.LB = new Liderbord(`${this.heigth}x${this.wigth}m${this.min}`)
        this.GM = new GameManager(this.heigth, this.wigth, this.min, this.nick, this.LB)

    }
}


class GameManager {
    constructor(size_x, size_y, mines, nick, LB) {
        document.documentElement.style.setProperty('--y_size', size_x);
        document.documentElement.style.setProperty('--x_size', size_y);
        this.LB = LB
        this.nick = nick
        this.mines = mines
        this.map = new Map(size_x, size_y, document.getElementById("board"), this)
        this.counter = new Counter(this.mines)
        this.timer = new Timer()
    }

    del() {
        window.clearInterval(this.timer.interval)
        delete this.map
        delete this.counter
        delete this.timer
    }

    setRecord() {
        this.LB.setRecord(this.nick, this.timer.value)
    }
}

// pat_start pat_end

class Map {
    constructor(size_x, size_y, boardHTML, GM, setRecord) {
        this.GM = GM
        this.size_x = size_x
        this.size_y = size_y
        this.map = []
        this.mines_obj = []
        this.freez = false
        this.first = true

        boardHTML.innerText = ""
        for (let x = 0; x < this.size_x; x++) {
            this.map[x] = []
            for (let y = 0; y < this.size_y; y++) {
                this.map[x][y] = new Tile(x, y, boardHTML, this, this.GM)
            }
        }
    }

    is_win() {
        for (let x = 0; x < this.size_x; x++) {
            for (let y = 0; y < this.size_y; y++) {
                if (!((this.map[x][y].mine && this.map[x][y].flag) || this.map[x][y].showed)) {
                    return false
                }
            }
        }
        return true
    }

    win() {
        if (this.is_win()) {
            this.freez = true
            this.GM.timer.stop()
            this.GM.setRecord()
            window.setTimeout(() => {
                alert("Wygrana")
            }, 100)
        }
    }

    lose(t) {

        this.mines_obj.forEach((item) => {
            if (item === t) {
                item.status = 2
            } else {
                item.status = 1
            }
            item.update()
        })
        this.freez = true
        this.GM.timer.stop()
        window.setTimeout(() => {
            alert("Przegrana")
        }, 100)

    }

    pleace_mines(count, obj) {
        let list = []
        let mines = []
        for (let x = 0; x < this.size_x; x++) {
            for (let y = 0; y < this.size_y; y++) {
                if (this.map[x][y] != obj)
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
        mines.forEach((e) => {
            e.update_value()
        })
        this.mines_obj = mines
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
    constructor(x, y, parent, map, GM) {
        this.GM = GM
        this.x = x
        this.y = y
        this.map = map
        this.showed = false
        this.value = 0
        this.mine = false
        this.flag = false
        this.question = false
        this.status = 0
        this.elementHTML = this.getElement(parent)
    }

    on_click() {
        if (this.map.first) {
            this.map.first = false
            this.GM.timer.start()
            this.map.pleace_mines(this.GM.mines)
        }
        if (this.showed || this.flag || this.question || this.map.freez) {
            return
        }
        if (this.mine) {
            this.map.lose(this)
            return
        }
        this.reveal()
        this.map.win()
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
        if (this.map.freez) return
        if (this.flag) {
            this.GM.mines++
            this.GM.counter.set(this.GM.mines)
            this.flag = false
            this.question = true
            this.update()
        } else if (this.question) {
            this.flag = false
            this.question = false
            this.update()
        } else if (this.GM.mines > 0) {
            this.GM.mines--
            this.GM.counter.set(this.GM.mines)
            this.flag = true
            this.question = false
            this.update()
            this.map.win()
        }
    }

    getElement(parent) {
        let e = document.createElement("div")
        e.classList.add("tile")

        e.onclick = () => {
            this.on_click()
        }
        e.oncontextmenu = (event) => {
            event.preventDefault();
            this.on_left_click()
        }

        parent.appendChild(e)
        return e
    }


    reset_class() {
        this.elementHTML.classList.remove("mine")
        this.elementHTML.classList.remove("flag")
        this.elementHTML.classList.remove("question")
        this.elementHTML.classList.remove("showed")
        this.elementHTML.classList.remove("mine_this")
    }

    update() {
        const COLORS = ["blue", "green", "red", "darkslateblue", "yellow", "orange", "pink", "magenta"]

        this.reset_class()
        if (this.mine) {
            if (this.status == 1) {
                this.elementHTML.classList.add("mine")
                return
            } else if (this.status == 2) {
                this.elementHTML.classList.add("mine_this")
                return
            }
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

class Counter {
    constructor(count) {
        this.count = count
        this.elementHTML = document.getElementById("counter")
        this.update()
    }

    update() {
        this.elementHTML.innerText = this.count
    }

    set(num) {
        this.count = num
        this.update()
    }
}

class Timer {
    constructor() {
        this.start_time = null
        this.value = 0
        this.elementHTML = document.getElementById("timer")
        this.update()
        this.interval = window.setInterval(() => {
            this.update()
        }, 500)
    }

    start() {
        this.start_time = Date.now()
    }
    stop() {
        this.start_time = null
    }

    update() {
        if (this.start_time !== null) {
            this.value = Date.now() - this.start_time
        }
        this.elementHTML.innerText = Math.round(this.value / 1000)

    }
}

class Liderbord {
    constructor(title) {
        this.title = title
        this.elementHTML = document.getElementById("liderbord")
        this.update()
    }

    setRecord(nick, time) {
        let records = CookieControler.getCookie(this.title)
        if (records === null) {
            records = []
            records.push({
                nick: nick,
                time: time
            })
            CookieControler.setCookie(this.title, records)
            this.update()
            return
        }

        let found = false
        for (let i = 0; i < records.length; i++) {
            if (records[i].nick === nick) {
                if (records[i].time > time) {
                    records[i].time = time
                }
                found = true
                break
            }
        }
        if (!found) {
            records.push({
                nick: nick,
                time: time
            })
        }

        records.sort((a, b) => {
            return a.time - b.time
        })
        if (records.length > 10) {
            records.pop()
        }
        CookieControler.setCookie(this.title, records)
        this.update()
    }


    update() {
        this.clear()
        this.setTitle("Liderbord for " + this.title)
        this.setTable(CookieControler.getCookie(this.title))
    }

    setTable(list) {
        if (list == null) return
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            this.add(element.nick, element.time)
        }
    }

    setTitle(title) {
        let e = document.createElement("h3")
        e.innerText = title
        this.elementHTML.appendChild(e)
    }

    add(name, time) {
        let e = document.createElement("div")
        e.classList.add("record")
        e.innerText = `${name} - ${time/1000}s`
        this.elementHTML.appendChild(e)
    }

    clear() {
        this.elementHTML.innerHTML = ""
    }

    del() {
        this.clear()
    }

}

class CookieControler {
    static setCookie(cname, data) {
        document.cookie = cname + "=" + JSON.stringify(data) + ";" + this.getExpiration() + ";path=/";
    }

    static getExpiration() {
        const d = new Date();
        d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
        return "expires=" + d.toUTCString();
    }

    static prologate() {
        let list = this.getAllCookies()
        for (let i = 0; i < list.length; i++) {
            this.setCookie(list[i].cname, list[i].value)
        }
    }

    static getAllCookies() {
        let list = []
        if (document.cookie.length == 0) {
            return list
        }
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            let v = c.split("=")
            list.push({
                cname: v[0],
                value: JSON.parse(v[1])
            })
        }
        return list
    }

    static getCookie(cname) {
        let cookies = this.getAllCookies()
        for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].cname === cname) {
                return cookies[i].value
            }

        }
        return null;
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    window.F = new Form()
});
