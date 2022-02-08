export default function setup() {
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x333333);
    renderer.setSize(500, 500);

    $("#root").append(renderer.domElement);

    const axes = new THREE.AxesHelper(1000)
    scene.add(axes)

    const camera = new THREE.PerspectiveCamera(
        45,
        4 / 3,
        0.1,
        10000
    );

    camera.position.set(100, 100, 100)
    camera.lookAt(scene.position);

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }
    window.addEventListener('resize', onWindowResize, false);
    onWindowResize();

    return {
        scene,
        renderer,
        camera
    }
}
