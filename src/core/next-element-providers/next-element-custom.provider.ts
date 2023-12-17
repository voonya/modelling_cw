// import { NextElementProvider, NextNode } from './next-element.provider';
// import { DefaultItem } from '../default-item';

// export class NextElementCustomProvider<
//   T extends DefaultItem,
// > extends NextElementProvider<T> {
//   constructor(nextElements: NextNode<T>[]) {
//     super(nextElements);
//   }

//   public entryNextElement(item: T) {
//     if (this.nextElements.length === 0) return;

//     this.nextElements[0].node.entry(item);
//   }
// }
