import { BackgroundFetchResult } from "expo-background-fetch";
import dayjs from "dayjs";

import { store } from "../../store/configuredStore";
import { fetchData } from "../../api/fetchData";
import { getStatusSelector } from "../../store/status/select";
import { STATUS } from "../../store/status/data";
import { getItem, setItem, StorageKeys } from "../../api/storage";
import { insertStatisticInformation } from "../../api/storage/statistic";
import { getLog } from "../../api/getLog";

export const waitForSessionComplete = async () => {
  const result = await getLog();

  if (!result) {
    return;
  }

  const data = result.filter((item) => item.code === 3);

  await fetchData();
  const { sessionTime, sessionMoney, sessionEnergy } = getStatusSelector(store.getState());
  const currentYear = new Date().getFullYear();

  data.forEach((item) => {
    console.log(item);
    console.log({
      start: dayjs(`${currentYear}/${item.log_mnth}/${item.log_dd} ${item.log_hh}:${item.log_mm}`).unix(),
      time: item.s_hh * item.s_mm,
      sessionTime,
      sessionMoney,
      sessionEnergy,
    });
  });

  // await insertStatisticInformation({
  //   start: storageSession.start,
  //   time: sessionTime,
  //   money: sessionMoney,
  //   energy: sessionEnergy,
  // });

  //
  // // When we detect start charge but not found session in storage
  // if (!storageSession && state === STATUS.StateCharge) {
  //   await setItem(StorageKeys.CURRENT_SESSION, {
  //     start: Math.round(Date.now() / 1000) - sessionTime,
  //   });
  //
  //   return BackgroundFetchResult.NewData;
  // }
  //
  // // When we detect end charge with previous session in storage
  // if (storageSession && state !== STATUS.StateCharge) {
  //   // Store this session;

  //   await setItem(StorageKeys.CURRENT_SESSION, null);
  //
  //   return BackgroundFetchResult.NoData;
  // }
  //
  // // Protected for save session. If charge completed, and we don't have session in storage
  // if (state !== STATUS.StateCharge) {
  //   await insertStatisticInformation({
  //     start: Math.round(Date.now() / 1000) - sessionTime,
  //     time: sessionTime,
  //     money: sessionMoney,
  //     energy: sessionEnergy,
  //   });
  //   await setItem(StorageKeys.CURRENT_SESSION, null);
  //   return BackgroundFetchResult.NoData;
  // }
  //
  // // Start task often when we detect charge
  // if (state === STATUS.StateCharge) {
  //   return BackgroundFetchResult.NewData;
  // }
  //
  // return BackgroundFetchResult.NoData;
};
