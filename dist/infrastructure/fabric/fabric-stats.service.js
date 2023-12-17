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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FabricDeliveryStatsService = void 0;
var stats_service_1 = require("../../core/stats/stats.service");
var FabricDeliveryStatsService = (function (_super) {
    __extends(FabricDeliveryStatsService, _super);
    function FabricDeliveryStatsService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._avgResourceCount = 0;
        return _this;
    }
    FabricDeliveryStatsService.prototype.calcStats = function (deltaTime, queue, state) {
        _super.prototype.calcStats.call(this, deltaTime, queue, state);
        this._avgResourceCount += deltaTime * state.resourcesInWholeSaleStore;
    };
    FabricDeliveryStatsService.prototype.getStats = function (currentTime) {
        var stats = _super.prototype.getStats.call(this, currentTime);
        return __assign(__assign({}, stats), { avgResourceCount: this._avgResourceCount / currentTime });
    };
    return FabricDeliveryStatsService;
}(stats_service_1.StatsService));
exports.FabricDeliveryStatsService = FabricDeliveryStatsService;
//# sourceMappingURL=fabric-stats.service.js.map