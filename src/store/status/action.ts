import type { StateReducerData } from "./reducer";

export enum StatusActionType {
  SET_STATUS_DATA = "SET_STATUS_DATA",
}

export const setStatusData = (payload: StateReducerData) => ({
  type: StatusActionType.SET_STATUS_DATA as const,
  payload,
});
