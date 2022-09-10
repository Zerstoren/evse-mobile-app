import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { getStatusStateSelector } from "../../../store/status/select";
import { STATUS } from "../../../store/status/data";
import { getEvseLimitSelector } from "../../../store/evseConfig/select";
import { setLimitEvseAction } from "../../../store/evseConfig/action";
import { AppButton } from "../../system/AppButton";

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 8,
  },
});

export const StopCharging = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const status = useSelector(getStatusStateSelector);
  const evsaDisabled = useSelector(getEvseLimitSelector);

  if (STATUS.StateC !== status) {
    return null;
  }

  const stopCharging = () => {
    Alert.alert(
      t("Stop charging"),
      t("Are you sure you want to stop charging?"),
      [
        {
          text: t("Cancel"),
        },
        {
          text: t("Yes"),
          onPress: () => dispatch(setLimitEvseAction(!evsaDisabled)),
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.container}>
      <AppButton
        onPress={stopCharging}
        title={evsaDisabled ? t("Continue charging") : t("Stop charging")}
        kind={evsaDisabled ? "success" : "error"}
      />
    </View>
  );
};
