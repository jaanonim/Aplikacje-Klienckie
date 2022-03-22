const express = require("express")
const router = express.Router();

var PLAYERS = []

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
    res.send({ message: "Player added to game", sucess: true })
})

router.get("/players", (req, res) => {
    res.send({ sucess: true, players: PLAYERS })
})

module.exports = router