import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { FloatingInput, FloatingInputRef } from "rn-floating-input";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const nameRef = useRef<FloatingInputRef>(null);
  const emailRef = useRef<FloatingInputRef>(null);

  const markTouched = (field: string) => () =>
    setTouched((t) => ({ ...t, [field]: true }));

  const emailError =
    touched.email && !email.includes("@") ? "Invalid email address" : undefined;
  const nameError =
    touched.name && name.length === 0 ? "Name is required" : undefined;
  const passwordError =
    touched.password && password.length > 0 && password.length < 6
      ? "Password must be at least 6 characters"
      : undefined;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar style="dark" />

        <Text style={styles.title}>FloatingInput Examples</Text>

        {/* ─── Basic ─── */}
        <Text style={styles.section}>Basic</Text>
        <FloatingInput
          ref={nameRef}
          label="Full Name"
          value={name}
          onChangeText={setName}
          onBlur={markTouched("name")}
          error={nameError}
          touched={touched.name}
          autoCapitalize="words"
        />

        <View style={styles.gap} />

        <FloatingInput
          ref={emailRef}
          label="Email"
          value={email}
          onChangeText={setEmail}
          onBlur={markTouched("email")}
          error={emailError}
          touched={touched.email}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="you@example.com"
        />

        {/* ─── Right element ─── */}
        <Text style={styles.section}>With Right Element</Text>
        <FloatingInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          onBlur={markTouched("password")}
          error={passwordError}
          touched={touched.password}
          secureTextEntry={!showPassword}
          right={
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.eyeIcon}>{showPassword ? "🙈" : "👁️"}</Text>
            </Pressable>
          }
        />

        {/* ─── Pressable mode ─── */}
        <Text style={styles.section}>Pressable Mode</Text>
        <FloatingInput
          label="Date of Birth"
          value={date}
          onPress={() => {
            Alert.alert("Date Picker", "Open your date picker here", [
              { text: "Set Jan 1, 2000", onPress: () => setDate("01/01/2000") },
              { text: "Cancel" },
            ]);
          }}
        />

        {/* ─── Custom theme ─── */}
        <Text style={styles.section}>Custom Theme</Text>
        <FloatingInput
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          theme={{
            backgroundColor: "#E8F5E9",
            selectionColor: "#2E7D32",
            labelColor: "#4CAF50",
            inputColor: "#1B5E20",
            borderRadius: 8,
          }}
        />

        {/* ─── Custom animation ─── */}
        <Text style={styles.section}>Custom Animation</Text>
        <FloatingInput
          label="Slow label transition"
          animationConfig={{
            labelDuration: 500,
            shakeMagnitude: 6,
          }}
        />

        {/* ─── Ref methods ─── */}
        <Text style={styles.section}>Ref Methods</Text>
        <View style={styles.row}>
          <Pressable
            style={styles.button}
            onPress={() => nameRef.current?.focus()}
          >
            <Text style={styles.buttonText}>Focus Name</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => emailRef.current?.focus()}
          >
            <Text style={styles.buttonText}>Focus Email</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              nameRef.current?.clear();
              setName("");
            }}
          >
            <Text style={styles.buttonText}>Clear Name</Text>
          </Pressable>
        </View>

        {/* ─── Disabled ─── */}
        <Text style={styles.section}>Disabled</Text>
        <FloatingInput
          label="Not editable"
          value="Fixed value"
          editable={false}
          theme={{ backgroundColor: "#E0E0E0", inputColor: "#9E9E9E" }}
        />

        <View style={{ height: 60 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    color: "#1A1A1A",
  },
  section: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 28,
    marginBottom: 12,
  },
  gap: {
    height: 12,
  },
  eyeIcon: {
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    backgroundColor: "#31BE30",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 13,
  },
});
