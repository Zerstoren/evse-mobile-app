import type { Store } from "../configuredStore";
import { getLimitStatus, getSecurityStatus } from "../../api/bitOperations";
import { Limits, SecurityCtrl } from "./data";

export const getEvseConfig = (state: Store) => state.evseConfig;

export const getEvseLimitSelector = (state: Store) =>
  getLimitStatus(state.evseConfig.limitsStatus, Limits.EVSE_ENABLED);

export const getEvseLimitSuspend = (state: Store) =>
  getLimitStatus(state.evseConfig.limitsStatus, Limits.LIMITS_SUSPENDED);

export const getEvseLimitTime = (state: Store) => getLimitStatus(state.evseConfig.limitsStatus, Limits.TIME_LIMITED);

export const getEvseLimitEnergy = (state: Store) =>
  getLimitStatus(state.evseConfig.limitsStatus, Limits.ENERGY_LIMITED);

export const getEvseLimitMoney = (state: Store) => getLimitStatus(state.evseConfig.limitsStatus, Limits.MONEY_LIMITED);

export const getEvseLimitSchedule = (state: Store) =>
  getLimitStatus(state.evseConfig.limitsStatus, Limits.SCHEDS_SUSPENDED);

export const getEvseLimitSchedule1 = (state: Store) =>
  getLimitStatus(state.evseConfig.limitsStatus, Limits.SCHEDULE_1_ENABLED);

export const getEvseLimitScheduleEnergy1 = (state: Store) =>
  getLimitStatus(state.evseConfig.limitsStatus, Limits.SCHEDULE_1_ENERGY);

export const getEvseLimitScheduleCurrent1 = (state: Store) =>
  getLimitStatus(state.evseConfig.limitsStatus, Limits.SCHEDULE_1_CURRENT);

export const getEvseLimitSchedule2 = (state: Store) =>
  getLimitStatus(state.evseConfig.limitsStatus, Limits.SCHEDULE_2_ENABLED);

export const getEvseLimitScheduleEnergy2 = (state: Store) =>
  getLimitStatus(state.evseConfig.limitsStatus, Limits.SCHEDULE_2_ENERGY);

export const getEvseLimitScheduleCurrent2 = (state: Store) =>
  getLimitStatus(state.evseConfig.limitsStatus, Limits.SCHEDULE_2_CURREN);

export const getEvseLimitErrorsSuspend = (state: Store) =>
  getLimitStatus(state.evseConfig.limitsStatus, Limits.ERRORS_SUSPENDED);

export const getEvseLimitDelayedLimit = (state: Store) =>
  getLimitStatus(state.evseConfig.limitsStatus, Limits.DELAYED_LIMIT);

export const getEvseLimitSecurityRelayControl = (state: Store) =>
  getSecurityStatus(state.evseConfig.security_ctrl, SecurityCtrl.RelayCheck);

export const getEvseLimitSecurityLeakControl = (state: Store) =>
  getSecurityStatus(state.evseConfig.security_ctrl, SecurityCtrl.LeakCheck);

export const getOneChargeSelector = (state: Store) => state.evseConfig.one_charge;
