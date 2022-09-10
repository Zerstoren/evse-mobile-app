import { Limits } from "./data";
import type { EvseConfigReducer } from "./reducer";

export enum EvsaConfigType {
  SET_EVSE_INIT_CONFIG = "SET_EVSE_INIT_CONFIG",
  SET_EVSE_CONFIG = "SET_EVSE_CONFIG",
  SET_LIMIT = "SET_LIMIT",

  SET_HIGH_VOLTAGE = "SET_HIGH_VOLTAGE",
  SET_GROUND_CTRL = "SET_GROUND_CTRL",
  SET_LED_CTRL = "SET_LED_CTRL",
  SET_ADD_CURR = "SET_ADD_CURR",
  SET_TMP_CTRL = "SET_TMP_CTRL",
  SET_MIN_VOLTAGE = "SET_MIN_VOLTAGE",
  SET_PAGE_TYPE = "SET_PAGE_TYPE",
  SET_TIMER_TYPE = "SET_TIMER_TYPE",
  SET_SECURITY_RELAY = "SET_SECURITY_RELAY",
  SET_SECURITY_LEAK = "SET_SECURITY_LEAK",

  SET_ONE_CHARGE = "SET_ONE_CHARGE",
}

export const setEvseConfigAction = (
  payload: Omit<EvseConfigReducer, "pageType" | "minVoltage" | "ESP_SW_version" | "security_ctrl" | "maxPower">,
) => ({
  type: EvsaConfigType.SET_EVSE_CONFIG as const,
  payload,
});

export const setEvseInitConfigAction = (
  payload: Pick<EvseConfigReducer, "pageType" | "minVoltage" | "ESP_SW_version" | "security_ctrl" | "maxPower">,
) => ({
  type: EvsaConfigType.SET_EVSE_INIT_CONFIG as const,
  payload,
});

export const setLimitAction = (limitName: Limits, status: boolean) => ({
  type: EvsaConfigType.SET_LIMIT as const,
  limitName,
  status,
});

export const setLimitEvseAction = (status: boolean) => setLimitAction(Limits.EVSE_ENABLED, status);

export const setLimitLimitsGlobalAction = (status: boolean) => setLimitAction(Limits.LIMITS_SUSPENDED, status);

export const setLimitTimeAction = (status: boolean) => setLimitAction(Limits.TIME_LIMITED, status);

export const setLimitEnergyAction = (status: boolean) => setLimitAction(Limits.ENERGY_LIMITED, status);

export const setLimitMoneyAction = (status: boolean) => setLimitAction(Limits.MONEY_LIMITED, status);

export const setLimitScheduleGlobalAction = (status: boolean) => setLimitAction(Limits.SCHEDS_SUSPENDED, status);

export const setLimitSchedule1Action = (status: boolean) => setLimitAction(Limits.SCHEDULE_1_ENABLED, status);

export const setLimitScheduleEnergy1Action = (status: boolean) => setLimitAction(Limits.SCHEDULE_1_ENERGY, status);

export const setLimitScheduleCurrent1Action = (status: boolean) => setLimitAction(Limits.SCHEDULE_1_CURRENT, status);

export const setLimitSchedule2Action = (status: boolean) => setLimitAction(Limits.SCHEDULE_2_ENABLED, status);

export const setLimitScheduleEnergy2Action = (status: boolean) => setLimitAction(Limits.SCHEDULE_2_ENERGY, status);

export const setLimitScheduleCurrent2Action = (status: boolean) => setLimitAction(Limits.SCHEDULE_2_CURREN, status);

export const setLimitSuspendErrorAction = (status: boolean) => setLimitAction(Limits.ERRORS_SUSPENDED, status);

export const setLimitDelayedLimitAction = (status: boolean) => setLimitAction(Limits.DELAYED_LIMIT, status);

export const setHighVoltageAction = (value: 0 | 1) => ({
  type: EvsaConfigType.SET_HIGH_VOLTAGE as const,
  value,
});

export const setGroundCtrlAction = (value: 1 | 2) => ({
  type: EvsaConfigType.SET_GROUND_CTRL as const,
  value,
});

export const setLedCtrlAction = (value: 0 | 1) => ({
  type: EvsaConfigType.SET_LED_CTRL as const,
  value,
});

export const setAddCurrAction = (value: 0 | 1) => ({
  type: EvsaConfigType.SET_ADD_CURR as const,
  value,
});

export const setTmpCtrlAction = (value: 0 | 1) => ({
  type: EvsaConfigType.SET_TMP_CTRL as const,
  value,
});

export const setMinVoltageAction = (value: number) => ({
  type: EvsaConfigType.SET_MIN_VOLTAGE as const,
  value,
});

export const setPageTypeAction = (value: 0 | 1) => ({
  type: EvsaConfigType.SET_PAGE_TYPE as const,
  value,
});

export const setTimerTypeAction = (value: 1 | 2 | 3 | 4) => ({
  type: EvsaConfigType.SET_TIMER_TYPE as const,
  value,
});

export const setMinimalVoltageAction = (value: number) => ({
  type: EvsaConfigType.SET_MIN_VOLTAGE as const,
  value,
});

export const setSecurityRelayAction = (value: boolean) => ({
  type: EvsaConfigType.SET_SECURITY_RELAY as const,
  value,
});

export const setSecurityLeakAction = (value: boolean) => ({
  type: EvsaConfigType.SET_SECURITY_LEAK as const,
  value,
});

export const setOneCharge = (value: 0 | 1) => ({
  type: EvsaConfigType.SET_ONE_CHARGE as const,
  value,
});
