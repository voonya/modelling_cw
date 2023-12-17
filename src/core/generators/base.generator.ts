import { DefaultItem } from '../default-item';

export abstract class BaseNumberGenerator {
  abstract getNumber(): number;
}

// export class ConstantDelayGenerator extends DelayGenerator {
//   private avgDelay: number;

//   constructor(avgDelay: number) {
//     super();
//     this.avgDelay = avgDelay;
//   }

//   getDelay() {
//     return this.avgDelay;
//   }
// }

// export class UniformDelayGenerator extends DelayGenerator {
//   private min: number;
//   private max: number;

//   constructor(min: number, max: number) {
//     super();
//     this.min = min;
//     this.max = max;
//   }

//   getDelay() {
//     return (this.max - this.min) * Math.random() + this.min;
//   }
// }

// export class ExpDelayGenerator extends DelayGenerator {
//   private mathExp: number;

//   constructor(mathExp: number) {
//     super();
//     this.mathExp = mathExp;
//   }

//   getDelay() {
//     let a = genRandNumAboveZero();

//     a = -this.mathExp * Math.log(a);
//     return a;
//   }
// }

// export class ErlangDelayGenerator extends DelayGenerator {
//   private avg: number;
//   private k: number;

//   constructor(avg: number, k: number) {
//     super();
//     this.avg = avg;
//     this.k = k;
//   }

//   getDelay() {
//     let num = 0;

//     for (let i = 0; i < this.k; i++) {
//       let randNum = genRandNumAboveZero();
//       num += -Math.log(1 - randNum) * this.avg;
//     }

//     return num;
//   }
// }
