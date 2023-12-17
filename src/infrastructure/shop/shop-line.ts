import { Element } from '../../core/element';
import { CreateChannel } from '../../core/create';
import { CreateExitEvent } from '../../core/events/create-exit.event';
import { ProcessChannel } from '../../core/process';
import { ConstantGenerator } from '../../core/generators/constant.generator';
import { ProcessSubChannel } from '../../core/sub-process';

import { ProcessCustomer } from './process-customer.channel';
import { CreateShopOrder } from './create-shop-order.channel';
import { ProcessOrderAndDeliverResources } from './process-delivery-resources.channel';

export const createShopLine = (shopNum: number) => {
  const elements: Element[] = [];

  // PROCESS CUSTOMERS
  const createCustomerEl = new CreateChannel(new ConstantGenerator(0.1));

  createCustomerEl.setName(`Create customer | Shop ${shopNum + 1}`);

  createCustomerEl.setNextEvent(new CreateExitEvent(0));

  const processCustomer = new ProcessCustomer(
    new ConstantGenerator(0),
    shopNum,
  );
  processCustomer.setName(`Process customer | Shop ${shopNum + 1}`);

  createCustomerEl.setNextElement(processCustomer);

  elements.push(createCustomerEl, processCustomer);

  // REFILL RESOURCES LINE
  const shopOrderCreater = new CreateShopOrder(
    new ConstantGenerator(0),
    shopNum,
    70,
  );
  shopOrderCreater.setName(`Order creater | Shop ${shopNum + 1}`);

  const orderDelivery = new ProcessChannel([
    new ProcessSubChannel(new ConstantGenerator(1)),
  ]);
  orderDelivery.setName(`Order delivery | Shop ${shopNum + 1}`);

  shopOrderCreater.setNextElement(orderDelivery);

  const processOrderAndDeliveryResources = new ProcessOrderAndDeliverResources(
    new ConstantGenerator(5),
    shopNum,
    100,
  );

  processOrderAndDeliveryResources.setName(
    `Process order | Shop ${shopNum + 1}`,
  );

  orderDelivery.setNextElement(processOrderAndDeliveryResources);

  elements.push(
    shopOrderCreater,
    orderDelivery,
    processOrderAndDeliveryResources,
  );

  return elements;
};
