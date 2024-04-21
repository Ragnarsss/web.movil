import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import NavigationBottomTab from "./MainNavigationStack";
import Register from "../screens/Register";
import ForgotPassword from "../screens/ForgotPassword";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: "Register",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          title: "Forgot Password",
          headerShown: true,
        }}
      />
      <Stack.Screen name="Main" component={NavigationBottomTab} />
    </Stack.Navigator>
  );
};

export default AuthStack;
