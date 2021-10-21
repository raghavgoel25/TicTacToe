import Additional from "./game.js";
import View from "./view.js";

let additional = new Additional();
let view = new View(document.getElementById("game"));

view.press = function(i) {
    additional.move(i);
    view.update(additional);
};

view.redoPress = function() {
    additional = new Additional();
    view.update(additional);
};

view.update(additional);