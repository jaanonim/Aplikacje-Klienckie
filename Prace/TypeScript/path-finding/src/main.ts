import Color from "./math/Color";
import Map from "./Map";

import "./style.css";

const map = [
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 1],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
];

const ele = document.getElementById("root");
const ele2 = document.getElementById("list");
if (ele && ele2) {
    const m = new Map(8, 8, ele, ele2);
}
