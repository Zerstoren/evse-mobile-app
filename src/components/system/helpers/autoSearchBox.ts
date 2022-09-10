import NetInfo from "@react-native-community/netinfo";
import { useTranslation } from "react-i18next";
import { checkStatus } from "../../../api/fetchData";
import { setItem, StorageKeys } from "../../../api/storage";

export const useOnAutoSearch = () => {
  const { t } = useTranslation();

  return async (textUpdate: (text: string, status: boolean) => void): Promise<false | string> => {
    const netInfo = await NetInfo.fetch();
    // @ts-expect-error: Exist
    const ip = netInfo.details?.ipAddress;

    if (!ip) {
      textUpdate(t("Can't find device ip address. Type it manually"), false);
      return false;
    }

    textUpdate(t("Searching..."), false);

    const ipPart = `${ip.split(".").splice(0, 3).join(".")}.`;
    const ipArray: number[] = [];
    for (let i = 1; i < 255; i++) {
      ipArray.push(i);
    }

    const blockSize = 16;

    const blockNumber = async (block: number): Promise<number | boolean> => {
      if (block > 16) {
        return false;
      }

      const arrayTestingIp = ipArray.splice(block * blockSize, blockSize);

      const resultArray = await Promise.all(
        arrayTestingIp.map(async (ipElement) => checkStatus(`${ipPart}${ipElement}`)),
      );

      const foundedIndex = resultArray.findIndex((result) => result);

      if (arrayTestingIp[foundedIndex]) {
        return arrayTestingIp[foundedIndex];
      }

      return blockNumber(block + 1);
    };

    const foundedIp = await blockNumber(0);

    if (!foundedIp) {
      textUpdate(t("EVSE box is not found. Type it manually"), false);
      return false;
    }

    const foundedAddress = `${ipPart}${foundedIp}`;
    await setItem(StorageKeys.NETWORK_IP, foundedAddress);
    return foundedAddress;
  };
};
