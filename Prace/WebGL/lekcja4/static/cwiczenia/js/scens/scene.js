import Mesh from '../objects/mesh.js';
import Plane from '../objects/plane.js';


export default class Scene {
    constructor(scene) {
        this.clock = new THREE.Clock();
        this.scene = scene;
        this.objcts = [];
        this.start();
    }

    addObject(obj) {
        if (obj.getObj() == null) {
            setTimeout(() => {
                this.addObject(obj)
            }, 100)
        }
        else {
            this.scene.add(obj.getObj());
            this.objcts.push(obj);
        }
    }

    start() {
        this.addObject(new Plane(0, -10, 0));
        this.addObject(new Mesh(0, 0, 0));
    }

    update() {
        const delta = this.clock.getDelta()
        this.objcts.forEach(obj => {
            obj.update(delta);
        });
    }
}
