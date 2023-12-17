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
exports.ProcessOrderAndDeliverResources = void 0;
var element_1 = require("../../core/element");
var process_exit_event_1 = require("../../core/events/process-exit.event");
var ProcessOrderAndDeliverResources = (function (_super) {
    __extends(ProcessOrderAndDeliverResources, _super);
    function ProcessOrderAndDeliverResources(delayGenerator, shopNum, orderSize, maxQueueSize) {
        if (maxQueueSize === void 0) { maxQueueSize = Infinity; }
        var _this = _super.call(this, delayGenerator, new process_exit_event_1.ProcessEventFactory()) || this;
        _this._shopNum = shopNum;
        _this._maxQueueSize = maxQueueSize;
        _this._orderSize = orderSize;
        return _this;
    }
    ProcessOrderAndDeliverResources.prototype.entry = function (state, item) {
        _super.prototype.entry.call(this, state, item);
        if (!this._isProcessing &&
            state.resourcesInWholeSaleStore >= this._orderSize) {
            this._isProcessing = true;
            this._processingItem = item;
            state.resourcesInWholeSaleStore -= this._orderSize;
            this._nextEvent = this.createNextEvent();
            return;
        }
        if (this._queue.length >= this._maxQueueSize) {
            this._statsService.addRefusal();
            state.shopsState[this._shopNum].orderSended = false;
            return;
        }
        this._queue.push(item);
    };
    ProcessOrderAndDeliverResources.prototype.exit = function (state) {
        var _a;
        _super.prototype.exit.call(this, state);
        this._isProcessing = false;
        state.shopsState[this._shopNum].resourcesInShop += this._orderSize;
        state.shopsState[this._shopNum].orderSended = false;
        (_a = this._nextElement) === null || _a === void 0 ? void 0 : _a.entry(state, this._processingItem);
        if (this._queue.length > 0) {
            if (state.resourcesInWholeSaleStore < this._orderSize) {
                return;
            }
            var nextItem = this._queue.shift();
            this._processingItem = nextItem;
            this._nextEvent = this.createNextEvent();
            this._isProcessing = true;
            state.resourcesInWholeSaleStore -= this._orderSize;
        }
    };
    ProcessOrderAndDeliverResources.prototype.getNextEvent = function (state) {
        if (!this._nextEvent &&
            this._queue.length > 0 &&
            state.resourcesInWholeSaleStore >= this._orderSize) {
            var nextItem = this._queue.shift();
            this._processingItem = nextItem;
            this._nextEvent = this.createNextEvent();
            this._isProcessing = true;
            state.resourcesInWholeSaleStore -= this._orderSize;
        }
        return this._nextEvent;
    };
    return ProcessOrderAndDeliverResources;
}(element_1.Element));
exports.ProcessOrderAndDeliverResources = ProcessOrderAndDeliverResources;
//# sourceMappingURL=process-delivery-resources.channel.js.map