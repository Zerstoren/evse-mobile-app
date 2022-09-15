import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Trans } from "react-i18next";

import { getStatusSelector } from "../../../store/status/select";
import { useStateTranslate } from "../hooks/useStateTranslate";
import { usePilotTranslate } from "../hooks/usePilotTranslate";
import { PILOT, STATUS } from "../../../store/status/data";
import { colors } from "../../system/styles/colors";

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
    flexBasis: "50%",
  },

  boxLeft: {
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 0,
  },

  boxRight: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 0,
    borderLeftWidth: 0,
  },

  text: {
    color: colors.primaryText,
    textAlign: "center",
  },

  success: {
    backgroundColor: colors.success,
  },

  warning: {
    backgroundColor: colors.warning,
  },

  error: {
    backgroundColor: colors.error,
  },
});

export const Status = () => {
  const { state, pilot } = useSelector(getStatusSelector);
  const stateText = useStateTranslate(state);
  const pilotText = usePilotTranslate(pilot);

  // eslint-disable-next-line no-nested-ternary
  const stateColor = [STATUS.StateReady, STATUS.StateCharge].includes(state)
    ? styles.success
    : STATUS.StateWaiting === state
    ? styles.warning
    : styles.error;

  const pilotColor =
    // eslint-disable-next-line no-nested-ternary
    PILOT.No === pilot
      ? styles.warning
      : [PILOT.StateB, PILOT.StateC, PILOT.StateE].includes(pilot)
      ? styles.success
      : styles.error;

  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.boxLeft, stateColor]}>
        <Text style={styles.text}>
          <Trans>Status</Trans>
        </Text>
        <Text style={styles.text}>{stateText}</Text>
      </View>

      <View style={[styles.box, styles.boxRight, pilotColor]}>
        <Text style={styles.text}>
          <Trans>Connected to car</Trans>
        </Text>
        <Text style={styles.text}>{pilotText}</Text>
      </View>
    </View>
  );
};
