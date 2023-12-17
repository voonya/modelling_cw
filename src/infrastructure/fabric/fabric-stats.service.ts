import { DefaultStats, StatsService } from '../../core/stats/stats.service';

export interface FabricDeliveryStats extends DefaultStats {
  avgResourceCount: number;
}

export class FabricDeliveryStatsService extends StatsService {
  protected _avgResourceCount = 0;
  calcStats(deltaTime: number, queue: number, state: any) {
    super.calcStats(deltaTime, queue, state);

    this._avgResourceCount += deltaTime * state.resourcesInWholeSaleStore;
  }

  getStats(currentTime: number): FabricDeliveryStats {
    const stats = super.getStats(currentTime);

    return {
      ...stats,
      avgResourceCount: this._avgResourceCount / currentTime,
    };
  }
}
