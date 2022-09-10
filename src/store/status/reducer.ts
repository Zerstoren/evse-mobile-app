import { setStatusData, StatusActionType } from "./action";
import { PILOT, STATUS } from "./data";

export type StateReducerData = {
  state: STATUS;
  pilot: PILOT;
  voltMeas1: number;
  curMeas1: number;
  powerMeas: number;
  boxTemp: number; // Box temp
  socketTemp: number; // Socket temp
  sessionEnergy: number;
  sessionTime: number;
  sessionMoney: number;
  totalEnergy: number;

  IEM1: number;
  IEM2: number;
  IEM1_money: number;
  IEM2_money: number;
};

const initialState: StateReducerData = {
  state: STATUS.StateUnknown,
  pilot: PILOT.Unknown,
  voltMeas1: 0,
  curMeas1: 0,
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

export function status(state = initialState, action: ReturnType<typeof setStatusData>) {
  switch (action.type) {
    case StatusActionType.SET_STATUS_DATA:
      return action.payload;

    default:
      return state;
  }
}
