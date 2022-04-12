import { getMap } from "../api.js";
import GameManager from "../game.js";
import Pawn from "../objects/pawn.js";
import Object from "../utilities/object.js";
import Field from "./field.js";

export default class Board extends Object {
	constructor() {
		super();
	}

	static FIELD_SIZE = 5;
	static C1 = 0xdddddd;
	static C2 = 0x444444;
	static MAP = [
		[0, 1, 0, 1, 0, 1, 0, 1],
		[1, 0, 1, 0, 1, 0, 1, 0],
		[0, 1, 0, 1, 0, 1, 0, 1],
		[1, 0, 1, 0, 1, 0, 1, 0],
		[0, 1, 0, 1, 0, 1, 0, 1],
		[1, 0, 1, 0, 1, 0, 1, 0],
		[0, 1, 0, 1, 0, 1, 0, 1],
		[1, 0, 1, 0, 1, 0, 1, 0],
	];

	start() {
		this.map = [];
		for (let x = 0; x < Board.MAP.length; x++) {
			this.map[x] = [];
			for (let y = 0; y < Board.MAP[x].length; y++) {
				if (Board.MAP[x][y]) {
					const obj = new Field(x, y, Board.FIELD_SIZE, 0x666666);
					this.map[x][y] = obj;
					this.add(obj);
				} else {
					const obj = new Field(x, y, Board.FIELD_SIZE, 0xffffff);
					this.map[x][y] = obj;
					this.add(obj);
				}
			}
		}

		this.position.setX((-Board.FIELD_SIZE * (Board.MAP.length - 1)) / 2);
		this.position.setZ((-Board.FIELD_SIZE * (Board.MAP[0].length - 1)) / 2);
		this.pawns = null;
	}

	async generatePawns() {
		this.pawns = [];

		const PAWNS = [
			[0, 1, 0, 1, 0, 1, 0, 1],
			[1, 0, 1, 0, 1, 0, 1, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, -1, 0, -1, 0, -1, 0, -1],
			[-1, 0, -1, 0, -1, 0, -1, 0],
		];
		const SIZE = 8;

		const color = GameManager.getState("color");

		for (let x = 0; x < SIZE; x++) {
			for (let y = 0; y < SIZE; y++) {
				if (PAWNS[x][y] == -1) {
					this.addPawn(
						new Pawn(y, x, Board.FIELD_SIZE, Board.C1, color)
					);
				} else if (PAWNS[x][y] == 1) {
					this.addPawn(
						new Pawn(y, x, Board.FIELD_SIZE, Board.C2, !color)
					);
				}
			}
		}
	}

	addPawn(pawn) {
		this.add(pawn);
		this.pawns.push(pawn);
	}

	async update() {
		const color = GameManager.getState("color");
		if (color !== undefined && this.pawns == null) {
			this.pawns = [];
			let res = await getMap();
			if (res.sucess) {
				this.useMap(res.map);
			}
			//this.generatePawns();
		}
	}

	useMap(map) {
		let tab = [...this.pawns];
		this.pawns = [];
		const color = GameManager.getState("color");
		for (var i = this.children.length - 1; i >= 0; i--) {
			if (this.children[i] instanceof Field) continue;
			this.remove(this.children[i]);
		}
		map.pawns.forEach((element) => {
			if (
				!tab.some(
					(ele) =>
						element.x === ele.boardPos.x &&
						element.y === ele.boardPos.y
				)
			) {
				if (element.player === GameManager.getState("nick"))
					this.addPawn(
						new Pawn(
							element.x,
							element.y,
							Board.FIELD_SIZE,
							color ? Board.C1 : Board.C2,
							true
						)
					);
				else
					this.addPawn(
						new Pawn(
							element.x,
							element.y,
							Board.FIELD_SIZE,
							color ? Board.C2 : Board.C1,
							false
						)
					);
			} else
				this.addPawn(
					tab.filter(
						(ele) =>
							element.x === ele.boardPos.x &&
							element.y === ele.boardPos.y
					)[0]
				);
		});
	}

	getPawn(x, y) {
		return this.pawns.filter(
			(pawn) => pawn.boardPos.x === x && pawn.boardPos.y === y
		)[0];
	}

	useMove(data) {
		data.del.forEach((pos) => {
			let ele = this.getPawn(pos.x, pos.y);
			this.pawns.splice(this.pawns.indexOf(ele), 1);
			this.remove(ele);
		});
		data.move.forEach((d) => {
			let ele = this.getPawn(d.from.x, d.from.y);
			if (ele) ele.move(d.to);
		});
	}

	highlightMoves(pawn) {
		let moves = [
			{ x: 1, y: 1 },
			{ x: 1, y: -1 },
			{ x: -1, y: 1 },
			{ x: -1, y: -1 },
			{ x: 2, y: 2 },
			{ x: 2, y: -2 },
			{ x: -2, y: 2 },
			{ x: -2, y: -2 },
		];

		for (let i = 0; i < moves.length; i++) {
			const x = pawn.boardPos.x + moves[i].x;
			const y = pawn.boardPos.y + moves[i].y;
			if (this.checkMove(pawn, x, y)) this.map[x][y].highlight();
		}
	}

	unhighlightMoves() {
		for (let x = 0; x < Board.MAP.length; x++) {
			for (let y = 0; y < Board.MAP[x].length; y++) {
				this.map[x][y].unhighlight();
			}
		}
	}

	checkMove(pawn, x, y) {
		if (
			!(
				x >= 0 &&
				x < Board.MAP.length &&
				y >= 0 &&
				y < Board.MAP[0].length
			)
		)
			return false;
		if (this.getPawn(x, y) != null) return false;

		if (
			Math.abs(pawn.boardPos.x - x) == 2 ||
			Math.abs(pawn.boardPos.y - y) == 2
		) {
			let newX = pawn.boardPos.x - (pawn.boardPos.x - x) / 2;
			let newY = pawn.boardPos.y - (pawn.boardPos.y - y) / 2;

			const enemy = this.getPawn(newX, newY);
			if (enemy && !enemy.isYours) return true;
			else return false;
		}
		if (
			Math.abs(pawn.boardPos.x - x) != 1 ||
			Math.abs(pawn.boardPos.y - y) != 1
		) {
			return false;
		}
		return true;
	}
}
