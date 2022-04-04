import Mesh from "../utilities/mesh.js";

export default class Field extends Mesh {
    constructor(x, y,size, color) {
        const texture = new THREE.TextureLoader().load("/img/wood.jpeg");
        const geometry = new THREE.BoxGeometry(5, 1, 5);
        const material = new THREE.MeshBasicMaterial({
            color: color,
            side: THREE.DoubleSide,
            map: texture,
        })
        super(geometry, material);
        this.position.setX(x*size);
        this.position.setZ(y*size);
        this.boardPos={x:x,y:y};
    }

}