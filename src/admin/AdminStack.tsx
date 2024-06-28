import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Graphs from "./Graphs";
import AdminPanel from "./AdminPanel";
import Seraching from "./AdminUsers";
import AdminUsers from "./AdminUsers";
const adminStack = createStackNavigator();

export const AdminStack = () => {
  return (
    <adminStack.Navigator
      initialRouteName="Searching"
      screenOptions={{
        headerShown: false,
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
          headerShown: false,
        }}
      />
    </adminStack.Navigator>
  );
};
