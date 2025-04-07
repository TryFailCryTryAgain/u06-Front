"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("./components");
// Dec.
document.addEventListener("DOMContentLoaded", () => {
    const button = (0, components_1.BrowseBooksButton)();
    button === null || button === void 0 ? void 0 : button.addEventListener("click", function () {
        console.log("Event has been registered!");
    });
});
