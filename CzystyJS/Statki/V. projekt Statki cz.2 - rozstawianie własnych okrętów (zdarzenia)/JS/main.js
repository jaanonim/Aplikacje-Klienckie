/* 
    Type:

    0 - empty
    1 - taken
    2 - ship

*/

/*
    Highlight:

    -1 - highlight bad pos
    0 - no highlight
    1 - highlight good pos

*/

/*

    Rotacja:
    
    true - poziomo (x)
    false - pionowo (y)

 */


class Map {
    constructor(size_x, size_y) {
        this.size_x = size_x
        this.size_y = size_y
        this.plansza = []
        for (let x = 0; x < size_x; x++) {
            this.plansza[x] = []
            for (let y = 0; y < size_y; y++) {
                this.plansza[x][y] = new Tile(x, y, this)
            }
        }
    }

    random_pos() {
        return {
            x: Math.floor(Math.random() * (this.size_x)),
            y: Math.floor(Math.random() * (this.size_y))
        }
    }

    generate_map() {
        for (let i = 0; i < ShipList.ship_list.length; i++) {
            this.spawn_ship(ShipList.ship_list[i])
        }
        ShipList.ship_list = []
        ShipList.selected_id = -1
        ShipList.update()
    }

    spawn_ship(size) {
        console.log(size)
        let statek
        do {
            let pos = this.random_pos()
            statek = new Ship(pos.x, pos.y, size, Math.random() > 0.5, this)
        }
        while (!statek.is_valid())

        statek.pleace()
    }
}

class Tile {
    constructor(x, y, map) {

        this.x = x
        this.y = y
        this.type = 0
        this.highlight = 0
        this.map = map
        this.create_element()
    }

    create_element() {
        this.html_element = document.createElement("DIV")
        this.html_element.classList.add("element")
        this.update()
        document.querySelector("main").appendChild(this.html_element)

        let t = this

        this.html_element.onmouseenter = function () {
            if (ShipList.ship_len > -1) {
                let statek = new Ship(t.x, t.y, ShipList.ship_len, ShipList.rotation, t.map)
                statek.set_highlight(statek.is_valid() ? 1 : -1)
            }
        }
        this.html_element.onmouseleave = function () {
            if (ShipList.ship_len > -1) {
                new Ship(t.x, t.y, ShipList.ship_len, ShipList.rotation, t.map).set_highlight(0)
            }
        }
        this.html_element.oncontextmenu = function (event) {
            event.preventDefault()
            if (ShipList.ship_len > -1) {
                new Ship(t.x, t.y, ShipList.ship_len, ShipList.rotation, t.map).set_highlight(0)
            }
            ShipList.rotation = !ShipList.rotation
            if (ShipList.ship_len > -1) {
                let statek = new Ship(t.x, t.y, ShipList.ship_len, ShipList.rotation, t.map)
                statek.set_highlight(statek.is_valid() ? 1 : -1)
            }
        }
        this.html_element.onclick = function () {
            if (ShipList.ship_len > -1) {
                let statek = new Ship(t.x, t.y, ShipList.ship_len, ShipList.rotation, t.map)
                if (statek.is_valid()) {
                    statek.pleace()
                    statek.set_highlight(0)

                    ShipList.ship_pleaced()
                }
            }
        }

    }

    _onmouseleave() {
        if (ShipList.ship_len > -1) {
            new Ship(t.x, t.y, ShipList.ship_len, ShipList.rotation, t.map).set_highlight(0)
        }
    }

    update() {
        this._reset_classes()

        if (this.highlight === 1) {
            this.html_element.classList.add("gost_ok")
        } else if (this.highlight === -1) {
            this.html_element.classList.add("gost_nope")
        } else if (this.type === 2) {
            this.html_element.classList.add("statek")
        }

        this.html_element.innerText = this.type + " (" + this.x + "," + this.y + ")"
    }

    _reset_classes() {
        this.html_element.classList.remove("gost_ok")
        this.html_element.classList.remove("gost_nope")
        this.html_element.classList.remove("statek")
    }
}


