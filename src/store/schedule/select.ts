import type { Store } from "../configuredStore";

export const getScheduleSelector1 = (state: Store) => ({
  energySchedule: state.schedule.energySchedule1,
  currentSchedule: state.schedule.currentSchedule1,
  startSchedule: state.schedule.startSchedule1,
  stopSchedule: state.schedule.stopSchedule1,
});

export const getScheduleSelector2 = (state: Store) => ({
  energySchedule: state.schedule.energySchedule2,
  currentSchedule: state.schedule.currentSchedule2,
  startSchedule: state.schedule.startSchedule2,
  stopSchedule: state.schedule.stopSchedule2,
});
