import { BaseNumberGenerator } from './generators/base.generator';
import { StatsService, DefaultStats } from './stats/stats.service';
import { EventFactory, Event } from './events/base.event';

export abstract class Element {
  protected _name = '';

  protected _currentTime = 0;
  protected _nextEvent: Event | null = null;
  protected _isProcessing = false;
  protected _queue: number[];
  protected _delayedEvents: Event[];

  protected _delayGenerator: BaseNumberGenerator | null = null;
  protected _statsService: StatsService;
  protected _eventFactory: EventFactory;
  protected _nextElement: Element | null;

  constructor(
    delayGenerator: BaseNumberGenerator,
    eventFactory: EventFactory,
    statsService?: StatsService,
  ) {
    this._delayGenerator = delayGenerator;
    this._eventFactory = eventFactory;
    this._statsService = statsService || new StatsService();
    this._delayedEvents = [];
    this._queue = [];
  }

  setDelayedEventsTime(times: number[]) {
    this._delayedEvents = times.map((time) =>
      this._eventFactory.getExitEvent(time, this._name),
    );
  }

  entry(state: any) {
    this._statsService.addEntry();
  }

  exit(state: any) {
    this._statsService.addExit();
    this._nextEvent = null;

    if (this._nextEvent?.time != this._currentTime) {
      this._delayedEvents = this._delayedEvents.filter(
        (e) => e.time !== this._currentTime,
      );
    }
  }

  getNextEvent(state: any): Event {
    const event = this._nextEvent;

    const nearestEvent = this._delayedEvents.find((e) => e.time < event?.time);

    return nearestEvent ?? event;
  }

  calcStatistic(deltaTime: number, state: any) {
    this._statsService.calcStats(deltaTime, this._queue.length, state);
  }

  getStats(currentTime: number): DefaultStats {
    return this._statsService.getStats(currentTime);
  }

  updateCurrentTime(time: number) {
    this._currentTime = time;
  }

  protected createNextEvent() {
    const nextTime = this._currentTime + this._delayGenerator.getNumber();
    return this._eventFactory.getExitEvent(nextTime, this._name);
  }

  setNextElement(element: Element): Element {
    this._nextElement = element;
    return this;
  }

  setName(name: string): Element {
    this._name = name;
    return this;
  }

  getName() {
    return this._name;
  }

  getIsProcessing() {
    return this._isProcessing;
  }
}
