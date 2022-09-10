import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { Trans, useTranslation } from "react-i18next";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons } from "@expo/vector-icons";

import { AppButton } from "../../system/AppButton";
import {
  getEvseConfig,
  getEvseLimitDelayedLimit,
  getEvseLimitErrorsSuspend,
  getEvseLimitSecurityLeakControl,
  getEvseLimitSecurityRelayControl,
} from "../../../store/evseConfig/select";
import { useEVSESettingsHook } from "../hooks/useEVSESettingsHook";

const styles = StyleSheet.create({
  box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
    borderBottomColor: "#000",
    borderBottomWidth: 0.5,
    paddingBottom: 6,
  },

  button: {
    width: 80,
  },

  select: {
    height: 16,
    fontSize: 14,
    margin: 0,
    padding: 0,
  },

  selectText: {
    height: 20,
    fontSize: 14,
    textAlign: "right",
    marginRight: 0,
  },

  dropdownIcon: {
    marginTop: 2,
    marginLeft: 4,
  },
});

export const EVSESettings = () => {
  const { t } = useTranslation();
  const { add_curr, groundCtrl, led_ctrl, tmp_ctrl, timerType, restricted_mode } = useSelector(getEvseConfig);
  const evseErrorsSuspend = useSelector(getEvseLimitErrorsSuspend);
  const relayControl = useSelector(getEvseLimitSecurityRelayControl);
  const leakControl = useSelector(getEvseLimitSecurityLeakControl);
  const delayedLimit = useSelector(getEvseLimitDelayedLimit);

  const {
    pageType,
    minVoltage,
    highVoltageHandler,
    groundControlHandler,
    errorsSuspendHandler,
    disableLedHandler,
    relayControlHandler,
    leakControlHandler,
    processLimitHandler,
    currentSettingsCorrectingHandler,
    tempControlHandler,
    timerTypeHandler,
    displayTypeHandler,
    setMinimalVoltageHandler,
  } = useEVSESettingsHook();

  return (
    <View>
      <View style={styles.box}>
        <Text>
          <Trans>High voltage socket</Trans>
        </Text>
        <AppButton
          style={styles.button}
          small
          title={restricted_mode ? t("No") : t("Yes")}
          onPress={() => highVoltageHandler(restricted_mode ? 0 : 1)}
        />
      </View>

      <View style={styles.box}>
        <Text>
          <Trans>Ground control</Trans>
        </Text>
        <AppButton
          style={styles.button}
          small
          title={groundCtrl === 2 ? t("Yes") : t("No")}
          onPress={() => groundControlHandler(groundCtrl === 2 ? 1 : 2)}
        />
      </View>

      <View style={styles.box}>
        <Text>
          <Trans>Disable errors</Trans>
        </Text>
        <AppButton
          style={styles.button}
          small
          title={evseErrorsSuspend ? t("Yes") : t("No")}
          onPress={() => errorsSuspendHandler(evseErrorsSuspend)}
        />
      </View>

      <View style={styles.box}>
        <Text>
          <Trans>Disable LED</Trans>
        </Text>
        <AppButton
          style={styles.button}
          small
          title={led_ctrl ? t("Yes") : t("No")}
          onPress={() => disableLedHandler(led_ctrl ? 0 : 1)}
        />
      </View>

      <View style={styles.box}>
        <Text>
          <Trans>Relay control</Trans>
        </Text>
        <AppButton
          style={styles.button}
          small
          title={relayControl ? t("No") : t("Yes")}
          onPress={() => relayControlHandler(!relayControl)}
        />
      </View>

      <View style={styles.box}>
        <Text>
          <Trans>Leak control</Trans>
        </Text>
        <AppButton
          style={styles.button}
          small
          title={leakControl ? t("No") : t("Yes")}
          onPress={() => leakControlHandler(!leakControl)}
        />
      </View>

      <View style={styles.box}>
        <Text>
          <Trans>Special processing for limit/schedule</Trans>
        </Text>
        <AppButton
          style={styles.button}
          small
          title={delayedLimit ? t("Yes") : t("No")}
          onPress={() => processLimitHandler(delayedLimit ? 0 : 1)}
        />
      </View>

      <View style={styles.box}>
        <Text>
          <Trans>Current setting correction</Trans>
        </Text>
        <AppButton
          style={styles.button}
          small
          title={add_curr ? t("Yes") : t("No")}
          onPress={() => currentSettingsCorrectingHandler(add_curr ? 0 : 1)}
        />
      </View>

      <View style={styles.box}>
        <Text>
          <Trans>Temperature control</Trans>
        </Text>
        <AppButton
          style={styles.button}
          small
          title={tmp_ctrl ? t("No") : t("Yes")}
          onPress={() => tempControlHandler(tmp_ctrl ? 0 : 1)}
        />
      </View>

      <View style={styles.box}>
        <Text>
          <Trans>Timer type</Trans>
        </Text>

        <SelectDropdown
          buttonStyle={styles.select}
          buttonTextStyle={styles.selectText}
          data={[t("noSleep"), t("Minus"), t("noPWN"), t("VAG")]}
          defaultValue={[t("noSleep"), t("Minus"), t("noPWN"), t("VAG")][timerType - 1]}
          onSelect={(selectedItem, index) => timerTypeHandler((index + 1) as 1 | 2 | 3 | 4)}
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
          renderDropdownIcon={() => (
            <Ionicons name="chevron-down" size={12} color="black" style={styles.dropdownIcon} />
          )}
        />
      </View>

      <View style={styles.box}>
        <Text>
          <Trans>Display</Trans>
        </Text>

        <SelectDropdown
          buttonStyle={styles.select}
          buttonTextStyle={styles.selectText}
          data={[t("Normal"), t("Pro")]}
          defaultValue={[t("Normal"), t("Pro")][pageType]}
          onSelect={() => displayTypeHandler(pageType ? 0 : 1)}
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
          renderDropdownIcon={() => (
            <Ionicons name="chevron-down" size={12} color="black" style={styles.dropdownIcon} />
          )}
        />
      </View>

      <View style={styles.box}>
        <Text>
          <Trans>Minimal voltage</Trans>
        </Text>

        {!!minVoltage && (
          <SelectDropdown
            buttonStyle={styles.select}
            buttonTextStyle={styles.selectText}
            data={[150, 155, 160, 165, 170, 175, 180]}
            defaultValue={minVoltage}
            onSelect={(selectedItem) => setMinimalVoltageHandler(selectedItem)}
            buttonTextAfterSelection={(selectedItem) => selectedItem}
            rowTextForSelection={(item) => item}
            renderDropdownIcon={() => (
              <Ionicons name="chevron-down" size={12} color="black" style={styles.dropdownIcon} />
            )}
          />
        )}
      </View>
    </View>
  );
};
