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
exports.FabricDeliveryProcess = void 0;
var process_1 = require("../../core/process");
var fabric_order_delivered_event_1 = require("../events/fabric-order-delivered.event");
var fabric_stats_service_1 = require("./fabric-stats.service");
var FabricDeliveryProcess = (function (_super) {
    __extends(FabricDeliveryProcess, _super);
    function FabricDeliveryProcess(orderSize, subChannels, delayedEventsTime, maxQueueSize) {
        if (subChannels === void 0) { subChannels = []; }
        if (delayedEventsTime === void 0) { delayedEventsTime = []; }
        if (maxQueueSize === void 0) { maxQueueSize = Infinity; }
        var _this = _super.call(this, subChannels, new fabric_order_delivered_event_1.FabricOrderProcessEventFactory(), maxQueueSize) || this;
        _this._orderSize = 0;
        _this._statsService = new fabric_stats_service_1.FabricDeliveryStatsService();
        _this._orderSize = orderSize;
        _this._delayedEvents = delayedEventsTime.map(function (time) {
            return _this._eventFactory.getExitEvent(time, _this._name);
        });
        return _this;
    }
    FabricDeliveryProcess.prototype.exit = function (state) {
        var _this = this;
        state.resourcesInWholeSaleStore += this._orderSize;
        if (!this._subChannels.some(function (channel) { var _a; return ((_a = channel.getNextEvent(state)) === null || _a === void 0 ? void 0 : _a.time) == _this._currentTime; }))
            this._delayedEvents = this._delayedEvents.filter(function (e) { return e.time !== _this._currentTime; });
        _super.prototype.exit.call(this, state);
    };
    FabricDeliveryProcess.prototype.getNextEvent = function (state) {
        var event = _super.prototype.getNextEvent.call(this, state);
        var nearestEvent = this._delayedEvents.find(function (e) { return e.time < (event === null || event === void 0 ? void 0 : event.time); });
        return nearestEvent !== null && nearestEvent !== void 0 ? nearestEvent : event;
    };
    return FabricDeliveryProcess;
}(process_1.ProcessChannel));
exports.FabricDeliveryProcess = FabricDeliveryProcess;
//# sourceMappingURL=fabric-delivery.channel.js.map