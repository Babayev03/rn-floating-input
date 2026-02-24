import React from "react";
import Animated, { type AnimatedStyle } from "react-native-reanimated";
import type { StyleProp, TextStyle } from "react-native";

import { baseStyles } from "./defaults";

interface FloatingLabelProps {
  label?: string;
  hasError: boolean;
  theme: {
    errorColor: string;
    labelColor: string;
    fontFamily: string;
  };
  labelAnimatedStyle: AnimatedStyle;
  style?: StyleProp<TextStyle>;
}

export const FloatingLabel = React.memo(function FloatingLabel({
  label,
  hasError,
  theme,
  labelAnimatedStyle,
  style,
}: FloatingLabelProps) {
  return (
    <Animated.Text
      style={[
        baseStyles.label,
        {
          color: hasError ? theme.errorColor : theme.labelColor,
          fontFamily: theme.fontFamily,
        },
        labelAnimatedStyle,
        style,
      ]}
    >
      {label}
    </Animated.Text>
  );
});
