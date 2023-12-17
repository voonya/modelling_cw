import { Element } from './core/element';
import { Model, ModelSimulateResults, ModelState } from './model';
import { createFabricLine } from './infrastructure/fabric/fabric-line';
import { createShopLine } from './infrastructure/shop/shop-line';
import { FabricDeliveryStats } from './infrastructure/fabric/fabric-stats.service';
import { round } from './shared/utils/math.util';

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

const createModel = () => {
  const elements: Element[] = [];

  const fabricLineElements = createFabricLine();
  elements.push(...fabricLineElements);

  for (let i = 0; i < 6; i++) {
    elements.push(...createShopLine(i));
  }

  return new Model(elements, [], initState);
};

const resolveFinalStats = (results: ModelSimulateResults) => {
  const finalState = results.state;
  const finalStats = results.stats;

  console.log(finalStats);
  const resolvedFinalStats = finalStats
    .filter((el) => el.channelName.startsWith('Process customer | Shop'))
    .reduce(
      (buff, stat) => ({
        totalRefusalCount: buff.totalRefusalCount + stat.stats.countRefusal,
        totalEntryCount: buff.totalEntryCount + stat.stats.countEntry,
        shopsRefusal: buff.shopsRefusal.concat(stat.stats.percentRefusal),
      }),
      { totalRefusalCount: 0, totalEntryCount: 0, shopsRefusal: [] } as any,
    );

  resolvedFinalStats.totalPercentRefusal =
    resolvedFinalStats.totalRefusalCount / resolvedFinalStats.totalEntryCount;

  resolvedFinalStats.shopsCountDeliveredPerDay = finalStats
    .filter((el) => el.channelName.startsWith('Process order | Shop'))
    .map((el) => round(el.stats.countExit / results.time));

  resolvedFinalStats.shopsOrdersPerDay = finalStats
    .filter((el) => el.channelName.startsWith('Order delivery | Shop'))
    .map((el) => round(el.stats.countExit / results.time));

  resolvedFinalStats.avgResourceCountInWhosaleStore = round(
    (
      finalStats.find((el) =>
        el.channelName.startsWith('Process and delivery fabric order'),
      ).stats as FabricDeliveryStats
    ).avgResourceCount,
  );

  console.log(resolvedFinalStats);
};

const main = () => {
  const model = createModel();

  resolveFinalStats(model.simulate(300));
};

main();
