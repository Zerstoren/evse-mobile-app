import { TariffReducerData } from "../../../store/tariff/reducer";

export interface TariffAbstractConstructor {
  new (): TariffAbstract;
}

export abstract class TariffAbstract {
  data: TariffReducerData;

  public constructor() {
    this.data = {
      currency: "UAH",
      tarif: 0,
      tarif_2: 0,
      tarif_2_status: 0,
      tarif_2_start: 0,
      tarif_2_stop: 0,
      tarif_3: 0,
      tarif_3_status: 0,
      tarif_3_start: 0,
      tarif_3_stop: 0,
    };
  }

  setData() {
    return this.data;
  }
}

export class BaseTariff extends TariffAbstract {}
