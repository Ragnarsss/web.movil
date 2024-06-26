import Icon from "react-native-vector-icons/FontAwesome";
import { AccountStack } from "../account";
import { MarkUp } from "../markup";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image } from "react-native";
import { Home } from "../Home";
import { useAuth } from "../hooks/useAuth";

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  const { role } = useAuth();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Marks"
        component={MarkUp}
        options={{
          tabBarIcon: () => renderTask(),
        }}
      />
      <Tab.Screen
        name="Account2"
        component={AccountStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

function renderTask() {
  return (
    <Image
      source={require("../assets/exclamation_black.png")}
      style={{ width: 50, height: 50, top: -15 }}
    />
  );
}
