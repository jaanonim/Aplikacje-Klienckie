import setup from './setup.js';

$(() => {
    const {
        scene,
        renderer,
        camera
    } = setup();

    // CODE HERE

    function render() {

        // CODE HERE

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    render();
})
