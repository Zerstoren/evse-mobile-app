import { Store } from "../configuredStore";

export const getStatusSelector = (state: Store) => state.status;

export const getStatusStateSelector = (state: Store) => state.status.state;

export const getStatusElectricityMeterSelector = (state: Store) => ({
  electricityMeterEnergy1: state.status.IEM1,
  electricityMeterEnergy2: state.status.IEM2,
  electricityMeterMoney1: state.status.IEM1_money,
  electricityMeterMoney2: state.status.IEM2_money,
});