class Ship {
    constructor(x, y, size, rotation, map) {
        this.x = x
        this.y = y
        this.size = size
        this.rotation = rotation
        this.map = map
        this.tiles = this.get_tiles()
    }

    get_tiles() {
        let tiles = []

        if (this.rotation) {
            let exeptet_x = this.map.size_x - this.size
            if (exeptet_x < this.x) {
                this.x = exeptet_x
            }

        } else {
            let exeptet_y = this.map.size_y - this.size
            if (exeptet_y < this.y) {
                this.y = exeptet_y
            }
        }

        for (let i = 0; i < this.size; i++) {
            if (this.rotation) {
                tiles.push(this.map.plansza[this.x + i][this.y])
            } else {
                tiles.push(this.map.plansza[this.x][this.y + i])

            }
        }

        return tiles

    }

    set_highlight(n) {
        for (let i = 0; i < this.tiles.length; i++) {
            const element = this.tiles[i];
            element.highlight = n
            element.update()
        }
    }

    is_valid_pos(x, y) {
        if (x >= 0 && x < this.map.size_x && y >= 0 && y < this.map.size_y) {
            return true
        }
        return false
    }

    is_valid() {
        let pq = this.get_p_q()

        for (let ys = -1; ys < pq[1]; ys++) {
            for (let xs = -1; xs < pq[0]; xs++) {
                if (!this.is_valid_pos(this.x + xs, this.y + ys)) {
                    continue
                }
                if (this.map.plansza[this.x + xs][this.y + ys].type > 1) {
                    return false
                }
            }
        }
        return true
    }

    pleace() {
        let pq = this.get_p_q()

        for (let ys = -1; ys < pq[1]; ys++) {
            for (let xs = -1; xs < pq[0]; xs++) {
                if (!this.is_valid_pos(this.x + xs, this.y + ys)) {
                    continue
                }
                let v = 2
                let tile = this.map.plansza[this.x + xs][this.y + ys]
                if (xs < 0 || ys < 0 || ys >= pq[1] - 1 || xs >= pq[0] - 1) {
                    v = 1
                }
                tile.type = v
                tile.update()
            }
        }
    }

    get_p_q() {
        let p = 2
        let q = this.size + 1

        if (this.rotation) {
            p = this.size + 1
            q = 2
        }

        return [p, q]
    }
}

class ShipList {

    static selected_id = 0
    static ship_list = []
    static rotation = true
    static get ship_len() {
        return ShipList.ship_list[ShipList.selected_id]
    }

    constructor(statki) {
        ShipList.ship_list = []
        for (let k = statki.length - 1; k >= 0; k--) {
            for (let j = 0; j < statki[k]; j++) {
                ShipList.ship_list.push(k + 1)
            }
        }
        ShipList.update()
    }

    static ship_pleaced() {
        ShipList.ship_list.splice(ShipList.selected_id, 1)
        ShipList.selected_id = -1
        ShipList.update()
    }

    static update() {
        let nav = document.querySelector("nav")
        nav.innerText = ''
        let t = this
        for (let i = 0; i < ShipList.ship_list.length; i++) {
            let element = document.createElement("DIV")
            element.classList.add("s-container")
            for (let k = 0; k < ShipList.ship_list[i]; k++) {
                let e = document.createElement("DIV")
                e.classList.add("element")
                if (i === ShipList.selected_id) {
                    e.classList.add("selected")
                }
                element.appendChild(e)
            }
            element.onmouseenter = function () {
                for (let i = 0; i < this.children.length; i++) {
                    this.children[i].classList.add("hover");
                }
            }
            element.onmouseleave = function () {
                for (let i = 0; i < this.children.length; i++) {
                    this.children[i].classList.remove("hover");
                }
            }
            element.onclick = function () {
                ShipList.selected_id = i
                t.update()
            }
            nav.appendChild(element)
        }
    }
}

new ShipList([4, 3, 2, 1])
new Map(10, 10) //.generate_map()