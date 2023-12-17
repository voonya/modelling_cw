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
exports.ProcessEventFactory = exports.ProcessExitEvent = void 0;
var base_event_1 = require("./base.event");
var events_priority_const_1 = require("../../shared/consts/events-priority.const");
var ProcessExitEvent = (function (_super) {
    __extends(ProcessExitEvent, _super);
    function ProcessExitEvent(time, processName, priority) {
        if (processName === void 0) { processName = ''; }
        if (priority === void 0) { priority = events_priority_const_1.PROCESS_EXIT_EVENT_PRIORITY; }
        var _this = _super.call(this) || this;
        _this.time = time;
        _this.name = "Process ".concat(processName, " exit event");
        _this.priority = priority;
        return _this;
    }
    return ProcessExitEvent;
}(base_event_1.Event));
exports.ProcessExitEvent = ProcessExitEvent;
var ProcessEventFactory = (function (_super) {
    __extends(ProcessEventFactory, _super);
    function ProcessEventFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProcessEventFactory.prototype.getExitEvent = function (nextTime, processName) {
        return new ProcessExitEvent(nextTime, processName, events_priority_const_1.PROCESS_EXIT_EVENT_PRIORITY);
    };
    return ProcessEventFactory;
}(base_event_1.EventFactory));
exports.ProcessEventFactory = ProcessEventFactory;
//# sourceMappingURL=process-exit.event.js.map