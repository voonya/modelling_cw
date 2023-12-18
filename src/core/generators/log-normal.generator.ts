import { genRandNumAboveZero } from '../utils/number-gen.utils';
import { BaseNumberGenerator } from './base.generator';
import { NormalNumberGenerator } from './normal.generator';

export class LogNormalNumberGenerator extends BaseNumberGenerator {
  protected avg: number;
  protected dev: number;

  constructor(avg: number, dev: number) {
    super();
    this.avg = avg;
    this.dev = dev;
  }

  getNumber() {
    const iSum = 12;
    let mu = this.avg;
    let sigma = this.dev;

    let mu2 = mu * mu;
    let sigma2 = sigma * sigma;

    let sq = Math.sqrt(Math.log(1 + sigma2 / mu2));
    let mean = Math.log(mu) - (sq * sq) / 2;

    let x = 0;

    for (let a = 0; a < iSum; a++) {
      x += genRandNumAboveZero();
    }

    x -= iSum / 2.0;

    return Math.exp(x * sq + mean);
  }
}
