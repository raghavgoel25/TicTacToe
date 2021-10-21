export default class Additional {
    constructor() {
        this.turn = "X";
        this.box = new Array(9).fill(null);
    }
    next() {
        this.turn = this.turn === "X" ? "O" : "X";
    }
    move(i) {
        if (!this.progress()) {
            return;
        }
        if (this.box[i]) {
            return;
        }
        this.box[i] = this.turn;
        if (!this.win()) {
            this.next();
        }
    }
    win() {
        const winComb = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (const comb of winComb) {
            const [x, y, z] = comb;
            if (this.box[x] && this.box[x] === this.box[y] && this.box[x] === this.box[z]) {
                return comb;
            }
        }
        return null;
    }
    progress() {
        return !this.win() && this.box.includes(null);
    }
}