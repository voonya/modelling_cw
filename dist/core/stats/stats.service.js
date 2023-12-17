"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = exports.DefaultStats = void 0;
var DefaultStats = (function () {
    function DefaultStats() {
    }
    return DefaultStats;
}());
exports.DefaultStats = DefaultStats;
var StatsService = (function () {
    function StatsService() {
        this._countEntry = 0;
        this._countExit = 0;
        this._countRefusal = 0;
        this._avgQueue = 0;
    }
    StatsService.prototype.calcStats = function (deltaTime, queue, state) {
        this._avgQueue += queue * deltaTime;
    };
    StatsService.prototype.addEntry = function () {
        this._countEntry++;
    };
    StatsService.prototype.addExit = function () {
        this._countExit++;
    };
    StatsService.prototype.addRefusal = function () {
        this._countRefusal++;
    };
    StatsService.prototype.getStats = function (currentTime) {
        var _a;
        return {
            countEntry: this._countEntry,
            countExit: this._countExit,
            countRefusal: this._countRefusal,
            percentRefusal: (_a = this._countRefusal / (this._countEntry || this._countExit)) !== null && _a !== void 0 ? _a : 0,
            avgQueue: this._avgQueue / currentTime,
        };
    };
    return StatsService;
}());
exports.StatsService = StatsService;
//# sourceMappingURL=stats.service.js.map