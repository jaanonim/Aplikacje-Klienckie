import Popup from "./popup.js";
import UiElement from "./uiElement.js"
import { join, getPlayers } from "../api.js"
import GameManager from "../game.js";

export default class UiControler {
    constructor() {
        this.waitScreen = new WaitScreen()
        this.joinScreen = new JoinScreen(() => {
            this.waitScreen.show();
            this.waitScreen.check();
        })
        this.popup = new Popup()
        this.joinScreen.show()
    }
}

class JoinScreen extends UiElement {
    constructor(next) {
        super("join");
        this.nickHtml = this.getElementById("nick");
        this.joinHtml = this.getElementById("btn-join");
        this.resetHtml = this.getElementById("btn-reset");

        this.joinHtml.onclick = () => {
            if (this.nickHtml.value != "") {
                join(this.nickHtml.value).then((data) => {
                    if (data.sucess) {
                        GameManager.setState("nick", this.nickHtml.value)
                        this.hide();
                        next();
                    }
                    Popup.show(data.message);
                })
            }
            else {
                Popup.show("Podaj nick!");
            }
        }
    }

}

class WaitScreen extends UiElement {
    constructor() {
        super("wait");
    }

    check() {
        getPlayers().then((data) => {
            if (data.sucess) {
                if (data.players.length == 2) {
                    const player = data.players.filter((e) => GameManager.getState("nick") === e.nick)[0]
                    GameManager.setState("color", player.isWhite)
                    this.hide();
                    return;
                }
            }
            setTimeout(() => { this.check(); }, 500)
        })
    }
}