import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  setAddCurrAction,
  setGroundCtrlAction,
  setHighVoltageAction,
  setLedCtrlAction,
  setLimitDelayedLimitAction,
  setLimitSuspendErrorAction,
  setMinimalVoltageAction,
  setPageTypeAction,
  setSecurityLeakAction,
  setSecurityRelayAction,
  setTimerTypeAction,
  setTmpCtrlAction,
} from "../../../store/evseConfig/action";
import { getEvseConfig } from "../../../store/evseConfig/select";

export const useEVSESettingsHook = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { pageType: pageTypeSelector, minVoltage: minVoltageSelector } = useSelector(getEvseConfig);
  const [pageType, setPageType] = useState(pageTypeSelector);
  const [minVoltage, setMinVoltage] = useState(minVoltageSelector);

  useEffect(() => {
    setPageType(pageTypeSelector);
    setMinVoltage(minVoltageSelector);
  }, [pageTypeSelector, minVoltageSelector]);

  const alert = useCallback((text: string, onPress: () => void) => {
    Alert.alert(
      t("It's can be dangerous"),
      text,
      [
        {
          text: t("Cancel"),
        },
        {
          text: t("Ok"),
          onPress,
        },
      ],
      { cancelable: false },
    );
  }, []);

  const highVoltageHandler = (value: 0 | 1) => {
    if (value === 0) {
      alert(t("Make sure you use high voltage socket"), () => {
        dispatch(setHighVoltageAction(value));
      });

      return;
    }

    dispatch(setHighVoltageAction(value));
  };

  const groundControlHandler = (value: 1 | 2) => {
    if (value === 1) {
      alert(t("This action can be dangerous and cause injury"), () => {
        dispatch(setGroundCtrlAction(value));
      });

      return;
    }

    dispatch(setGroundCtrlAction(value));
  };

  const errorsSuspendHandler = (value: boolean) => {
    if (!value) {
      alert(t("Doing so can be dangerous and cause injury and damage to your vehicle"), () => {
        dispatch(setLimitSuspendErrorAction(!value));
      });

      return;
    }

    dispatch(setLimitSuspendErrorAction(!value));
  };

  const disableLedHandler = (value: 0 | 1) => {
    dispatch(setLedCtrlAction(value));
  };

  const relayControlHandler = (value: boolean) => {
    dispatch(setSecurityRelayAction(value));
  };
  const leakControlHandler = (value: boolean) => {
    dispatch(setSecurityLeakAction(value));
  };

  const processLimitHandler = (value: 0 | 1) => {
    dispatch(setLimitDelayedLimitAction(!!value));
  };

  const currentSettingsCorrectingHandler = (value: 0 | 1) => {
    dispatch(setAddCurrAction(value));
  };

  const tempControlHandler = (value: 0 | 1) => {
    if (value) {
      alert(t("Doing so may damage your charger"), () => {
        dispatch(setTmpCtrlAction(value));
      });

      return;
    }

    dispatch(setTmpCtrlAction(value));
  };

  const timerTypeHandler = (value: 1 | 2 | 3 | 4) => {
    dispatch(setTimerTypeAction(value));
  };

  const displayTypeHandler = (value: 0 | 1) => {
    setPageType(value);
    dispatch(setPageTypeAction(value));
  };

  const setMinimalVoltageHandler = (value: number) => {
    setMinVoltage(value);
    dispatch(setMinimalVoltageAction(value));
  };

  return {
    pageType,
    minVoltage,
    highVoltageHandler,
    groundControlHandler,
    errorsSuspendHandler,
    disableLedHandler,
    relayControlHandler,
    leakControlHandler,
    processLimitHandler,
    currentSettingsCorrectingHandler,
    tempControlHandler,
    timerTypeHandler,
    displayTypeHandler,
    setMinimalVoltageHandler,
  };
};
