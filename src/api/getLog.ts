import { getItem, StorageKeys } from "./storage";

let url: string | null = null;

const getLogResult = () => {
  return new Promise((resolve, reject) => {
    const requestMain = new XMLHttpRequest();
    requestMain.open("POST", `http://${url}/get_logResult`, true);
    requestMain.send();

    requestMain.addEventListener("error", () => reject);
    requestMain.addEventListener("timeout", () => reject);
    requestMain.addEventListener("abort", () => reject);
    requestMain.addEventListener("loadend", () => {
      console.log(requestMain.responseText);
      try {
        resolve(JSON.parse(requestMain.responseText));
      } catch (err) {
        reject();
      }
    });
  });
};

type LogResult = {
  n: number;
  code: number;
  log_mnth: number;
  log_dd: number;
  log_hh: number;
  log_mm: number;
  t_enrg: number;
  s_hh: number;
  s_mm: number;
  s_enrg: number;
  s_cost: number;
};

export const getLog = async (): Promise<null | LogResult[]> => {
  if (!url) {
    url = await getItem(StorageKeys.NETWORK_IP);
  }

  try {
    await new Promise<void>((resolve, reject) => {
      const requestMain = new XMLHttpRequest();
      requestMain.open("POST", `http://${url}/get_log`, true);
      requestMain.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      requestMain.timeout = 5000;
      requestMain.send();

      requestMain.addEventListener("error", () => reject);
      requestMain.addEventListener("timeout", () => reject);
      requestMain.addEventListener("abort", () => reject);
      requestMain.addEventListener("loadend", () => {
        resolve();
      });
    });
  } catch (err) {
    console.log("err", err);
  }

  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });

  for (let i = 0; i < 10; i++) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const result = await getLogResult();
      return result as LogResult[];
      // eslint-disable-next-line no-empty
    } catch (err) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 1000);
      });
    }
  }

  return null;
};
