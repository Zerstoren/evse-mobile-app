import { useEffect } from "react";

import { store } from "../store/configuredStore";
import { setStatusData } from "../store/status/action";
import { setEvseConfigAction, setEvseInitConfigAction } from "../store/evseConfig/action";
import { setAdjustment } from "../store/adjustment/action";
import { getLimitsAction } from "../store/limits/action";
import { getSchedule } from "../store/schedule/action";
import { getItem, StorageKeys } from "./storage";
import { awaitPostStatus, postStatus } from "./postData";
import { setTariffAction } from "../store/tariff/action";

let url: string | null = null;

export const fetchData = async (isInit = false) => {
  if (!url) {
    url = await getItem(StorageKeys.NETWORK_IP);
  }

  await awaitPostStatus();

  return new Promise<void>((resolve) => {
    const requestMain = new XMLHttpRequest();
    requestMain.open("POST", `http://${url}/${isInit ? "init" : "main"}`, true);
    requestMain.send();

    requestMain.onreadystatechange = () => {
      if (requestMain.readyState === 4 && requestMain.status === 200) {
        const data = JSON.parse(requestMain.responseText);

        if (isInit) {
          store.dispatch(
            setEvseInitConfigAction({
              ESP_SW_version: data.ESP_SW_version,
              pageType: data.pageType,
              minVoltage: data.minVoltage,
              security_ctrl: data.secur_ctrl,
              maxPower: data.curDesign,
            }),
          );
          resolve();
          return;
        }

        if (postStatus) {
          resolve();
          return;
        }

        store.dispatch(
          setStatusData({
            state: data.state,
            pilot: data.pilot,
            voltMeas1: parseFloat(data.voltMeas1.toFixed(1)),
            curMeas1: parseFloat(data.curMeas1.toFixed(1)),
            powerMeas: parseFloat(data.powerMeas.toFixed(1)),
            boxTemp: data.temperature1,
            socketTemp: data.temperature2,
            sessionEnergy: parseFloat(data.sessionEnergy.toFixed(1)),
            sessionTime: data.sessionTime,
            sessionMoney: parseFloat(data.sessionMoney.toFixed(1)),
            totalEnergy: parseFloat(data.totalEnergy.toFixed(1)),
            IEM1: parseFloat(data.IEM1.toFixed(1)),
            IEM2: parseFloat(data.IEM2.toFixed(1)),
            IEM1_money: parseFloat(data.IEM1_money.toFixed(1)),
            IEM2_money: parseFloat(data.IEM2_money.toFixed(1)),
          }),
        );

        store.dispatch(
          setEvseConfigAction({
            limitsStatus: data.limitsStatus,
            restricted_mode: data.restricted_mode,
            groundCtrl: data.groundCtrl,
            led_ctrl: data.led_ctrl,
            add_curr: data.add_curr,
            tmp_ctrl: data.tmp_ctrl,
            timerType: data.timerType,
            one_charge: data.one_charge,
          }),
        );

        store.dispatch(
          setAdjustment({
            currentSet: data.currentSet,
            aiVoltage: data.aiVoltage,
            aiStatus: data.aiStatus,
            aiCurrent: data.aiModecurrent,
          }),
        );

        store.dispatch(
          getLimitsAction({
            timeLimit: data.timeLimit,
            energyLimit: data.energyLimit,
            moneyLimit: data.moneyLimit,
          }),
        );

        store.dispatch(
          getSchedule({
            currentSchedule1: data.currentSchedule1,
            currentSchedule2: data.currentSchedule2,
            energySchedule1: data.energySchedule1,
            energySchedule2: data.energySchedule2,
            stopSchedule1: data.stopSchedule1,
            stopSchedule2: data.stopSchedule2,
            startSchedule1: data.startSchedule1,
            startSchedule2: data.startSchedule2,
          }),
        );

        store.dispatch(
          setTariffAction({
            tarif: data.tarif,
            tarif_2: data.tarif_2,
            tarif_3: data.tarif_3,
            tarif_2_start: data.tarif_2_start,
            tarif_2_stop: data.tarif_2_stop,
            tarif_3_start: data.tarif_3_start,
            tarif_3_stop: data.tarif_3_stop,
            tarif_2_status: data.tarif_2_status,
            tarif_3_status: data.tarif_3_status,
          }),
        );

        resolve();
      }
    };
  });
};

export const useFetchData = () => {
  useEffect(() => {
    let cancel = false;
    let urlIsSetted = false;

    const nextFetch = async (isInit = false) => {
      if (!urlIsSetted) {
        const localUrl = await getItem(StorageKeys.NETWORK_IP);

        if (!localUrl) {
          setTimeout(() => nextFetch(isInit), 1000);
          return;
        }

        urlIsSetted = true;
      }

      try {
        if (isInit) {
          await fetchData(isInit);
        }

        await fetchData();
      } finally {
        if (!cancel) {
          setTimeout(nextFetch, 1000);
        }
      }
    };

    nextFetch(true);
    return () => {
      cancel = true;
    };
  }, []);
};

export const checkStatus = (newUrl: string) =>
  new Promise<boolean>((resolve) => {
    const requestMain = new XMLHttpRequest();
    requestMain.timeout = 1000;
    requestMain.open("POST", `http://${newUrl}/main`, true);
    requestMain.send();

    requestMain.addEventListener("loadend", () => {
      try {
        const data = JSON.parse(requestMain.responseText);
        if ("STA_IP_Addres" in data) {
          url = newUrl;
          return resolve(true);
        }

        return resolve(false);
      } catch (err) {
        return resolve(false);
      }
    });
  });
