"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultItem = void 0;
var DefaultItem = (function () {
    function DefaultItem(priority) {
        if (priority === void 0) { priority = 0; }
        this._priority = priority;
    }
    DefaultItem.prototype.getPriority = function () {
        return this._priority;
    };
    DefaultItem.prototype.exit = function () { };
    return DefaultItem;
}());
exports.DefaultItem = DefaultItem;
//# sourceMappingURL=default-item.js.map