import { BaseNumberGenerator } from './base.generator';

export class NormalNumberGenerator extends BaseNumberGenerator {
  protected avg: number;
  protected dev: number;

  constructor(avg: number, dev: number) {
    super();
    this.avg = avg;
    this.dev = dev;
  }

  getNumber() {
    let miu = 0;
    for (let i = 0; i < 12; i++) {
      miu += Math.random();
    }

    miu -= 6;

    return this.dev * miu + this.avg;
  }
}
