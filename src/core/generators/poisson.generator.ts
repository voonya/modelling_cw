import { genRandNumAboveZero } from '../utils/number-gen.utils';
import { BaseNumberGenerator } from './base.generator';

export class PoisonNumberGenerator extends BaseNumberGenerator {
  private avg: number;

  constructor(avg: number) {
    super();
    this.avg = avg;
  }

  getNumber() {
    const L = Math.exp(-this.avg);
    let k = 0;
    let p = 1;

    do {
      k++;
      const u = genRandNumAboveZero();
      p *= u;
    } while (p > L);

    return k - 1;
  }
}
