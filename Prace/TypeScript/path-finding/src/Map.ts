import Color from "./math/Color";
import { getRandom } from "./math/Math";
import Vector2 from "./math/Vector2";
import Node from "./Node";

interface MapInterface {
    readonly map: Array<Array<Node>>;
    sizeX: number;
    sizeY: number;
    html: HTMLElement;
    free: Array<Node>;
    hovered: Array<Node>;
    selected: Node | null;
    colors: Array<Color>;
    lock: boolean;
    nextColorsHtml: HTMLElement;
    pointsHtml: HTMLElement;
    countInLine: number;
}

export default class Map implements MapInterface {
    readonly map: Array<Array<Node>>;
    sizeX: number;
    sizeY: number;
    html: HTMLElement;
    free: Array<Node>;
    hovered: Array<Node>;
    selected: Node | null;
    colors: Array<Color>;
    lock: boolean;
    nextColorsHtml: HTMLElement;
    pointsHtml: HTMLElement;
    countInLine: number;

    private _points: number;

    public get points(): number {
        return this._points;
    }

    /**
     * set count of points and update UI
     */
    public set points(value: number) {
        this._points = value;
        this.pointsHtml.innerHTML = value + " points";
    }

    constructor(
        sizeX: number,
        sizeY: number,
        html: HTMLElement,
        nextColorsHtml: HTMLElement,
        pointsHtml: HTMLElement,
        countInLine: number
    ) {
        this.pointsHtml = pointsHtml;
        this._points = 0;
        this.points = 0;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.map = [];
        this.colors = [];
        this.free = [];
        this.html = html;
        this.hovered = [];
        this.selected = null;
        this.lock = false;
        this.html.style.setProperty("--sizeX", "" + this.sizeX);
        this.html.style.setProperty("--sizeY", "" + this.sizeY);
        this.nextColorsHtml = nextColorsHtml;
        this.countInLine = countInLine;

        for (let x = 0; x < sizeX; x++) {
            this.map[x] = [];
            for (let y = 0; y < sizeY; y++) {
                this.map[x][y] = new Node(x, y, this.html, this);
                this.free.push(this.map[x][y]);
            }
        }

        this.setNextColors();
        this.spawnRandom3(this.colors as [Color, Color, Color]);
    }

    /**
     * generate next batch of colors
     */
    setNextColors() {
        const COLORS = [
            Color.red,
            Color.blue,
            Color.green,
            Color.white,
            Color.black,
        ];

        this.colors = [getRandom(COLORS), getRandom(COLORS), getRandom(COLORS)];
        this.nextColorsHtml.innerHTML = "";

        for (let i = 0; i < 3; i++) {
            const html = document.createElement("div");
            const circle = document.createElement("div");
            html.classList.add("node");
            circle.classList.add("circle");
            circle.style.backgroundColor = this.colors[i].getStringRGBA();
            html.appendChild(circle);
            this.nextColorsHtml.appendChild(html);
        }
    }

    /**
     * Search path
     * @param start
     * @param end
     * @returns
     */
    findPath(start: Node, end: Node) {
        this.map.forEach((row) => row.forEach((n) => (n.previous = null)));
        let reachable = [start];
        let explored = [];
        while (reachable.length > 0) {
            const node = reachable[0];
            if (node == end) {
                return this.getPath(node);
            }
            reachable = reachable.filter((e) => e !== node);
            explored.push(node);

            reachable.push(
                ...this.getAdjacentNodes(node, [...reachable, ...explored]).map(
                    (e) => {
                        e.previous = node;
                        return e;
                    }
                )
            );
        }
        return null;
    }

    /**
     * Return nodes that are adjacent to given node excluding nodes given in notThis param
     * @param n
     * @param notThis exclude this nodes
     * @returns
     */
    getAdjacentNodes(n: Node, notThis: Array<Node>): Array<Node> {
        let tab: Array<Node> = [];
        const map = [
            new Vector2(1, 0),
            new Vector2(-1, 0),
            new Vector2(0, 1),
            new Vector2(0, -1),
        ];

        map.forEach((ele) => {
            const x = n.x + ele.x;
            const y = n.y + ele.y;
            if (x >= 0 && x < this.sizeX && y >= 0 && y < this.sizeY) {
                const node = this.map[x][y];
                if (node.isWalkable && !notThis.some((e) => e === node)) {
                    tab.push(node);
                }
            }
        });

        return tab;
    }

