export default class UiElement {
    constructor(id) {
        this.id = id;
        this.html = document.getElementById(id);
        this.hide();
    }

    show() {
        this.html.style.display = "block"
    }

    hide() {
        this.html.style.display = "none"
    }

    getElementById(id) {
        console.log(document.getElementById(`${this.id}-${id}`))
        return document.getElementById(`${this.id}-${id}`)
    }
}