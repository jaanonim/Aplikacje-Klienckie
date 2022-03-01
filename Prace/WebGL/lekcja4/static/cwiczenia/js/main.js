import setup from './setup.js';
import Scene from './scens/scene.js';

const size = 10;

$(() => {
    const {
        scene,
        renderer,
        camera
    } = setup();

    let s = new Scene(scene);


    function render() {
        // CODE HERE
        s.update();

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    render();
})
