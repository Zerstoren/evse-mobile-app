import { InitAbstract } from "./index";

export class InitBase extends InitAbstract {
  setData() {
    this.data.ESP_SW_version = 144;
    return this.data;
  }
}

export class InitBase142 extends InitAbstract {
  setData() {
    this.data.ESP_SW_version = 142;
    return this.data;
  }
}
