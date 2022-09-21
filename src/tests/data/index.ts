import { TariffAbstractConstructor, BaseTariff } from "./tariff";
import { StateAbstractConstructor, BaseState } from "./status";
import { ScheduleAbstractConstructor, BaseSchedule } from "./schedule";
import { LimitAbstractConstructor, BaseLimit } from "./limits";
import { EvseConfigAbstractConstructor, BaseEvseConfig } from "./evseConfig";
import { ApplicationAbstractConstructor, BaseApplication } from "./application";
import { AdjustmentAbstractConstructor, BaseAdjustment } from "./adjustment";
import { InitAbstractConstructor } from "./init";
import { InitBase } from "./init/initBase";

export const dataCreator = (
  args: Array<
    | TariffAbstractConstructor
    | StateAbstractConstructor
    | ScheduleAbstractConstructor
    | LimitAbstractConstructor
    | EvseConfigAbstractConstructor
    | ApplicationAbstractConstructor
    | AdjustmentAbstractConstructor
  > = [],
) => {
  return [
    BaseAdjustment,
    BaseApplication,
    BaseEvseConfig,
    BaseSchedule,
    BaseEvseConfig,
    BaseSchedule,
    BaseLimit,
    BaseState,
    BaseTariff,
    ...args,
  ].reduce((prev, Item) => Object.assign(prev, new Item().setData()), {});
};

export const dataInitCreate = (args: InitAbstractConstructor[]) => {
  return [InitBase, ...args].reduce((prev, Item) => Object.assign(prev, new Item().setData()), {});
};
