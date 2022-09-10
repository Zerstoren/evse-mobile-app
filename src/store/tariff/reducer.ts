import {
  setCurrencyAction,
  setTariff2Action,
  setTariff3Action,
  setTariffAction,
  setTariffStart2Action,
  setTariffStart3Action,
  setTariffStatus2Action,
  setTariffStatus3Action,
  setTariffStop2Action,
  setTariffStop3Action,
  TariffActionTypes,
} from "./action";
import { postData } from "../../api/postData";
import { setItem, StorageKeys } from "../../api/storage";

export type TariffReducerData = {
  currency: string;
  tarif: number;
  tarif_2: number;
  tarif_2_status: 0 | 1;
  tarif_2_start: number;
  tarif_2_stop: number;
  tarif_3: number;
  tarif_3_status: 0 | 1;
  tarif_3_start: number;
  tarif_3_stop: number;
};

const initialState: TariffReducerData = {
  currency: "",
  tarif: 0,
  tarif_2: 0,
  tarif_2_start: 0,
  tarif_2_status: 0,
  tarif_2_stop: 0,
  tarif_3: 0,
  tarif_3_start: 0,
  tarif_3_status: 0,
  tarif_3_stop: 0,
};

export function tariff(
  state = initialState,
  action:
    | ReturnType<typeof setCurrencyAction>
    | ReturnType<typeof setTariffAction>
    | ReturnType<typeof setTariff2Action>
    | ReturnType<typeof setTariffStart2Action>
    | ReturnType<typeof setTariffStop2Action>
    | ReturnType<typeof setTariffStatus2Action>
    | ReturnType<typeof setTariffStop3Action>
    | ReturnType<typeof setTariffStart3Action>
    | ReturnType<typeof setTariffStatus3Action>
    | ReturnType<typeof setTariff3Action>,
): TariffReducerData {
  switch (action.type) {
    case TariffActionTypes.SET_TARIFF:
      return { ...state, ...action.payload };

    case TariffActionTypes.SET_CURRENCY:
      setItem(StorageKeys.USER_CURRENCY, action.payload);
      return { ...state, currency: action.payload };

    case TariffActionTypes.SET_TARIFF_2:
      postData(["tarif_2", action.payload]);
      return {
        ...state,
        tarif_2: action.payload,
      };

    case TariffActionTypes.SET_TARIFF_STATUS_2:
      postData(["tarif_2_status", action.payload]);
      return {
        ...state,
        tarif_2_status: action.payload,
      };

    case TariffActionTypes.SET_TARIFF_START_2:
      postData(["tarif_2_start", action.payload]);
      return {
        ...state,
        tarif_2_start: action.payload,
      };

    case TariffActionTypes.SET_TARIFF_STOP_2:
      postData(["tarif_2_stop", action.payload]);
      return {
        ...state,
        tarif_2_stop: action.payload,
      };

    case TariffActionTypes.SET_TARIFF_3:
      postData(["tarif_3", action.payload]);
      return {
        ...state,
        tarif_3: action.payload,
      };

    case TariffActionTypes.SET_TARIFF_STATUS_3:
      postData(["tarif_3_status", action.payload]);
      return {
        ...state,
        tarif_3_status: action.payload,
      };

    case TariffActionTypes.SET_TARIFF_START_3:
      postData(["tarif_3_start", action.payload]);
      return {
        ...state,
        tarif_3_start: action.payload,
      };

    case TariffActionTypes.SET_TARIFF_STOP_3:
      postData(["tarif_3_stop", action.payload]);
      return {
        ...state,
        tarif_3_stop: action.payload,
      };

    default:
      return state;
  }
}
