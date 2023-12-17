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
exports.FabricOrderProcessEventFactory = exports.FabricOrderDeliveredEvent = void 0;
var base_event_1 = require("../../core/events/base.event");
var events_priority_const_1 = require("../../shared/consts/events-priority.const");
var FabricOrderDeliveredEvent = (function (_super) {
    __extends(FabricOrderDeliveredEvent, _super);
    function FabricOrderDeliveredEvent(time, processName, priority) {
        if (processName === void 0) { processName = ''; }
        if (priority === void 0) { priority = events_priority_const_1.FABRIC_ORDER_DELIVERED_PRIORITY; }
        var _this = _super.call(this) || this;
        _this.time = time;
        _this.name = "".concat(processName, " fabric order delivered");
        _this.priority = priority;
        return _this;
    }
    return FabricOrderDeliveredEvent;
}(base_event_1.Event));
exports.FabricOrderDeliveredEvent = FabricOrderDeliveredEvent;
var FabricOrderProcessEventFactory = (function (_super) {
    __extends(FabricOrderProcessEventFactory, _super);
    function FabricOrderProcessEventFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FabricOrderProcessEventFactory.prototype.getExitEvent = function (nextTime, processName) {
        return new FabricOrderDeliveredEvent(nextTime, processName);
    };
    return FabricOrderProcessEventFactory;
}(base_event_1.EventFactory));
exports.FabricOrderProcessEventFactory = FabricOrderProcessEventFactory;
//# sourceMappingURL=fabric-order-delivered.event.js.map