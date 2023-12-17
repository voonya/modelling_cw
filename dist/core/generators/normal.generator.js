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
exports.NormalNumberGenerator = void 0;
var base_generator_1 = require("./base.generator");
var NormalNumberGenerator = (function (_super) {
    __extends(NormalNumberGenerator, _super);
    function NormalNumberGenerator(avg, dev) {
        var _this = _super.call(this) || this;
        _this.avg = avg;
        _this.dev = dev;
        return _this;
    }
    NormalNumberGenerator.prototype.getNumber = function () {
        var miu = 0;
        for (var i = 0; i < 12; i++) {
            miu += Math.random();
        }
        miu -= 6;
        return this.dev * miu + this.avg;
    };
    return NormalNumberGenerator;
}(base_generator_1.BaseNumberGenerator));
exports.NormalNumberGenerator = NormalNumberGenerator;
//# sourceMappingURL=normal.generator.js.map