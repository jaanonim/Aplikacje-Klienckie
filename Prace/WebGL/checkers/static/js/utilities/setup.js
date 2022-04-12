export default function setup() {
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x333333);
    renderer.setSize(500, 500);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.getElementById("root").appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(60, 4 / 3, 0.1, 10000);

    camera.position.set(0, 20, 40);
    camera.lookAt(scene.position);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onWindowResize, false);
    onWindowResize();

    return {
        scene,
        renderer,
        camera,
    };
}
