import React, { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { Trans, useTranslation } from "react-i18next";
import Slider from "@react-native-community/slider";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";

import { getTimeInMinutes, transformFromMinutesToDateTime, transformMinutesToTime } from "../../system/helpers/time";
import { TimePicker } from "../../system/TimePicker";
import { useScheduleType } from "../hooks/useScheduleType";
import { AppButton } from "../../system/AppButton";
import { colors } from "../../system/styles/colors";
import { useMaxCurrent } from "../../system/hooks/useMaxCurrent";
import { getMaxCapacitySelector } from "../../../store/application/select";

const styles = StyleSheet.create({
  block: {
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
});

type ScheduleProps = {
  type: 1 | 2;
};

export const ScheduleRange: FC<ScheduleProps> = ({ type }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const maxCurrent = useMaxCurrent();
  const [pickStartDate, setPickStartDate] = useState(false);
  const [pickStopDate, setPickStopDate] = useState(false);
  const maxCarCapacity = useSelector(getMaxCapacitySelector);

  const {
    getScheduleSelector,
    getEvseLimitSchedule,
    getEvseLimitScheduleCurrent,
    getEvseLimitScheduleEnergy,
    setLimitScheduleAction,
    setLimitScheduleCurrentAction,
    setLimitScheduleEnergyAction,
    setScheduleCurrentAction,
    setScheduleEnergyAction,
    setScheduleStartAction,
    setScheduleStopAction,
  } = useScheduleType(type);

  const scheduleEnabledStatus = useSelector(getEvseLimitSchedule);
  const scheduleEnergyEnabledStatus = useSelector(getEvseLimitScheduleEnergy);
  const scheduleCurrentEnabledStatus = useSelector(getEvseLimitScheduleCurrent);
  const { energySchedule, currentSchedule, startSchedule, stopSchedule } = useSelector(getScheduleSelector);

  const [scheduleEnabled, setScheduleEnabled] = useState(scheduleEnabledStatus);
  const [scheduleEnergyEnabled, setScheduleEnergyEnabled] = useState(scheduleEnergyEnabledStatus);
  const [scheduleCurrentEnabled, setScheduleCurrentEnabled] = useState(scheduleCurrentEnabledStatus);
  const [scheduleEnergy, setScheduleEnergy] = useState(energySchedule);
  const [scheduleCurrent, setScheduleCurrent] = useState(currentSchedule);
  const [scheduleStart, setScheduleStart] = useState(startSchedule);
  const [scheduleStop, setScheduleStop] = useState(stopSchedule);

  useEffect(() => {
    setScheduleEnabled(scheduleEnabledStatus);
    setScheduleEnergyEnabled(scheduleEnergyEnabledStatus);
    setScheduleCurrentEnabled(scheduleCurrentEnabledStatus);
    setScheduleEnergy(energySchedule);
    setScheduleCurrent(currentSchedule);
    setScheduleStart(startSchedule);
    setScheduleStop(stopSchedule);
  }, [
    scheduleEnabledStatus,
    scheduleEnergyEnabledStatus,
    scheduleCurrentEnabledStatus,
    energySchedule,
    currentSchedule,
    startSchedule,
    stopSchedule,
  ]);

  const onPickDateStart = useCallback(
    (event: DateTimePickerEvent) => {
      setPickStartDate(false);

      if (event.type === "dismissed" || !event.nativeEvent.timestamp) {
        return;
      }

      setScheduleStart(getTimeInMinutes(event.nativeEvent.timestamp));
      dispatch(setScheduleStartAction(getTimeInMinutes(event.nativeEvent.timestamp)));
    },
    [dispatch, setScheduleStartAction],
  );

  const onPickDateStop = useCallback(
    (event: DateTimePickerEvent) => {
      setPickStopDate(false);

      if (event.type === "dismissed" || !event.nativeEvent.timestamp) {
        return;
      }

      setScheduleStop(getTimeInMinutes(event.nativeEvent.timestamp));
      dispatch(setScheduleStopAction(getTimeInMinutes(event.nativeEvent.timestamp)));
    },
    [dispatch, setScheduleStopAction],
  );

  return (
    <View style={styles.block}>
      <View style={styles.headerWithButton}>
        <Text style={styles.textHeader}>
          <Trans defaults="Schedule range {{type}}" values={{ type }} />
        </Text>
        <AppButton
          kind={scheduleEnabled ? "success" : "warning"}
          title={scheduleEnabled ? t("Enabled") : t("Disabled")}
          onPress={() => {
            setScheduleEnabled(!scheduleEnabled);
            dispatch(setLimitScheduleAction(!scheduleEnabled));
          }}
        />
      </View>

      {scheduleEnabled && (
        <>
          <View style={styles.pickDateBlock}>
            <Text style={styles.pickDateTextFirst}>
              <Trans>From</Trans>:
            </Text>
            <AppButton small title={transformMinutesToTime(scheduleStart)} onPress={() => setPickStartDate(true)} />
            <Text style={styles.pickDateTextSecond}>
              <Trans>To</Trans>:{" "}
            </Text>
            <AppButton small title={transformMinutesToTime(scheduleStop)} onPress={() => setPickStopDate(true)} />

            {pickStartDate && (
              <TimePicker value={transformFromMinutesToDateTime(scheduleStart)} onChange={onPickDateStart} />
            )}
            {pickStopDate && (
              <TimePicker value={transformFromMinutesToDateTime(scheduleStop)} onChange={onPickDateStop} />
            )}
          </View>

          <View style={styles.headerWithButton}>
            <Text>
              <Trans>Energy limit</Trans>: {scheduleEnergy.toFixed(3)} <Trans>kW/h</Trans>
            </Text>
            <AppButton
              small
              kind={scheduleEnergyEnabled ? "success" : "warning"}
              title={scheduleEnergyEnabled ? t("Enabled") : t("Disabled")}
              onPress={() => {
                setScheduleEnergyEnabled(!scheduleEnergyEnabled);
                dispatch(setLimitScheduleEnergyAction(!scheduleEnergyEnabled));
              }}
            />
          </View>

          <View>
            {scheduleEnergy !== -1 && (
              <Slider
                minimumValue={0}
                maximumValue={maxCarCapacity}
                step={0.5}
                minimumTrackTintColor={colors.primary}
                thumbTintColor={colors.primary}
                value={scheduleEnergy}
                onValueChange={(value) => setScheduleEnergy(value)}
                onSlidingComplete={(value) => dispatch(setScheduleEnergyAction(value))}
              />
            )}
          </View>

          <View style={styles.headerWithButton}>
            <Text>
              <Trans>Power limit</Trans>: {scheduleCurrent} A
            </Text>
            <AppButton
              small
              kind={scheduleCurrentEnabled ? "success" : "warning"}
              title={scheduleCurrentEnabled ? t("Enabled") : t("Disabled")}
              onPress={() => {
                setScheduleCurrentEnabled(!scheduleCurrentEnabled);
                dispatch(setLimitScheduleCurrentAction(!scheduleCurrentEnabled));
              }}
            />
          </View>

          <View>
            {!!scheduleCurrent && (
              <Slider
                minimumValue={7}
                maximumValue={maxCurrent}
                step={1}
                minimumTrackTintColor={colors.primary}
                thumbTintColor={colors.primary}
                value={scheduleCurrent}
                onValueChange={(value) => setScheduleCurrent(value)}
                onSlidingComplete={(value) => dispatch(setScheduleCurrentAction(value))}
              />
            )}
          </View>
        </>
      )}
    </View>
  );
};
