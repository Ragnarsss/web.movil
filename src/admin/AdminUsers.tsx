import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { fetchAllUsers } from "../api/apiService";
import { COLORS } from "../constants";
import { User } from "../interfaces/props.interface";
import { FiltersModal } from "../markup";
import UserCard from "./components/UserCard";

const AdminUsers = () => {
  navigator = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<User[]>([]);
  const [usersData, setUsersData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetchAllUsers();
      const users = response.data;
      setUsersData(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Error fetching users");
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();

      return () => {};
    }, [])
  );

  useEffect(() => {
    const results = usersData.filter((user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredResults(results);
  }, [searchQuery, usersData]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar por correo..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FiltersModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.resultsContainer}>
          {filteredResults.map((user) => (
            <UserCard key={user.userId} user={user} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default AdminUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  searchBar: {
    backgroundColor: COLORS.background,
    borderWidth: 5,

    borderColor: COLORS.tertiary,
    borderRadius: 50,

    padding: 10,
    paddingStart: 20,
    margin: 10,
  },
  resultsContainer: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  userText: {
    fontSize: 16,
  },
  userCard: {
    backgroundColor: "#FFFFFF", // Fondo claro para la tarjeta
    borderWidth: 1,
    borderColor: "#E0E0E0", // Borde más sutil
    borderRadius: 10, // Bordes redondeados
    padding: 15, // Más espacio interior
    marginVertical: 8, // Espaciado vertical entre tarjetas
    marginHorizontal: 10, // Espaciado horizontal desde los bordes del ScrollView
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000", // Sombra para iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, // Elevación para Android
  },
  actionContainer: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flex: 0.06,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    minHeight: 50,
    backgroundColor: "#808080",
  },
});
