import Board from "./board.js";
import Panel from "./panel.js";

class Manager {
    constructor() {
        this.panel = new Panel(document.getElementById("panel"), {
            width: 8,
            height: 4,
        });
        this.board = new Board(document.getElementById("board"));
    }
}

new Manager();
