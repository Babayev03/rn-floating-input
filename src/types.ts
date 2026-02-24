import type {
  KeyboardTypeOptions,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";

export interface FloatingInputTheme {
  backgroundColor?: string;
  labelColor?: string;
  inputColor?: string;
  errorColor?: string;
  selectionColor?: string;
  placeholderColor?: string;
  borderRadius?: number;
  fontSize?: number;
  labelActiveFontSize?: number;
  fontFamily?: string;
}

export interface FloatingInputStyles {
  container?: StyleProp<ViewStyle>;
  inputContainer?: StyleProp<ViewStyle>;
  labelAndInputArea?: StyleProp<ViewStyle>;
  label?: StyleProp<TextStyle>;
  input?: StyleProp<TextStyle>;
  error?: StyleProp<TextStyle>;
  right?: StyleProp<ViewStyle>;
}

export interface FloatingInputAnimationConfig {
  labelDuration?: number;
  shakeMagnitude?: number;
  shakeDuration?: number;
}

export interface FloatingInputRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  isFocused: () => boolean;
}

export interface FloatingInputProps {
  // Value & behavior
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onPress?: () => void;
  label?: string;
  placeholder?: string;
  error?: string;
  touched?: boolean;

  // TextInput pass-through
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
  autoFocus?: boolean;
  editable?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  secureTextEntry?: boolean;

  // Layout
  right?: React.ReactNode;
  renderInput?: (props: TextInputProps) => React.ReactNode;

  // Customization
  theme?: FloatingInputTheme;
  styles?: FloatingInputStyles;
  style?: StyleProp<ViewStyle>;
  animationConfig?: FloatingInputAnimationConfig;

  // Escape hatch
  textInputProps?: Omit<
    TextInputProps,
    "value" | "onChangeText" | "onBlur" | "onFocus" | "multiline"
  >;
}
