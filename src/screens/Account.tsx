import { Button, Text } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

const Account = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { logout } = useContext(AuthContext)!;
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Account</Text>
      <Button
        title="Profile"
        onPress={() => {
          navigation.navigate("Profile");
        }}
      />
      <Text>Settings</Text>
      <Button
        title="Logout"
        onPress={() => {
          logout();
        }}
      />
    </SafeAreaView>
  );
};

export default Account;
