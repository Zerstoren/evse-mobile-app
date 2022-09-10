import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Trans, useTranslation } from "react-i18next";
import React, { useSelector } from "react-redux";

import { getStatusSelector } from "../../../store/status/select";
import { colors } from "../../system/styles/colors";
import { getEvseConfig } from "../../../store/evseConfig/select";
import { useEVSESettingsHook } from "../../Settings/hooks/useEVSESettingsHook";
import { useMaxCurrent } from "../../system/hooks/useMaxCurrent";
import { getAiCurrentSelector } from "../../../store/adjustment/select";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },

  box: {
    paddingTop: 8,
    paddingBottom: 8,
    borderColor: "#000",
    borderWidth: 0.5,
    flexBasis: "33.33%",
    backgroundColor: colors.primary,
  },

  text: {
    color: "#fff",
    textAlign: "center",
  },

  weak: {
    backgroundColor: colors.background,
  },

  normal: {
    backgroundColor: colors.success,
  },

  strong: {
    backgroundColor: colors.warning,
    color: "#fff",
  },
});

export const CurrentPower = () => {
  const { t } = useTranslation();
  const { curMeas1, powerMeas, voltMeas1 } = useSelector(getStatusSelector);
  const { restricted_mode } = useSelector(getEvseConfig);
  const { highVoltageHandler } = useEVSESettingsHook();
  const maxCurrent = useMaxCurrent();
  const aiCurrent = useSelector(getAiCurrentSelector);

  // eslint-disable-next-line no-nested-ternary
  const voltColor = voltMeas1 > 253 ? styles.strong : voltMeas1 < 207 ? styles.weak : styles.normal;

  return (
    <View style={styles.container}>
      <View style={[styles.box, voltColor]}>
        <Text style={[styles.text, voltColor]}>{t("Voltage")}</Text>
        <Text style={[styles.text, voltColor]}>{Math.floor(voltMeas1)} V</Text>
      </View>
      <View style={[styles.box]}>
        <TouchableOpacity onLongPress={() => highVoltageHandler(restricted_mode ? 0 : 1)}>
          <Text style={styles.text}>{t("Current")}</Text>
          <Text style={styles.text}>
            {curMeas1.toFixed(1)}
            {!!aiCurrent && ` / ${aiCurrent}`} / {maxCurrent} A
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.box]}>
        <Text style={styles.text}>{t("Power")}</Text>
        <Text style={styles.text}>
          {(powerMeas / 1000).toFixed(1)} <Trans>kW</Trans>
        </Text>
      </View>
    </View>
  );
};
