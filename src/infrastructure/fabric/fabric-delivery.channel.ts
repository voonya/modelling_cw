import { Event, EventFactory } from '../../core/events/base.event';
import { ProcessChannel } from '../../core/process';
import { ProcessSubChannel } from '../../core/sub-process';

import { FabricOrderProcessEventFactory } from '../events/fabric-order-delivered.event';
import { FabricDeliveryStatsService } from './fabric-stats.service';

export class FabricDeliveryProcess extends ProcessChannel {
  protected _eventFactory: EventFactory;
  protected _delayedEvents: Event[];

  protected _orderSize: number = 0;

  constructor(
    orderSize: number,
    subChannels: ProcessSubChannel[] = [],
    maxQueueSize = Infinity,
  ) {
    super(subChannels, new FabricOrderProcessEventFactory(), maxQueueSize);
    this._statsService = new FabricDeliveryStatsService();
    this._orderSize = orderSize;
  }

  exit(state: any): void {
    state.resourcesInWholeSaleStore += this._orderSize;
    super.exit(state);
  }
}
