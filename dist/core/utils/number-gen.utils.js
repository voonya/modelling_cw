"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRandNumAboveZero = void 0;
var genRandNumAboveZero = function () {
    var num = 0;
    while (num === 0) {
        num = Math.random();
    }
    return num;
};
exports.genRandNumAboveZero = genRandNumAboveZero;
//# sourceMappingURL=number-gen.utils.js.map