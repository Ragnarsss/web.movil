import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Account from "../screens/Account";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Image } from "react-native";
import Home from "../screens/Home";
import Jobs from "../screens/MarkUp";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();
const accStack = createStackNavigator();

const AccountNavigator = () => {
  return (
    <accStack.Navigator
      initialRouteName="Account"
      screenOptions={{
        headerShown: false,
      }}
    >
      <accStack.Screen name="Account" component={Account} />
      <accStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          headerShown: true,
        }}
      />
    </accStack.Navigator>
  );
};

const MainNavigationStack = () => {
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
        component={Jobs}
        options={{
          tabBarIcon: () => renderTask(),
        }}
      />
      <Tab.Screen
        name="Account2"
        component={AccountNavigator}
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
