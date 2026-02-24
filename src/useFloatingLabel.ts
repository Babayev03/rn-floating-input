import { useEffect, useState } from "react";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import type { LayoutChangeEvent } from "react-native";

import {
  DEFAULT_ANIMATION,
  DEFAULT_THEME,
  INPUT_PADDING_TOP,
} from "./defaults";
import type { FloatingInputAnimationConfig, FloatingInputTheme } from "./types";

interface UseFloatingLabelOptions {
  value?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  touched?: boolean;
  error?: string;
  theme?: FloatingInputTheme;
  animationConfig?: FloatingInputAnimationConfig;
}

export function useFloatingLabel({
  value,
  onFocus,
  onBlur,
  touched,
  error,
  theme: themeProp,
  animationConfig: animationProp,
}: UseFloatingLabelOptions) {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = !!touched && !!error;

  const theme = { ...DEFAULT_THEME, ...themeProp };
  const anim = { ...DEFAULT_ANIMATION, ...animationProp };

  const shouldBeActive = isFocused || !!value;
  const focusAnim = useSharedValue(value ? 1 : 0);
  const shakeAnim = useSharedValue(0);
  const containerHeight = useSharedValue(0);

  useEffect(() => {
    focusAnim.value = withTiming(shouldBeActive ? 1 : 0, {
      duration: anim.labelDuration,
    });
  }, [shouldBeActive]);

  useEffect(() => {
    if (!hasError) return;
    const mag = anim.shakeMagnitude;
    const dur = anim.shakeDuration;
    shakeAnim.value = withSequence(
      withTiming(-mag, { duration: dur }),
      withTiming(mag, { duration: dur }),
      withTiming(-mag, { duration: dur }),
      withTiming(0, { duration: dur })
    );
  }, [hasError]);

  const labelAnimatedStyle = useAnimatedStyle(() => {
    const h = containerHeight.value;
    const translateY =
      h > 0
        ? interpolate(
            focusAnim.value,
            [0, 1],
            [0, -(h / 2 - INPUT_PADDING_TOP / 1.75)]
          )
        : 0;

    return {
      transform: [{ translateX: shakeAnim.value }, { translateY }],
      fontSize: interpolate(
        focusAnim.value,
        [0, 1],
        [theme.fontSize, theme.labelActiveFontSize]
      ),
    };
  });

  function handleFocus() {
    setIsFocused(true);
    onFocus?.();
  }

  function handleBlur() {
    setIsFocused(false);
    onBlur?.();
  }

  function onContainerLayout(e: LayoutChangeEvent) {
    containerHeight.value = e.nativeEvent.layout.height;
  }

  return {
    isFocused,
    hasError,
    shouldBeActive,
    theme,
    labelAnimatedStyle,
    handleFocus,
    handleBlur,
    onContainerLayout,
  };
}
