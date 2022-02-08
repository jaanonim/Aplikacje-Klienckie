import setup from './setup.js';

const size = 10;

$(() => {
    const {
        scene,
        renderer,
        camera
    } = setup();

    genarate(scene, [
        [-1, 0, -1],
        [-1, 0, 0],
        [-1, 0, 1],
        [-1, 0, 2],
        [0, 0, -1],
        [0, 0, 2],
        [1, 0, -1],
        [1, 0, 2],
        [2, 0, -1],
        [2, 0, 0],
        [2, 0, 1],
        [2, 0, 2],
        [-1, 1, -1],
        [-1, 2, -1],
        [-1, 3, -1],
        [0, 1, -1],
        [0, 2, -1],
        [-1, 1, 0],
        [-1, 2, 0],
        [1, 1, -1],
        [-1, 1, 1],
    ]);

    let rotation = 0
    let selcted = null;

    // get key
    $(document).keydown(function (e) {
        if (selcted == null) {
            if (e.keyCode == 37) {
                rotation -= .2;
            }
            if (e.keyCode == 38) {
                camera.position.y += 5;
            }
            if (e.keyCode == 39) {
                rotation += .2;
            }
            if (e.keyCode == 40) {
                camera.position.y -= 5;
            }
        } else {
            if (e.keyCode == 37) {
                selcted.position.x -= size;
            }
            if (e.keyCode == 38) {
                selcted.position.y += size;
            }
            if (e.keyCode == 39) {
                selcted.position.x += size;
            }
            if (e.keyCode == 40) {
                selcted.position.y -= size;
            }
            if (e.keyCode == 90) {
                selcted.position.z += size;
            }
            if (e.keyCode == 88) {
                selcted.position.z -= size;
            }
            if (e.keyCode == 27) {
                selcted = null;
            }
        }
    })

    // on mouse clik
    $(document).click(function (e) {
        const raycaster = new THREE.Raycaster();
        const mouseVector = new THREE.Vector2();
        mouseVector.x = (e.clientX / $(window).width()) * 2 - 1;
        mouseVector.y = -(e.clientY / $(window).height()) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        for (let i = 0; i < intersects.length; i++) {
            if (intersects[i].object.type == 'Mesh') {
                selcted = intersects[i].object;
                break;
            }

        }
    })



    let a = 0;

    const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
        color: 0xffffff,
    })
    const geometry = new THREE.BoxGeometry(size * 1.1, size * 1.1, size * 1.1);
    let higthligth = new THREE.Mesh(
        geometry, material
    );

    function render() {
        a++;
        // CODE HERE

        camera.position.z = 200 * Math.cos(rotation);
        camera.position.x = 200 * Math.sin(rotation);
        camera.lookAt(scene.position)

        if (selcted != null) {
            scene.add(higthligth);
            higthligth.position.set(selcted.position.x, selcted.position.y, selcted.position.z);
        } else {
            scene.remove(higthligth);
        }

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    render();
})

function genarate(scene, posTable) {
    const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: new THREE.TextureLoader().load('img/textura.png')
    })
    const geometry = new THREE.BoxGeometry(size, size, size);
    let obj = []
    for (let i = 0; i < posTable.length; i++) {
        let cube = new THREE.Mesh(
            geometry, material
        );
        cube.position.set(posTable[i][0] * size, posTable[i][1] * size, posTable[i][2] * size);
        scene.add(cube);
        obj.push(cube);
    }
    return obj;

}
