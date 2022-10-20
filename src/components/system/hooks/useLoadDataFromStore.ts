import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useOnAutoSearch } from "../helpers/autoSearchBox";
import { getItem, StorageKeys } from "../../../api/storage";
import { setCurrencyAction } from "../../../store/tariff/action";
import type { TabNames } from "../Navigation";
import {
  setLanguageAction,
  setMaxCapacityAction,
  setMaxCurrentAction,
  setNotificationChargeAction,
} from "../../../store/application/action";

export const useLoadDataFromStore = (targetTab: TabNames) => {
  const dispatch = useDispatch();
  const fnSearch = useOnAutoSearch();
  const navigation = useNavigation<any>();

  useEffect(() => {
    fnSearch(() => {}).then((value) => {
      getItem(StorageKeys.NETWORK_IP).then((ip) => {
        if (value === false && !ip) {
          navigation.navigate({ name: targetTab });
        }
      });
    });

    getItem(StorageKeys.USER_CURRENCY).then((userCurrency) => {
      dispatch(setCurrencyAction(userCurrency || "USD"));
    });

    getItem(StorageKeys.CAR_CAPACITY).then((carCapacity) => {
      if (carCapacity) {
        dispatch(setMaxCapacityAction(carCapacity));
      }
    });

    getItem(StorageKeys.MAX_CURRENT).then((maxCurrent) => {
      if (maxCurrent) {
        dispatch(setMaxCurrentAction(maxCurrent));
      }
    });

    getItem(StorageKeys.LANGUAGE).then((language) => {
      if (language) {
        dispatch(setLanguageAction(language));
      }
    });

    getItem(StorageKeys.SHOW_NOTIFICATION_CHARGE).then((notificationCharge) => {
      dispatch(setNotificationChargeAction(notificationCharge === null ? true : notificationCharge));
    });
  }, []);
};
