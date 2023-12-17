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
exports.CreateShopOrder = void 0;
var element_1 = require("../../core/element");
var create_exit_event_1 = require("../../core/events/create-exit.event");
var default_item_1 = require("../../core/default-item");
var CreateShopOrder = (function (_super) {
    __extends(CreateShopOrder, _super);
    function CreateShopOrder(delayGenerator, shopNum, nominalResourceCount) {
        var _this = _super.call(this, delayGenerator, new create_exit_event_1.CreateEventFactory()) || this;
        _this._shopNum = shopNum;
        _this._nominalResourceCount = nominalResourceCount;
        return _this;
    }
    CreateShopOrder.prototype.getNextEvent = function (state) {
        var _a, _b, _c, _d;
        if (((_b = (_a = state.shopsState) === null || _a === void 0 ? void 0 : _a[this._shopNum]) === null || _b === void 0 ? void 0 : _b.resourcesInShop) <
            this._nominalResourceCount &&
            !((_d = (_c = state.shopsState) === null || _c === void 0 ? void 0 : _c[this._shopNum]) === null || _d === void 0 ? void 0 : _d.orderSended)) {
            this._nextEvent = this.createNextEvent();
        }
        return this._nextEvent;
    };
    CreateShopOrder.prototype.exit = function (state) {
        var _a;
        _super.prototype.exit.call(this, state);
        if (state.shopsState[this._shopNum]) {
            state.shopsState[this._shopNum].orderSended = true;
        }
        (_a = this._nextElement) === null || _a === void 0 ? void 0 : _a.entry(state, new default_item_1.DefaultItem());
    };
    return CreateShopOrder;
}(element_1.Element));
exports.CreateShopOrder = CreateShopOrder;
//# sourceMappingURL=create-shop-order.channel.js.map