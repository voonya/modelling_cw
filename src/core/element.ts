import { DefaultItem } from './default-item';
import { BaseNumberGenerator } from './generators/base.generator';
import { StatsService, DefaultStats } from './stats/stats.service';
import { EventFactory, Event } from './events/base.event';

export abstract class Element {
  protected _name = '';

  protected _currentTime = 0;
  protected _nextEvent: Event | null = null;
  protected _delayGenerator: BaseNumberGenerator | null = null;
  protected _isProcessing = false;
  protected _timeWorking = 0;
  protected _statsService = new StatsService();
  protected _processingItem: DefaultItem | null;

  protected _eventFactory: EventFactory;
  protected _nextElement: Element | null;
  protected _queue: number[] = [];
  //protected _nextElementProvider?: NextElementProvider<T>;

  constructor(delayGenerator: BaseNumberGenerator, eventFactory: EventFactory) {
    this._delayGenerator = delayGenerator;
    this._eventFactory = eventFactory;
  }

  protected countExit = 0;

  entry(state: any) {
    this._statsService.addEntry();
  }

  exit(state: any) {
    this._statsService.addExit();
    this._nextEvent = null;
  }

  getNextEvent(state: any): Event {
    return this._nextEvent;
  }

  setNextEvent(event: Event) {
    this._nextEvent = event;
  }

  calcStatistic(deltaTime: number, state: any) {
    this._statsService.calcStats(deltaTime, this._queue.length, state);
  }

  getStats(currentTime: number): DefaultStats {
    return this._statsService.getStats(currentTime);
  }

  log() {
    console.log(`*********${this._name}*********`);
  }

  protected createNextEvent() {
    const nextTime = this._currentTime + this._delayGenerator.getNumber();
    return this._eventFactory.getExitEvent(nextTime, this._name);
  }

  setDelayGenerator(generator: BaseNumberGenerator): Element {
    this._delayGenerator = generator;
    return this;
  }

  setNextElement(element: Element): Element {
    this._nextElement = element;
    return this;
  }

  setEventFactory(eventFactory: EventFactory): Element {
    this._eventFactory = eventFactory;
    return this;
  }

  setName(name: string): Element {
    this._name = name;
    return this;
  }

  updateCurrentTime(time: number) {
    this._currentTime = time;
  }

  getName() {
    return this._name;
  }

  getIsProcessing() {
    return this._isProcessing;
  }
}
