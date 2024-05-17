import Home from "../screens/Home";
import Jobs from "../screens/MarkUp";
import AccountStack from "./AccountStack";

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();

const MainNavigationStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
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
        component={Jobs}
        options={{
          tabBarIcon: () => renderTask(),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
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

export default MainNavigationStack;
