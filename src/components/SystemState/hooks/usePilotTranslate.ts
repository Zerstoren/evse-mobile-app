import { useTranslation } from "react-i18next";
import { PILOT } from "../../../store/status/data";

export const usePilotTranslate = (pilot: PILOT) => {
  const { t } = useTranslation();
  switch (pilot) {
    case PILOT.StateB:
    case PILOT.StateC:
    case PILOT.StateE:
      return t("Yes");

    case PILOT.No:
      return t("No");

    case PILOT.Unknown:
    case PILOT.StateD:
    case PILOT.StateF:
    default:
      return t("No data");
  }
};
