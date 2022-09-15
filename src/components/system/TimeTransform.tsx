import React, { FC } from "react";
import { Trans } from "react-i18next";
import { Text } from "react-native";
import { colors } from "./styles/colors";

type TimeTransformProps = {
  time: number;
  white?: boolean;
};

export const TimeTransform: FC<TimeTransformProps> = ({ time, white = false }) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return (
    <Text style={white && { color: colors.primaryText }}>
      <Trans
        values={{
          hours: hours.toString().padStart(2, "0"),
          minutes: minutes.toString().padStart(2, "0"),
          seconds: seconds.toString().padStart(2, "0"),
        }}
        defaults="{{hours}}h, {{minutes}}m, {{seconds}}s"
      />
    </Text>
  );
};
