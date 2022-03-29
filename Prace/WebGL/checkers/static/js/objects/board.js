import Object from '../utilities/object.js';
import Field from './field.js';
import Pawn from '../objects/pawn.js'
import GameManager from '../game.js';


export default class Board extends Object {
    constructor() {
        super()
    }

    static FIELD_SIZE = 5

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
                    this.add(new Field(x * Board.FIELD_SIZE, y * Board.FIELD_SIZE, 0x666666));
                }
                else {
                    this.add(new Field(x * Board.FIELD_SIZE, y * Board.FIELD_SIZE, 0xffffff));
                }
            }
        }

        this.position.setX(-Board.FIELD_SIZE * (MAP.length - 1) / 2);
        this.position.setZ(-Board.FIELD_SIZE * (MAP[0].length - 1) / 2);
        this.hasPawns = false;
    }

    async generatePawns(c1, c2) {
        this.hasPawns = true;

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

        for (let x = 0; x < SIZE; x++) {
            for (let y = 0; y < SIZE; y++) {
                if (PAWNS[x][y] == -1) {
                    this.add(new Pawn(y * Board.FIELD_SIZE, x * Board.FIELD_SIZE, c1));
                }
                else if (PAWNS[x][y] == 1) {
                    this.add(new Pawn(y * Board.FIELD_SIZE, x * Board.FIELD_SIZE, c2));
                }
            }
        }
    }

    update() {

        const C1 = 0xdddddd;
        const C2 = 0x444444;
        const color = GameManager.getState("color");
        if (color !== undefined && !this.hasPawns) {
            if (color) {
                this.generatePawns(C1, C2);
            }
            else {
                this.generatePawns(C2, C1);
            }
        }

    }
}
