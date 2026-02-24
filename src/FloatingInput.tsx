import React, { useImperativeHandle, useRef } from "react";
import { Pressable, TextInput as RNTextInput, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

import { baseStyles } from "./defaults";
import { ErrorText } from "./ErrorText";
import { FloatingLabel } from "./FloatingLabel";
import { useFloatingLabel } from "./useFloatingLabel";
import type { FloatingInputProps, FloatingInputRef } from "./types";

export const FloatingInput = React.forwardRef<
  FloatingInputRef,
  FloatingInputProps
>(
  (
    {
      value,
      onChangeText,
      onBlur,
      onFocus,
      onPress,
      label,
      placeholder,
      error,
      touched,
      maxLength,
      keyboardType = "default",
      autoFocus = false,
      editable = true,
      autoCapitalize,
      secureTextEntry = false,
      right,
      renderInput,
      theme: themeProp,
      styles: stylesProp,
      style,
      animationConfig,
      textInputProps,
    },
    ref
  ) => {
    const inputRef = useRef<RNTextInput>(null);

    const {
      hasError,
      shouldBeActive,
      theme,
      labelAnimatedStyle,
      handleFocus,
      handleBlur,
      onContainerLayout,
    } = useFloatingLabel({
      value,
      onFocus,
      onBlur,
      touched,
      error,
      theme: themeProp,
      animationConfig,
    });

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear: () => inputRef.current?.clear(),
      isFocused: () => inputRef.current?.isFocused() ?? false,
    }));

    const inputProps = {
      ref: inputRef,
      editable,
      autoFocus,
      maxLength,
      value,
      placeholder: shouldBeActive ? placeholder : undefined,
      placeholderTextColor: theme.placeholderColor,
      onChangeText,
      onBlur: handleBlur,
      onFocus: handleFocus,
      keyboardType,
      autoCapitalize,
      secureTextEntry,
      selectionColor: hasError ? theme.errorColor : theme.selectionColor,
      cursorColor: hasError ? theme.errorColor : theme.selectionColor,
      selectionHandleColor: hasError ? theme.errorColor : theme.selectionColor,
      underlineColorAndroid: "transparent" as const,
      style: [
        baseStyles.input,
        {
          color: theme.inputColor,
          fontFamily: theme.fontFamily,
          fontSize: theme.fontSize,
        },
        right ? baseStyles.inputWithRight : undefined,
        stylesProp?.input,
      ],
      ...textInputProps,
    };

    const inputElement = renderInput ? (
      renderInput(inputProps)
    ) : (
      <RNTextInput {...inputProps} />
    );

    const inputContainer = (
      <View
        onLayout={onContainerLayout}
        style={[
          baseStyles.inputContainer,
          {
            backgroundColor: theme.backgroundColor,
            borderRadius: theme.borderRadius,
          },
          style,
          stylesProp?.inputContainer,
        ]}
      >
        <View
          style={[baseStyles.labelAndInputArea, stylesProp?.labelAndInputArea]}
        >
          <FloatingLabel
            label={label}
            hasError={hasError}
            theme={theme}
            labelAnimatedStyle={labelAnimatedStyle}
            style={stylesProp?.label}
          />
          {inputElement}
        </View>
        {right && (
          <View style={[baseStyles.rightContainer, stylesProp?.right]}>
            {right}
          </View>
        )}
      </View>
    );

    return (
      <Animated.View
        layout={LinearTransition.springify()}
        style={[baseStyles.container, stylesProp?.container]}
      >
        {onPress ? (
          <Pressable onPress={onPress}>
            <View pointerEvents="none">{inputContainer}</View>
          </Pressable>
        ) : (
          inputContainer
        )}
        {hasError && (
          <ErrorText error={error} theme={theme} style={stylesProp?.error} />
        )}
      </Animated.View>
    );
  }
);

FloatingInput.displayName = "FloatingInput";
