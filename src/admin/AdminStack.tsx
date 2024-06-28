import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import AdminPanel from "./AdminPanel";
import AdminUsers from "./AdminUsers";
import Graphs from "./Graphs";
const adminStack = createStackNavigator();

export const AdminStack = () => {
  return (
    <adminStack.Navigator
      initialRouteName="Searching"
      screenOptions={{
        headerShown: true,
      }}
    >
      <adminStack.Screen name="AdminPanel" component={AdminPanel} />

      <adminStack.Screen
        name="Graphics"
        component={Graphs}
        options={{
          title: "Insights",
          headerShown: false,
        }}
      />
      <adminStack.Screen
        name="AdminUsers"
        component={AdminUsers}
        options={{
          title: "Search",
          headerShown: true,
        }}
      />
    </adminStack.Navigator>
  );
};
