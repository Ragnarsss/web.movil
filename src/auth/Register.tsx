import { AuthContext } from "../context/AuthContext";

import { StackNavigationProp } from "@react-navigation/stack";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

type Props = {
  navigation: StackNavigationProp<any>;
};

export const Register: React.FC<Props> = () => {
  const { register } = useContext(AuthContext)!;
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    onSubmit: () => {
      setLoading(true);
      try {
        register(
          formik.values.userName,
          formik.values.email,
          formik.values.password
        );
      } catch (error) {
        console.log("error register", error);
      }
      setLoading(false);
    },
    validationSchema: Yup.object(validationSchema),
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="User name"
        value={formik.values.userName}
        onChangeText={(text) => formik.setFieldValue("userName", text)}
      />
      <Text style={styles.error}>{formik.errors.userName || " "}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formik.values.email}
        onChangeText={(text) => formik.setFieldValue("email", text)}
      />
      <Text style={styles.error}>{formik.errors.email || " "}</Text>

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      />
      <Text style={styles.error}>{formik.errors.password || " "}</Text>

      <TouchableOpacity
        style={[styles.button, loading ? styles.buttonDisabled : styles.button]}
        onPress={() => {
          formik.handleSubmit();
        }}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Register</Text>
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
  buttonDisabled: {
    width: 300,
    height: 40,
    backgroundColor: "##A9A9A9",
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

const initialValues = {
  userName: "",
  email: "",
  password: "",
};

const validationSchema = {
  userName: Yup.string().required("User name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short. Minimum 8 characters.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[^\w\d\s]/,
      "Password must contain at least one special character (not a space)"
    ),
};
