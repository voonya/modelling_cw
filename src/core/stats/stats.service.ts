export class DefaultStats {
  countEntry: number;
  countExit: number;
  countRefusal: number;
  percentRefusal: number;
  avgQueue: number;
}

export class StatsService {
  protected _currentTime: number = 0;
  protected _delayCountStatistic: number = 0;

  protected _countEntry: number = 0;
  protected _countExit: number = 0;
  protected _countRefusal: number = 0;

  protected _avgQueue: number = 0;

  constructor(delayCountStatistic: number = 0) {
    this._delayCountStatistic = delayCountStatistic;
  }

  calcStats(deltaTime: number, queue: number, state: any) {
    this._avgQueue += queue * deltaTime;
  }

  addEntry() {
    if (this._currentTime >= this._delayCountStatistic) {
      this._countEntry++;
    }
  }

  addExit() {
    if (this._currentTime >= this._delayCountStatistic) {
      this._countExit++;
    }
  }

  addRefusal() {
    if (this._currentTime >= this._delayCountStatistic) {
      this._countRefusal++;
    }
  }

  getStats(currentTime: number): DefaultStats {
    return {
      countEntry: this._countEntry,
      countExit: this._countExit,
      countRefusal: this._countRefusal,
      percentRefusal:
        this._countRefusal / (this._countEntry || this._countExit) ?? 0,
      avgQueue: this._avgQueue / currentTime,
    };
  }

  updateCurrentTime(currentTime: number) {
    this._currentTime = currentTime;
  }
}
