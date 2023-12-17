import { BaseNumberGenerator } from './base.generator';
import { NormalNumberGenerator } from './normal.generator';

export class LogNormalNumberGenerator extends NormalNumberGenerator {
  constructor(avg: number, dev: number) {
    super(avg, dev);
  }

  getNumber() {
    const num = super.getNumber();

    return Math.exp(num);
  }
}
