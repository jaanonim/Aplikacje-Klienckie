import setup from './setup.js';

$(() => {
    const {
        scene,
        renderer,
        camera
    } = setup();

    let cam = new THREE.Object3D().add(camera)
    scene.add(cam)

    class Plain {
        constructor() {
            const texture = new THREE.TextureLoader().load("img/textura.png");
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(10, 10);
            const geometry = new THREE.PlaneGeometry(100, 100)
            const material = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                specular: 0xffffff,
                shininess: 1,
                side: THREE.DoubleSide,
                map: texture,
            })
            this.plain = new THREE.Mesh(geometry, material)
            this.plain.rotateX(Math.PI / 2)
        }

        get() {
            return this.plain
        }
    }

    class Ligth {
        constructor(target, rotation) {
            const x = 15, y = 10, z = 0;

            this.ligth = new THREE.SpotLight(0xffffff, 4, 50, Math.PI / 5, 0.3, 1.25);
            this.ligth.target = target;

            const geometry = new THREE.SphereGeometry(2, 2, 2)
            const material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true })
            this.obj = new THREE.Object3D()
            this.obj.add(new THREE.Mesh(geometry, material))
            this.obj.add(this.ligth)

            this.obj.position.setX(x);
            this.obj.position.setY(y);
            this.obj.position.setZ(z);

            this.container = new THREE.Object3D().add(this.obj).rotateY(rotation)


        }

        get() {
            return { obj: this.container, ligth: this.ligth, o: this.obj }
        }
    }

    class Cube {
        constructor(x, y, z) {
            const geometry = new THREE.BoxGeometry(10, 10, 10)
            const material = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
                map: new THREE.TextureLoader().load('img/textura.png'),
            })
            this.obj = new THREE.Mesh(geometry, material)
            this.obj.position.setX(x);
            this.obj.position.setY(y);
            this.obj.position.setZ(z);
        }

        get() {
            return this.obj
        }

        update() {
            this.obj.rotateY(0.05);
        }
    }

    const c = new Cube(0, 5, 0)
    const p = new Plain()
    scene.add(c.get())
    scene.add(p.get())

    let rotation = 0
    $("#add").on("click", () => {
        let l = new Ligth(c.get(), rotation);
        const { obj, ligth, o } = l.get();
        scene.add(obj)
        rotation += Math.PI / 3;

        const inputs = () => {
            let div = document.createElement("div");
            const COLORS = ["#fff", "#00f", "#f0f", "#f00", "#0ff"]
            const COLORS2 = [0xffffff, 0x0000ff, 0xff00ff, 0xff0000, 0x00ffff]
            for (let i = 0; i < 5; i++) {
                let color = document.createElement("div")
                color.classList.add("color")
                color.style.backgroundColor = COLORS[i]
                color.onclick = () => { ligth.color.set(COLORS2[i]) }
                div.appendChild(color)
            }
            let input = document.createElement("input")
            input.type = "range"
            input.oninput = () => { o.position.setY(input.value / 3) };
            div.appendChild(input)

            let input2 = document.createElement("input")
            input2.type = "range"
            input2.oninput = () => { o.position.setX(input2.value / 3) };
            div.appendChild(input2)

            document.getElementById("box").appendChild(div)
        }
        inputs();

    })


    function render() {

        c.update();
        cam.rotateY(-0.01);

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    render();
})
