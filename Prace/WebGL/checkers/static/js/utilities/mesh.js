
export default class Mesh extends THREE.Mesh {
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