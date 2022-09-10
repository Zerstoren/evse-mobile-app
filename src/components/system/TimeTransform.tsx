import React, { FC } from "react";
import { Trans } from "react-i18next";

type TimeTransformProps = {
  time: number;
};

export const TimeTransform: FC<TimeTransformProps> = ({ time }) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return (
    <Trans
      values={{
        hours: hours < 10 ? `0${hours}` : hours.toString(),
        minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
        seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
      }}
      defaults="{{hours}}h, {{minutes}}m, {{seconds}}s"
    />
  );
};
