import setup from './utilities/setup.js';
import Scene from './scens/scene.js';

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
        this.render();
    }

    render() {
        const delta = this.clock.getDelta()
        this.scene.children.forEach((ele) => { try { ele._update(delta) } catch (e) { } });

        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
    }

    static getState(name) {
        return GameManager.state[name]
    }

    static setState(name, value) {
        GameManager.state[name] = value
    }
}