import { useFormik } from "formik";
import React, { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import { useAuth } from "../hooks/useAuth";
import { User } from "../interfaces/props.interface";

interface EditProfileProps {
  user: User;
}

export const EditProfile: FC<EditProfileProps> = ({ user }) => {
  const { authToken, email, role } = useAuth();

  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: user?.firstName || "Your name",
    lastName: user?.lastName || "Your last name",
    userName: user?.userName || role,
    email: user?.email || email,
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    onSubmit: () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    },
    validationSchema: validationSchema,
  });

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={[styles.input, !formik.values.email && { color: "gray" }]}
        value={formik.values.email}
        editable={false}
        pointerEvents="none"
      />
      <Text style={styles.error}>{formik.errors.email || ""}</Text>
      <TextInput
        style={[styles.input, !formik.values.userName && { color: "gray" }]}
        value={formik.values.userName}
        editable={false}
        pointerEvents="none"
      />
      <Text style={styles.error}>{formik.errors.userName || ""}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={formik.values.name}
        onChangeText={(text) => formik.setFieldValue("name", text)}
      />
      <Text style={styles.error}>{formik.errors.name || ""}</Text>
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={formik.values.lastName}
        onChangeText={(text) => formik.setFieldValue("lastName", text)}
      />
      <Text style={styles.error}>{formik.errors.lastName || ""}</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        secureTextEntry={true}
      />
      <Text style={styles.error}>{formik.errors.password || ""}</Text>
      <TouchableOpacity
        style={[styles.button, loading && { backgroundColor: "gray" }]}
        onPress={() => formik.handleSubmit()}
        disabled={loading}
      >
        <Text style={[styles.buttonText, loading && { color: "lightgray" }]}>
          {loading ? "Enviando..." : "Enviar cambios"}
        </Text>
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
const validationSchema = Yup.object().shape({
  name: Yup.string(),
  lastName: Yup.string(),
  userName: Yup.string(),
  password: Yup.string().required(
    "Contraseña requerida para guardar los cambios"
  ),
});
