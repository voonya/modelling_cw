"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Element = void 0;
var stats_service_1 = require("./stats/stats.service");
var Element = (function () {
    function Element(delayGenerator, eventFactory) {
        this._name = '';
        this._currentTime = 0;
        this._nextEvent = null;
        this._delayGenerator = null;
        this._isProcessing = false;
        this._timeWorking = 0;
        this._statsService = new stats_service_1.StatsService();
        this._queue = [];
        this.countExit = 0;
        this._delayGenerator = delayGenerator;
        this._eventFactory = eventFactory;
    }
    Element.prototype.entry = function (state, item) {
        this._statsService.addEntry();
    };
    Element.prototype.exit = function (state) {
        this._statsService.addExit();
        this._nextEvent = null;
    };
    Element.prototype.getNextEvent = function (state) {
        return this._nextEvent;
    };
    Element.prototype.setNextEvent = function (event) {
        this._nextEvent = event;
    };
    Element.prototype.calcStatistic = function (deltaTime, state) {
        this._statsService.calcStats(deltaTime, this._queue.length, state);
    };
    Element.prototype.getStats = function (currentTime) {
        return this._statsService.getStats(currentTime);
    };
    Element.prototype.log = function () {
        console.log("*********".concat(this._name, "*********"));
    };
    Element.prototype.createNextEvent = function () {
        var nextTime = this._currentTime + this._delayGenerator.getNumber();
        return this._eventFactory.getExitEvent(nextTime, this._name);
    };
    Element.prototype.setDelayGenerator = function (generator) {
        this._delayGenerator = generator;
        return this;
    };
    Element.prototype.setNextElement = function (element) {
        this._nextElement = element;
        return this;
    };
    Element.prototype.setEventFactory = function (eventFactory) {
        this._eventFactory = eventFactory;
        return this;
    };
    Element.prototype.setName = function (name) {
        this._name = name;
        return this;
    };
    Element.prototype.updateCurrentTime = function (time) {
        this._currentTime = time;
    };
    Element.prototype.getName = function () {
        return this._name;
    };
    Element.prototype.getIsProcessing = function () {
        return this._isProcessing;
    };
    return Element;
}());
exports.Element = Element;
//# sourceMappingURL=element.js.map