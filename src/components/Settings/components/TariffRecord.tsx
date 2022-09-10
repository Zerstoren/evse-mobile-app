import React, { FC, useCallback, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { AppButton } from "../../system/AppButton";
import { getTimeInMinutes, transformFromMinutesToDateTime, transformMinutesToTime } from "../../system/helpers/time";
import { TimePicker } from "../../system/TimePicker";
import { useTariff } from "../hooks/useTariff";

const styles = StyleSheet.create({
  block: {
    paddingTop: 16,
    paddingBottom: 32,
  },

  textHeader: {
    fontSize: 22,
    textAlign: "center",
  },

  pickDateBlock: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 8,
  },

  pickDateTextFirst: {
    paddingRight: 8,
  },

  pickDateTextSecond: {
    paddingLeft: 8,
    paddingRight: 8,
  },

  buttonBlock: {
    marginBottom: 16,
  },

  headerWithButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

type TariffRecordProps = {
  type: 2 | 3;
};

export const TariffRecord: FC<TariffRecordProps> = ({ type }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    tariffSelector,
    tariffStopSelector,
    tariffStatusSelector,
    tariffStartSelector,
    setTariffAction,
    setTariffStatusAction,
    setTariffStartAction,
    setTariffStopAction,
  } = useTariff(type);

  const [pickStartDate, setPickStartDate] = useState(false);
  const [pickStopDate, setPickStopDate] = useState(false);

  const tariffData = useSelector(tariffSelector);
  const tariffStartData = useSelector(tariffStartSelector);
  const tariffStopData = useSelector(tariffStopSelector);
  const tariffStatusData = useSelector(tariffStatusSelector);

  const [tariffState, setTariffState] = useState(tariffData.toFixed(2));
  const [tariffStartState, setTariffStartState] = useState(tariffStartData);
  const [tariffStopState, setTariffStopState] = useState(tariffStopData);
  const [tariffStatusState, setTariffStatusState] = useState(tariffStatusData);

  const onPickDateStart = useCallback((event: DateTimePickerEvent) => {
    setPickStartDate(false);

    if (event.type === "dismissed" || !event.nativeEvent.timestamp) {
      return;
    }

    setTariffStartState(getTimeInMinutes(event.nativeEvent.timestamp));
    dispatch(setTariffStartAction(getTimeInMinutes(event.nativeEvent.timestamp)));
  }, []);

  const onPickDateStop = useCallback((event: DateTimePickerEvent) => {
    setPickStopDate(false);

    if (event.type === "dismissed" || !event.nativeEvent.timestamp) {
      return;
    }

    setTariffStopState(getTimeInMinutes(event.nativeEvent.timestamp));
    dispatch(setTariffStopAction(getTimeInMinutes(event.nativeEvent.timestamp)));
  }, []);

  return (
    <View style={styles.block}>
      <View style={styles.headerWithButton}>
        <Text style={styles.textHeader}>
          <Trans defaults="Tariff {{type}}" values={{ type }} />
        </Text>
        <AppButton
          kind={tariffStatusState ? "success" : "warning"}
          title={tariffStatusState ? t("Enabled") : t("Disabled")}
          onPress={() => {
            setTariffStatusState(tariffStatusState ? 0 : 1);
            dispatch(setTariffStatusAction(tariffStatusState ? 0 : 1));
          }}
        />
      </View>

      <View style={styles.headerWithButton}>
        <View style={styles.pickDateBlock}>
          <Text style={styles.pickDateTextFirst}>
            <Trans>From</Trans>:
          </Text>
          <AppButton small title={transformMinutesToTime(tariffStartState)} onPress={() => setPickStartDate(true)} />
          <Text style={styles.pickDateTextSecond}>
            <Trans>To</Trans>:
          </Text>
          <AppButton small title={transformMinutesToTime(tariffStopState)} onPress={() => setPickStopDate(true)} />

          {pickStartDate && (
            <TimePicker value={transformFromMinutesToDateTime(tariffStartState)} onChange={onPickDateStart} />
          )}
          {pickStopDate && (
            <TimePicker value={transformFromMinutesToDateTime(tariffStopState)} onChange={onPickDateStop} />
          )}
        </View>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={tariffState}
          onChangeText={(text) => {
            dispatch(setTariffAction(parseFloat(text) + 0.00001));
            setTariffState(text);
          }}
        />
      </View>
    </View>
  );
};
