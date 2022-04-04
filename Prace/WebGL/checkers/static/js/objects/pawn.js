import Mesh from "../utilities/mesh.js";

export default class Pawn extends Mesh {
    constructor(x, y,size,color, isYours) {

        const texture = new THREE.TextureLoader().load("/img/wood.jpeg");
        const geometry = new THREE.CylinderGeometry(2, 2, 1, 20)
        const material = new THREE.MeshBasicMaterial({
            color: color,
            side: THREE.DoubleSide,
            map: texture,
        })
        super(geometry, material);
        this.color = color;
        this.isYours = isYours;

        this.position.setY(1);

        this.position.setX(x*size);
        this.position.setZ(y*size);
        this.boardPos={x:x,y:y};

    }

    onClick() {
        this.material.color.setHex(0xff0000);
    }

    unClick() {
        this.material.color.setHex(this.color);
    }

}