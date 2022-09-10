import {
  getLimitsAction,
  LimitsActionType,
  setLimitsEnergyAction,
  setLimitsMoneyAction,
  setLimitsTimeAction,
} from "./action";
import { postData } from "../../api/postData";

export type LimitsReducer = {
  timeLimit: number;
  energyLimit: number;
  moneyLimit: number;
};

const initialState: LimitsReducer = {
  timeLimit: -1,
  energyLimit: -1,
  moneyLimit: -1,
};

export function limits(
  state = initialState,
  action:
    | ReturnType<typeof getLimitsAction>
    | ReturnType<typeof setLimitsEnergyAction>
    | ReturnType<typeof setLimitsMoneyAction>
    | ReturnType<typeof setLimitsTimeAction>,
) {
  switch (action.type) {
    case LimitsActionType.GET_LIMITS:
      return action.limits;

    case LimitsActionType.SET_LIMITS_TIME:
      postData(["timeLimit", action.timeLimit]);
      return {
        ...state,
        timeLimit: action.timeLimit,
      };

    case LimitsActionType.SET_LIMITS_ENERGY:
      postData(["energyLimit", action.energyLimit]);
      return {
        ...state,
        energyLimit: action.energyLimit,
      };

    case LimitsActionType.SET_LIMITS_MONEY:
      postData(["moneyLimit", action.moneyLimit]);
      return {
        ...state,
        moneyLimit: action.moneyLimit,
      };

    default:
      return state;
  }
}
