import { StyleSheet } from "react-native";
import type { FloatingInputAnimationConfig, FloatingInputTheme } from "./types";

export const INPUT_PADDING_TOP = 24;
const INPUT_PADDING_BOTTOM = 8;
const INPUT_PADDING_HORIZONTAL = 16;
const RIGHT_CONTAINER_OFFSET = 12;
const INPUT_WITH_RIGHT_PADDING = 48;
const ERROR_MARGIN_LEFT = 8;
const ERROR_MARGIN_TOP = 6;

export const DEFAULT_THEME: Required<FloatingInputTheme> = {
  backgroundColor: "#EDEFF2",
  labelColor: "#878A99",
  inputColor: "#36373D",
  errorColor: "#E3152E",
  selectionColor: "#31BE30",
  placeholderColor: "#878A99",
  borderRadius: 14,
  fontSize: 16,
  labelActiveFontSize: 12,
  fontFamily: "System",
};

export const DEFAULT_ANIMATION: Required<FloatingInputAnimationConfig> = {
  labelDuration: 200,
  shakeMagnitude: 2,
  shakeDuration: 50,
};

export const baseStyles = StyleSheet.create({
  container: {},
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelAndInputArea: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    position: "absolute",
    left: INPUT_PADDING_HORIZONTAL,
  },
  input: {
    paddingTop: INPUT_PADDING_TOP,
    paddingBottom: INPUT_PADDING_BOTTOM,
    paddingLeft: INPUT_PADDING_HORIZONTAL,
    paddingRight: INPUT_PADDING_HORIZONTAL,
  },
  inputWithRight: {
    paddingRight: INPUT_WITH_RIGHT_PADDING,
  },
  rightContainer: {
    position: "absolute",
    right: RIGHT_CONTAINER_OFFSET,
    alignSelf: "center",
  },
  errorText: {
    marginLeft: ERROR_MARGIN_LEFT,
    marginTop: ERROR_MARGIN_TOP,
  },
});
