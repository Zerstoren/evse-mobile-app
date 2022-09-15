import { StateAbstract } from "./index";
import { STATUS } from "../../../store/status/data";

export class StateStatisticChargeInProgress extends StateAbstract {
  setData() {
    return {
      ...this.data,
      state: STATUS.StateCharge,
      sessionTime: 200,
      sessionEnergy: 100,
      sessionMoney: 100,
    };
  }
}

export class StateStatisticChargeComplete extends StateAbstract {
  setData() {
    return {
      ...this.data,
      state: STATUS.StateWaiting,
      sessionTime: 200,
      sessionEnergy: 100,
      sessionMoney: 100,
    };
  }
}

export class StateStatisticChargeComplete2 extends StateAbstract {
  setData() {
    return {
      ...this.data,
      state: STATUS.StateWaiting,
      sessionTime: 250,
      sessionEnergy: 120,
      sessionMoney: 120,
    };
  }
}
