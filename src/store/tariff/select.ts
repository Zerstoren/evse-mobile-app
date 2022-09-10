import { Store } from "../configuredStore";

export const getCurrencySymbolSelector = (state: Store) => state.tariff.currency;

export const tariffSelector = (state: Store) => state.tariff.tarif;

export const tariff2Selector = (state: Store) => state.tariff.tarif_2;
export const tariffStart2Selector = (state: Store) => state.tariff.tarif_2_start;
export const tariffStatus2Selector = (state: Store) => state.tariff.tarif_2_status;
export const tariffStop2Selector = (state: Store) => state.tariff.tarif_2_stop;

export const tariff3Selector = (state: Store) => state.tariff.tarif_3;
export const tariffStatus3Selector = (state: Store) => state.tariff.tarif_3_status;
export const tariffStart3Selector = (state: Store) => state.tariff.tarif_3_start;
export const tariffStop3Selector = (state: Store) => state.tariff.tarif_3_stop;
