// import { NextElementProvider, NextNode } from './next-element.provider';
// import { DefaultItem } from '../default-item';

// export class NextElementProbabilityProvider<
//   T extends DefaultItem,
// > extends NextElementProvider<T> {
//   constructor(nextElements: NextNode<T>[]) {
//     // if (nextElements.reduce((acc, el) => acc + el.value, 0) > 1)
//     //   throw new Error('Sum of probability');

//     super(nextElements);
//   }

//   public entryNextElement(item: T) {
//     if (this.nextElements.length === 0) return;

//     const randNum = Math.random();

//     let minIntervalEdge = 0;
//     let maxIntervalEdge = 0;

//     for (const nextEl of this.nextElements) {
//       maxIntervalEdge += nextEl.value;

//       if (randNum >= minIntervalEdge && randNum < maxIntervalEdge) {
//         return nextEl.node.entry(item);
//       }

//       minIntervalEdge += nextEl.value;
//     }
//   }
// }
