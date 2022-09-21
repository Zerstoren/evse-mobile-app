import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Trans } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { TariffRecord } from "./TariffRecord";
import { getCurrencySymbolSelector, tariffSelector } from "../../../store/tariff/select";
import { setCurrencyAction, setTariff1Action } from "../../../store/tariff/action";
import { getTariffTypeSelector } from "../../../store/application/select";
import { TariffType } from "../../../store/application/action";

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
  const tariffDataSelector = useSelector(tariffSelector);
  const currency = useSelector(getCurrencySymbolSelector);
  const tariffType = useSelector(getTariffTypeSelector);

  const [tariffState, setTariffState] = useState(
    tariffType === TariffType.POINTER ? tariffDataSelector.toFixed(2) : (tariffDataSelector / 100).toString(),
  );

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
        <TextInput
          testID="tariff-1"
          style={styles.input}
          keyboardType="numeric"
          value={tariffState}
          onChangeText={(text) => {
            dispatch(
              setTariff1Action(tariffType === TariffType.POINTER ? parseFloat(text) + 0.00001 : parseFloat(text) * 100),
            );
            setTariffState(text);
          }}
        />
      </View>

      <TariffRecord type={2} />
      <TariffRecord type={3} />
    </View>
  );
};
