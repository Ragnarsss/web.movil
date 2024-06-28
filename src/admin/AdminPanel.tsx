import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { NavigationProp } from "@react-navigation/native";

export const AdminPanel = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  return (
    <SafeAreaView>
      <Text>ADMIN PANEL</Text>
      <TouchableOpacity onPress={() => navigation.navigate("AdminUsers")}>
        <Text>Users</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AdminPanel;

const styles = StyleSheet.create({});
