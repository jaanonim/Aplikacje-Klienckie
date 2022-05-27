import Tile from "./tile.js";

export default class Board {
    constructor(html, overlayHtml, size, dimensions, config) {
        this.html = html;
        this.overlayHtml = overlayHtml;
        this.size = size;
        this.dimensions = dimensions;
        this.outline = config.outline;
        this.border = config.border;
        this.scale = config.scale;

        this.selectedTiles = [];
        this.higthligthedTiles = [];
        this.startPos = null;

        this.isCtrl = false;

        const w =
            this.dimensions.width * this.size.width * this.scale +
            (this.dimensions.width + 1) * this.border;
        const h =
            this.dimensions.height * this.size.height * this.scale +
            (this.dimensions.height + 1) * this.border;

        this.html.width = w;
        this.html.height = h;
        this.overlayHtml.width = w;
        this.overlayHtml.height = h;

        this.ctx = this.html.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;

        this.overlayCtx = this.overlayHtml.getContext("2d");
        this.overlayCtx.imageSmoothingEnabled = false;

        this.generateTiles();
        this.html.addEventListener("mousemove", this.mouse.bind(this));
        this.html.addEventListener("mousedown", this.mousedown.bind(this));
        window.addEventListener("mouseup", this.mouseup.bind(this));

        window.addEventListener("keydown", this.keydown.bind(this));
        window.addEventListener("keyup", this.keyup.bind(this));
    }

    keydown(e) {
        if (e.key === "Delete") {
        }
        if (e.key === "Control") {
            this.isCtrl = true;
        }
    }

    keyup(e) {
        if (e.key === "Delete") {
        }
        if (e.key === "Control") {
            this.isCtrl = false;
        }
    }

    drawBox(x, y) {
        this.overlayCtx.clearRect(
            0,
            0,
            this.overlayHtml.width,
            this.overlayHtml.height
        );
        if (this.startPos) {
            const { x: topX, y: topY } = this.startPos;
            const { x: bottomX, y: bottomY } = { x: x, y: y };
            const minX = topX < bottomX ? topX : bottomX;
            const maxX = topX > bottomX ? topX : bottomX;
            const minY = topY < bottomY ? topY : bottomY;
            const maxY = topY > bottomY ? topY : bottomY;
            this.overlayCtx.strokeStyle = "red";
            this.overlayCtx.lineWidth = 1;
            this.overlayCtx.strokeRect(minX, minY, maxX - minX, maxY - minY);
        }
    }

    mouse(e) {
        this.drawBox(e.offsetX, e.offsetY);
        this.higthligthedTiles = [];
        for (let i = 0; i < this.tiles.length; i++) {
            let tile = this.tiles[i];
            if (tile.havePoint(e.offsetX, e.offsetY)) {
                this.higthligthedTiles.push(tile);
                tile.higthligth();
            } else {
                tile.unhigthligth();
            }
        }
        if (this.startPos) {
            this.tiles.forEach((tile) => {
                const { x, y, wigth, height } = tile.getRealDimentions();
                const top = {
                    x:
                        e.offsetX < this.startPos.x
                            ? e.offsetX
                            : this.startPos.x,
                    y:
                        e.offsetY < this.startPos.y
                            ? e.offsetY
                            : this.startPos.y,
                };
                const bottom = {
                    x:
                        e.offsetX > this.startPos.x
                            ? e.offsetX
                            : this.startPos.x,
                    y:
                        e.offsetY > this.startPos.y
                            ? e.offsetY
                            : this.startPos.y,
                };

                if (
                    x <= bottom.x &&
                    x + wigth > top.x &&
                    y < bottom.y &&
                    y + height > top.y
                ) {
                    if (!tile.higthligthed) this.higthligthedTiles.push(tile);
                    tile.higthligth();
                }
            });
        }
    }

    mousedown(e) {
        this.startPos = { x: e.offsetX, y: e.offsetY };
    }

    mouseup(e) {
        console.log(this.higthligthedTiles);
        this.startPos = null;
        if (this.higthligthedTiles.length < 1) return;
        if (this.isCtrl) {
            const b =
                this.higthligthedTiles[0].selected &&
                this.higthligthedTiles[this.higthligthedTiles.length - 1]
                    .selected;
            if (b) {
                this.unselectTiles(this.higthligthedTiles);
            } else {
                this.selectTiles(this.higthligthedTiles);
            }
        } else {
            this.unselectTiles([...this.selectedTiles]);
            this.selectTiles(this.higthligthedTiles);
        }
        this.higthligthedTiles = [];
    }

    flipTiles(tiles) {
        if (!Array.isArray(tiles)) tiles = [tiles];
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].selected) {
                this.unselectTiles(tiles[i]);
            } else {
                this.selectTiles(tiles[i]);
            }
        }
    }

    selectTiles(tiles) {
        if (!Array.isArray(tiles)) tiles = [tiles];
        for (let i = 0; i < tiles.length; i++) {
            if (!this.selectedTiles.includes(tiles[i])) {
                tiles[i].select();
                this.selectedTiles.push(tiles[i]);
            }
        }
    }

    unselectTiles(tiles) {
        if (!Array.isArray(tiles)) tiles = [tiles];
        tiles = [...tiles];
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].unselect();
            this.selectedTiles.splice(this.selectedTiles.indexOf(tiles[i]), 1);
        }
    }

    generateTiles() {
        this.tiles = [];
        for (let x = 0; this.dimensions.width > x; x++) {
            for (let y = 0; this.dimensions.height > y; y++) {
                let tile = new Tile(
                    x * this.size.width * this.scale + (x + 1) * this.border,
                    y * this.size.height * this.scale + (y + 1) * this.border,
                    this.size.width * this.scale,
                    this.size.height * this.scale,
                    this.html.getContext("2d"),
                    null,
                    this.outline
                );
                tile.draw();
                this.tiles.push(tile);
            }
        }
    }
}
