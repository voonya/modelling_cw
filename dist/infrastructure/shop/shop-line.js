"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShopLine = void 0;
var create_1 = require("../../core/create");
var create_exit_event_1 = require("../../core/events/create-exit.event");
var process_1 = require("../../core/process");
var constant_generator_1 = require("../../core/generators/constant.generator");
var sub_process_1 = require("../../core/sub-process");
var process_customer_channel_1 = require("./process-customer.channel");
var create_shop_order_channel_1 = require("./create-shop-order.channel");
var process_delivery_resources_channel_1 = require("./process-delivery-resources.channel");
var createShopLine = function (shopNum) {
    var elements = [];
    var createCustomerEl = new create_1.CreateChannel(new constant_generator_1.ConstantGenerator(0.1));
    createCustomerEl.setName("Create customer | Shop ".concat(shopNum + 1));
    createCustomerEl.setNextEvent(new create_exit_event_1.CreateExitEvent(0));
    var processCustomer = new process_customer_channel_1.ProcessCustomer(new constant_generator_1.ConstantGenerator(0), shopNum);
    processCustomer.setName("Process customer | Shop ".concat(shopNum + 1));
    createCustomerEl.setNextElement(processCustomer);
    elements.push(createCustomerEl, processCustomer);
    var shopOrderCreater = new create_shop_order_channel_1.CreateShopOrder(new constant_generator_1.ConstantGenerator(0), shopNum, 70);
    shopOrderCreater.setName("Order creater | Shop ".concat(shopNum + 1));
    var orderDelivery = new process_1.ProcessChannel([
        new sub_process_1.ProcessSubChannel(new constant_generator_1.ConstantGenerator(1)),
    ]);
    orderDelivery.setName("Order delivery | Shop ".concat(shopNum + 1));
    shopOrderCreater.setNextElement(orderDelivery);
    var processOrderAndDeliveryResources = new process_delivery_resources_channel_1.ProcessOrderAndDeliverResources(new constant_generator_1.ConstantGenerator(5), shopNum, 300);
    processOrderAndDeliveryResources.setName("Process order | Shop ".concat(shopNum + 1));
    orderDelivery.setNextElement(processOrderAndDeliveryResources);
    elements.push(shopOrderCreater, orderDelivery, processOrderAndDeliveryResources);
    return elements;
};
exports.createShopLine = createShopLine;
//# sourceMappingURL=shop-line.js.map