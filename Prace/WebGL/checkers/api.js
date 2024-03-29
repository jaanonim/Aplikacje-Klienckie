const express = require("express");
const router = express.Router();

const TURN_TIME = 30; //in secends

var PLAYERS = [];
var MAP = null;
var SIZE = 8;
var PLAYER_ID = 1;
var TIME = 0;
var END = false;
var LAST_MOVE = null;
var nextPlayer = () => {
    PLAYER_ID = PLAYER_ID === 1 ? 0 : 1;
    TIME = Date.now();
};

class Map {
    constructor() {
        this.pawns = [];
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
        ];
        /*
        const PAWNS = [
            [0, 0, 0, 0, 0, 0, -1, 1],
            [0, 0, 0, -1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, -1, 0, -1, 0, 0, 0],
            [0, 0, 0, 2, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0],
            [0, -1, 0, -1, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, -2],
        ];
*/
        for (let x = 0; x < SIZE; x++) {
            for (let y = 0; y < SIZE; y++) {
                if (PAWNS[x][y] < 0) {
                    this.pawns.push(
                        new Pawn(
                            y,
                            x,
                            this,
                            PLAYERS[1].nick,
                            PAWNS[x][y] !== -1
                        )
                    );
                } else if (PAWNS[x][y] > 0) {
                    this.pawns.push(
                        new Pawn(y, x, this, PLAYERS[0].nick, PAWNS[x][y] !== 1)
                    );
                }
            }
        }
    }

    removePawn(pawn) {
        this.pawns.splice(this.pawns.indexOf(pawn), 1);
    }

    getPawn(x, y) {
        let p = this.pawns.filter((ele) => ele.x === x && ele.y === y);
        if (p.length == 1) {
            return p[0];
        }
        return null;
    }

    move(fromX, fromY, toX, toY) {
        let pawn = this.getPawn(fromX, fromY);
        return pawn.move(toX, toY);
    }

    checkMove(fromX, fromY, toX, toY, player) {
        let pawn = this.getPawn(fromX, fromY);
        if (pawn && pawn.player == player) {
            return pawn.checkMove(toX, toY);
        }
        return false;
    }

    toMap() {
        return {
            pawns: this.pawns.map((e) => e.toMap()),
        };
    }

    isWin() {
        const isP0 = this.pawns.some((v) => v.player === PLAYERS[0].nick);
        const isP1 = this.pawns.some((v) => v.player === PLAYERS[1].nick);
        if (isP0 && !isP1) {
            return 0;
        } else if (!isP0 && isP1) {
            return 1;
        }
        return null;
    }
}

class Pawn {
    static mask = [
        { x: 1, y: 1 },
        { x: -1, y: 1 },
        { x: -1, y: -1 },
        { x: 1, y: -1 },
    ];

    constructor(x, y, map, player, isQueen) {
        this.x = x;
        this.y = y;
        this.map = map;
        this.player = player;
        this.isQueen = isQueen;
    }

    checkMove(x, y) {
        if (this.x === x && this.y === y) {
            return false;
        }
        if (this.isQueen) {
            return this.chMoveQueen(x, y);
        }
        return this.chMovePawn(x, y);
    }

    chMoveQueen(x, y) {
        let dx = x - this.x;
        let dy = y - this.y;
        let move = {
            x: dx > 0 ? -1 : 1,
            y: dy > 0 ? -1 : 1,
        };
        if (Math.abs(dx) - Math.abs(dy) !== 0) return false;
        let step = 0;
        while (x !== this.x) {
            if (step !== 1) {
                if (this.map.getPawn(x, y)) return false;
            }
            x += move.x;
            y += move.y;
            step++;
        }
        return true;
    }

    chMovePawn(x, y) {
        if (PLAYERS.find((ele) => ele.nick === this.player).isWhite) {
            if (this.y < y) return false;
        } else {
            if (this.y > y) return false;
        }

        if (this.map.getPawn(x, y) != null) return false;
        if (!(x >= 0 && x < SIZE && y >= 0 && y < SIZE)) return false;
        if (Math.abs(this.x - x) == 2 || Math.abs(this.y - y) == 2) {
            let newX = this.x - (this.x - x) / 2;
            let newY = this.y - (this.y - y) / 2;

            const enemy = this.map.getPawn(newX, newY);
            if (enemy && enemy.player !== this.player) return true;
            else return false;
        }
        if (Math.abs(this.x - x) != 1 || Math.abs(this.y - y) != 1) {
            return false;
        }
        return true;
    }

