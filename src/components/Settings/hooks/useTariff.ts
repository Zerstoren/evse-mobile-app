import {
  tariff2Selector,
  tariff3Selector,
  tariffStart2Selector,
  tariffStart3Selector,
  tariffStatus2Selector,
  tariffStatus3Selector,
  tariffStop2Selector,
  tariffStop3Selector,
} from "../../../store/tariff/select";
import {
  setTariff2Action,
  setTariffStart2Action,
  setTariffStatus2Action,
  setTariffStop2Action,
  setTariff3Action,
  setTariffStart3Action,
  setTariffStatus3Action,
  setTariffStop3Action,
} from "../../../store/tariff/action";

export const useTariff = (type: 2 | 3) => {
  if (type === 2) {
    return {
      tariffSelector: tariff2Selector,
      tariffStartSelector: tariffStart2Selector,
      tariffStatusSelector: tariffStatus2Selector,
      tariffStopSelector: tariffStop2Selector,
      setTariffAction: setTariff2Action,
      setTariffStatusAction: setTariffStatus2Action,
      setTariffStartAction: setTariffStart2Action,
      setTariffStopAction: setTariffStop2Action,
    };
  }

  return {
    tariffSelector: tariff3Selector,
    tariffStartSelector: tariffStart3Selector,
    tariffStatusSelector: tariffStatus3Selector,
    tariffStopSelector: tariffStop3Selector,
    setTariffAction: setTariff3Action,
    setTariffStatusAction: setTariffStatus3Action,
    setTariffStartAction: setTariffStart3Action,
    setTariffStopAction: setTariffStop3Action,
  };
};
