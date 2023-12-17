import { BaseNumberGenerator } from './base.generator';
import { genRandNumAboveZero } from '../utils/number-gen.utils';

export class ExponentialNumberGenerator extends BaseNumberGenerator {
  private avg: number;

  constructor(avg: number) {
    super();
    this.avg = avg;
  }

  getNumber() {
    let a = genRandNumAboveZero();

    a = -this.avg * Math.log(a);
    return a;
  }
}
