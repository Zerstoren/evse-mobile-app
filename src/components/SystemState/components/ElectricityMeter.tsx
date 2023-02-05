import React, { useSelector } from "react-redux";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Trans, useTranslation } from "react-i18next";

import { getStatusElectricityMeterSelector } from "../../../store/status/select";
import { colors } from "../../system/styles/colors";
import { postData } from "../../../api/postData";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 16,
  },

  box: {
    padding: 8,
    borderColor: "#000",
    borderWidth: 0.5,
    borderRadius: 3,
    backgroundColor: colors.primary,
    elevation: 8,
  },

  boxText: {
    textAlign: "center",
    color: "#fff",
  },
});

export const ElectricityMeter = () => {
  const { t } = useTranslation();
  const { electricityMeterEnergy1, electricityMeterMoney1, electricityMeterEnergy2, electricityMeterMoney2 } =
    useSelector(getStatusElectricityMeterSelector);

  const onResetMeter = (type: 1 | 2) => {
    Alert.alert(
      t(`Reset electricity meter ${type}`),
      t("Are you sure?") as string,
      [
        {
          text: t("Cancel") as string,
        },
        {
          text: t("Reset") as string,
          onPress: () => {
            postData([`rstEM${type}`]);
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableOpacity onLongPress={() => onResetMeter(1)}>
          <View>
            <Text style={styles.boxText}>
              <Trans>Energy meter 1</Trans>
            </Text>
          </View>
          <View>
            <Text style={styles.boxText}>
              {electricityMeterEnergy1} <Trans>kW/h</Trans>
            </Text>
          </View>
          <View>
            <Text style={styles.boxText}>{electricityMeterMoney1} UAH</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <TouchableOpacity onLongPress={() => onResetMeter(2)}>
          <View>
            <Text style={styles.boxText}>
              <Trans>Energy meter 2</Trans>
            </Text>
          </View>
          <View>
            <Text style={styles.boxText}>
              {electricityMeterEnergy2} <Trans>kW/h</Trans>
            </Text>
          </View>
          <View>
            <Text style={styles.boxText}>{electricityMeterMoney2} UAH</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
