// import { DefaultItem } from '../default-item';
// import { NextElementProvider } from './next-element.provider';
// import { NextNode } from './next-element.provider';
// import { ProcessNode } from '../process';

// export class NextElementQueueProvider<
//   T extends DefaultItem,
// > extends NextElementProvider<T> {
//   constructor(nextElements: NextNode<T>[]) {
//     super(nextElements);
//   }

//   public entryNextElement(item: T) {
//     let minQueue = Infinity;
//     let nextElement: NextNode<T> = null;

//     for (const el of this.nextElements) {
//       const queueSize = (el.node as ProcessNode<T>).queue.length;

//       if (!nextElement || queueSize < minQueue) {
//         minQueue = queueSize;
//         nextElement = el;
//       }
//     }

//     return nextElement.node.entry(item);
//   }
// }
