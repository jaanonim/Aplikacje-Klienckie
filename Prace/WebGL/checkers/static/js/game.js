import setup from './utilities/setup.js';
import Scene from './scens/scene.js';

export default class GameManager {
    constructor() {
        const {
            scene,
            renderer,
            camera
        } = setup();
        this.scene = scene
        this.renderer = renderer
        this.camera = camera

        this.main = new Scene(this.scene);
        this.render();
    }

    render() {
        this.main.update();

        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
    }

}