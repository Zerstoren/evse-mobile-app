import { LimitsReducer } from "../../../store/limits/reducer";

export interface LimitAbstractConstructor {
  new (): LimitAbstract;
}

abstract class LimitAbstract {
  data: LimitsReducer;

  public constructor() {
    this.data = {
      timeLimit: 0,
      energyLimit: 0,
      moneyLimit: 0,
    };
  }

  setData() {
    return this.data;
  }
}

export class BaseLimit extends LimitAbstract {}
