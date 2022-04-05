import setup from './utilities/setup.js';
import Scene from './scens/scene.js';
import Board from './objects/board.js';
import Pawn from './objects/pawn.js'
import Field from './objects/field.js';
import { move, getMap } from './api.js'

export default class GameManager {
    static state = {};

    constructor() {
        const {
            scene,
            renderer,
            camera
        } = setup();
        this.scene = scene
        this.renderer = renderer
        this.camera = camera
        this.clock = new THREE.Clock();

        this.scene.add(new Scene(this.scene));

        document.onmousedown = (event) => {
            this.onClick(event)
        }

        this.render();
        this.selected = null;
        this.lastTurn = null;
    }

    onClick(event) {
        if (!GameManager.getState("isYourTurn")) return;
        const raycaster = new THREE.Raycaster();
        const mouseVector = new THREE.Vector2();
        mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouseVector, this.camera);
        const intersects = raycaster.intersectObjects(this.scene.children);
        if (intersects.length > 0) {
            if (intersects[0].object instanceof Pawn) {
                if (intersects[0].object.isYours) {
                    if (this.selected) {
                        this.selected.unClick();
                    }
                    this.selected = intersects[0].object;
                    this.selected.onClick();
                }
                else if (intersects[1].object instanceof Field) {
                    this.move(intersects[1].object);
                }
            }
            else if (intersects[0].object instanceof Field) {
                this.move(intersects[0].object);
            }
        }
    }

    async move(target) {
        if (!this.selected) return;
        this.selected.unClick();
        let res = await move(this.selected.boardPos, target.boardPos)
        if (res.sucess) {
            this.selected.move(target.boardPos);
        }
    }

    render() {
        const delta = this.clock.getDelta()
        this.scene.children.forEach((ele) => { try { ele._update(delta) } catch (e) { } });
        const color = GameManager.getState("color");
        if (color !== undefined && !color) {
            this.camera.position.setZ(-40);
            this.camera.lookAt(this.scene.position);
        }
        if (GameManager.getState("isYourTurn") !== this.lastTurn) {
            this.lastTurn = GameManager.getState("isYourTurn");
            setTimeout(async () => {
                let res = await getMap();
                if (res.sucess) {
                    this.getBoard().useMap(res.map);
                }
            }, 200)
        }

        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
    }

    static getState(name) {
        return GameManager.state[name]
    }

    static setState(name, value) {
        GameManager.state[name] = value
    }

    getBoard() {
        return this.scene.children.filter((ele) => ele instanceof Scene)[0].children.filter((ele) => ele instanceof Board)[0]
    }
}