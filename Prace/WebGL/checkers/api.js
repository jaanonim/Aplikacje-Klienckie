const express = require("express")
const router = express.Router();

var PLAYERS = []
var MAP = null
var SIZE = 8;
var PLAYER_ID = 1;
var nextPlayer = () => {
    PLAYER_ID = PLAYER_ID === 1 ? 0 : 1
}

class Map {
    constructor() {
        this.pawns = []
        this.generateMap();
    }

    generateMap() {
        const PAWNS = [
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, -1, 0, -1, 0, -1, 0, -1],
            [-1, 0, -1, 0, -1, 0, -1, 0],
        ]
        for (let x = 0; x < SIZE; x++) {
            for (let y = 0; y < SIZE; y++) {
                if (PAWNS[x][y] == -1) {
                    this.pawns.push(new Pawn(x, y, this, PLAYERS[0].nick))
                }
                else if (PAWNS[x][y] == 1) {
                    this.pawns.push(new Pawn(x, y, this, PLAYERS[1].nick))
                }
            }
        }

    }

    getPawn(x, y) {
        let p = this.pawns.filter((ele) => ele.x === x || ele.y === y)
        if (p.length == 1) {
            return p[0];
        }
        return null;
    }

    move(fromX, fromY, toX, toY) {
        let pawn = this.getPawn(fromX, fromY)
        pawn.move(toX, toY);
    }

    checkMove(fromX, fromY, toX, toY, player) {
        let pawn = this.getPawn(fromX, fromY)
        if (pawn && pawn.player == player) {
            return pawn.checkMove(toX, toY);
        }
        return false;
    }

    toMap() {
        return {
            pawns: this.pawns.map((e) => e.toMap())
        }
    }
}

class Pawn {
    constructor(x, y, map, player) {
        this.x = x;
        this.y = y;
        this.map = map;
        this.player = player;
    }

    checkMove(x, y) {
        if (this.map.getPawn(x, y) != null) {
            return false;
        }
        if (!(x >= 0 && x < SIZE && y >= 0 && y < SIZE)) {
            return false;
        }
        return true;
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

    toMap() {
        return {
            x: this.x, y: this.y, player: this.player
        }
    }

}

class Player {
    constructor(nick, isWhite) {
        this.nick = nick
        this.isWhite = isWhite
    }

    static isPlayer(nick, tab) {
        for (let i = 0; i < tab.length; i++) {
            if (tab[i].nick == nick) {
                return true
            }
        }
        return false
    }
}


router.get("/", (req, res) => {
    res.send({ message: "Welcome to Checkers API", sucess: true })
})


router.post("/join", (req, res) => {
    const nick = req.body.nick;
    if (PLAYERS.length == 2) {
        res.send({ message: "Game is Full", sucess: false });
        return;
    }
    if (Player.isPlayer(nick, PLAYERS)) {
        res.send({ message: "This player is allredy in game", sucess: false });
        return;
    }
    PLAYERS.push(new Player(nick, PLAYERS.length == 1));
    if (PLAYERS.length == 2) MAP = new Map();
    res.send({ message: "Player added to game", sucess: true })
})

router.get("/players", (req, res) => {
    res.send({ sucess: true, players: PLAYERS })
})

router.get("/map", (req, res) => {
    res.send({ map: MAP.toMap(), sucess: true })
})

router.get("/who", (req, res) => {
    res.send({ player: PLAYERS[PLAYER_ID], sucess: true })
})

router.post("/move", (req, res) => {
    const from = req.body.from
    const to = req.body.to
    const nick = req.body.nick;
    if (MAP.checkMove(from.x, from.y, to.x, to.y, nick)) {
        res.send({ sucess: false })
        return;
    }

    MAP.move(from.x, from.y, to.x, to.y)
    nextPlayer();
    res.send({ sucess: true })

})

module.exports = router