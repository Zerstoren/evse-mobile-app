import type { TariffReducerData } from "./reducer";

export enum TariffActionTypes {
  SET_CURRENCY = "SET_CURRENCY",
  SET_TARIFF = "SET_TARIFF",
  SET_TARIFF_2 = "SET_TARIFF_2",
  SET_TARIFF_STATUS_2 = "SET_TARIFF_STATUS_2",
  SET_TARIFF_START_2 = "SET_TARIFF_START_2",
  SET_TARIFF_STOP_2 = "SET_TARIFF_STOP_2",
  SET_TARIFF_3 = "SET_TARIFF_3",
  SET_TARIFF_STATUS_3 = "SET_TARIFF_STATUS_3",
  SET_TARIFF_START_3 = "SET_TARIFF_START_3",
  SET_TARIFF_STOP_3 = "SET_TARIFF_STOP_3",
}

export const setCurrencyAction = (payload: string) => ({
  type: TariffActionTypes.SET_CURRENCY as const,
  payload,
});

export const setTariffAction = (payload: Omit<TariffReducerData, "currency">) => ({
  type: TariffActionTypes.SET_TARIFF as const,
  payload,
});

export const setTariff2Action = (payload: number) => ({
  type: TariffActionTypes.SET_TARIFF_2 as const,
  payload,
});

export const setTariffStatus2Action = (payload: 0 | 1) => ({
  type: TariffActionTypes.SET_TARIFF_STATUS_2 as const,
  payload,
});

export const setTariffStart2Action = (payload: number) => ({
  type: TariffActionTypes.SET_TARIFF_START_2 as const,
  payload,
});

export const setTariffStop2Action = (payload: number) => ({
  type: TariffActionTypes.SET_TARIFF_STOP_2 as const,
  payload,
});

export const setTariff3Action = (payload: number) => ({
  type: TariffActionTypes.SET_TARIFF_3 as const,
  payload,
});

export const setTariffStatus3Action = (payload: 0 | 1) => ({
  type: TariffActionTypes.SET_TARIFF_STATUS_3 as const,
  payload,
});

export const setTariffStart3Action = (payload: number) => ({
  type: TariffActionTypes.SET_TARIFF_START_3 as const,
  payload,
});

export const setTariffStop3Action = (payload: number) => ({
  type: TariffActionTypes.SET_TARIFF_STOP_3 as const,
  payload,
});
