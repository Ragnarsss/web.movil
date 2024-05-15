import { AuthContext } from "../context/AuthContext";

import React, { useContext } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user } = useContext(AuthContext)!;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Email: {user?.email}</Text>
      <Text>Username: {user?.userName}</Text>
    </SafeAreaView>
  );
};

export default Profile;
