import { Element } from './core/element';
import { Event } from './core/events/base.event';

export class ModelState {
  resourcesInWholeSaleStore: number;
  shopsState: ShopState[];
}

class ShopState {
  resourcesInShop: number;
  orderSended: boolean;
}

export type ModelMiddleware = (
  elements: Element[],
  time: { currentTime: number; nextTime: number },
) => void;

export class Model {
  elements: Element[];
  middlewares: ModelMiddleware[];

  state: ModelState;

  readonly initialState: ModelState;

  constructor(
    elements: Element[] = [],
    middlewares: ModelMiddleware[] = [],
    initState: ModelState,
  ) {
    this.elements = elements;
    this.middlewares = middlewares;
    this.initialState = initState;
    this.state = structuredClone(initState);
  }

  simulate(timeMs: number) {
    let currentTime = 0;

    while (currentTime < timeMs) {
      let closestTimeNext = timeMs;
      let closestEvents: { node: Element; event: Event }[] = [];

      // GET CLOSEST EVENTS?

      // IF DEFAULT EVENT LET NODE TO PROCESS ELSE PROCESS MODEL
      for (const element of this.elements) {
        const elementNextEvent: Event = element.getNextEvent(this.state);

        if (elementNextEvent?.time < closestTimeNext) {
          closestTimeNext = elementNextEvent.time;
          closestEvents = [{ node: element, event: elementNextEvent }];
        } else if (elementNextEvent?.time === closestTimeNext) {
          closestEvents.push({ node: element, event: elementNextEvent });
        }
      }

      if (closestTimeNext >= timeMs) {
        break;
      }

      console.log(`\n--Current time: ${currentTime} ${closestTimeNext}`);
      const deltaTime = closestTimeNext - currentTime;

      for (const element of this.elements) {
        element.updateCurrentTime(closestTimeNext);
      }

      // PROCESS EVENTS
      closestEvents.sort((el1, el2) => el2.event.priority - el1.event.priority);
      // console.log('LEnth: ' + closestEvents.length);
      let i = 0;

      // for (const middleware of this.middlewares) {
      //   middleware(this.networkElements, {
      //     currentTime,
      //     nextTime: closestTimeNext,
      //   });
      // }
      currentTime = closestTimeNext;

      for (const closestEvent of closestEvents) {
        //console.log(i + ' ' + closestEvent.node.getName());
        closestEvent.node.exit(this.state);
      }

      for (const element of this.elements) {
        element.calcStatistic(deltaTime, this.state);
      }

      // for (const element of this.elements) {
      //   console.log(
      //     `${element.getName()} | Stats: ${JSON.stringify(
      //       element.getStats(currentTime),
      //     )}`,
      //   );
      // }
    }
    console.log(`State: ${JSON.stringify(this.state)}`);
    for (const element of this.elements) {
      console.log(
        `${element.getName()} | Stats: ${JSON.stringify(
          element.getStats(currentTime),
        )}`,
      );
    }

    //return [];
  }

  // public processEvents(events: Event[]) {
  //     if()
  // }

  // or let node to handle his event because all nodes has only one event that they produce
  // make it like template method
  // by default event not cause state update
  // then we can inherith some classes to ovveride process their events and will change state of model
}
