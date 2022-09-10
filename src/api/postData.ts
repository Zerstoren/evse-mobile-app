import type { AdaptiveModeStatus } from "../store/adjustment/data";

type PostDataVariants =
  | ["limitsStatus", number]
  | ["currentSet", number]
  | ["aiVoltage", number]
  | ["aiMode", AdaptiveModeStatus]
  | ["timeLimit", number]
  | ["energyLimit", number]
  | ["moneyLimit", number]
  | ["energySchedule1", number]
  | ["energySchedule2", number]
  | ["currentSchedule1", number]
  | ["currentSchedule2", number]
  | ["startSchedule1", number]
  | ["startSchedule2", number]
  | ["stopSchedule1", number]
  | ["stopSchedule2", number]
  | ["rstEM1"]
  | ["rstEM2"]
  | ["security_ctrl", number]
  | ["set_high_voltage"]
  | ["restricted_mode", 0 | 1]
  | ["groundCtrl", 1 | 2]
  | ["led_ctrl", 0 | 1]
  | ["add_curr", 0 | 1]
  | ["tmp_ctrl", 0 | 1]
  | ["timerType", 1 | 2 | 3 | 4]
  | ["pageType", 0 | 1]
  | ["minVoltage", number]
  | ["tarif", number]
  | ["tarif_2", number]
  | ["tarif_3", number]
  | ["tarif_2_start", number]
  | ["tarif_2_stop", number]
  | ["tarif_3_start", number]
  | ["tarif_3_stop", number]
  | ["tarif_2_status", 0 | 1]
  | ["tarif_3_status", 0 | 1]
  | ["one_charge", 0 | 1];

// eslint-disable-next-line import/no-mutable-exports
export let postStatus = false;

export const postData = async ([name, value]: PostDataVariants) => {
  postStatus = true;

  const request = new XMLHttpRequest();
  request.open("POST", "http://192.168.50.102/pageEvent", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.setRequestHeader("pageEvent", name);
  request.send(`${name}=${value}`);
  // console.log(`${name}=${value}`);

  request.addEventListener("loadend", () => {
    postStatus = false;
  });
};

export const awaitPostStatus = () =>
  new Promise<void>((resolve) => {
    const awaitForPostResolved = () => {
      if (!postStatus) {
        resolve();
        return;
      }

      setTimeout(awaitForPostResolved, 10);
    };

    awaitForPostResolved();
  });
