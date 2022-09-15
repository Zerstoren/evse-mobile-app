import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../../store/configuredStore";

export type StatisticData = {
  start: number;
  time: number;
  money: number;
  energy: number;
};

function* foundLastRecord(startIndex: string) {
  let index = startIndex;

  while (index !== "0") {
    yield AsyncStorage.getItem(`statistic_${index}`);
    index = (parseInt(index, 16) - 1).toString(16);
  }

  yield null;
}

const decodeStatisticRecord = (data: string): StatisticData => {
  const [start, time, money, energy] = data.split(":");

  return {
    start: parseInt(start, 16),
    time: parseInt(time, 16),
    money: parseInt(money, 16) / 10,
    energy: parseInt(energy, 16) / 100,
  };
};

export const getLastMonth = async (): Promise<StatisticData[]> => {
  const date = new Date();
  const storeIndex = (date.getMonth() * (date.getFullYear() - 2021)).toString(16);
  const generator = foundLastRecord(storeIndex);

  let data: string | void | null;

  // eslint-disable-next-line no-constant-condition,no-await-in-loop,no-cond-assign
  while ((data = await generator.next().value)) {
    if (!data) {
      // eslint-disable-next-line no-continue
      continue;
    }

    try {
      return JSON.parse(data).map(decodeStatisticRecord);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  return [];
};

export const insertStatisticInformation = async (data: StatisticData) => {
  const date = new Date(data.start * 1000);
  const storeIndex = (date.getMonth() * (date.getFullYear() - 2021)).toString(16);

  const lastCharge = (await getLastMonth())[0];

  // If charge start is same, this is duplicate
  // or session is shorter than 1 minute
  if ((lastCharge && lastCharge.start === data.start) || data.time < 60) {
    return;
  }

  const storeStartTime = data.start.toString(16);
  const storeChargeTime = data.time.toString(16);
  const storeChargeMoney = Math.round(data.money * 10).toString(16);
  const storeChargeEnergy = Math.round(data.energy * 100).toString(16);

  const hexData = `${storeStartTime}:${storeChargeTime}:${storeChargeMoney}:${storeChargeEnergy}`;

  const statisticHexString = await AsyncStorage.getItem(`statistic_${storeIndex}`);
  let storedData = [hexData];

  if (statisticHexString) {
    try {
      const parsed = JSON.parse(statisticHexString);
      parsed.push(hexData);
      storedData = parsed;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }

  await AsyncStorage.setItem(`statistic_${storeIndex}`, JSON.stringify(storedData));
};
