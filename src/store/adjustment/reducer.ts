import { setAdjustment, AdjustmentType, setAiStatus, setCurrentSet, setVoltageAI } from "./action";
import { AdaptiveModeStatus } from "./data";
import { postData } from "../../api/postData";

export type AdjustmentsReducer = {
  currentSet: number;
  aiVoltage: number;
  aiStatus: AdaptiveModeStatus;
  aiCurrent: number;
};

const initialState: AdjustmentsReducer = {
  currentSet: 7,
  aiVoltage: 180,
  aiStatus: 0,
  aiCurrent: 7,
};

export function adjustment(
  state = initialState,
  action:
    | ReturnType<typeof setAdjustment>
    | ReturnType<typeof setAiStatus>
    | ReturnType<typeof setCurrentSet>
    | ReturnType<typeof setVoltageAI>,
) {
  switch (action.type) {
    case AdjustmentType.SET_ADJUSTMENT:
      return action.payload;

    case AdjustmentType.SET_CURRENT_SET:
      postData(["currentSet", action.currentSet]);
      return { ...state, currentSet: action.currentSet };

    case AdjustmentType.SET_VOLTAGE_AI:
      postData(["aiVoltage", action.voltageAI]);
      return { ...state, voltageAI: action.voltageAI };

    case AdjustmentType.SET_AI_STATUS:
      postData(["aiMode", action.aiStatus]);
      return {
        ...state,
        aiStatus: action.aiStatus,
      };

    default:
      return state;
  }
}
