import Map from "./Map";
import "./style.css";

const ele = document.getElementById("root");
const ele2 = document.getElementById("list");
if (ele && ele2) {
    new Map(8, 8, ele, ele2);
}
