class Trace {
    constructor(pos, step, count, GM) {
        this.pos = pos;
        this.step = step;
        this.count = count;
        this.oritntation = pos.r;
        this.GM = GM;
        this.createPos();
        this.creteBucketPos();
    }

    createPos() {
        this.poses = [];
        for (let i = 0; i < this.count; i++) {
            this.poses.push(
                new Position(
                    this.pos.x + i * this.step * this.oritntation,
                    this.pos.y - i * this.step,
                    this.GM
                )
            );
        }
    }
    creteBucketPos() {
        this.bucket = new BucketPosition(
            this.pos.x,
            this.pos.y + this.step,
            this.pos.key,
            this.GM
        );
    }
}

class Position {
    constructor(x, y, GM) {
        this.x = x;
        this.y = y;
        this.GM = GM;
        this.creteElement();
    }

    creteElement() {
        this.html = document.createElement("div");
        this.html.classList.add("position");
        this.html.innerHTML = "";
        this.GM.rootHtml.appendChild(this.html);
        this.html.style.left = this.x + "px";
        this.html.style.top = this.y + "px";
    }

    setEgg() {
        this.html.innerHTML = "egg";
    }

    unsetEgg() {
        this.html.innerHTML = "";
    }
}

class BucketPosition {
    constructor(x, y, key, GM) {
        this.x = x;
        this.y = y;
        this.key = key;
        this.GM = GM;
        this.haveBucket = false;
        this.creteElement();
        this.unsetBucket();
    }

    creteElement() {
        this.html = document.createElement("div");
        this.html.classList.add("positionB");
        this.html.innerHTML = "";
        this.GM.rootHtml.appendChild(this.html);
        this.html.style.left = this.x + "px";
        this.html.style.top = this.y + "px";
    }

    setBucket() {
        this.GM.getBucketPos().forEach((pos) => {
            pos.unsetBucket();
        });
        this.html.style.backgroundColor = "red";
        this.haveBucket = true;
    }

    unsetBucket() {
        this.html.style.backgroundColor = "green";
        this.haveBucket = false;
    }
}

class Egg {
    constructor(trace, speed, GM) {
        this.trace = trace;
        this.speed = speed;
        this.eggPos = this.trace.poses.length;
        this.GM = GM;
        this.update();
    }

    remove() {
        try {
            this.trace.poses[this.eggPos].unsetEgg();
        } catch (e) {}
    }

    update() {
        this.remove();
        this.eggPos--;
        if (this.eggPos < 0) {
            this.GM.endEgg(this, false);
            return;
        }
        this.trace.poses[this.eggPos].setEgg();
        setTimeout(() => {
            this.update();
        }, this.speed);
    }
}

class GameManager {
    constructor(traces, step, count, lives) {
        this.lives = lives;
        this.points = 0;
        this.rootHtml = document.getElementById("root");
        this.label = document.getElementById("label");
        this.rootHtml.innerHTML = "";
        this.traces = this.genTraces(traces, step, count);
        this.traces[0].bucket.setBucket();

        this.bindKeyboard();
        this.eggs = [];
        setTimeout(() => {
            this.spawnEgg(2000);
        }, 2000);

        this.loop();
    }

    spawnEgg(time) {
        this.eggs.push(
            new Egg(
                this.traces[parseInt(Math.random() * this.traces.length)],
                500,
                this
            )
        );

        time = time < 500 ? 500 : time - 100;
        setTimeout(() => {
            this.spawnEgg(time);
        }, time);
    }

    endEgg(egg, ok) {
        console.log(egg, ok);
        if (this.eggs.some((e) => e === egg)) {
            this.eggs.splice(this.eggs.indexOf(egg), 1);
            if (!ok) {
                this.lives--;
            }
        }
    }

    loop() {
        this.eggs.forEach((egg) => {
            if (egg.trace.bucket.haveBucket && egg.eggPos === 0) {
                console.log("end");
                egg.remove();
                this.endEgg(egg, true);
                this.points += 100;
            }
        });
        this.label.innerHTML = `Points: ${this.points} Lives: ${this.lives}`;
        requestAnimationFrame(this.loop.bind(this));
    }

    genTraces(traces, step, count) {
        let t = [];
        for (let i = 0; i < traces.length; i++) {
            t.push(new Trace(traces[i], step, count, this));
        }

        return t;
    }

    getBucketPos() {
        return this.traces.map((t) => t.bucket);
    }

    bindKeyboard() {
        document.addEventListener("keydown", (e) => {
            this.getBucketPos().forEach((pos) => {
                if (e.key === pos.key) {
                    pos.setBucket();
                }
            });
        });
    }
}

new GameManager(
    [
        { x: 200, y: 200, r: -1, key: "ArrowUp" },
        { x: 200, y: 400, r: -1, key: "ArrowLeft" },
        { x: 300, y: 200, r: 1, key: "ArrowDown" },
        { x: 300, y: 400, r: 1, key: "ArrowRight" },
    ],
    30,
    5,
    3
);
