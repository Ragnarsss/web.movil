import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Account = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Profile</Text>
      <Text>Settings</Text>
      <Text>Logout</Text>
    </SafeAreaView>
  );
};

export default Account;
