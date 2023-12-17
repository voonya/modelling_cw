"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = exports.ModelState = void 0;
var ModelState = (function () {
    function ModelState() {
    }
    return ModelState;
}());
exports.ModelState = ModelState;
var ShopState = (function () {
    function ShopState() {
    }
    return ShopState;
}());
var Model = (function () {
    function Model(elements, middlewares, initState) {
        if (elements === void 0) { elements = []; }
        if (middlewares === void 0) { middlewares = []; }
        this.elements = elements;
        this.middlewares = middlewares;
        this.initialState = initState;
        this.state = structuredClone(initState);
    }
    Model.prototype.simulate = function (timeMs) {
        var currentTime = 0;
        while (currentTime < timeMs) {
            var closestTimeNext = timeMs;
            var closestEvents = [];
            for (var _i = 0, _a = this.elements; _i < _a.length; _i++) {
                var element = _a[_i];
                var elementNextEvent = element.getNextEvent(this.state);
                if ((elementNextEvent === null || elementNextEvent === void 0 ? void 0 : elementNextEvent.time) < closestTimeNext) {
                    closestTimeNext = elementNextEvent.time;
                    closestEvents = [{ node: element, event: elementNextEvent }];
                }
                else if ((elementNextEvent === null || elementNextEvent === void 0 ? void 0 : elementNextEvent.time) === closestTimeNext) {
                    closestEvents.push({ node: element, event: elementNextEvent });
                }
            }
            if (closestTimeNext >= timeMs) {
                break;
            }
            console.log("\n--Current time: ".concat(currentTime, " ").concat(closestTimeNext));
            var deltaTime = closestTimeNext - currentTime;
            for (var _b = 0, _c = this.elements; _b < _c.length; _b++) {
                var element = _c[_b];
                element.updateCurrentTime(closestTimeNext);
            }
            closestEvents.sort(function (el1, el2) { return el2.event.priority - el1.event.priority; });
            var i = 0;
            currentTime = closestTimeNext;
            for (var _d = 0, closestEvents_1 = closestEvents; _d < closestEvents_1.length; _d++) {
                var closestEvent = closestEvents_1[_d];
                closestEvent.node.exit(this.state);
            }
            for (var _e = 0, _f = this.elements; _e < _f.length; _e++) {
                var element = _f[_e];
                element.calcStatistic(deltaTime, this.state);
            }
        }
        console.log("State: ".concat(JSON.stringify(this.state)));
        for (var _g = 0, _h = this.elements; _g < _h.length; _g++) {
            var element = _h[_g];
            console.log("".concat(element.getName(), " | Stats: ").concat(JSON.stringify(element.getStats(currentTime))));
        }
    };
    return Model;
}());
exports.Model = Model;
//# sourceMappingURL=model.js.map