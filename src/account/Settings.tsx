import React, { useContext } from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DarkModeContext } from "../context";

export const Settings = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isDarkMode ? "black" : "white",
      }}
    >
      <Text style={{ color: isDarkMode ? "white" : "black" }}>Settings</Text>
      <Button title="Toggle Dark Mode" onPress={toggleDarkMode} />
    </SafeAreaView>
  );
};
