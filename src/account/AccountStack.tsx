import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Account } from "./Account";
import { Profile } from "./Profile";
import { EditProfile } from "./EditProfile";
import { Settings } from "./Settings";
const accStack = createStackNavigator();

export const AccountStack = () => {
  return (
    <accStack.Navigator
      initialRouteName="AccountMenu"
      screenOptions={{
        headerShown: false,
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
    </accStack.Navigator>
  );
};
