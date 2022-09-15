import React, { FC } from "react";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
});

type CurrentDateProps = {
  dateNumber: number;
};

export const CurrentDate: FC<CurrentDateProps> = ({ dateNumber }) => {
  const date = new Date(dateNumber * 1000);
  return (
    <Text style={styles.text}>
      {date.getFullYear()}/{(date.getMonth() + 1).toString().padStart(2, "0")}/
      {(date.getDate() + 1).toString().padStart(2, "0")} {date.getHours().toString().padStart(2, "0")}:
      {date.getMinutes().toString().padStart(2, "0")}
    </Text>
  );
};
