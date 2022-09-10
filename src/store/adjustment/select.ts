import type { Store } from "../configuredStore";

export const getCurrentSetSelector = (state: Store) => state.adjustment.currentSet;

export const getVoltageAISelector = (state: Store) => state.adjustment.aiVoltage;

export const getAiStatusSelector = (state: Store) => state.adjustment.aiStatus;

export const getAiCurrentSelector = (state: Store) => (state.adjustment.aiStatus ? state.adjustment.aiCurrent : 0);
