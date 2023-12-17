export class Event {
  name: string;
  priority: number; // higher better
  time: number;
}

export abstract class EventFactory {
  public abstract getExitEvent(nextTime: number, processName: string): Event;
}
