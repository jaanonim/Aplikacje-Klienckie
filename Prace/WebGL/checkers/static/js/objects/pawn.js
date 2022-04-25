import Mesh from "../utilities/mesh.js";

export default class Pawn extends Mesh {
    constructor(x, y, size, color, isYours, isQueen) {
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
        this.isQueen = isQueen;

        if (isQueen) {
            this.scale.setY(3);
            this.position.setY(2);
        } else {
            this.position.setY(1);
        }

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
        this.boardPos = { x: pos.x, y: pos.y };
        new TWEEN.Tween(this.position)
            .to({ x: pos.x * this.size, z: pos.y * this.size }, 500)
            .easing(TWEEN.Easing.Bounce.Out)
            .start();
    }

    upgrade() {
        this.isQueen = true;
        setTimeout(() => {
            new TWEEN.Tween(this.scale)
                .to({ y: 3 }, 500)
                .easing(TWEEN.Easing.Bounce.Out)
                .start();
            new TWEEN.Tween(this.position)
                .to({ y: 2 }, 500)
                .easing(TWEEN.Easing.Bounce.Out)
                .start();
        }, 500);
    }
}
