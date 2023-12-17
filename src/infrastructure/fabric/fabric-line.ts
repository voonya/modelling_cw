import { Element } from '../../core/element';
import { CreateChannel } from '../../core/create';
import { ConstantGenerator } from '../../core/generators/constant.generator';
import { TimeOrderRecieveGenerator } from '../../infrastructure/generators/time-order-recieved.generator';
import { ProcessSubChannel } from '../../core/sub-process';

import { FabricDeliveryProcess } from './fabric-delivery.channel';

export const createFabricLine = () => {
  const elements: Element[] = [];

  const createFarbricOrderEl = new CreateChannel(new ConstantGenerator(14));

  createFarbricOrderEl.setName('Fabric Order');

  const fabricProcessTimeGenerator = new TimeOrderRecieveGenerator(
    90,
    10,
    60,
    120,
  );

  const fabricSubChannels = [];

  for (let i = 0; i < 25; i++) {
    fabricSubChannels.push(new ProcessSubChannel(fabricProcessTimeGenerator));
  }

  const processAndDelivery = new FabricDeliveryProcess(
    1800,
    fabricSubChannels,
    [30, 60, 90],
  );
  processAndDelivery.setName('Process and delivery fabric order');

  createFarbricOrderEl.setNextElement(processAndDelivery);

  elements.push(createFarbricOrderEl, processAndDelivery);

  return elements;
};
