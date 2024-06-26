import { NavigationProp } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../hooks/useAuth";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS } from "../constants";

export const Account = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const { logout, role } = useAuth();

  useEffect(() => {}, [role]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            logout();
          }}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        {role === "administrador" ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("AdministratorStack");
            }}
          >
            <Text style={styles.buttonText}>Admin</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("MarkUp");
          }}
        >
          <Text style={styles.buttonText}>Mark Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.buttonText}>Time cards</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    minHeight: "100%",
  },
  buttonContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
