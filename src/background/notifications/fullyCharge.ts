import { BackgroundFetchResult } from "expo-background-fetch";
import * as Notifications from "expo-notifications";

import { fetchData } from "../../api/fetchData";
import { store } from "../../store/configuredStore";
import { getStatusSelector } from "../../store/status/select";
import i18n from "../../i18n";
import { getCurrencySymbolSelector } from "../../store/tariff/select";
import { getItem, setItem, StorageKeys } from "../../api/storage";
import { STATUS } from "../../store/status/data";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: false,
    };
  },
});

const updateNotification = async () => {
  await fetchData();

  const { curMeas1, sessionEnergy, sessionTime, sessionMoney } = getStatusSelector(store.getState());
  const currencySymbol = getCurrencySymbolSelector(store.getState());

  const title = i18n.t(curMeas1 === 0 ? "Car fully charged" : "Awaiting for car charging");
  const body =
    i18n.t("Charged {{energy}} kWh in ", { energy: sessionEnergy }) +
    (Math.floor(sessionTime / 60 / 60)
      ? i18n.t("{{timeHours}} hour and ", { timeHours: Math.floor(sessionTime / 60 / 60) })
      : "") +
    i18n.t("{{timeMinutes}} minute ", {
      timeMinutes: Math.floor((sessionTime / 60) % 60)
        .toString()
        .padStart(2, "0"),
    }) +
    i18n.t("and cost {{cost}} {{currencySymbol}}", {
      cost: sessionMoney,
      currencySymbol,
    });

  await Notifications.dismissAllNotificationsAsync();
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: null,
  });

  await new Promise((resolve) => {
    setTimeout(resolve, 60000);
  });

  return curMeas1 !== 0;
};

export const fullyCharge = async () => {
  if ((await getItem(StorageKeys.SHOW_NOTIFICATION_CHARGE)) === false) {
    console.log(123);
    return BackgroundFetchResult.NoData;
  }

  if ((await getItem(StorageKeys.FULLY_CHARGED_NOTIFICATION)) === true) {
    console.log(234);
    return BackgroundFetchResult.NoData;
  }

  console.log("Start");

  await fetchData();

  const { state } = getStatusSelector(store.getState());

  if (state !== STATUS.StateCharge) {
    return BackgroundFetchResult.NoData;
  }

  await setItem(StorageKeys.FULLY_CHARGED_NOTIFICATION, true);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const result = await updateNotification();

    if (!result) {
      break;
    }
  }

  await setItem(StorageKeys.FULLY_CHARGED_NOTIFICATION, false);

  return BackgroundFetchResult.NoData;
};
