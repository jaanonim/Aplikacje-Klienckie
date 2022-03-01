export default class Mesh {

    constructor(x, y, z) {
        const modelMaterial = new THREE.MeshBasicMaterial(
            {
                map: new THREE.TextureLoader().load("models/mario2.jpg"),
                morphTargets: true
            });
        const loader = new THREE.JSONLoader();
        loader.load('models/mario.json', (geometry) => {
            this.obj = new THREE.Mesh(geometry, modelMaterial)
            this.obj.name = "name";
            this.obj.rotation.y = 0; // ustaw obrót modelu
            this.obj.position.set(x, y, z)
            this.obj.scale.set(0.3, 0.3, 0.3); // ustaw skalę modelu

            this.mixer = new THREE.AnimationMixer(this.obj)
            this.mixer.clipAction(geometry.animations[1].name).play()
            this.anims = geometry.animations

        });
        this.timer = 0;
        this.Aid = 1;
    }

    getObj() {
        return this.obj;
    }

    update(delta) {
        this.obj.rotateY(delta);
        this.timer += delta;
        if (this.timer >= this.anims[this.Aid].duration * 2) {
            this.timer = 0;
            this.Aid++;
            if (this.Aid >= this.anims.length) {
                this.Aid = 0;
            }
            this.mixer.uncacheRoot(this.obj)
            this.mixer.clipAction(this.anims[this.Aid].name).play()

        }
        if (this.mixer) this.mixer.update(delta);
    }
}
