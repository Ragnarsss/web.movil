import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import MainNavigationStack from "./MainNavigationStack";
import AuthStack from "./AuthStack";
import { useAuth } from "../hooks/useAuth";

const AppNav = () => {
  const { isLoading, autorizationToken } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {autorizationToken != null ? <MainNavigationStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
