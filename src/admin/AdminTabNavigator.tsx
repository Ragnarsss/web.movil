import Icon from "react-native-vector-icons/FontAwesome5";

import { AccountStack } from "../account";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Graphs from "./Graphs";
import AdminCards from "./AdminCards";
import PopUpMenu from "./components/PopUpMenu";
import AdminUsers from "./AdminUsers";

const Tab = createBottomTabNavigator();

export const AdminTab = () => {
  return (
    <Tab.Navigator screenOptions={{}} initialRouteName="Graphics">
      <Tab.Screen
        name="Graphics"
        component={Graphs}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="chart-line" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Searching"
        component={AdminUsers}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
          headerRight: () => <PopUpMenu />,
        }}
      />

      <Tab.Screen
        name="Cards"
        component={AdminCards}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="id-card" size={size} color={color} />
          ),
          headerRight: () => <PopUpMenu />,
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
