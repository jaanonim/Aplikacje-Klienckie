export default class Object extends THREE.Object3D {
    constructor(...args) {
        super(...args)
        if (this.start)
            this.start()
    }

    _update(delta) {
        this.children.forEach((ele) => { try { ele._update(delta) } catch (e) { } });
        if (this.update)
            this.update(delta);
    }
}