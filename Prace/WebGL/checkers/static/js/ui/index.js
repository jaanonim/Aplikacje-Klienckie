import Popup from "./popup.js";
import UiElement from "./uiElement.js"
import { join } from "../api.js"

export default class UiControler {
    constructor() {
        this.joinScreen = new JoinScreen()
        this.popup = new Popup()
        this.joinScreen.show()
    }
}

class JoinScreen extends UiElement {
    constructor() {
        super("join");
        this.nickHtml = this.getElementById("nick");
        this.joinHtml = this.getElementById("btn-join");
        this.resetHtml = this.getElementById("btn-reset");

        this.joinHtml.onclick = () => {
            if (this.nickHtml.value != "") {
                join(this.nickHtml.value).then((data) => {
                    Popup.show(data.message);
                    this.hide();
                })
            }
            else {
                Popup.show("Podaj nick!");
            }
        }
    }

}