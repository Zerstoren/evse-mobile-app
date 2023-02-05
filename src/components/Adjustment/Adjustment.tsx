import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { Trans, useTranslation } from "react-i18next";
import Slider from "@react-native-community/slider";
import SelectDropdown from "react-native-select-dropdown";

import { getAiStatusSelector, getCurrentSetSelector, getVoltageAISelector } from "../../store/adjustment/select";
import { setAiStatus, setCurrentSet, setVoltageAI } from "../../store/adjustment/action";
import { AdaptiveModeStatus } from "../../store/adjustment/data";
import { AppButton } from "../system/AppButton";
import { useMaxCurrent } from "../system/hooks/useMaxCurrent";

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  block: {
    paddingBottom: 16,
  },

  withButton: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    alignItems: "center",
  },

  textWithButton: {
    marginRight: 16,
  },
});

export const Adjustment = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const maxCurrent = useMaxCurrent();

  const currentSet = useSelector(getCurrentSetSelector);
  const aiVoltage = useSelector(getVoltageAISelector);
  const aiStatus = useSelector(getAiStatusSelector);

  const [current, setCurrent] = useState(12);
  const [cutOff, setCutOff] = useState(180);
  const [aiStatusButton, setAiStatusButton] = useState(aiStatus !== AdaptiveModeStatus.DISABLED);

  useEffect(() => {
    setAiStatusButton(aiStatus !== AdaptiveModeStatus.DISABLED);
  }, [aiStatus]);

  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Text>
          <Trans>Maximum current</Trans> {current} A
        </Text>

        <View>
          {!!currentSet && (
            <Slider
              minimumValue={7}
              maximumValue={maxCurrent}
              step={1}
              minimumTrackTintColor="#3071A9"
              thumbTintColor="#3071A9"
              value={currentSet}
              onValueChange={(value) => setCurrent(value)}
              onSlidingComplete={(value) => dispatch(setCurrentSet(value))}
            />
          )}
        </View>
      </View>

      <View style={[styles.block, styles.withButton]}>
        <Text style={styles.textWithButton}>
          <Trans>Adaptive mode</Trans>
        </Text>
        <AppButton
          kind={aiStatusButton ? "success" : "warning"}
          title={aiStatusButton ? t("Enabled") : t("Disabled")}
          onPress={() => {
            if (aiStatusButton) {
              dispatch(setAiStatus(AdaptiveModeStatus.DISABLED));
            }

            setAiStatusButton(!aiStatusButton);
          }}
        />
      </View>

      {aiStatusButton && (
        <>
          <View style={styles.block}>
            <Text>
              <Trans>Cut-off voltage</Trans> {cutOff} V
            </Text>

            <View>
              {!!aiVoltage && (
                <Slider
                  minimumValue={180}
                  maximumValue={220}
                  step={5}
                  minimumTrackTintColor="#3071A9"
                  thumbTintColor="#3071A9"
                  value={aiVoltage}
                  onValueChange={(value) => setCutOff(value)}
                  onSlidingComplete={(value) => dispatch(setVoltageAI(value))}
                />
              )}
            </View>
          </View>

          <View style={styles.withButton}>
            <Text style={styles.textWithButton}>
              <Trans>Mode type</Trans>
            </Text>

            <View>
              <SelectDropdown
                data={[t("Voltage"), t("Auto"), t("Power")]}
                defaultValue={[t("Voltage"), t("Auto"), t("Power")][aiStatus - 1]}
                onSelect={(selectedItem, index) => dispatch(setAiStatus(index + 1))}
                buttonTextAfterSelection={(selectedItem) => selectedItem}
                rowTextForSelection={(item) => item}
                onChangeSearchInputText={() => {}}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};
