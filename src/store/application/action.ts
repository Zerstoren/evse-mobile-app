export enum ApplicationActionType {
  SET_MAX_CAPACITY = "SET_MAX_CAPACITY",
  SET_MAX_CURRENT = "SET_MAX_CURRENT",
  SET_LANGUAGE = "SET_LANGUAGE",

  SET_TARIFF_TYPE = "SET_TARIFF_TYPE",

  SET_NOTIFICATION_CHARGE = "SET_NOTIFICATION_CHARGE",
}

export enum TariffType {
  // Tariff pointer used in version 1.42 and below
  POINTER = "pointer",
  // Tariff number used in version 1.44 and above
  NUMBER = "number",
}

export const setMaxCapacityAction = (maxCapacity: number) => ({
  type: ApplicationActionType.SET_MAX_CAPACITY as const,
  maxCapacity,
});

export const setMaxCurrentAction = (maxCurrent: number) => ({
  type: ApplicationActionType.SET_MAX_CURRENT as const,
  maxCurrent,
});

export const setLanguageAction = (language: string) => ({
  type: ApplicationActionType.SET_LANGUAGE as const,
  language,
});

export const setTariffTypeAction = (tariffType: TariffType) => ({
  type: ApplicationActionType.SET_TARIFF_TYPE as const,
  tariffType,
});

export const setNotificationChargeAction = (notification: boolean) => ({
  type: ApplicationActionType.SET_NOTIFICATION_CHARGE as const,
  notification,
});
