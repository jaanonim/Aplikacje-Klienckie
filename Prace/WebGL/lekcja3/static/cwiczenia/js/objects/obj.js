import Ligth from '../objects/light.js';
import Sphere from '../objects/sphere.js';

export default class Obj {

    constructor() {
        this.objcts = [];
        this.obj = new THREE.Object3D();
        this.obj.position.set(0, 0, 0);
        this.center = new THREE.Object3D()
        this.center.position.set(0, 0, 0)
        this.start();
    }

    addObject(obj) {
        this.obj.add(obj.getObj());
        this.objcts.push(obj);
    }

    start() {
        this.light = new Ligth(0, 10, 0);
        this.sphere = new Sphere(5, 0, 0);
        this.addObject(this.light);
        this.addObject(this.sphere);
    }


    getObj() {
        return this.obj;
    }

    update() {
        this.objcts.forEach(obj => {
            obj.update();
        });
        $("#range3").on("input", () => {
            this.obj.rotation.set(0, ($("#range3").val() / 25) * Math.PI / 2, 0);
        })
        $("#checkbox").on("change", () => {
            if ($("#checkbox").is(":checked")) {
                this.light.getObj().target = this.sphere.getObj();
            } else {
                this.light.getObj().target = this.center;
            }
        })

    }
}
