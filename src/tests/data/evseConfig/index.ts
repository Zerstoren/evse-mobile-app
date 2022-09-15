import { EvseConfigReducer } from "../../../store/evseConfig/reducer";

export interface EvseConfigAbstractConstructor {
  new (): EvseConfigAbstract;
}

abstract class EvseConfigAbstract {
  data: EvseConfigReducer;

  public constructor() {
    this.data = {
      maxPower: 0,
      ESP_SW_version: 0,
      limitsStatus: 0,
      restricted_mode: 0,
      groundCtrl: 1,
      led_ctrl: 0,
      security_ctrl: 0,
      add_curr: 0,
      tmp_ctrl: 0,
      minVoltage: 0,
      pageType: 0,
      timerType: 1,
      one_charge: 0,
    };
  }

  setData() {
    return this.data;
  }
}

export class BaseEvseConfig extends EvseConfigAbstract {}
