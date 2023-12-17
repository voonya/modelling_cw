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
exports.CreateChannel = void 0;
var element_1 = require("./element");
var create_exit_event_1 = require("./events/create-exit.event");
var CreateChannel = (function (_super) {
    __extends(CreateChannel, _super);
    function CreateChannel(delayGenerator) {
        var _this = _super.call(this, delayGenerator, new create_exit_event_1.CreateEventFactory()) || this;
        _this._nextEvent = _this.createNextEvent();
        return _this;
    }
    CreateChannel.prototype.exit = function (state) {
        var _a;
        _super.prototype.exit.call(this, state);
        this._nextEvent = this.createNextEvent();
        (_a = this._nextElement) === null || _a === void 0 ? void 0 : _a.entry(state);
    };
    return CreateChannel;
}(element_1.Element));
exports.CreateChannel = CreateChannel;
//# sourceMappingURL=create.js.map