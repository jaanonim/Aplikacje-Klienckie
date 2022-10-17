import Color from "./math/Color";
import Map from "./Map";
import Vector2 from "./math/Vector2";

export interface NodeInterface {
    x: number;
    y: number;
    previous: Node | null;
    isWalkable: boolean;
    map: Map;
    color: Color;
    html: HTMLElement;
}

/**
 * Class for one tile on map
 */
export default class Node implements NodeInterface {
    x: number;
    y: number;
    previous: Node | null;
    isWalkable: boolean;
    map: Map;
    color: Color;
    html: HTMLElement;
    circle: HTMLElement;

    /**
     *
     * @param x position x
     * @param y position y
     * @param parent html element to with append
     * @param map
     */
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

    /**
     * set color of circle
     * @param color
     */
    set(color: Color) {
        this.color = color;
        this.isWalkable = false;
        this.updateColor();
    }

    /**
     * Remove circle
     */
    unset() {
        this.color = Color.opaque;
        this.isWalkable = true;
        this.updateColor();
    }

    /**
     * Shows changes
     */
    updateColor() {
        this.circle.style.backgroundColor = this.color.getStringRGBA();
    }

    /**
     * Removes hover color
     */
    unsetHover() {
        this.html.style.backgroundColor = Color.opaque.getStringRGBA();
    }

    /**
     * Sets hover color
     */
    setHover() {
        this.html.style.backgroundColor = Color.gray.getStringRGBA();
    }

    /**
     * Count amount of tiles in given direction
     * @param dir
     * @param map
     * @returns
     */
    countInDir(dir: Vector2, map: Map): Array<Node> {
        const n = map.getNode(new Vector2(dir.x + this.x, dir.y + this.y));
        if (n && n.color.equals(this.color)) {
            return [...n.countInDir(dir, map), this];
        } else {
            return [this];
        }
    }
}
