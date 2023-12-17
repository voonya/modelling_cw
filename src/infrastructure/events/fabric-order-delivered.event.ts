import { Event, EventFactory } from '../../core/events/base.event';
import { FABRIC_ORDER_DELIVERED_PRIORITY } from '../../shared/consts/events-priority.const';

export class FabricOrderDeliveredEvent extends Event {
  constructor(
    time: number,
    processName: string = '',
    priority: number = FABRIC_ORDER_DELIVERED_PRIORITY,
  ) {
    super();
    this.time = time;
    this.name = `${processName} fabric order delivered`;
    this.priority = priority;
  }
}

export class FabricOrderProcessEventFactory extends EventFactory {
  public getExitEvent(nextTime: number, processName: string) {
    return new FabricOrderDeliveredEvent(nextTime, processName);
  }
}
