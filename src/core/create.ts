import { Element } from './element';
import { DefaultItem } from './default-item';
import { BaseNumberGenerator } from './generators/base.generator';
import { CreateEventFactory } from './events/create-exit.event';

export class CreateChannel extends Element {
  constructor(delayGenerator: BaseNumberGenerator) {
    super(delayGenerator, new CreateEventFactory());
    this._nextEvent = this.createNextEvent();
  }

  exit(state: any) {
    super.exit(state);
    this._nextEvent = this.createNextEvent();

    this._nextElement?.entry(state, new DefaultItem());
  }
}
