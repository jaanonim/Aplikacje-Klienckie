import Color from "./math/Color";
import Map from "./Map";

export default class Node {
    x: number;
    y: number;
    previous: Node | null;
    isWalkable: boolean;
    map: Map;
    color: Color;
    html: HTMLElement;
    circle: HTMLElement;

    constructor(x: number, y: number, parent: HTMLElement, map: Map) {
        this.x = x;
        this.y = y;
        this.previous = null;
        this.isWalkable = true;
        this.color = Color.opaque;
        this.map = map;

        this.html = document.createElement("div");
        this.circle = document.createElement("div");
        this.html.classList.add("node");
        this.circle.classList.add("circle");
        this.html.appendChild(this.circle);
        parent.appendChild(this.html);
        this.html.onmouseenter = () => {
            this.map.hover(this);
        };
        this.html.onclick = () => {
            this.map.select(this);
        };
    }

    set(color: Color) {
        this.color = color;
        this.isWalkable = false;
        this.updateColor();
    }

    unset() {
        this.color = Color.opaque;
        this.isWalkable = true;
        this.updateColor();
    }

    updateColor() {
        this.circle.style.backgroundColor = this.color.getStringRGBA();
    }

    unsetHover() {
        this.html.style.backgroundColor = Color.opaque.getStringRGBA();
    }

    setHover() {
        this.html.style.backgroundColor = Color.gray.getStringRGBA();
    }
}
