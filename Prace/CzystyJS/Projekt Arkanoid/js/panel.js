import Tile from "./tile.js";

export default class Panel {
    constructor(html, size, config, onSelect) {
        this.html = html;
        this.size = size;
        this.outline = config.outline;
        this.border = config.border;
        this.scale = config.scale;
        this.onSelect = onSelect;
        this.paletData = config.paletData;

        this.setupImg();
    }

    async setupImg() {
        this.palet = await this.getImg("/arkanoid.png");
        this.afterLoad();
    }

    afterLoad() {
        this.generateTiles();
        this.html.addEventListener("mousemove", this.mouse.bind(this));
        this.html.addEventListener("click", this.click.bind(this));
    }

    mouse(e) {
        for (let i = 0; i < this.tiles.length; i++) {
            let tile = this.tiles[i];
            if (
                tile.x < e.offsetX &&
                e.offsetX < tile.x + tile.wigth &&
                tile.y < e.offsetY &&
                e.offsetY < tile.y + tile.height
            ) {
                tile.higthligth();
            } else {
                tile.unhigthligth();
            }
        }
    }

    click(e) {
        for (let i = 0; i < this.tiles.length; i++) {
            let tile = this.tiles[i];
            if (
                tile.x < e.offsetX &&
                e.offsetX < tile.x + tile.wigth &&
                tile.y < e.offsetY &&
                e.offsetY < tile.y + tile.height
            ) {
                this.onSelect(tile);
            }
        }
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

        this.html.width =
            countX * this.size.width * this.scale + (countX + 1) * this.border;
        this.html.height =
            countY * this.size.height * this.scale + (countY + 1) * this.border;

        this.ctx = this.html.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;

        this.tiles = [];
        for (let y = 0; y < countY; y++) {
            for (let x = 0; x < countX; x++) {
                let tile = new Tile(
                    x * this.size.width * this.scale + (x + 1) * this.border,
                    y * this.size.height * this.scale + (y + 1) * this.border,
                    this.size.width * this.scale,
                    this.size.height * this.scale,
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
                    },
                    this.outline
                );
                tile.draw();
                this.tiles.push(tile);
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
