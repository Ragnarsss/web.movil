import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import { fetchAllUsers } from "../api/apiService";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import { FiltersModal } from "../markup";
import { ActivityIndicator } from "react-native";
import { User } from "../interfaces/props.interface";

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

  // The rest of your component remains the same
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar por correo..."
        value={searchQuery}
      />
      <FiltersModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <ScrollView style={styles.resultsContainer}>
          {usersData.map((user) => (
            <View key={user.email} style={styles.userCard}>
              <TouchableOpacity style={{}} onPress={() => {}}>
                <Text style={styles.userText}>{user.email}</Text>
              </TouchableOpacity>
            </View>
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
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  resultsContainer: {
    marginTop: 10,
  },
  userText: {
    fontSize: 16,
    margin: 10,
  },
  userCard: {
    // Nuevo estilo para la tarjeta
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
