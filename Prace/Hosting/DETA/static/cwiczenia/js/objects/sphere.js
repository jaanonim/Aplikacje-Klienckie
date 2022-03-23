export default class Sphere {

    constructor(x, y, z) {
        this.geometry = new THREE.SphereGeometry(0.3, 5, 5);
        this.material = new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0xff0000,
        })
        this.obj = new THREE.Mesh(this.geometry, this.material);
        this.obj.position.set(x, y, z);
    }

    getObj() {
        return this.obj;
    }

    update() {
        this.obj.rotateY(0.05);
    }
}
