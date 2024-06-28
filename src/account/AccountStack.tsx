import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Account } from "./Account";
import { Profile } from "./Profile";
import { EditProfile } from "./EditProfile";
import { Settings } from "./Settings";
import { AdminStack } from "../admin/AdminStack";
import { MarkUp } from "../markup";
import { Home } from "../Home";

const accStack = createStackNavigator();

export const AccountStack = () => {
  return (
    <accStack.Navigator
      initialRouteName="AccountMenu"
      screenOptions={{
        headerShown: true,
      }}
    >
      <accStack.Screen name="AccountMenu" component={Account} />
      <accStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          headerShown: true,
        }}
      />
      <accStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: "Edit Profile",
          headerShown: true,
        }}
      />

      <accStack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Settings",
          headerShown: true,
        }}
      />
      <accStack.Screen
        name="AdministratorStack"
        component={AdminStack}
        options={{
          title: "Admin",
          headerShown: true,
        }}
      />

      <accStack.Screen
        name="MarkUp"
        component={MarkUp}
        options={{
          title: "MarkUp",
          headerShown: true,
        }}
      />

      <accStack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home - Time Cards",
          headerShown: true,
        }}
      />
    </accStack.Navigator>
  );
};
