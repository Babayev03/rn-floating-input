import React from "react";
import Animated from "react-native-reanimated";
import type { StyleProp, TextStyle } from "react-native";

import { baseStyles } from "./defaults";

interface ErrorTextProps {
  error?: string;
  theme: {
    labelActiveFontSize: number;
    errorColor: string;
    fontFamily: string;
  };
  style?: StyleProp<TextStyle>;
}

export const ErrorText = React.memo(function ErrorText({
  error,
  theme,
  style,
}: ErrorTextProps) {
  return (
    <Animated.Text
      style={[
        baseStyles.errorText,
        {
          fontSize: theme.labelActiveFontSize,
          color: theme.errorColor,
          fontFamily: theme.fontFamily,
        },
        style,
      ]}
    >
      {error}
    </Animated.Text>
  );
});
