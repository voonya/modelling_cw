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
exports.TimeOrderRecieveGenerator = void 0;
var normal_generator_1 = require("../../core/generators/normal.generator");
var TimeOrderRecieveGenerator = (function (_super) {
    __extends(TimeOrderRecieveGenerator, _super);
    function TimeOrderRecieveGenerator(avg, dev, min, max) {
        var _this = _super.call(this, avg, dev) || this;
        _this.min = min;
        _this.max = max;
        return _this;
    }
    TimeOrderRecieveGenerator.prototype.getNumber = function () {
        var num = _super.prototype.getNumber.call(this);
        if (num < (this === null || this === void 0 ? void 0 : this.min)) {
            return this.min;
        }
        if (num > (this === null || this === void 0 ? void 0 : this.max)) {
            return this.max;
        }
        return num;
    };
    return TimeOrderRecieveGenerator;
}(normal_generator_1.NormalNumberGenerator));
exports.TimeOrderRecieveGenerator = TimeOrderRecieveGenerator;
//# sourceMappingURL=time-order-recieved.generator.js.map