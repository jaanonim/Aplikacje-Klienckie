
import Board from '../objects/board.js'
import Object from '../utilities/object.js';


export default class Scene extends Object {
    constructor() {
        super()
    }

    start() {
        this.add(new Board());
    }
}
