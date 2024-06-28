import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

import React, { useCallback, useContext, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useAuth } from "../hooks/useAuth";
import { User } from "../interfaces/props.interface";
import { fetchUserData } from "../api/apiService";

export const Profile = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const { authToken } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    // Fetch user data from the API
    const user = await fetchUserData(authToken as string);
    setUser(user.data);
    console.log(user.email);
  };

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, [])
  );

  const fullName = `${user?.firstName ? user?.firstName : "Nombre"} ${
    user?.lastName ? user?.lastName : "Apellido"
  }`;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.banner}></View>
        <View style={styles.icon}></View>
        <View style={styles.userInfo}>
          <View style={styles.nameAndEditButton}>
            <Text style={styles.fullName}>{fullName}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                navigation.navigate("EditProfile", { user });
              }}
            >
              <FontAwesome name="pencil" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user?.userName}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContainer: {
    alignItems: "center",
  },
  banner: {
    backgroundColor: "#123456",
    width: windowWidth,
    height: windowHeight / 5,
  },
  icon: {
    position: "absolute",
    top: windowHeight / 5 - 50, // 50 es la mitad del tamaño del icono
    width: 100,
    height: 100,
    borderRadius: 50, // Esto hace que la vista sea un círculo
    backgroundColor: "#abcdef",
  },

  userInfo: {
    width: "80%",
    marginTop: 60,
    alignItems: "center",
  },
  nameAndEditButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  fullName: {
    fontSize: 20,
    color: "#000000",
  },
  userName: {
    marginTop: 10,
    fontSize: 16,
    color: "rgba(0,0,0,0.5)",
  },
  editButton: {
    marginLeft: 10,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 20,
    padding: 10,
  },
});
