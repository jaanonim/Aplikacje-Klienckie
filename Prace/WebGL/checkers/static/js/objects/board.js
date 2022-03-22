import Object from '../utilities/object.js';
import Field from './field.js';
import Pawn from '../objects/pawn.js'
import GameManager from '../game.js';


export default class Scene extends Object {
    constructor() {
        super()
    }

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


        const FIELD_SIZE = 5
        for (let x = 0; x < MAP.length; x++) {
            for (let y = 0; y < MAP[x].length; y++) {
                if (MAP[x][y]) {
                    this.add(new Field(x * FIELD_SIZE, y * FIELD_SIZE, 0x666666));
                }
                else {
                    this.add(new Field(x * FIELD_SIZE, y * FIELD_SIZE, 0xffffff));
                }
            }
        }

        this.position.setX(-FIELD_SIZE * (MAP.length - 1) / 2);
        this.position.setZ(-FIELD_SIZE * (MAP[0].length - 1) / 2);
        this.hasPawns = false;
    }

    generatePawns(c1, c2) {
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

        for (let x = 0; x < PAWNS.length; x++) {
            for (let y = 0; y < PAWNS[x].length; y++) {
                if (PAWNS[x][y] == -1) {
                    this.add(new Pawn(y * FIELD_SIZE, x * FIELD_SIZE, c1));
                }
                else if (PAWNS[x][y] == 1) {
                    this.add(new Pawn(y * FIELD_SIZE, x * FIELD_SIZE, c2));

                }
            }
        }
        this.hasPawns = true;

    }

    update() {
        C1 = 0xdddddd
        C2 = 0x444444
        const color = GameManager.getState("color")
        console.log(color)
        if (color !== undefined && !this.hasPawns) {
            if (color) {
                this.generatePawns(C1, C2)
            }
            else {
                this.generatePawns(C2, C1)
            }
        }

    }
}
