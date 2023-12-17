"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFabricLine = void 0;
var create_1 = require("../../core/create");
var constant_generator_1 = require("../../core/generators/constant.generator");
var time_order_recieved_generator_1 = require("../../infrastructure/generators/time-order-recieved.generator");
var sub_process_1 = require("../../core/sub-process");
var fabric_delivery_channel_1 = require("./fabric-delivery.channel");
var createFabricLine = function () {
    var elements = [];
    var createFarbricOrderEl = new create_1.CreateChannel(new constant_generator_1.ConstantGenerator(14));
    createFarbricOrderEl.setName('Fabric Order');
    var fabricProcessTimeGenerator = new time_order_recieved_generator_1.TimeOrderRecieveGenerator(90, 10, 60, 120);
    var fabricSubChannels = [];
    for (var i = 0; i < 25; i++) {
        fabricSubChannels.push(new sub_process_1.ProcessSubChannel(fabricProcessTimeGenerator));
    }
    var processAndDelivery = new fabric_delivery_channel_1.FabricDeliveryProcess(1800, fabricSubChannels, [30, 60, 90]);
    processAndDelivery.setName('Process and delivery fabric order');
    createFarbricOrderEl.setNextElement(processAndDelivery);
    elements.push(createFarbricOrderEl, processAndDelivery);
    return elements;
};
exports.createFabricLine = createFabricLine;
//# sourceMappingURL=fabric-line.js.map