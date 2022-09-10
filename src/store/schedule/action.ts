import type { ScheduleReducer } from "./reducer";

export enum ScheduleActionType {
  GET_SCHEDULE = "GET_SCHEDULE",
  SET_SCHEDULE_ENERGY1 = "SET_SCHEDULE_ENERGY1",
  SET_SCHEDULE_ENERGY2 = "SET_SCHEDULE_ENERGY2",
  SET_SCHEDULE_CURRENT1 = "SET_SCHEDULE_CURRENT1",
  SET_SCHEDULE_CURRENT2 = "SET_SCHEDULE_CURRENT2",
  SET_SCHEDULE_STOP1 = "SET_SCHEDULE_STOP1",
  SET_SCHEDULE_STOP2 = "SET_SCHEDULE_STOP2",
  SET_SCHEDULE_START1 = "SET_SCHEDULE_START1",
  SET_SCHEDULE_START2 = "SET_SCHEDULE_START2",
}

export const getSchedule = (schedule: ScheduleReducer) => ({
  type: ScheduleActionType.GET_SCHEDULE as const,
  schedule,
});

export const setScheduleEnergy1 = (energySchedule1: number) => ({
  type: ScheduleActionType.SET_SCHEDULE_ENERGY1 as const,
  energySchedule1,
});

export const setScheduleEnergy2 = (energySchedule2: number) => ({
  type: ScheduleActionType.SET_SCHEDULE_ENERGY2 as const,
  energySchedule2,
});

export const setScheduleCurrent1 = (currentSchedule1: number) => ({
  type: ScheduleActionType.SET_SCHEDULE_CURRENT1 as const,
  currentSchedule1,
});

export const setScheduleCurrent2 = (currentSchedule2: number) => ({
  type: ScheduleActionType.SET_SCHEDULE_CURRENT2 as const,
  currentSchedule2,
});

export const setScheduleStop1 = (stopSchedule1: number) => ({
  type: ScheduleActionType.SET_SCHEDULE_STOP1 as const,
  stopSchedule1,
});

export const setScheduleStop2 = (stopSchedule2: number) => ({
  type: ScheduleActionType.SET_SCHEDULE_STOP2 as const,
  stopSchedule2,
});

export const setScheduleStart1 = (startSchedule1: number) => ({
  type: ScheduleActionType.SET_SCHEDULE_START1 as const,
  startSchedule1,
});

export const setScheduleStart2 = (startSchedule2: number) => ({
  type: ScheduleActionType.SET_SCHEDULE_START2 as const,
  startSchedule2,
});
