import { BaseNumberGenerator } from './base.generator';

export class ConstantGenerator extends BaseNumberGenerator {
  private _value: number;

  constructor(value: number) {
    super();
    this._value = value;
  }

  getNumber(): number {
    return this._value;
  }
}
