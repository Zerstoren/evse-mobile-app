import { StyleSheet, Text, View } from "react-native";
import { Trans, useTranslation } from "react-i18next";
import Slider from "@react-native-community/slider";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { TimeTransform } from "../system/TimeTransform";
import { getLimitsSelector } from "../../store/limits/select";
import { setLimitsTimeAction, setLimitsMoneyAction, setLimitsEnergyAction } from "../../store/limits/action";
import {
  setLimitEnergyAction,
  setLimitLimitsGlobalAction,
  setLimitMoneyAction,
  setLimitTimeAction,
} from "../../store/evseConfig/action";
import {
  getEvseLimitEnergy,
  getEvseLimitMoney,
  getEvseLimitSuspend,
  getEvseLimitTime,
} from "../../store/evseConfig/select";
import { AppButton } from "../system/AppButton";
import { colors } from "../system/styles/colors";
import { getCurrencySymbolSelector } from "../../store/tariff/select";
import { getMaxCapacitySelector } from "../../store/application/select";

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  block: {
    paddingBottom: 16,
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

export const Limits = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { timeLimit, energyLimit, moneyLimit } = useSelector(getLimitsSelector);
  const currencySymbol = useSelector(getCurrencySymbolSelector);
  const maxCarCapacity = useSelector(getMaxCapacitySelector);

  const selectLimitStatus = useSelector(getEvseLimitSuspend);
  const selectLimitTimeStatus = useSelector(getEvseLimitTime);
  const selectLimitEnergyStatus = useSelector(getEvseLimitEnergy);
  const selectLimitMoneyStatus = useSelector(getEvseLimitMoney);

  const [limitStatus, setLimitStatus] = useState(selectLimitStatus);

  const [limitTimeStatus, setLimitTimeStatus] = useState(selectLimitTimeStatus);
  const [limitEnergyStatus, setLimitEnergyStatus] = useState(selectLimitEnergyStatus);
  const [limitMoneyStatus, setLimitMoneyStatus] = useState(selectLimitMoneyStatus);

  const [limitTime, setLimitTime] = useState(timeLimit);
  const [limitEnergy, setLimitEnergy] = useState(energyLimit);
  const [limitMoney, setLimitMoney] = useState(moneyLimit);

  useEffect(() => {
    setLimitStatus(selectLimitStatus);
    setLimitTime(timeLimit);
    setLimitEnergy(energyLimit);
    setLimitMoney(moneyLimit);
  }, [selectLimitStatus, timeLimit, energyLimit, moneyLimit]);

  useEffect(() => {
    setLimitTime(timeLimit);
    setLimitEnergy(energyLimit);
    setLimitMoney(moneyLimit);
    setLimitTimeStatus(selectLimitTimeStatus);
    setLimitEnergyStatus(selectLimitEnergyStatus);
    setLimitMoneyStatus(selectLimitMoneyStatus);
  }, [timeLimit, energyLimit, moneyLimit, selectLimitTimeStatus, selectLimitEnergyStatus, selectLimitMoneyStatus]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonBlock}>
        <AppButton
          kind={limitStatus ? "warning" : "success"}
          title={limitStatus ? t("Limits disabled") : t("Limits enabled")}
          onPress={() => {
            dispatch(setLimitLimitsGlobalAction(!limitStatus));
            setLimitStatus(!limitStatus);
          }}
        />
      </View>

      {!limitStatus && (
        <>
          <View style={styles.block}>
            <View style={styles.headerWithButton}>
              <Text>
                <Trans>Time Limit</Trans> <TimeTransform time={limitTime} />
              </Text>
              <AppButton
                small
                kind={limitTimeStatus ? "success" : "warning"}
                title={limitTimeStatus ? t("Enabled") : t("Disabled")}
                onPress={() => {
                  setLimitTimeStatus(!limitTimeStatus);
                  dispatch(setLimitTimeAction(!limitTimeStatus));
                }}
              />
            </View>

            <View>
              {limitTime !== -1 && (
                <Slider
                  minimumValue={0}
                  maximumValue={86400}
                  step={60 * 15}
                  minimumTrackTintColor={colors.primary}
                  thumbTintColor={colors.primary}
                  value={limitTime}
                  onValueChange={(value) => setLimitTime(value)}
                  onSlidingComplete={(value) => dispatch(setLimitsTimeAction(value))}
                />
              )}
            </View>
          </View>

          <View style={styles.block}>
            <View style={styles.headerWithButton}>
              <Text>
                <Trans>Energy limit</Trans> {limitEnergy.toFixed(3)} <Trans>kW/h</Trans>
              </Text>
              <AppButton
                small
                kind={limitEnergyStatus ? "success" : "warning"}
                title={limitEnergyStatus ? t("Enabled") : t("Disabled")}
                onPress={() => {
                  setLimitEnergyStatus(!limitEnergyStatus);
                  dispatch(setLimitEnergyAction(!limitEnergyStatus));
                }}
              />
            </View>

            <View>
              {limitEnergy !== -1 && (
                <Slider
                  minimumValue={0}
                  maximumValue={maxCarCapacity}
                  step={0.5}
                  minimumTrackTintColor={colors.primary}
                  thumbTintColor={colors.primary}
                  value={limitEnergy}
                  onValueChange={(value) => setLimitEnergy(value)}
                  onSlidingComplete={(value) => dispatch(setLimitsEnergyAction(value))}
                />
              )}
            </View>
          </View>

          <View style={styles.block}>
            <View style={styles.headerWithButton}>
              <Text>
                <Trans>Money Limit</Trans> {limitMoney.toFixed(2)} {currencySymbol}
              </Text>
              <AppButton
                small
                kind={limitMoneyStatus ? "success" : "warning"}
                title={limitMoneyStatus ? t("Enabled") : t("Disabled")}
                onPress={() => {
                  setLimitMoneyStatus(!limitMoneyStatus);
                  dispatch(setLimitMoneyAction(!limitMoneyStatus));
                }}
              />
            </View>

            <View>
              {limitMoney !== -1 && (
                <Slider
                  minimumValue={0}
                  maximumValue={2000}
                  step={10}
                  minimumTrackTintColor={colors.primary}
                  thumbTintColor={colors.primary}
                  value={limitMoney}
                  onValueChange={(value) => setLimitMoney(value)}
                  onSlidingComplete={(value) => dispatch(setLimitsMoneyAction(value))}
                />
              )}
            </View>
          </View>
        </>
      )}
    </View>
  );
};
