import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Trans } from "react-i18next";
import { useSelector } from "react-redux";

import { getStatusSelector } from "../../../store/status/select";
import { TimeTransform } from "../../system/TimeTransform";
import { colors } from "../../system/styles/colors";
import { getCurrencySymbolSelector } from "../../../store/tariff/select";

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
    backgroundColor: colors.primary,
  },

  text: {
    color: colors.primaryText,
    textAlign: "center",
  },
});

export const SessionInfo = () => {
  const { sessionTime, sessionEnergy, sessionMoney } = useSelector(getStatusSelector);
  const currencySymbol = useSelector(getCurrencySymbolSelector);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>
          <Trans>Session consume</Trans>
        </Text>
        <Text style={styles.text}>
          {sessionEnergy} <Trans>kW/h</Trans>
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>
          <Trans>Session time</Trans>
        </Text>
        <Text style={styles.text}>
          <TimeTransform time={sessionTime} />
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>
          <Trans>Session cost</Trans>
        </Text>
        <Text style={styles.text}>
          {sessionMoney} {currencySymbol}
        </Text>
      </View>
    </View>
  );
};
