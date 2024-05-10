import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import AuthStack from "./AuthStack";
import MainNavigationStack from "./MainNavigationStack";

const AppNav = () => {
  const { isLoading, autorizationToken } = useContext(AuthContext)!;

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
