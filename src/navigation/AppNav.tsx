import { AdminTab } from "../admin/AdminTabNavigator";
import { AuthStack } from "../auth/AuthStack";
import { roles } from "../common/enum";
import { useAuth } from "../hooks/useAuth";
import { MainNavigationStack } from "./MainNavigationStack";

import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, View } from "react-native";

export const AppNav = () => {
  const { isLoading, authToken, role } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {authToken !== null ? (
        role === roles.ADMIN ? (
          <AdminTab />
        ) : (
          <MainNavigationStack />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};
