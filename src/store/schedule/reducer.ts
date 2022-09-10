import {
  ScheduleActionType,
  getSchedule,
  setScheduleCurrent1,
  setScheduleCurrent2,
  setScheduleEnergy1,
  setScheduleEnergy2,
  setScheduleStart1,
  setScheduleStart2,
  setScheduleStop1,
  setScheduleStop2,
} from "./action";
import { postData } from "../../api/postData";

export type ScheduleReducer = {
  currentSchedule1: number;
  currentSchedule2: number;
  energySchedule1: number;
  energySchedule2: number;
  stopSchedule1: number;
  stopSchedule2: number;
  startSchedule1: number;
  startSchedule2: number;
};

const initialState: ScheduleReducer = {
  currentSchedule1: 0,
  currentSchedule2: 0,
  energySchedule1: -1,
  energySchedule2: -1,
  stopSchedule1: 0,
  stopSchedule2: 0,
  startSchedule1: 0,
  startSchedule2: 0,
};

export function schedule(
  state = initialState,
  action:
    | ReturnType<typeof getSchedule>
    | ReturnType<typeof setScheduleCurrent1>
    | ReturnType<typeof setScheduleCurrent2>
    | ReturnType<typeof setScheduleEnergy1>
    | ReturnType<typeof setScheduleEnergy2>
    | ReturnType<typeof setScheduleStart1>
    | ReturnType<typeof setScheduleStart2>
    | ReturnType<typeof setScheduleStop1>
    | ReturnType<typeof setScheduleStop2>,
): ScheduleReducer {
  switch (action.type) {
    case ScheduleActionType.GET_SCHEDULE:
      return action.schedule;

    case ScheduleActionType.SET_SCHEDULE_CURRENT1:
      postData(["currentSchedule1", action.currentSchedule1]);
      return {
        ...state,
        currentSchedule1: action.currentSchedule1,
      };

    case ScheduleActionType.SET_SCHEDULE_CURRENT2:
      postData(["currentSchedule2", action.currentSchedule2]);
      return {
        ...state,
        currentSchedule2: action.currentSchedule2,
      };

    case ScheduleActionType.SET_SCHEDULE_ENERGY1:
      postData(["energySchedule1", action.energySchedule1]);
      return {
        ...state,
        energySchedule1: action.energySchedule1,
      };

    case ScheduleActionType.SET_SCHEDULE_ENERGY2:
      postData(["energySchedule2", action.energySchedule2]);
      return {
        ...state,
        energySchedule2: action.energySchedule2,
      };

    case ScheduleActionType.SET_SCHEDULE_START1:
      postData(["startSchedule1", action.startSchedule1]);
      return {
        ...state,
        startSchedule1: action.startSchedule1,
      };

    case ScheduleActionType.SET_SCHEDULE_START2:
      postData(["startSchedule2", action.startSchedule2]);
      return {
        ...state,
        startSchedule2: action.startSchedule2,
      };

    case ScheduleActionType.SET_SCHEDULE_STOP1:
      postData(["stopSchedule1", action.stopSchedule1]);
      return {
        ...state,
        stopSchedule1: action.stopSchedule1,
      };

    case ScheduleActionType.SET_SCHEDULE_STOP2:
      postData(["stopSchedule2", action.stopSchedule2]);
      return {
        ...state,
        stopSchedule2: action.stopSchedule2,
      };

    default:
      return state;
  }
}
