import { AdjustmentsReducer } from "../../../store/adjustment/reducer";
import { AdaptiveModeStatus } from "../../../store/adjustment/data";

export interface AdjustmentAbstractConstructor {
  new (): AdjustmentAbstract;
}

abstract class AdjustmentAbstract {
  data: AdjustmentsReducer;

  public constructor() {
    this.data = {
      currentSet: 7,
      aiVoltage: 180,
      aiStatus: AdaptiveModeStatus.DISABLED,
      aiCurrent: 7,
    };
  }

  setData() {
    return this.data;
  }
}

export class BaseAdjustment extends AdjustmentAbstract {}
