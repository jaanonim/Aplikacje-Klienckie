import Tile from "./tile.js";

export default class Panel {
    constructor(html, size) {
        this.html = html;
        this.size = size;
        this.border = 20;
        this.scale = 4;
        this.paletData = {
            border: { x: 2, y: 1 },
            startPos: { x: 3, y: 215 },
            endPos: { x: 50, y: 230 },
        };
        this.ctx = this.html.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.setupImg();
    }

    async setupImg() {
        this.palet = await this.getImg("/arkanoid.png");
        this.afterLoad();
    }

    afterLoad() {
        this.generateTiles();
    }

    generateTiles() {
        if (this.paletData.endPos.x === -1) {
            this.paletData.endPos.x = this.palet.width;
        }
        if (this.paletData.endPos.y === -1) {
            this.paletData.endPos.y = this.palet.height;
        }
        const sizeX = this.paletData.endPos.x - this.paletData.startPos.x;
        const sizeY = this.paletData.endPos.y - this.paletData.startPos.y;

        const countX = Math.floor(sizeX / this.size.width);
        const countY = Math.floor(sizeY / this.size.height);
        for (let y = 0; y < countY; y++) {
            for (let x = 0; x < countX; x++) {
                let tile = new Tile(
                    x * this.size.width * this.scale + (x + 1) * this.border,
                    y * this.size.height * this.scale + (y + 1) * this.border,
                    this.size.width * this.scale,
                    this.size.height * this.scale,
                    false,
                    this.ctx,
                    {
                        img: this.palet,
                        x:
                            this.paletData.startPos.x +
                            x * this.size.width +
                            (x + 1) * this.paletData.border.x,
                        y:
                            this.paletData.startPos.y +
                            y * this.size.height +
                            (y + 1) * this.paletData.border.y,
                        wigth: this.size.width,
                        height: this.size.height,
                    }
                );
                tile.draw();
                console.log(tile);
            }
        }
    }

    async getImg(src) {
        return new Promise((res, rej) => {
            let img = new Image();
            img.src = src;
            img.onload = function () {
                res(img);
            };
        });
    }
}
