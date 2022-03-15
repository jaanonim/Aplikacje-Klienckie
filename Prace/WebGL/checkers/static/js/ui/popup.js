export default class Popup {

    constructor() {
        Popup.html = document.getElementById("popup");
        Popup.hide();
    }


    static hide() {
        Popup.html.style.display = "none"
    }

    static show(text, time = 3000) {
        Popup.html.innerHTML = text
        Popup.html.style.display = "block"
        setTimeout(() => { Popup.hide() }, time)
    }

}