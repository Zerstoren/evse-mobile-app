import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Trans, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { getStatusSelector } from "../../../store/status/select";
import { colors } from "../../system/styles/colors";
import { getEvseConfig } from "../../../store/evseConfig/select";
import { useEVSESettingsHook } from "../../Settings/hooks/useEVSESettingsHook";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  box: {
    paddingTop: 8,
    paddingBottom: 8,
    shadowColor: "#000",
    shadowRadius: 15,
    shadowOffset: { width: 10, height: 10 },
    borderColor: "#000",
    borderWidth: 0.5,
    flexBasis: "33.33%",
  },

  boxLeft: {
    borderBottomLeftRadius: 3,
  },

  boxMiddle: {
    borderBottomWidth: 0.6,
  },

  boxRight: {
    borderBottomRightRadius: 3,
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
    backgroundColor: colors.error,
  },
});

export const BoxStatus = () => {
  const { t } = useTranslation();
  const { boxTemp, socketTemp } = useSelector(getStatusSelector);
  const { groundCtrl } = useSelector(getEvseConfig);
  const { groundControlHandler } = useEVSESettingsHook();

  const boxGroundColor = groundCtrl === 2 ? styles.normal : styles.strong;
  // eslint-disable-next-line no-nested-ternary
  const socketColor = socketTemp > 50 ? styles.strong : socketTemp < 10 ? styles.weak : styles.normal;
  // eslint-disable-next-line no-nested-ternary
  const boxColor = boxTemp > 50 ? styles.strong : boxTemp < 10 ? styles.weak : styles.normal;

  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.boxLeft, boxColor]}>
        <Text style={styles.text}>
          <Trans>Box temp</Trans>
        </Text>
        <Text style={styles.text}>{boxTemp} °С</Text>
      </View>
      <View style={[styles.box, styles.boxMiddle, socketColor]}>
        <Text style={styles.text}>
          <Trans>Socket temp</Trans>
        </Text>
        <Text style={styles.text}>{socketTemp} °С</Text>
      </View>
      <View style={[styles.box, styles.boxRight, boxGroundColor]}>
        <TouchableOpacity onLongPress={() => groundControlHandler(groundCtrl === 1 ? 2 : 1)}>
          <Text style={styles.text}>
            <Trans>Ground</Trans>
          </Text>
          <Text style={styles.text}>{groundCtrl === 2 ? t("Yes") : t("No")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
