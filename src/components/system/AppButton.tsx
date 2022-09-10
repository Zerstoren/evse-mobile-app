import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "./styles/colors";

type AppButtonProps = {
  title: string;
  small?: boolean;
  kind?: "primary" | "success" | "error" | "warning";
} & React.ComponentProps<typeof TouchableOpacity>;

const styles = StyleSheet.create({
  button: {
    elevation: 8,
    backgroundColor: colors.primary,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  buttonSmall: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },

  text: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },

  textSmall: {
    fontSize: 12,
  },

  kindColorPrimary: {
    backgroundColor: colors.primary,
  },

  kindColorSuccess: {
    backgroundColor: colors.success,
  },

  kindColorError: {
    backgroundColor: colors.error,
  },

  kindColorWarning: {
    backgroundColor: colors.warning,
  },
});

export const AppButton: FC<AppButtonProps> = ({ title, style, kind = "primary", small = false, ...args }) => {
  let bgStyles = styles.kindColorPrimary;
  if (kind === "success") {
    bgStyles = styles.kindColorSuccess;
  } else if (kind === "error") {
    bgStyles = styles.kindColorError;
  } else if (kind === "warning") {
    bgStyles = styles.kindColorWarning;
  }

  let smallStyles;
  let smallStylesText;
  if (small) {
    smallStyles = styles.buttonSmall;
    smallStylesText = styles.textSmall;
  }

  return (
    <TouchableOpacity {...args} style={[styles.button, bgStyles, smallStyles, style]}>
      <Text style={[styles.text, smallStylesText]}>{title}</Text>
    </TouchableOpacity>
  );
};
