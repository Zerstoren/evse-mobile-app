import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { StopCharging } from "./components/StopCharging";
import { Status } from "./components/Status";
import { CurrentPower } from "./components/CurrentPower";
import { SessionInfo } from "./components/SessionInfo";
import { BoxStatus } from "./components/BoxStatus";
import { ElectricityMeter } from "./components/ElectricityMeter";
import { RemoveSpicificLimit } from "./components/RemoveSpicificLimit";
import { StartOneCharge } from "./components/StartOneCharge";

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export const SystemState = () => {
  return (
    <View style={[styles.container]}>
      <ScrollView>
        <StopCharging />
        <StartOneCharge />
        <RemoveSpicificLimit />

        <Status />
        <CurrentPower />
        <SessionInfo />
        <BoxStatus />

        <ElectricityMeter />
      </ScrollView>
    </View>
  );
};
