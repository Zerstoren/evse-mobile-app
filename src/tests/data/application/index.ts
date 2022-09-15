import { ApplicationReducer } from "../../../store/application/reducer";

export interface ApplicationAbstractConstructor {
  new (): ApplicationAbstract;
}

abstract class ApplicationAbstract {
  data: ApplicationReducer;

  public constructor() {
    this.data = {
      maxCapacity: 100,
      maxCurrent: 16,
      language: "en",
    };
  }

  setData() {
    return this.data;
  }
}

export class BaseApplication extends ApplicationAbstract {}
