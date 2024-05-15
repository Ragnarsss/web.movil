import { StackNavigationProp } from "@react-navigation/stack";
import { useFormik } from "formik";
import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import { useAuth } from "../hooks/useAuth";

type Props = {
  navigation: StackNavigationProp<any>;
};

const Register: React.FC<Props> = ({ navigation }) => {
  const { register } = useAuth();
  const formik = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    onSubmit: async () => {
      const response = await register(
        formik.values.usernName,
        formik.values.email,
        formik.values.password
      );
      if (response.statusCode === 201) {
        Alert.alert("Register success");
        navigation.navigate("Login");
      }
    },
    validationSchema: Yup.object(validationSchema),
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="User name"
        value={formik.values.usernName}
        onChangeText={formik.handleChange("usernName")}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          formik.handleSubmit();
        }}
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
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  link: {
    marginTop: 15,
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
});

const initialValues = {
  usernName: "",
  email: "",
  password: "",
};

const validationSchema = {
  usernName: Yup.string().min(3).max(32).required("User name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial"
    )
    .required("Password is required"),
};

export default Register;
