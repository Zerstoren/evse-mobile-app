import type { Store } from "../configuredStore";

export const getLimitsSelector = (state: Store) => state.limits;
