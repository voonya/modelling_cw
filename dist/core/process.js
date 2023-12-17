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
exports.ProcessChannel = void 0;
var element_1 = require("./element");
var process_exit_event_1 = require("./events/process-exit.event");
var ProcessChannel = (function (_super) {
    __extends(ProcessChannel, _super);
    function ProcessChannel(subChannels, eventFactory, maxQueueSize) {
        if (subChannels === void 0) { subChannels = []; }
        if (eventFactory === void 0) { eventFactory = new process_exit_event_1.ProcessEventFactory(); }
        if (maxQueueSize === void 0) { maxQueueSize = Infinity; }
        var _this = _super.call(this, null, eventFactory) || this;
        _this._queue = [];
        _this._maxQueueSize = maxQueueSize;
        _this._subChannels = subChannels;
        return _this;
    }
    ProcessChannel.prototype.entry = function (state, item) {
        _super.prototype.entry.call(this, state, item);
        for (var _i = 0, _a = this._subChannels; _i < _a.length; _i++) {
            var subChannel = _a[_i];
            if (!subChannel.getIsProcessing()) {
                subChannel.entry(state, item);
                return;
            }
        }
        if (this._queue.length >= this._maxQueueSize) {
            this._statsService.addRefusal();
            return;
        }
        this._queue.push(item);
    };
    ProcessChannel.prototype.getNextEvent = function (state) {
        var closestTime = Infinity;
        var closestEvent = null;
        for (var _i = 0, _a = this._subChannels; _i < _a.length; _i++) {
            var subChannel = _a[_i];
            var subChannelEvent = subChannel.getNextEvent(state);
            if ((subChannelEvent === null || subChannelEvent === void 0 ? void 0 : subChannelEvent.time) < closestTime) {
                closestTime = subChannelEvent.time;
                closestEvent = subChannelEvent;
            }
        }
        return closestEvent;
    };
    ProcessChannel.prototype.updateCurrentTime = function (time) {
        this._currentTime = time;
        for (var _i = 0, _a = this._subChannels; _i < _a.length; _i++) {
            var subChannel = _a[_i];
            subChannel.updateCurrentTime(time);
        }
    };
    ProcessChannel.prototype.exit = function (state) {
        var _a, _b;
        _super.prototype.exit.call(this, state);
        for (var _i = 0, _c = this._subChannels; _i < _c.length; _i++) {
            var subChannel = _c[_i];
            if (((_a = subChannel.getNextEvent(state)) === null || _a === void 0 ? void 0 : _a.time) === this._currentTime) {
                var processedItem = subChannel.getCurrentItem();
                subChannel.exit(state);
                (_b = this._nextElement) === null || _b === void 0 ? void 0 : _b.entry(state, processedItem);
                if (this._queue.length > 0) {
                    var nextItem = this._queue.shift();
                    subChannel.entry(state, nextItem);
                }
            }
        }
    };
    return ProcessChannel;
}(element_1.Element));
exports.ProcessChannel = ProcessChannel;
//# sourceMappingURL=process.js.map