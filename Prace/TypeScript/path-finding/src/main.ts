import Map from "./Map";
import "./style.css";

const ele = document.getElementById("root");
const ele2 = document.getElementById("list");
const ele3 = document.getElementById("points");
if (ele && ele2 && ele3) {
    new Map(9, 9, ele, ele2, ele3);
}
