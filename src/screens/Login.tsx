import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import { AuthContext } from "../context/AuthContext";

interface LoginProps {
  navigation: any;
}

const Login: React.FC<LoginProps> = (props) => {
  const { login, autorizationToken } = useContext(AuthContext)!;
  const { navigation } = props;
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    onSubmit: async () => {
      await login(formik.values.email, formik.values.password);
    },
    validationSchema: Yup.object(validationSchema),
  });

  const handleNavigation = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        value={formik.values.email}
        onChangeText={(text) => {
          formik.setFieldValue("email", text);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        secureTextEntry={true}
      />
      <Text style={styles.error}>
        {formik.errors.email || formik.errors.password}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => formik.handleSubmit()}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleNavigation("Register")}
        disabled={loading}
      >
        <Text style={styles.link}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleNavigation("ForgotPassword")}
        disabled={loading}
      >
        <Text style={styles.link}>Forgot Password?</Text>
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
  },
  error: {
    textAlign: "center",
    color: "red",
    marginTop: 10,
  },
});

export default Login;

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = {
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial"
    )
    .required("Password is required"),
};
