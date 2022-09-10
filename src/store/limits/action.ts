import type { LimitsReducer } from "./reducer";

export enum LimitsActionType {
  GET_LIMITS = "GET_LIMITS",
  SET_LIMITS_TIME = "SET_LIMITS_TIME",
  SET_LIMITS_ENERGY = "SET_LIMITS_ENERGY",
  SET_LIMITS_MONEY = "SET_LIMITS_MONEY",
}

export const getLimitsAction = (limits: LimitsReducer) => ({
  type: LimitsActionType.GET_LIMITS as const,
  limits,
});

export const setLimitsTimeAction = (timeLimit: number) => ({
  type: LimitsActionType.SET_LIMITS_TIME as const,
  timeLimit,
});

export const setLimitsEnergyAction = (energyLimit: number) => ({
  type: LimitsActionType.SET_LIMITS_ENERGY as const,
  energyLimit,
});

export const setLimitsMoneyAction = (moneyLimit: number) => ({
  type: LimitsActionType.SET_LIMITS_MONEY as const,
  moneyLimit,
});
