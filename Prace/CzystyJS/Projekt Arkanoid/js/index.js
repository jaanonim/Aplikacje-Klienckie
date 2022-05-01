import Box from "./box.js";

const ctx = document.getElementById("root").getContext("2d");

const width = 1920;
const height = 1080;

const objs = [new Box(0, 0, 100, 100), new Box(220, 200, 100, 100)];

objs.forEach((obj) => obj.enableCollision(objs));
objs[0].addForce(1, 1);
objs[1].addForce(0, 1);

const render = () => {
    ctx.clearRect(0, 0, 1920, 1080);

    for (let i = 0; i < objs.length; i++) {
        objs[i].update(ctx);
        ctx.stroke();
    }

    window.requestAnimationFrame(render);
};
window.requestAnimationFrame(render);
