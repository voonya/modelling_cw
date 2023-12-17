import { NormalNumberGenerator } from '../../core/generators/normal.generator';

export class TimeOrderRecieveGenerator extends NormalNumberGenerator {
  min: number;
  max: number;

  constructor(avg: number, dev: number, min?: number, max?: number) {
    super(avg, dev);

    this.min = min;
    this.max = max;
  }

  getNumber() {
    const num = super.getNumber();

    if (num < this?.min) {
      return this.min;
    }

    if (num > this?.max) {
      return this.max;
    }

    return num;
  }
}
