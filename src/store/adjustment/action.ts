import type { AdjustmentsReducer } from "./reducer";
import { AdaptiveModeStatus } from "./data";

export enum AdjustmentType {
  SET_ADJUSTMENT = "SET_ADJUSTMENT",
  SET_CURRENT_SET = "SET_CURRENT_SET",
  SET_VOLTAGE_AI = "SET_VOLTAGE_AI",
  SET_AI_STATUS = "SET_AI_STATUS",
}

export const setAdjustment = (payload: AdjustmentsReducer) => ({
  type: AdjustmentType.SET_ADJUSTMENT as const,
  payload,
});

export const setCurrentSet = (currentSet: number) => ({
  type: AdjustmentType.SET_CURRENT_SET as const,
  currentSet,
});

export const setVoltageAI = (voltageAI: number) => ({
  type: AdjustmentType.SET_VOLTAGE_AI as const,
  voltageAI,
});

export const setAiStatus = (aiStatus: AdaptiveModeStatus) => ({
  type: AdjustmentType.SET_AI_STATUS as const,
  aiStatus,
});
