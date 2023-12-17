import { Element } from '../../core/element';
import { Event } from '../../core/events/base.event';
import { CreateEventFactory } from '../../core/events/create-exit.event';
import { DefaultItem } from '../../core/default-item';
import { BaseNumberGenerator } from '../../core/generators/base.generator';

export class CreateShopOrder extends Element {
  private _shopNum: number;
  private _nominalResourceCount: number;

  constructor(
    delayGenerator: BaseNumberGenerator,
    shopNum: number,
    nominalResourceCount: number,
  ) {
    super(delayGenerator, new CreateEventFactory());
    this._shopNum = shopNum;
    this._nominalResourceCount = nominalResourceCount;
  }

  getNextEvent(state: any): Event {
    if (
      state.shopsState?.[this._shopNum]?.resourcesInShop <
        this._nominalResourceCount &&
      !state.shopsState?.[this._shopNum]?.orderSended
    ) {
      this._nextEvent = this.createNextEvent();
    }

    return this._nextEvent;
  }

  exit(state: any): void {
    super.exit(state);
    if (state.shopsState[this._shopNum]) {
      state.shopsState[this._shopNum].orderSended = true;
    }

    this._nextElement?.entry(state, new DefaultItem());
  }
}
