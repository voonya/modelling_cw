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
exports.ExponentialNumberGenerator = void 0;
var base_generator_1 = require("./base.generator");
var number_gen_utils_1 = require("../utils/number-gen.utils");
var ExponentialNumberGenerator = (function (_super) {
    __extends(ExponentialNumberGenerator, _super);
    function ExponentialNumberGenerator(avg) {
        var _this = _super.call(this) || this;
        _this.avg = avg;
        return _this;
    }
    ExponentialNumberGenerator.prototype.getNumber = function () {
        var a = (0, number_gen_utils_1.genRandNumAboveZero)();
        a = -this.avg * Math.log(a);
        return a;
    };
    return ExponentialNumberGenerator;
}(base_generator_1.BaseNumberGenerator));
exports.ExponentialNumberGenerator = ExponentialNumberGenerator;
//# sourceMappingURL=exp.generator.js.map