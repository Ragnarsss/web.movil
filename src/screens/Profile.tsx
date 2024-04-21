import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

const Profile = () => {
  const authContext = useContext(AuthContext);
  let user = null;
  if (authContext!.user) {
    user = authContext!.user;
  }
  if (!authContext) {
    return (
      <SafeAreaView>
        <Text>Profile PlaceHolder</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Email: {user?.email}</Text>
      <Text>Username: {user?.userName}</Text>
    </SafeAreaView>
  );
};

export default Profile;
