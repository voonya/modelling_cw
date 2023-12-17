import { Element } from './core/element';
import { Model, ModelState } from './model';
import { createFabricLine } from './infrastructure/fabric/fabric-line';
import { createShopLine } from './infrastructure/shop/shop-line';

const initState: ModelState = {
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

const createTestModel = () => {
  const elements: Element[] = [];

  const fabricLineElements = createFabricLine();
  elements.push(...fabricLineElements);

  for (let i = 0; i < 6; i++) {
    elements.push(...createShopLine(i));
  }

  return new Model(elements, [], initState);
};

const main = () => {
  const model = createTestModel();

  model.simulate(300);
};

main();
