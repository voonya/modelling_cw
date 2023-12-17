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
exports.ProcessSubChannel = void 0;
var element_1 = require("./element");
var process_exit_event_1 = require("./events/process-exit.event");
var ProcessSubChannel = (function (_super) {
    __extends(ProcessSubChannel, _super);
    function ProcessSubChannel(delayGenerator) {
        var _this = _super.call(this, delayGenerator, new process_exit_event_1.ProcessEventFactory()) || this;
        _this.setDelayGenerator(delayGenerator);
        return _this;
    }
    ProcessSubChannel.prototype.entry = function (state, item) {
        this._isProcessing = true;
        this._nextEvent = this.createNextEvent();
        this._currentItem = item;
    };
    ProcessSubChannel.prototype.exit = function (state) {
        _super.prototype.exit.call(this, state);
        this._isProcessing = false;
    };
    ProcessSubChannel.prototype.getCurrentItem = function () {
        return this._currentItem;
    };
    return ProcessSubChannel;
}(element_1.Element));
exports.ProcessSubChannel = ProcessSubChannel;
//# sourceMappingURL=sub-process.js.map