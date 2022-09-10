import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";

import { getStatusSelector } from "../../../store/status/select";
import { AppButton } from "../../system/AppButton";
import { STATUS } from "../../../store/status/data";
import {
  setLimitEnergyAction,
  setLimitEvseAction,
  setLimitMoneyAction,
  setLimitSchedule1Action,
  setLimitSchedule2Action,
  setLimitTimeAction,
} from "../../../store/evseConfig/action";

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
  },
});

export const RemoveSpicificLimit = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { state } = useSelector(getStatusSelector);

  if (
    ![
      STATUS.LimitedByTime,
      STATUS.LimitedByEnergy,
      STATUS.LimitedByMoney,
      STATUS.LimitedBySchedule1,
      STATUS.LimitedBySchedule2,
      STATUS.StateDisabled,
    ].includes(state)
  ) {
    return null;
  }

  const onEnableCharging = () => {
    if (state === STATUS.StateDisabled) {
      dispatch(setLimitEvseAction(false));
    }

    if (state === STATUS.LimitedByTime) {
      dispatch(setLimitTimeAction(false));
    }

    if (state === STATUS.LimitedByEnergy) {
      dispatch(setLimitEnergyAction(false));
    }

    if (state === STATUS.LimitedByMoney) {
      dispatch(setLimitMoneyAction(false));
    }

    if (state === STATUS.LimitedBySchedule1) {
      dispatch(setLimitSchedule1Action(false));
    }

    if (state === STATUS.LimitedBySchedule2) {
      dispatch(setLimitSchedule2Action(false));
    }
  };

  let title = "";

  if (state === STATUS.StateDisabled) {
    title = t("Restore charging");
  }

  if (state === STATUS.LimitedByTime) {
    title = t("Disable time limit");
  }

  if (state === STATUS.LimitedByEnergy) {
    title = t("Disable energy limit");
  }

  if (state === STATUS.LimitedByMoney) {
    title = t("Disable money limit");
  }

  if (state === STATUS.LimitedBySchedule1) {
    title = t("Disable schedule 1");
  }

  if (state === STATUS.LimitedBySchedule2) {
    title = t("Disable schedule 2");
  }

  return (
    <View style={styles.container}>
      <AppButton title={title} kind="success" onPress={onEnableCharging} />
    </View>
  );
};
