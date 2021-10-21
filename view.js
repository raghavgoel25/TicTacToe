export default class View {
    constructor(root) {
        this.root = root;
        this.root.innerHTML = `
            <div class="head">
                <div class="turns"></div>
                <div class="status"></div>
                <button type="button" class="redo">
                    <i class="fas fa-redo"></i>
                </button>
            </div>
            <div class="box">
                <div class="tile" data-index="0"></div>
                <div class="tile" data-index="1"></div>
                <div class="tile" data-index="2"></div>
                <div class="tile" data-index="3"></div>
                <div class="tile" data-index="4"></div>
                <div class="tile" data-index="5"></div>
                <div class="tile" data-index="6"></div>
                <div class="tile" data-index="7"></div>
                <div class="tile" data-index="8"></div>
            </div>
            `;
        this.press = undefined;
        this.redoPress = undefined;

        this.root.querySelectorAll(".tile").forEach(ind => {
            ind.addEventListener("click", () => {
                if (this.press) {
                    this.press(ind.dataset.index);
                }
            });
        });
        this.root.querySelector(".redo").addEventListener("click", () => {
            if (this.redoPress) {
                this.redoPress();
            }
        });

    }

    update(additional) {
        this.turnUpdate(additional);
        this.statUpdate(additional);
        this.boxUpdate(additional);
    }
    boxUpdate(additional) {
        const winComb = additional.win();
        for (let j = 0; j < additional.box.length; j++) {
            const til = this.root.querySelector(`.tile[data-index="${j}"]`);
            til.classList.remove("tile-win");
            til.textContent = additional.box[j];
            if (winComb && winComb.includes(j)) {
                til.classList.add("tile-win")
            }
        }
    }
    turnUpdate(additional) {
        this.root.querySelector(".turns").textContent = `${additional.turn}'s turn`;
    }
    statUpdate(additional) {
        let stat = "Being Played";
        if (additional.win()) {
            stat = `${additional.turn} Wins`;
        } else if (!additional.progress()) {
            stat = "Tie";
        }
        this.root.querySelector(".status").textContent = stat;
    }
}