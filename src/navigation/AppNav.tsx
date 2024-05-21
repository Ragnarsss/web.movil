import { AuthStack } from "../auth/AuthStack";
import { useAuth } from "../hooks/useAuth";
import { MainNavigationStack } from "./MainNavigationStack";

import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, View } from "react-native";

export const AppNav = () => {
  const { isLoading, authToken } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {authToken != null ? <MainNavigationStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
