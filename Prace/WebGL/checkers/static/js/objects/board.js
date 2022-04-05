import Object from '../utilities/object.js';
import Field from './field.js';
import Pawn from '../objects/pawn.js'
import GameManager from '../game.js';


export default class Board extends Object {
    constructor() {
        super()
    }

    static FIELD_SIZE = 5
    static C1 = 0xdddddd;
    static C2 = 0x444444;

    start() {
        const MAP = [
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
        ]


        for (let x = 0; x < MAP.length; x++) {
            for (let y = 0; y < MAP[x].length; y++) {
                if (MAP[x][y]) {
                    this.add(new Field(x, y, Board.FIELD_SIZE, 0x666666));
                }
                else {
                    this.add(new Field(x, y, Board.FIELD_SIZE, 0xffffff));
                }
            }
        }

        this.position.setX(-Board.FIELD_SIZE * (MAP.length - 1) / 2);
        this.position.setZ(-Board.FIELD_SIZE * (MAP[0].length - 1) / 2);
        this.pawns = null;
    }

    async generatePawns() {

        this.pawns = [];

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
        const SIZE = 8;

        const color = GameManager.getState("color");

        for (let x = 0; x < SIZE; x++) {
            for (let y = 0; y < SIZE; y++) {
                if (PAWNS[x][y] == -1) {
                    this.addPawn(new Pawn(y, x, Board.FIELD_SIZE, Board.C1, color))
                }
                else if (PAWNS[x][y] == 1) {
                    this.addPawn(new Pawn(y, x, Board.FIELD_SIZE, Board.C2, !color))
                }
            }
        }
    }

    addPawn(pawn) {
        this.add(pawn);
        this.pawns.push(pawn);
    }

    update() {
        const color = GameManager.getState("color");
        if (color !== undefined && this.pawns == null) {
            this.generatePawns();
        }
    }

    useMap(map) {
        let tab = [...this.pawns]
        this.pawns = []
        const color = GameManager.getState("color");
        for (var i = this.children.length - 1; i >= 0; i--) {
            if (this.children[i] instanceof Field) continue
            this.remove(this.children[i]);
        }
        map.pawns.forEach(element => {
            if (!tab.some((ele) => element.x === ele.boardPos.x && element.y === ele.boardPos.y)) {
                if (element.player === GameManager.getState("nick"))
                    this.addPawn(new Pawn(element.x, element.y, Board.FIELD_SIZE, color ? Board.C1 : Board.C2, true))
                else
                    this.addPawn(new Pawn(element.x, element.y, Board.FIELD_SIZE, color ? Board.C2 : Board.C1, false))
            }
            else
                this.addPawn(tab.filter((ele) => element.x === ele.boardPos.x && element.y === ele.boardPos.y)[0])
        });
    }
}
