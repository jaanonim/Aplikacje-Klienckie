import Board from "./board.js";
import Panel from "./panel.js";

class Manager {
    constructor() {
        this.panel = new Panel(
            document.getElementById("panel"),
            {
                width: 8,
                height: 4,
            },
            {
                outline: 2,
                border: 6,
                scale: 4,
                paletData: {
                    border: { x: 2, y: 1 },
                    startPos: { x: 3, y: 215 },
                    endPos: { x: 50, y: 230 },
                },
            },
            this.onSelect.bind(this)
        );
        this.board = new Board(
            document.getElementById("board"),
            document.getElementById("overlay"),
            {
                width: 8,
                height: 4,
            },
            {
                width: 20,
                height: 10,
            },
            {
                outline: 2,
                border: 6,
                scale: 4,
                paletData: {
                    border: { x: 2, y: 1 },
                    startPos: { x: 3, y: 215 },
                    endPos: { x: 50, y: 230 },
                },
            }
        );
    }

    onSelect(tile) {
        this.board.setTiles(tile);
    }
}

window.manager = new Manager();
