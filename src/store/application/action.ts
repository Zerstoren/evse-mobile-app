export enum ApplicationActionType {
  SET_MAX_CAPACITY = "SET_MAX_CAPACITY",
  SET_MAX_CURRENT = "SET_MAX_CURRENT",
  SET_LANGUAGE = "SET_LANGUAGE",
}

export const setMaxCapacityAction = (maxCapacity: number) => ({
  type: ApplicationActionType.SET_MAX_CAPACITY as const,
  maxCapacity,
});

export const setMaxCurrentAction = (maxCurrent: number) => ({
  type: ApplicationActionType.SET_MAX_CURRENT as const,
  maxCurrent,
});

export const setLanguageAction = (language: string) => ({
  type: ApplicationActionType.SET_LANGUAGE as const,
  language,
});
