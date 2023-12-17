import { EventFactory, Event } from './base.event';
import { CREATE_EXIT_EVENT_PRIORITY } from '../../shared/consts/events-priority.const';

export class CreateExitEvent extends Event {
  constructor(
    time: number,
    processName: string = '',
    priority: number = CREATE_EXIT_EVENT_PRIORITY,
  ) {
    super();
    this.time = time;
    this.name = `Create ${processName} exit event`;
    this.priority = priority;
  }
}

export class CreateEventFactory extends EventFactory {
  public getExitEvent(nextTime: number, processName: string) {
    return new CreateExitEvent(
      nextTime,
      processName,
      CREATE_EXIT_EVENT_PRIORITY,
    );
  }
}
