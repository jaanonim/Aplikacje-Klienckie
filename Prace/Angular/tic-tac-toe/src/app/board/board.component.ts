import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.sass'],
})
export class BoardComponent implements OnInit {
    squares: any[] = [];
    xIsNext: boolean = true;
    winner: string | null = null;

    constructor() {}

    newGame() {
        this.squares = Array(9).fill(null);
        this.winner = null;
        this.xIsNext = true;
        this.makeMove(this.botMove());
    }

    ngOnInit(): void {
        this.newGame();
    }

    get player() {
        return this.xIsNext ? 'X' : 'O';
    }

    makeMove(idx: number | null) {
        if (this.winner != null || idx === null) return;
        if (this.squares[idx] === null) {
            this.squares.splice(idx, 1, this.player);
            this.xIsNext = !this.xIsNext;
        }

        this.winner = this.calculateWinner();

        if (this.xIsNext) this.makeMove(this.botMove());
    }

    calculateWinner() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (
                this.squares[a] &&
                this.squares[a] === this.squares[b] &&
                this.squares[a] === this.squares[c]
            ) {
                return this.squares[a];
            }
        }
        return null;
    }

    botMove(): number | null {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (
                this.squares[a] === 'X' &&
                this.squares[a] === this.squares[b] &&
                this.squares[c] === null
            )
                return c;
            if (
                this.squares[b] === 'X' &&
                this.squares[b] === this.squares[c] &&
                this.squares[a] === null
            )
                return a;
            if (
                this.squares[a] === 'X' &&
                this.squares[a] === this.squares[c] &&
                this.squares[b] === null
            )
                return b;
        }
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (
                this.squares[a] === 'O' &&
                this.squares[a] === this.squares[b] &&
                this.squares[c] === null
            )
                return c;
            if (
                this.squares[b] === 'O' &&
                this.squares[b] === this.squares[c] &&
                this.squares[a] === null
            )
                return a;
            if (
                this.squares[a] === 'O' &&
                this.squares[a] === this.squares[c] &&
                this.squares[b] === null
            )
                return b;
        }

        const selected = this.squares.filter((e) => e !== null);
        if (selected.length === 9) return null;
        if (selected.length === 0) {
            return [0, 2, 6, 8][Math.round(Math.random() * 4)];
        }
        if (selected.length >= 2) {
            const my = this.squares.indexOf('X');
            const opp = {
                0: 8,
                8: 0,
                2: 6,
                6: 2,
            };
            const left = {
                0: [2, 6],
                8: [2, 6],
                2: [0, 8],
                6: [0, 8],
            };
            const o = opp[my as 0 | 8 | 2 | 6];
            if (this.squares[o] !== null) {
                let v = left[my as 0 | 8 | 2 | 6][0];
                if (this.squares[v] === null) return v;
                v = left[my as 0 | 8 | 2 | 6][1];
                if (this.squares[v] === null) return v;
            } else if (this.squares[o] === null) return o;
        }
        const avt = this.squares.filter((e) => e === null);
        return avt[0];
    }
}
