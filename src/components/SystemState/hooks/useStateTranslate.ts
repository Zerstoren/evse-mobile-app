import { useTranslation } from "react-i18next";
import { STATUS } from "../../../store/status/data";

export const useStateTranslate = (state: STATUS) => {
  const { t } = useTranslation();

  switch (state) {
    case STATUS.StateUnknown:
      return t("No data");

    case STATUS.StateReady:
      return t("Ready");

    case STATUS.StateWaiting:
      return t("Waiting");

    case STATUS.StateCharge:
      // Expecting, this some problem.
      // if (tmp_ctrl_val) {
      //   // EVSE.tmp_ctrl_val != 0
      //   return "Температура! Заряд";
      // }

      return t("Charge");

    case STATUS.StateD:
      return "State D";

    case STATUS.StateE:
      return "";

    case STATUS.StateF:
      return "-";

    case STATUS.StateLeakage:
      return t("Leakage");

    case STATUS.StateNoGround:
      return t("No grounding");

    case STATUS.StateOverTemperatureCpu:
      return t("Overheating CPU");

    case STATUS.StateOverTemperaturePlug:
      return t("Overheating socket");

    case STATUS.StateOverTemperatureRelay:
      return t("Overheating");

    case STATUS.StateOverCurrent:
      return t("Overcurrent");

    case STATUS.StateOverVoltage:
      return t("Overvoltage");

    case STATUS.StateUnderVoltage:
      return t("Low voltage");

    case STATUS.LimitedByTime:
      return t("Limited by time");

    case STATUS.LimitedByEnergy:
      return t("Limited by energy");

    case STATUS.LimitedByMoney:
      return t("Limited by money");

    case STATUS.LimitedBySchedule1:
      return t("Limited by schedule 1");

    case STATUS.LimitedBySchedule2:
      return t("Limited by schedule 2");

    case STATUS.StateDisabled:
      return t("Disabled by user");

    case STATUS.StateRelayStuck:
      return t("Relay stuck");

    case STATUS.LimitedByAIMode2:
      return t("Limited by Adaptive mode");

    default:
      return t("Unknown");
  }
};
