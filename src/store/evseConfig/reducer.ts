import {
  EvsaConfigType,
  setAddCurrAction,
  setEvseConfigAction,
  setEvseInitConfigAction,
  setGroundCtrlAction,
  setHighVoltageAction,
  setLedCtrlAction,
  setLimitAction,
  setMinVoltageAction,
  setOneCharge,
  setPageTypeAction,
  setSecurityLeakAction,
  setSecurityRelayAction,
  setTimerTypeAction,
  setTmpCtrlAction,
} from "./action";
import { addApiLimit, addApiSecurity, removeApiLimit, removeApiSecurity } from "../../api/bitOperations";
import { postData } from "../../api/postData";
import { SecurityCtrl } from "./data";

export type EvseConfigReducer = {
  maxPower: number;
  ESP_SW_version: number;
  limitsStatus: number;
  restricted_mode: 0 | 1;
  groundCtrl: 1 | 2;
  led_ctrl: 0 | 1;
  security_ctrl: number;
  add_curr: 0 | 1;
  tmp_ctrl: 0 | 1;
  minVoltage: number;
  pageType: 0 | 1;
  timerType: number;
  one_charge: 0 | 1;
};

const initialState: EvseConfigReducer = {
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

export function evseConfig(
  state = initialState,
  action:
    | ReturnType<typeof setEvseConfigAction>
    | ReturnType<typeof setEvseInitConfigAction>
    | ReturnType<typeof setLimitAction>
    | ReturnType<typeof setHighVoltageAction>
    | ReturnType<typeof setGroundCtrlAction>
    | ReturnType<typeof setLedCtrlAction>
    | ReturnType<typeof setAddCurrAction>
    | ReturnType<typeof setTmpCtrlAction>
    | ReturnType<typeof setMinVoltageAction>
    | ReturnType<typeof setPageTypeAction>
    | ReturnType<typeof setTimerTypeAction>
    | ReturnType<typeof setSecurityRelayAction>
    | ReturnType<typeof setSecurityLeakAction>
    | ReturnType<typeof setOneCharge>,
): EvseConfigReducer {
  switch (action.type) {
    case EvsaConfigType.SET_EVSE_CONFIG:
    case EvsaConfigType.SET_EVSE_INIT_CONFIG:
      return { ...state, ...action.payload };

    case EvsaConfigType.SET_HIGH_VOLTAGE:
      postData(["restricted_mode", action.value]);
      return { ...state, restricted_mode: action.value };

    case EvsaConfigType.SET_GROUND_CTRL:
      postData(["groundCtrl", action.value]);
      return { ...state, groundCtrl: action.value };

    case EvsaConfigType.SET_LED_CTRL:
      postData(["led_ctrl", action.value]);
      return { ...state, led_ctrl: action.value };

    case EvsaConfigType.SET_ADD_CURR:
      postData(["add_curr", action.value]);
      return { ...state, add_curr: action.value };

    case EvsaConfigType.SET_TMP_CTRL:
      postData(["tmp_ctrl", action.value]);
      return { ...state, tmp_ctrl: action.value };

    case EvsaConfigType.SET_TIMER_TYPE:
      postData(["timerType", action.value]);
      return { ...state, timerType: action.value };

    case EvsaConfigType.SET_PAGE_TYPE:
      postData(["pageType", action.value]);
      return { ...state, pageType: action.value };

    case EvsaConfigType.SET_MIN_VOLTAGE:
      postData(["minVoltage", action.value]);
      return { ...state, minVoltage: action.value };

    case EvsaConfigType.SET_LIMIT:
      return {
        ...state,
        limitsStatus: action.status
          ? addApiLimit(state.limitsStatus, action.limitName)
          : removeApiLimit(state.limitsStatus, action.limitName),
      };

    case EvsaConfigType.SET_SECURITY_RELAY:
      return {
        ...state,
        security_ctrl: action.value
          ? addApiSecurity(state.security_ctrl, SecurityCtrl.RelayCheck)
          : removeApiSecurity(state.security_ctrl, SecurityCtrl.RelayCheck),
      };

    case EvsaConfigType.SET_SECURITY_LEAK:
      return {
        ...state,
        security_ctrl: action.value
          ? addApiSecurity(state.security_ctrl, SecurityCtrl.LeakCheck)
          : removeApiSecurity(state.security_ctrl, SecurityCtrl.LeakCheck),
      };

    case EvsaConfigType.SET_ONE_CHARGE:
      postData(["one_charge", action.value]);
      return { ...state, one_charge: action.value };

    default:
      return state;
  }
}
