// import { NextElementProvider, NextNode } from './next-element.provider';
// import { DefaultItem } from '../default-item';

// export class NextElementPriorityProvider<
//   T extends DefaultItem,
// > extends NextElementProvider<T> {
//   constructor(nextElements: NextNode<T>[]) {
//     super(nextElements.sort((el1, el2) => el1.value - el2.value));
//   }

//   public entryNextElement(item: T) {
//     if (this.nextElements.length === 0) return;

//     for (const nextEl of this.nextElements) {
//       if (!nextEl.node.getIsProcessing()) {
//         return nextEl.node.entry(item);
//       }
//     }

//     return this.nextElements[0].node.entry(item);
//   }
// }
