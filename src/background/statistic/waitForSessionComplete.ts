import { BackgroundFetchResult } from "expo-background-fetch";

import { fetchData } from "../../api/fetchData";
import { store } from "../../store/configuredStore";
import { getStatusSelector } from "../../store/status/select";
import { STATUS } from "../../store/status/data";
import { getItem, setItem, StorageKeys } from "../../api/storage";
import { insertStatisticInformation } from "../../api/storage/statistic";

export const waitForSessionComplete = async () => {
  console.log("Run waitForSessionComplete");
  await fetchData();

  const { state, sessionTime, sessionMoney, sessionEnergy } = getStatusSelector(store.getState());
  const storageSession = await getItem(StorageKeys.CURRENT_SESSION);

  // When we detect start charge but not found session in storage
  if (!storageSession && state === STATUS.StateCharge) {
    await setItem(StorageKeys.CURRENT_SESSION, {
      start: Math.round(Date.now() / 1000) - sessionTime,
    });

    return BackgroundFetchResult.NewData;
  }

  // When we detect end charge with previous session in storage
  if (storageSession && state !== STATUS.StateCharge) {
    // Store this session;
    await insertStatisticInformation({
      start: storageSession.start,
      time: sessionTime,
      money: sessionMoney,
      energy: sessionEnergy,
    });
    await setItem(StorageKeys.CURRENT_SESSION, null);

    return BackgroundFetchResult.NoData;
  }

  // Protected for save session. If charge completed, and we don't have session in storage
  if (state !== STATUS.StateCharge) {
    await insertStatisticInformation({
      start: Math.round(Date.now() / 1000) - sessionTime,
      time: sessionTime,
      money: sessionMoney,
      energy: sessionEnergy,
    });
    await setItem(StorageKeys.CURRENT_SESSION, null);
    return BackgroundFetchResult.NoData;
  }

  // Start task often when we detect charge
  if (state === STATUS.StateCharge) {
    return BackgroundFetchResult.NewData;
  }

  return BackgroundFetchResult.NoData;
};
