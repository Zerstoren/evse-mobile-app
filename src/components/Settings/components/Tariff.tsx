import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Trans } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { TariffRecord } from "./TariffRecord";
import { getCurrencySymbolSelector, tariffSelector } from "../../../store/tariff/select";
import { setCurrencyAction } from "../../../store/tariff/action";

const styles = StyleSheet.create({
  box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
  },

  header: {
    fontSize: 22,
  },

  input: {
    borderColor: "#000",
    borderWidth: 0.5,
    borderRadius: 4,
    width: 90,
    padding: 0,
    paddingLeft: 4,
  },
});

export const Tariff = () => {
  const dispatch = useDispatch();
  const tariffData = useSelector(tariffSelector);
  const currency = useSelector(getCurrencySymbolSelector);

  return (
    <View>
      <View style={styles.box}>
        <Text>
          <Trans>Currency</Trans>
        </Text>
        <TextInput style={styles.input} value={currency} onChangeText={(text) => dispatch(setCurrencyAction(text))} />
      </View>

      <View style={[styles.box]}>
        <Text>
          <Trans>Tariff</Trans>
        </Text>
        <TextInput style={styles.input} keyboardType="numeric" value={tariffData.toFixed(2)} />
      </View>

      <TariffRecord type={2} />
      <TariffRecord type={3} />
    </View>
  );
};
