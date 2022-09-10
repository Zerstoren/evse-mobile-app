import {
  getEvseLimitSchedule1,
  getEvseLimitScheduleCurrent1,
  getEvseLimitScheduleEnergy1,
  getEvseLimitSchedule2,
  getEvseLimitScheduleCurrent2,
  getEvseLimitScheduleEnergy2,
} from "../../../store/evseConfig/select";
import {
  setLimitSchedule1Action,
  setLimitScheduleCurrent1Action,
  setLimitScheduleEnergy1Action,
  setLimitSchedule2Action,
  setLimitScheduleCurrent2Action,
  setLimitScheduleEnergy2Action,
} from "../../../store/evseConfig/action";
import {
  setScheduleCurrent1,
  setScheduleEnergy1,
  setScheduleStart1,
  setScheduleStop1,
  setScheduleCurrent2,
  setScheduleEnergy2,
  setScheduleStart2,
  setScheduleStop2,
} from "../../../store/schedule/action";
import { getScheduleSelector1, getScheduleSelector2 } from "../../../store/schedule/select";

export const useScheduleType = (type: 1 | 2) => {
  if (type === 1) {
    return {
      getScheduleSelector: getScheduleSelector1,
      getEvseLimitSchedule: getEvseLimitSchedule1,
      getEvseLimitScheduleCurrent: getEvseLimitScheduleCurrent1,
      getEvseLimitScheduleEnergy: getEvseLimitScheduleEnergy1,
      setLimitScheduleAction: setLimitSchedule1Action,
      setLimitScheduleCurrentAction: setLimitScheduleCurrent1Action,
      setLimitScheduleEnergyAction: setLimitScheduleEnergy1Action,
      setScheduleCurrentAction: setScheduleCurrent1,
      setScheduleEnergyAction: setScheduleEnergy1,
      setScheduleStartAction: setScheduleStart1,
      setScheduleStopAction: setScheduleStop1,
    };
  }

  return {
    getScheduleSelector: getScheduleSelector2,
    getEvseLimitSchedule: getEvseLimitSchedule2,
    getEvseLimitScheduleCurrent: getEvseLimitScheduleCurrent2,
    getEvseLimitScheduleEnergy: getEvseLimitScheduleEnergy2,
    setLimitScheduleAction: setLimitSchedule2Action,
    setLimitScheduleCurrentAction: setLimitScheduleCurrent2Action,
    setLimitScheduleEnergyAction: setLimitScheduleEnergy2Action,
    setScheduleCurrentAction: setScheduleCurrent2,
    setScheduleEnergyAction: setScheduleEnergy2,
    setScheduleStartAction: setScheduleStart2,
    setScheduleStopAction: setScheduleStop2,
  };
};
