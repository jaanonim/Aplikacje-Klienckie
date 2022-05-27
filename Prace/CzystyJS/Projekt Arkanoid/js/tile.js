export default class Tile {
    constructor(x, y, wigth, height, slecected, ctx, img) {
        this.x = x;
        this.y = y;
        this.wigth = wigth;
        this.height = height;
        this.slecected = slecected;
        this.img = img;
        this.ctx = ctx;
    }

    draw() {
        this.ctx.drawImage(
            this.img.img,
            this.img.x,
            this.img.y,
            this.img.wigth,
            this.img.height,
            this.x,
            this.y,
            this.wigth,
            this.height
        );
    }
}
