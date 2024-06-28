import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, useState } from "react";
import { User } from "../../interfaces/props.interface";
import { MaterialIcons } from "@expo/vector-icons";
interface UserCardProps {
  user: User;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.userCard}>
      <View style={styles.headerView}>
        <Text style={styles.userText}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <Text style={styles.userText}>{user.email}</Text>
          </View>
        </Text>
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
          <MaterialIcons
            name={isExpanded ? "expand-less" : "expand-more"}
            size={24}
            color="#FFF"
          />
        </TouchableOpacity>
      </View>
      {isExpanded && (
        <View style={styles.contentView}>
          <Text style={styles.detailText}>Detalles</Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Rol: </Text>
            <Text>{user.role}</Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>{user.firstName || "Usuario"}</Text>
            <Text>{user.lastName || "sin nombre"}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  userCard: {
    width: "90%",
    backgroundColor: "#6e48aa",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginBottom: 20,
    padding: 10,
    minWidth: 350,
    maxWidth: "auto",
  },
  headerView: {
    backgroundColor: "#9d50bb",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  userText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  contentView: {
    backgroundColor: "transparent",
    padding: 5,
  },
  detailText: {
    fontSize: 14,
    color: "#FFF",
  },
});
