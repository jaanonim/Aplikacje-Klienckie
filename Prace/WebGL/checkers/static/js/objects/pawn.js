import Mesh from "../utilities/mesh.js";

export default class Pawn extends Mesh {
    constructor(x, y, size, color, isYours) {
        const texture = new THREE.TextureLoader().load("/img/wood.jpeg");
        const geometry = new THREE.CylinderGeometry(2, 2, 1, 20);
        const material = new THREE.MeshBasicMaterial({
            color: color,
            side: THREE.DoubleSide,
            map: texture,
        });
        super(geometry, material);
        this.color = color;
        this.isYours = isYours;
        this.size = size;

        this.position.setY(1);

        this.position.setX(x * this.size);
        this.position.setZ(y * this.size);
        this.boardPos = { x: x, y: y };
    }

    onClick() {
        this.material.color.setHex(0xff0000);
    }

    unClick() {
        this.material.color.setHex(this.color);
    }

    move(pos) {
        let y = this.position.y;
        let half = {
            x: this.boardPos.x - (this.boardPos.x - pos.x) / 2,
            y: this.boardPos.y - (this.boardPos.y - pos.y) / 2,
        };
        this.boardPos = { x: pos.x, y: pos.y };
        new TWEEN.Tween(this.position)
            .to({ x: half.x * this.size, y: y + 2, z: half.y * this.size }, 500)
            .easing(TWEEN.Easing.Circular.In)
            .onComplete(() => {
                new TWEEN.Tween(this.position)
                    .to(
                        { x: pos.x * this.size, y: y, z: pos.y * this.size },
                        500
                    )
                    .easing(TWEEN.Easing.Circular.Out)
                    .start();
            })
            .start();
    }
}
