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
exports.CreateEventFactory = exports.CreateExitEvent = void 0;
var base_event_1 = require("./base.event");
var events_priority_const_1 = require("../../shared/consts/events-priority.const");
var CreateExitEvent = (function (_super) {
    __extends(CreateExitEvent, _super);
    function CreateExitEvent(time, processName, priority) {
        if (processName === void 0) { processName = ''; }
        if (priority === void 0) { priority = events_priority_const_1.CREATE_EXIT_EVENT_PRIORITY; }
        var _this = _super.call(this) || this;
        _this.time = time;
        _this.name = "Create ".concat(processName, " exit event");
        _this.priority = priority;
        return _this;
    }
    return CreateExitEvent;
}(base_event_1.Event));
exports.CreateExitEvent = CreateExitEvent;
var CreateEventFactory = (function (_super) {
    __extends(CreateEventFactory, _super);
    function CreateEventFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateEventFactory.prototype.getExitEvent = function (nextTime, processName) {
        return new CreateExitEvent(nextTime, processName, events_priority_const_1.CREATE_EXIT_EVENT_PRIORITY);
    };
    return CreateEventFactory;
}(base_event_1.EventFactory));
exports.CreateEventFactory = CreateEventFactory;
//# sourceMappingURL=create-exit.event.js.map