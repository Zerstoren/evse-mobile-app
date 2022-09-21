import { TariffAbstract } from "./index";
import { TariffReducerData } from "../../../store/tariff/reducer";

export class TariffVersion142 extends TariffAbstract {
  setData(): TariffReducerData {
    this.data = {
      ...this.data,
      tarif: 1.68,
      tarif_2: 0.84,
      tarif_3: 0.42,
    };
    return super.setData();
  }
}

export class TariffVersion144 extends TariffAbstract {
  setData(): TariffReducerData {
    this.data = {
      ...this.data,
      tarif: 168,
      tarif_2: 84,
      tarif_3: 42,
    };
    return super.setData();
  }
}
