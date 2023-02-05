import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import Slider from "@react-native-community/slider";

import SelectDropdown from "react-native-select-dropdown";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../system/styles/colors";
import { setLanguageAction, setMaxCapacityAction, setMaxCurrentAction } from "../../../store/application/action";
import { getLanguageSelector, getMaxCapacitySelector, getMaxCurrentSelector } from "../../../store/application/select";
import { getEvseConfig } from "../../../store/evseConfig/select";

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 8,
  },

  box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

export const Application = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const maxCapacityData = useSelector(getMaxCapacitySelector);
  const maxCurrentData = useSelector(getMaxCurrentSelector);
  const language = useSelector(getLanguageSelector);
  const { maxPower } = useSelector(getEvseConfig);

  const [maxCapacity, setMaxCapacity] = useState(maxCapacityData);
  const [maxCurrent, setMaxCurrent] = useState(maxCurrentData);

  return (
    <View>
      <View style={[styles.box, styles.container]}>
        <Text>
          <Trans>Language</Trans>
        </Text>
        <View>
          <SelectDropdown
            buttonStyle={styles.select}
            buttonTextStyle={styles.selectText}
            data={[t("English"), t("Ukrainian")]}
            defaultValue={[t("English"), t("Ukrainian")][language === "en" ? 0 : 1]}
            onSelect={(selectedItem, index) => dispatch(setLanguageAction(index === 0 ? "en" : "ua"))}
            buttonTextAfterSelection={(selectedItem) => selectedItem}
            rowTextForSelection={(item) => item}
            onChangeSearchInputText={() => {}}
            renderDropdownIcon={() => (
              <Ionicons name="chevron-down" size={12} color="black" style={styles.dropdownIcon} />
            )}
          />
        </View>
      </View>

      <View style={styles.container}>
        <Text>
          <Trans>Maximum current</Trans>: {maxCurrent} A
        </Text>
        <Slider
          minimumValue={7}
          maximumValue={maxPower}
          step={1}
          minimumTrackTintColor={colors.primary}
          thumbTintColor={colors.primary}
          value={maxCurrent}
          onValueChange={(value) => setMaxCurrent(value)}
          onSlidingComplete={(value) => {
            dispatch(setMaxCurrentAction(value));
          }}
        />
      </View>

      <View style={styles.container}>
        <Text>
          <Trans>Remaining battery capacity</Trans>: {maxCapacity} <Trans>kW/h</Trans>
        </Text>
        <Slider
          minimumValue={0}
          maximumValue={200}
          step={0.5}
          minimumTrackTintColor={colors.primary}
          thumbTintColor={colors.primary}
          value={maxCapacity}
          onValueChange={(value) => setMaxCapacity(value)}
          onSlidingComplete={(value) => {
            dispatch(setMaxCapacityAction(value));
          }}
        />
      </View>
    </View>
  );
};
