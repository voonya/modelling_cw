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
    delayedEventsTime: number[] = [],
    maxQueueSize = Infinity,
  ) {
    super(subChannels, new FabricOrderProcessEventFactory(), maxQueueSize);
    this._statsService = new FabricDeliveryStatsService();
    this._orderSize = orderSize;

    this._delayedEvents = delayedEventsTime.map((time) =>
      this._eventFactory.getExitEvent(time, this._name),
    );
  }

  exit(state: any): void {
    state.resourcesInWholeSaleStore += this._orderSize;

    if (
      !this._subChannels.some(
        (channel) => channel.getNextEvent(state)?.time == this._currentTime,
      )
    )
      this._delayedEvents = this._delayedEvents.filter(
        (e) => e.time !== this._currentTime,
      );

    super.exit(state);
  }

  getNextEvent(state: any): Event {
    const event = super.getNextEvent(state);

    const nearestEvent = this._delayedEvents.find((e) => e.time < event?.time);

    return nearestEvent ?? event;
  }
}
