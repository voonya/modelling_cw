import { Element } from './element';
import { DefaultItem } from './default-item';
import { BaseNumberGenerator } from './generators/base.generator';
import { ProcessEventFactory } from './events/process-exit.event';

export class ProcessSubChannel extends Element {
  constructor(delayGenerator: BaseNumberGenerator) {
    super(delayGenerator, new ProcessEventFactory());
    this.setDelayGenerator(delayGenerator);
  }

  entry(state: any): void {
    this._isProcessing = true;
    this._nextEvent = this.createNextEvent();
  }

  exit(state: any): void {
    super.exit(state);
    this._isProcessing = false;
  }
}
