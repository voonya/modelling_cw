import { Event, EventFactory } from './base.event';
import { PROCESS_EXIT_EVENT_PRIORITY } from '../../shared/consts/events-priority.const';

export class ProcessExitEvent extends Event {
  constructor(
    time: number,
    processName: string = '',
    priority: number = PROCESS_EXIT_EVENT_PRIORITY,
  ) {
    super();
    this.time = time;
    this.name = `Process ${processName} exit event`;
    this.priority = priority;
  }
}

export class ProcessEventFactory extends EventFactory {
  public getExitEvent(nextTime: number, processName: string) {
    return new ProcessExitEvent(
      nextTime,
      processName,
      PROCESS_EXIT_EVENT_PRIORITY,
    );
  }
}
