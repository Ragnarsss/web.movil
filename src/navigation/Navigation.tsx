import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Account from "../screens/Account";
import Jobs from "../screens/Jobs";
import Settings from "../screens/Settings";

const Tab = createBottomTabNavigator();
const Navigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Jobs} />
      <Tab.Screen name="Account" component={Account} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default Navigation;
