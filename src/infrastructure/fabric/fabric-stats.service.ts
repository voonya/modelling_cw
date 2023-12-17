import { StatsService } from '../../core/stats/stats.service';

export class FabricDeliveryStatsService extends StatsService {
  protected _avgResourceCount = 0;
  calcStats(deltaTime: number, queue: number, state: any) {
    super.calcStats(deltaTime, queue, state);

    this._avgResourceCount += deltaTime * state.resourcesInWholeSaleStore;
  }

  getStats(currentTime: number) {
    const stats = super.getStats(currentTime);

    return {
      ...stats,
      avgResourceCount: this._avgResourceCount / currentTime,
    };
  }
}
