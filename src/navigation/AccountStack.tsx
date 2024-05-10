import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/Account";
import Profile from "../screens/Profile";

const accStack = createStackNavigator();

const AccountStack = () => {
  return (
    <accStack.Navigator
      initialRouteName="Account"
      // screenOptions={{
      //   headerShown: false,
      // }}
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

export default AccountStack;
