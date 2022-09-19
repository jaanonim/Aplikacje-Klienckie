import "./style.css";

class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

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

class Map {
    map: Array<Array<Node>>;
    sizeX: number;
    sizeY: number;

    constructor(sizeX: number, sizeY: number, m: Array<Array<number>>) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.map = [];
        for (let x = 0; x < sizeX; x++) {
            this.map[x] = [];
            for (let y = 0; y < sizeY; y++) {
                this.map[x][y] = new Node(x, y, m[x][y] != 1);
            }
        }
    }

    findPath(start: Node, end: Node) {
        let reachable = [start];
        let explored = [];
        while (reachable.length > 0) {
            const node = reachable[0];
            if (node === end) {
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

    getPath(n: Node): Array<Node> {
        if (n.previous === null) return [n];
        return [n, ...this.getPath(n.previous)];
    }
}

class Node {
    x: number;
    y: number;
    previous: Node | null;
    isWalkable: boolean;

    constructor(x: number, y: number, isWalkable: boolean) {
        this.x = x;
        this.y = y;
        this.previous = null;
        this.isWalkable = isWalkable;
    }
}

let m = new Map(8, 8, map);

console.log(m, m.findPath(m.map[0][0], m.map[7][7]));
