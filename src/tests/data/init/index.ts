import { EvseConfigReducer } from "../../../store/evseConfig/reducer";

export interface InitAbstractConstructor {
  new (): InitAbstract;
}

export abstract class InitAbstract {
  data: Partial<EvseConfigReducer>;

  constructor() {
    this.data = {};
  }

  setData() {
    return this.data;
  }
}
