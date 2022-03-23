import Cube from '../objects/cube.js';
import Plane from '../objects/plane.js';
import Obj from '../objects/obj.js';


export default class Scene {
    constructor(scene) {
        this.scene = scene;
        this.objcts = [];
        this.start();
    }

    addObject(obj) {
        this.scene.add(obj.getObj());
        this.objcts.push(obj);
    }

    start() {
        this.addObject(new Obj());
        this.addObject(new Cube(0, 0, 0));
        this.addObject(new Plane());
    }

    update() {
        this.objcts.forEach(obj => {
            obj.update();
        });
    }
}
