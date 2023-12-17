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
exports.ProcessCustomer = void 0;
var element_1 = require("../../core/element");
var process_exit_event_1 = require("../../core/events/process-exit.event");
var ProcessCustomer = (function (_super) {
    __extends(ProcessCustomer, _super);
    function ProcessCustomer(delayGenerator, shopNum, maxQueueSize) {
        if (maxQueueSize === void 0) { maxQueueSize = Infinity; }
        var _this = _super.call(this, delayGenerator, new process_exit_event_1.ProcessEventFactory()) || this;
        _this._shopNum = shopNum;
        _this._maxQueueSize = maxQueueSize;
        return _this;
    }
    ProcessCustomer.prototype.entry = function (state) {
        var _a, _b;
        _super.prototype.entry.call(this, state);
        if (((_b = (_a = state.shopsState) === null || _a === void 0 ? void 0 : _a[this._shopNum]) === null || _b === void 0 ? void 0 : _b.resourcesInShop) === 0) {
            this._statsService.addRefusal();
            return;
        }
        if (!this._isProcessing) {
            this._isProcessing = true;
            state.shopsState[this._shopNum].resourcesInShop -= 1;
            this._nextEvent = this.createNextEvent();
            return;
        }
        if (this._queue.length >= this._maxQueueSize) {
            this._statsService.addRefusal();
            return;
        }
        this._queue.push(1);
    };
    ProcessCustomer.prototype.exit = function (state) {
        var _this = this;
        var _a, _b, _c;
        _super.prototype.exit.call(this, state);
        this._isProcessing = false;
        (_a = this._nextElement) === null || _a === void 0 ? void 0 : _a.entry(state);
        if (this._queue.length > 0) {
            if (((_c = (_b = state.shopsState) === null || _b === void 0 ? void 0 : _b[this._shopNum]) === null || _c === void 0 ? void 0 : _c.resourcesInShop) === 0) {
                this._queue.forEach(function (el) { return _this._statsService.addRefusal(); });
                this._queue = [];
                return;
            }
            var nextItem = this._queue.shift();
            state.shopsState[this._shopNum].resourcesInShop -= 1;
            this._nextEvent = this.createNextEvent();
            this._isProcessing = true;
        }
    };
    return ProcessCustomer;
}(element_1.Element));
exports.ProcessCustomer = ProcessCustomer;
//# sourceMappingURL=process-customer.channel.js.map