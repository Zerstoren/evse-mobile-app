import { useSelector } from "react-redux";
import { getEvseConfig } from "../../../store/evseConfig/select";
import { getMaxCurrentSelector } from "../../../store/application/select";

export const useMaxCurrent = () => {
  const maxCurrent = useSelector(getMaxCurrentSelector);
  const { restricted_mode, maxPower } = useSelector(getEvseConfig);

  if (restricted_mode) {
    return maxCurrent > 16 ? 16 : maxCurrent;
  }

  return maxPower < maxCurrent ? maxPower : maxCurrent;
};
