export default class Box {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.forceX = 0;
        this.forceY = 0;

        this.bouncines = 1;
    }

    addForce(forceX, forceY) {
        this.forceX = forceX;
        this.forceY = forceY;
    }

    enableCollision(colliders) {
        this.colliders = colliders;
    }

    isColliding(box) {
        return (
            this.x < box.x + box.width &&
            this.x + this.width > box.x &&
            this.y < box.y + box.height &&
            this.y + this.height > box.y
        );
    }

    getDiff(box) {
        return {
            x: this.x - box.x,
            y: this.y - box.y,
        };
    }

    draw(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(ctx) {
        this.x += this.forceX;
        this.y += this.forceY;
        if (this.colliders) {
            const totalDiff = { x: 0, y: 0 };

            this.colliders.forEach((collider) => {
                if (this.isColliding(collider)) {
                    const diff = this.getDiff(collider);
                    this.x -= diff.x;
                    this.y -= diff.y;
                    totalDiff.x += diff.x;
                    totalDiff.y += diff.y;
                }
            });

            Math.sign(totalDiff.x);
        }

        this.draw(ctx);
    }
}
