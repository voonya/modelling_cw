"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("./model");
var fabric_line_1 = require("./infrastructure/fabric/fabric-line");
var shop_line_1 = require("./infrastructure/shop/shop-line");
var initState = {
    resourcesInWholeSaleStore: 1920,
    shopsState: [
        {
            resourcesInShop: 70,
            orderSended: false,
        },
        {
            resourcesInShop: 70,
            orderSended: false,
        },
        {
            resourcesInShop: 70,
            orderSended: false,
        },
        {
            resourcesInShop: 70,
            orderSended: false,
        },
        {
            resourcesInShop: 70,
            orderSended: false,
        },
        {
            resourcesInShop: 70,
            orderSended: false,
        },
    ],
};
var createTestModel = function () {
    var elements = [];
    var fabricLineElements = (0, fabric_line_1.createFabricLine)();
    elements.push.apply(elements, fabricLineElements);
    for (var i = 0; i < 6; i++) {
        elements.push.apply(elements, (0, shop_line_1.createShopLine)(i));
    }
    return new model_1.Model(elements, [], initState);
};
var main = function () {
    var model = createTestModel();
    model.simulate(300);
};
main();
//# sourceMappingURL=main.js.map