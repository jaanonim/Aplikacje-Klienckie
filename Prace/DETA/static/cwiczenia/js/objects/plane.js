export default class Cube {

    constructor() {
        const texture = new THREE.TextureLoader().load("img/textura.png");
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(50, 50);

        this.geometry = new THREE.PlaneGeometry(50, 50);
        this.material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0x111111,
            shininess: 10,
            side: THREE.DoubleSide,
            map: texture,
        })
        this.obj = new THREE.Mesh(this.geometry, this.material);
        this.obj.position.set(0, -0.5, 0);
        this.obj.rotation.x = -Math.PI / 2;
        this.obj.receiveShadow = true;
    }

    getObj() {
        return this.obj;
    }

    update() {}
}
