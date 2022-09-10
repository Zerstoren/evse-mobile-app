import { Store } from "../configuredStore";

export const getMaxCapacitySelector = (state: Store) => state.application.maxCapacity;
export const getMaxCurrentSelector = (state: Store) => state.application.maxCurrent;
export const getLanguageSelector = (state: Store) => state.application.language;
