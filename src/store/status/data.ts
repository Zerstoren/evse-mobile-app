export enum STATUS {
  StateUnknown,
  StateReady,
  StateWaiting,
  StateCharge,
  StateD,
  StateE,
  StateF,
  StateLeakage,
  StateNoGround,
  StateOverTemperatureCpu,
  StateOverTemperaturePlug,
  StateOverTemperatureRelay,
  StateOverCurrent,
  StateOverVoltage,
  StateUnderVoltage,
  LimitedByTime,
  LimitedByEnergy,
  LimitedByMoney,
  LimitedBySchedule1,
  LimitedBySchedule2,
  StateDisabled,
  StateRelayStuck,
  LimitedByAIMode2,
}

export enum PILOT {
  Unknown, // NA
  No, // No
  StateB, // Yes
  StateC, // Yes
  StateD, // NA
  StateE, // Yes
  StateF, // NA
}
