import { Element } from '../../core/element';
import { Event } from '../../core/events/base.event';
import { ProcessEventFactory } from '../../core/events/process-exit.event';
import { DefaultItem } from '../../core/default-item';
import { BaseNumberGenerator } from '../../core/generators/base.generator';

export class ProcessOrderAndDeliverResources extends Element {
  private _shopNum: number;
  private _maxQueueSize: number;
  private _orderSize: number;

  constructor(
    delayGenerator: BaseNumberGenerator,
    shopNum: number,
    orderSize: number,
    maxQueueSize: number = Infinity,
  ) {
    super(delayGenerator, new ProcessEventFactory());

    this._shopNum = shopNum;
    this._maxQueueSize = maxQueueSize;
    this._orderSize = orderSize;
  }

  entry(state: any, item: DefaultItem): void {
    super.entry(state, item);

    if (
      !this._isProcessing &&
      state.resourcesInWholeSaleStore >= this._orderSize
    ) {
      this._isProcessing = true;
      this._processingItem = item;
      //state.shopsState[this._shopNum].orderSended = false;
      state.resourcesInWholeSaleStore -= this._orderSize;

      this._nextEvent = this.createNextEvent();

      return;
    }

    if (this._queue.length >= this._maxQueueSize) {
      this._statsService.addRefusal();
      state.shopsState[this._shopNum].orderSended = false;
      return;
    }

    this._queue.push(item);
  }

  exit(state: any): void {
    super.exit(state);
    this._isProcessing = false;
    state.shopsState[this._shopNum].resourcesInShop += this._orderSize;
    state.shopsState[this._shopNum].orderSended = false;

    this._nextElement?.entry(state, this._processingItem);

    if (this._queue.length > 0) {
      if (state.resourcesInWholeSaleStore < this._orderSize) {
        return;
      }

      const nextItem = this._queue.shift();
      this._processingItem = nextItem;
      this._nextEvent = this.createNextEvent();
      this._isProcessing = true;
      state.resourcesInWholeSaleStore -= this._orderSize;
    }
  }

  getNextEvent(state: any): Event {
    if (
      !this._nextEvent &&
      this._queue.length > 0 &&
      state.resourcesInWholeSaleStore >= this._orderSize
    ) {
      const nextItem = this._queue.shift();
      this._processingItem = nextItem;
      this._nextEvent = this.createNextEvent();
      this._isProcessing = true;
      state.resourcesInWholeSaleStore -= this._orderSize;
    }

    return this._nextEvent;
  }
}
