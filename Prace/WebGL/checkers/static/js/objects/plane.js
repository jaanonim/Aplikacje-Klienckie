export default class Plane {

    constructor(x, y, z) {
        const texture = new THREE.TextureLoader().load("img/textura.png");
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(50, 50);

        this.geometry = new THREE.PlaneGeometry(50, 50);
        this.material = new THREE.MeshBasicMaterial({
            color: 0x565656,
        })

        this.obj = new THREE.Mesh(this.geometry, this.material);
        this.obj.position.set(x, y, z);
        this.obj.rotation.x = -Math.PI / 2;
        this.obj.receiveShadow = true;
    }

    getObj() {
        return this.obj;
    }

    update() { }
}
