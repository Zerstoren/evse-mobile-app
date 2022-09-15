import { ScheduleReducer } from "../../../store/schedule/reducer";

export interface ScheduleAbstractConstructor {
  new (): ScheduleAbstract;
}

abstract class ScheduleAbstract {
  data: ScheduleReducer;

  public constructor() {
    this.data = {
      currentSchedule1: 0,
      currentSchedule2: 0,
      energySchedule1: -1,
      energySchedule2: -1,
      stopSchedule1: 0,
      stopSchedule2: 0,
      startSchedule1: 0,
      startSchedule2: 0,
    };
  }

  setData() {
    return this.data;
  }
}

export class BaseSchedule extends ScheduleAbstract {}
