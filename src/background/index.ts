import { registerTaskAsync, BackgroundFetchOptions } from "expo-background-fetch";
import { defineTask, isTaskDefined, TaskManagerTaskExecutor } from "expo-task-manager";

import { waitForSessionComplete } from "./statistic";
import { fullyCharge } from "./notifications";
import { setItem, StorageKeys } from "../api/storage";

async function initBackgroundFetch(taskName: string, taskFn: TaskManagerTaskExecutor, interval = 60 * 15) {
  try {
    if (!isTaskDefined(taskName)) {
      defineTask(taskName, taskFn);
    }
    const options: BackgroundFetchOptions = {
      minimumInterval: interval,
      startOnBoot: true,
    };

    await registerTaskAsync(taskName, options);
  } catch (err) {
    console.log("registerTaskAsync() failed:", err);
  }
}

setItem(StorageKeys.FULLY_CHARGED_NOTIFICATION, false);

initBackgroundFetch("fullyCharge", fullyCharge, 1);
