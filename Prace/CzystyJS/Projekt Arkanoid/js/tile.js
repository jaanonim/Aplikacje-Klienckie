export default class Tile {
    constructor(x, y, wigth, height, ctx, img, borderSize) {
        this.x = x;
        this.y = y;
        this.borderSize = borderSize;
        this.wigth = wigth;
        this.height = height;
        this.selected = false;
        this.higthligthed = false;
        this.img = img;
        this.ctx = ctx;
    }

    draw() {
        this.ctx.clearRect(
            this.x - this.borderSize,
            this.y - this.borderSize,
            this.wigth + this.borderSize * 2,
            this.height + this.borderSize * 2
        );

        this.ctx.fillStyle = "#222";
        if (this.higthligthed) {
            this.ctx.fillStyle = "#333";
        }
        if (this.selected) {
            this.ctx.fillStyle = "#0f0";
            if (this.higthligthed) {
                this.ctx.fillStyle = "#0a0";
            }
        }
        this.ctx.fillRect(
            this.x - this.borderSize,
            this.y - this.borderSize,
            this.wigth + this.borderSize * 2,
            this.height + this.borderSize * 2
        );

        if (this.img) {
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

    higthligth() {
        this.higthligthed = true;
        this.draw();
    }

    unhigthligth() {
        this.higthligthed = false;
        this.draw();
    }

    select() {
        this.selected = true;
        this.draw();
    }

    unselect() {
        this.selected = false;
        this.draw();
    }

    havePoint(x, y) {
        return (
            this.x - this.borderSize < x &&
            x < this.x + this.wigth + this.borderSize &&
            this.y - this.borderSize < y &&
            y < this.y + this.height + this.borderSize
        );
    }

    getRealDimentions() {
        return {
            x: this.x - this.borderSize,
            y: this.y - this.borderSize,
            wigth: this.wigth + this.borderSize * 2,
            height: this.height + this.borderSize * 2,
        };
    }
}
