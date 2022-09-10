import React from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { AppButton } from "../../system/AppButton";
import { getOneChargeSelector } from "../../../store/evseConfig/select";
import { setOneCharge } from "../../../store/evseConfig/action";
import { STATUS } from "../../../store/status/data";
import { getStatusSelector } from "../../../store/status/select";

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
  },
});

export const StartOneCharge = () => {
  const { t } = useTranslation();
  const oneCharge = useSelector(getOneChargeSelector);
  const dispatch = useDispatch();
  const { state } = useSelector(getStatusSelector);

  if (
    ![
      STATUS.LimitedByTime,
      STATUS.LimitedByEnergy,
      STATUS.LimitedByMoney,
      STATUS.LimitedBySchedule1,
      STATUS.LimitedBySchedule2,
      STATUS.StateDisabled,
    ].includes(state) &&
    !oneCharge
  ) {
    return null;
  }

  const onToggleOneCharge = () => {
    dispatch(setOneCharge(oneCharge ? 0 : 1));
  };

  return (
    <View style={styles.container}>
      <AppButton
        title={oneCharge ? t("Stop one charge") : t("Start one charge")}
        kind={oneCharge ? "error" : "success"}
        onPress={onToggleOneCharge}
      />
    </View>
  );
};
