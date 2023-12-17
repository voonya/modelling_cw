export class DefaultItem {
  protected _priority: number;

  constructor(priority: number = 0) {
    this._priority = priority;
  }

  getPriority() {
    return this._priority;
  }

  exit() {}
}
