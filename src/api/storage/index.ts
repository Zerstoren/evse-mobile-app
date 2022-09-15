import AsyncStorage from "@react-native-async-storage/async-storage";

export enum StorageKeys {
  NETWORK_IP = "NETWORK_IP",
  MAX_CURRENT = "MAX_CURRENT",
  USER_CURRENCY = "USER_CURRENCY",
  CAR_CAPACITY = "CAR_CAPACITY",
  CAR_CONSUMPTION = "CAR_CONSUMPTION",
  LANGUAGE = "LANGUAGE",
  CURRENT_SESSION = "CURRENT_SESSION",
}

type StorageReturnData = {
  [StorageKeys.NETWORK_IP]: string;
  [StorageKeys.MAX_CURRENT]: number;
  [StorageKeys.USER_CURRENCY]: string;
  [StorageKeys.CAR_CAPACITY]: number;
  [StorageKeys.CAR_CONSUMPTION]: number;
  [StorageKeys.LANGUAGE]: string;
  [StorageKeys.CURRENT_SESSION]: {
    start: number;
  } | null;
};

export const setItem = async <T extends StorageKeys>(name: T, value: StorageReturnData[T]) => {
  // console.log("setItem", name, value);
  await AsyncStorage.setItem(name, JSON.stringify({ value }));
};

export const getItem = async <T extends StorageKeys>(name: T): Promise<StorageReturnData[T] | null> => {
  const result = await AsyncStorage.getItem(name);

  if (!result) {
    return null;
  }

  try {
    return JSON.parse(result).value;
  } catch (e) {
    return null;
  }
};
