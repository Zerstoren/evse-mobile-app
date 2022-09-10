import React, { FC, useCallback } from "react";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

type TimePickerProps = {
  value: Date;
  onChange: (event: DateTimePickerEvent, date: Date | undefined) => void;
};

const TimePickerRaw: FC<TimePickerProps> = ({ value, onChange }) => {
  const callback = useCallback(onChange, []);
  return <DateTimePicker mode="time" is24Hour value={value} onChange={callback} />;
};

export const TimePicker = React.memo(TimePickerRaw);
