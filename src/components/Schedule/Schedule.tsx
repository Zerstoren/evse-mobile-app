import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { ScheduleRange } from "./components/ScheduleRange";
import { setLimitScheduleGlobalAction } from "../../store/evseConfig/action";
import { getEvseLimitSchedule } from "../../store/evseConfig/select";
import { AppButton } from "../system/AppButton";

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

export const Schedule = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const limitStatusData = useSelector(getEvseLimitSchedule);
  const [limitStatus, setLimitStatus] = useState(limitStatusData);

  useEffect(() => {
    setLimitStatus(limitStatusData);
  }, [limitStatusData]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonBlock}>
        <AppButton
          kind={limitStatus ? "warning" : "success"}
          title={limitStatus ? t("Schedule disabled") : t("Schedule enabled")}
          onPress={() => {
            dispatch(setLimitScheduleGlobalAction(!limitStatus));
            setLimitStatus(!limitStatus);
          }}
        />
      </View>

      {!limitStatus && (
        <>
          <ScheduleRange type={1} />
          <ScheduleRange type={2} />
        </>
      )}
    </View>
  );
};
