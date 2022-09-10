import { legacy_createStore as createStore, combineReducers } from "redux";

import { status } from "./status/reducer";
import { evseConfig } from "./evseConfig/reducer";
import { adjustment } from "./adjustment/reducer";
import { limits } from "./limits/reducer";
import { schedule } from "./schedule/reducer";
import { tariff } from "./tariff/reducer";
import { application } from "./application/reducer";

export const store = createStore(
  combineReducers({ status, evseConfig, adjustment, limits, schedule, tariff, application }),
  undefined,
);

export type Store = {
  status: ReturnType<typeof status>;
  evseConfig: ReturnType<typeof evseConfig>;
  adjustment: ReturnType<typeof adjustment>;
  limits: ReturnType<typeof limits>;
  schedule: ReturnType<typeof schedule>;
  tariff: ReturnType<typeof tariff>;
  application: ReturnType<typeof application>;
};