    /**
     * construct founded path
     * @param n
     * @returns
     */
    getPath(n: Node): Array<Node> {
        if (n.previous === null) return [n];
        return [n, ...this.getPath(n.previous)];
    }

    /**
     * Sets color of node
     * @param node
     * @param color
     */
    setNode(node: Node, color: Color) {
        this.map[node.x][node.y].set(color);
        this.free = this.free.filter((e) => e != this.map[node.x][node.y]);
    }

    /**
     * Removes color of node
     * @param node
     * @returns
     */
    unsetNode(node: Node) {
        if (this.map[node.x][node.y].isWalkable) return false;
        this.map[node.x][node.y].unset();
        this.free.push(this.map[node.x][node.y]);
        return true;
    }

    /**
     * Return node at given position
     * @param pos
     * @returns
     */
    getNode(pos: Vector2) {
        try {
            return this.map[pos.x][pos.y];
        } catch {
            return undefined;
        }
    }

    /**
     * Create random node at random pos
     * @param color
     * @returns
     */
    spawnRandom(color: Color) {
        if (this.free.length === 0) {
            alert(`You died with ${this.points} points`);
            return;
        }
        const ele = getRandom(this.free);
        this.setNode(ele, color);
        this.checkAndRemove(ele);
    }

    /**
     * Create 3 random nodes at random pos
     * @param color
     */
    spawnRandom3(color: [Color, Color, Color]) {
        color.forEach((c) => {
            this.spawnRandom(c);
        });
        this.setNextColors();
    }

    /**
     * Handles hover event
     * @param node
     * @returns
     */
    hover(node: Node) {
        if (this.lock) return;
        if (this.selected) {
            const res = this.findPath(this.selected, node);
            if (res != null) {
                this.hovered.forEach((n) => n.unsetHover());
                this.hovered = res;
                this.hovered.forEach((n) => n.setHover());
            }
        }
    }

    /**
     * Handles select event
     * @param node
     * @returns
     */
    select(node: Node) {
        if (this.lock) return;
        if (this.selected) {
            if (this.selected === node) {
                this.selected = null;
                node.unsetHover();
            } else if (node.isWalkable) {
                if (null! + this.findPath(this.selected, node)) {
                    this.setNode(node, this.selected.color);
                    this.unsetNode(this.selected);
                    this.lock = true;
                    setTimeout(() => {
                        this.selected = null;
                        this.hovered.forEach((n) => n.unsetHover());
                        this.lock = false;

                        if (!this.checkAndRemove(node)) {
                            this.spawnRandom3(
                                this.colors as [Color, Color, Color]
                            );
                        }
                    }, 500);
                }
                return;
            } else {
                this.selected = node;
                this.hover(node);
            }
        } else {
            if (
                !node.isWalkable &&
                this.getAdjacentNodes(node, []).length > 0
            ) {
                this.selected = node;
                this.hover(node);
            }
        }
    }

    /**
     * Check for nodes that should be removed
     * @param node
     * @returns
     */
    checkAndRemove(node: Node) {
        const DIR = [
            [new Vector2(1, 0), new Vector2(-1, 0)],
            [new Vector2(0, 1), new Vector2(0, -1)],
            [new Vector2(-1, -1), new Vector2(1, 1)],
            [new Vector2(-1, 1), new Vector2(1, -1)],
        ];

        let nodes: Array<Node> = [];
        DIR.forEach((d) => {
            const n = node
                .countInDir(d[0], this)
                .concat(node.countInDir(d[1], this));
            if (n.length >= this.countInLine + 1) nodes = nodes.concat(n);
        });
        nodes.forEach((n) => {
            if (this.unsetNode(n)) this.points++;
        });
        if (this.free.length === this.sizeX * this.sizeY)
            this.spawnRandom3(this.colors as [Color, Color, Color]);
        return nodes.length > 0;
    }
}
