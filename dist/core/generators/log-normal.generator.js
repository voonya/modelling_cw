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
exports.LogNormalNumberGenerator = void 0;
var normal_generator_1 = require("./normal.generator");
var LogNormalNumberGenerator = (function (_super) {
    __extends(LogNormalNumberGenerator, _super);
    function LogNormalNumberGenerator(avg, dev) {
        return _super.call(this, avg, dev) || this;
    }
    LogNormalNumberGenerator.prototype.getNumber = function () {
        var num = _super.prototype.getNumber.call(this);
        return Math.exp(num);
    };
    return LogNormalNumberGenerator;
}(normal_generator_1.NormalNumberGenerator));
exports.LogNormalNumberGenerator = LogNormalNumberGenerator;
//# sourceMappingURL=log-normal.generator.js.map