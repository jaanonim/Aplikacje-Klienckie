export default class Light {

    constructor(x, y, z) {
        this.obj = new THREE.SpotLight(0xffffff, 4, 50, Math.PI / 8, 0.3, 1.25);
        this.obj.position.set(x, y, z);
        this.obj.castShadow = true;
        this.obj.shadow.mapSize.width = 1024;
        this.obj.shadow.mapSize.height = 1024;
        this.obj.shadow.camera.near = 0.5;
        this.obj.shadow.camera.far = 1000;
    }

    getObj() {
        return this.obj;
    }

    update() {
        $("#range").on("input", () => {
            this.obj.intensity = $("#range").val() / 100;
        })
        $("#range2").on("input", () => {
            this.obj.position.setY($("#range2").val() / 10 + 1);
        })
    }

}
