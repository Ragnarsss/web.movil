import Account from "../screens/Account";
import Profile from "../screens/Profile";
import EditProfile from "../screens/EditProfile";

import { createStackNavigator } from "@react-navigation/stack";
import Settings from "../screens/Settings";

const accStack = createStackNavigator();

const AccountStack = () => {
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

export default AccountStack;