    move(x, y) {
        let del = [];
        const from = { x: this.x, y: this.y };
        const to = { x, y };

        let dx = x - this.x;
        let dy = y - this.y;
        let move = {
            x: dx > 0 ? -1 : 1,
            y: dy > 0 ? -1 : 1,
        };
        if (Math.abs(dx) > 1) {
            let newX = x + move.x;
            let newY = y + move.y;

            const enemy = this.map.getPawn(newX, newY);
            if (enemy && enemy.player !== this.player) {
                MAP.removePawn(enemy);
                del.push({ x: enemy.x, y: enemy.y });
            }
        }

        this.x = x;
        this.y = y;

        let upgrade = [];
        if (!this.isQueen) {
            if (PLAYERS.find((ele) => ele.nick === this.player).isWhite) {
                if (this.y === 0) {
                    this.isQueen = true;
                    upgrade.push({ x: this.x, y: this.y });
                }
            } else {
                if (this.y === SIZE - 1) {
                    this.isQueen = true;
                    upgrade.push({ x: this.x, y: this.y });
                }
            }
        }
        return { del, move: [{ from, to }], upgrade };
    }

    toMap() {
        return {
            x: this.x,
            y: this.y,
            player: this.player,
            isQueen: this.isQueen,
        };
    }
}

class Player {
    constructor(nick, isWhite) {
        this.nick = nick;
        this.isWhite = isWhite;
    }

    static isPlayer(nick, tab) {
        for (let i = 0; i < tab.length; i++) {
            if (tab[i].nick == nick) {
                return true;
            }
        }
        return false;
    }
}

router.get("/", (req, res) => {
    res.send({ message: "Welcome to Checkers API", sucess: true });
});

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
    TIME = Date.now();
    res.send({ message: "Player added to game", sucess: true });
});

router.get("/players", (req, res) => {
    res.send({ sucess: true, players: PLAYERS });
});

router.get("/map", (req, res) => {
    if (MAP) res.send({ map: MAP.toMap(), sucess: true });
    else res.send({ sucess: false });
});

router.get("/lastMove", (req, res) => {
    if (LAST_MOVE != null) res.send({ lastMove: LAST_MOVE, sucess: true });
    else res.send({ lastMove: {}, sucess: false });
});

router.get("/who", (req, res) => {
    if (PLAYERS.length !== 2) {
        res.send({ sucess: false });
        return;
    }

    if (Date.now() - TIME > TURN_TIME * 1000) {
        END = true;
        nextPlayer();
    }
    if (!END) {
        const winner = MAP.isWin();
        if (winner !== null) {
            PLAYER_ID = winner;
            END = true;
        }
    }

    if (END) {
        res.send({
            end: true,
            player: PLAYERS[PLAYER_ID],
            sucess: true,
        });
    } else {
        res.send({
            end: false,
            player: PLAYERS[PLAYER_ID],
            time: parseInt(TURN_TIME - (Date.now() - TIME) / 1000),
            sucess: true,
        });
    }
});

router.post("/move", (req, res) => {
    console.log(req.body);
    const from = req.body.from;
    const to = req.body.to;
    const nick = req.body.nick;
    if (!MAP.checkMove(from.x, from.y, to.x, to.y, nick)) {
        res.send({ sucess: false });
        return;
    }

    LAST_MOVE = MAP.move(from.x, from.y, to.x, to.y);
    nextPlayer();
    res.send({ map: MAP.toMap(), sucess: true });
});

router.put("/reset", (req, res) => {
    PLAYERS = [];
    MAP = null;
    PLAYER_ID = 1;
    TIME = 0;
    END = false;
    LAST_MOVE = null;
    res.send({ sucess: true });
});

module.exports = router;
