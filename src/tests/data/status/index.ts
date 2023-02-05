import { StateReducerData } from "../../../store/status/reducer";

export interface StateAbstractConstructor {
  new (): StateAbstract;
}

export abstract class StateAbstract {
  data: StateReducerData;

  public constructor() {
    this.data = {
      state: 0,
      pilot: 0,
      voltMeas1: 0,
      voltMeas2: 0,
      voltMeas3: 0,
      curMeas1: 0,
      curMeas2: 0,
      curMeas3: 0,
      powerMeas: 0,
      boxTemp: 0,
      socketTemp: 0,
      sessionEnergy: 0,
      sessionTime: 0,
      sessionMoney: 0,
      totalEnergy: 0,
      IEM1: 0,
      IEM2: 0,
      IEM1_money: 0,
      IEM2_money: 0,
    };
  }

  setData() {
    return this.data;
  }
}

export class BaseState extends StateAbstract {}
