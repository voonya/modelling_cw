import { Element } from '../../core/element';
import { ProcessEventFactory } from '../../core/events/process-exit.event';
import { DefaultItem } from '../../core/default-item';
import { BaseNumberGenerator } from '../../core/generators/base.generator';

export class ProcessCustomer extends Element {
  private _shopNum: number;
  private _maxQueueSize: number;

  constructor(
    delayGenerator: BaseNumberGenerator,
    shopNum: number,
    maxQueueSize: number = Infinity,
  ) {
    super(delayGenerator, new ProcessEventFactory());

    this._shopNum = shopNum;
    this._maxQueueSize = maxQueueSize;
  }

  entry(state: any): void {
    super.entry(state);

    if (state.shopsState?.[this._shopNum]?.resourcesInShop === 0) {
      this._statsService.addRefusal();
      return;
    }

    if (!this._isProcessing) {
      this._isProcessing = true;
      state.shopsState[this._shopNum].resourcesInShop -= 1;
      this._nextEvent = this.createNextEvent();

      return;
    }

    if (this._queue.length >= this._maxQueueSize) {
      this._statsService.addRefusal();
      return;
    }

    this._queue.push(1);
  }

  exit(state: any): void {
    super.exit(state);
    this._isProcessing = false;
    this._nextElement?.entry(state);

    if (this._queue.length > 0) {
      if (state.shopsState?.[this._shopNum]?.resourcesInShop === 0) {
        this._queue.forEach((el) => this._statsService.addRefusal());
        this._queue = [];
        return;
      }
      const nextItem = this._queue.shift();
      state.shopsState[this._shopNum].resourcesInShop -= 1;
      this._nextEvent = this.createNextEvent();
      this._isProcessing = true;
    }
  }
}
