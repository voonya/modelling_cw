import { Element } from './element';
import { ProcessSubChannel } from './sub-process';
import { EventFactory, Event } from './events/base.event';
import { ProcessEventFactory } from './events/process-exit.event';

export class ProcessChannel extends Element {
  protected _subChannels: ProcessSubChannel[];
  protected _maxQueueSize: number;

  constructor(
    subChannels: ProcessSubChannel[] = [],
    eventFactory: EventFactory = new ProcessEventFactory(),
    maxQueueSize = Infinity,
  ) {
    super(null, eventFactory);
    this._queue = [];
    this._maxQueueSize = maxQueueSize;
    this._subChannels = subChannels;
  }

  entry(state: any): void {
    super.entry(state);

    for (const subChannel of this._subChannels) {
      if (!subChannel.getIsProcessing()) {
        subChannel.entry(state);
        return;
      }
    }

    if (this._queue.length >= this._maxQueueSize) {
      this._statsService.addRefusal();
      return;
    }

    this._queue.push(1);
  }

  getNextEvent(state: any): Event {
    let closestTime = Infinity;
    let closestEvent = null;

    for (const subChannel of this._subChannels) {
      const subChannelEvent = subChannel.getNextEvent(state);

      if (subChannelEvent?.time < closestTime) {
        closestTime = subChannelEvent.time;
        closestEvent = subChannelEvent;
      }
    }

    this._nextEvent = closestEvent;

    return super.getNextEvent(state);
  }

  updateCurrentTime(time: number): void {
    super.updateCurrentTime(time);

    for (const subChannel of this._subChannels) {
      subChannel.updateCurrentTime(time);
    }
  }

  exit(state: any): void {
    super.exit(state);
    for (const subChannel of this._subChannels) {
      if (subChannel.getNextEvent(state)?.time === this._currentTime) {
        subChannel.exit(state);
        this._nextElement?.entry(state);

        if (this._queue.length > 0) {
          const nextItem = this._queue.shift();
          subChannel.entry(state);
        }
      }
    }
  }
}
