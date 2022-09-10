import i18next from "i18next";
import { ApplicationActionType, setLanguageAction, setMaxCapacityAction, setMaxCurrentAction } from "./action";
import { setItem, StorageKeys } from "../../api/storage";

export type ApplicationReducer = {
  maxCapacity: number;
  maxCurrent: number;
  language: string;
};

const initialState: ApplicationReducer = {
  maxCapacity: 100,
  maxCurrent: 16,
  language: "en",
};

export function application(
  state = initialState,
  action:
    | ReturnType<typeof setMaxCapacityAction>
    | ReturnType<typeof setMaxCurrentAction>
    | ReturnType<typeof setLanguageAction>,
): ApplicationReducer {
  switch (action.type) {
    case ApplicationActionType.SET_MAX_CAPACITY:
      setItem(StorageKeys.CAR_CAPACITY, action.maxCapacity);
      return {
        ...state,
        maxCapacity: action.maxCapacity,
      };

    case ApplicationActionType.SET_MAX_CURRENT:
      setItem(StorageKeys.MAX_CURRENT, action.maxCurrent);
      return {
        ...state,
        maxCurrent: action.maxCurrent,
      };

    case ApplicationActionType.SET_LANGUAGE:
      setTimeout(() => {
        i18next.changeLanguage(action.language);
      }, 100);
      setItem(StorageKeys.LANGUAGE, action.language);
      return {
        ...state,
        language: action.language,
      };

    default:
      return state;
  }
}
