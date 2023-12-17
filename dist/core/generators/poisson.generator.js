"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoisonNumberGenerator = void 0;
var number_gen_utils_1 = require("../utils/number-gen.utils");
var base_generator_1 = require("./base.generator");
var PoisonNumberGenerator = (function (_super) {
    __extends(PoisonNumberGenerator, _super);
    function PoisonNumberGenerator(avg) {
        var _this = _super.call(this) || this;
        _this.avg = avg;
        return _this;
    }
    PoisonNumberGenerator.prototype.getNumber = function () {
        var L = Math.exp(-this.avg);
        var k = 0;
        var p = 1;
        do {
            k++;
            var u = (0, number_gen_utils_1.genRandNumAboveZero)();
            p *= u;
        } while (p > L);
        return k - 1;
    };
    return PoisonNumberGenerator;
}(base_generator_1.BaseNumberGenerator));
exports.PoisonNumberGenerator = PoisonNumberGenerator;
//# sourceMappingURL=poisson.generator.js.map