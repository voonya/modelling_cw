import { Element } from './element';
import { DefaultItem } from './default-item';
import { BaseNumberGenerator } from './generators/base.generator';
import { ProcessEventFactory } from './events/process-exit.event';

export class ProcessSubChannel extends Element {
  protected _currentItem: DefaultItem;

  constructor(delayGenerator: BaseNumberGenerator) {
    super(delayGenerator, new ProcessEventFactory());
    this.setDelayGenerator(delayGenerator);
  }

  entry(state: any, item: DefaultItem): void {
    this._isProcessing = true;
    this._nextEvent = this.createNextEvent();
    this._currentItem = item;
  }

  exit(state: any): void {
    super.exit(state);
    this._isProcessing = false;
  }

  getCurrentItem() {
    return this._currentItem;
  }
}
