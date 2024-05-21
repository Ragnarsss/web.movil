import { StackNavigationProp } from "@react-navigation/stack";
import { useFormik } from "formik";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

type Props = {
  navigation: StackNavigationProp<any>;
};
export const ForgotPassword: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const formik = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    onSubmit: () => {
      Alert.alert("Password reset email sent");
    },
    validationSchema: Yup.object(validationSchema),
  });
  const handleNavigation = (screen: string) => {
    navigation.navigate(screen);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.error}>{formik.errors.email || ""}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => formik.handleSubmit()}
      >
        <Text style={styles.buttonText}>Send Reset Email</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: "#A9A9A9",
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  button: {
    width: 300,
    height: 40,
    backgroundColor: "#1E90FF",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  link: {
    marginTop: 15,
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
  error: {
    textAlign: "center",
    color: "red",
    marginTop: 10,
  },
});

const validationSchema = {
  email: Yup.string()
    .email("Introduce valid email")
    .required("Email is required"),
};

const initialValues = {
  email: "",
};
