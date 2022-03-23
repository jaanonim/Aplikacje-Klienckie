export default class Cube {

    constructor(x, y, z) {
        const texture = new THREE.TextureLoader().load("img/textura.png");
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0x000000,
            shininess: 10,
            side: THREE.DoubleSide,
            map: texture,
        })
        this.obj = new THREE.Mesh(this.geometry, this.material);
        this.obj.position.set(x, y, z);

        this.obj.receiveShadow = true;
        this.obj.castShadow = true;
    }

    getObj() {
        return this.obj;
    }

    update() {
        this.obj.rotateY(0.01);
    }
}
