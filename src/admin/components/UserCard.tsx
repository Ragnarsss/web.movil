import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { User } from "../../interfaces/props.interface";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "../../constants";
import UserCardsModal from "./UserCardsModal";
import { useFocusEffect } from "@react-navigation/native";
interface UserCardProps {
  user: User;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
  });

  const handleEditPress = () => {
    if (isEditing) {
      // Aquí debes guardar los cambios en la base de datos
      // ...
      user.firstName = editedUser.firstName;
      user.lastName = editedUser.lastName;
    }
    setIsEditing(!isEditing);
  };

  const handleDiscardPress = () => {
    setEditedUser({ firstName: user.firstName, lastName: user.lastName });
    setIsEditing(false);
  };

  useEffect(() => {
    setEditedUser({
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }, [user.firstName, user.lastName]);

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
            {isEditing ? (
              <TextInput
                value={editedUser.firstName}
                onChangeText={(text) =>
                  setEditedUser({ ...editedUser, firstName: text })
                }
              />
            ) : (
              <Text>{user.firstName || "Usuario"}</Text>
            )}
            {isEditing ? (
              <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={editedUser.lastName}
                onChangeText={(text) =>
                  setEditedUser({ ...editedUser, lastName: text })
                }
              />
            ) : (
              <Text>{user.lastName || "sin nombre"}</Text>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!isEditing && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text
                  style={
                    (styles.buttonText,
                    {
                      flexDirection: "row",
                      fontWeight: "bold",
                      color: COLORS.primary,
                    })
                  }
                >
                  Manage Cards
                </Text>
                <UserCardsModal
                  isVisible={modalVisible}
                  setIsVisible={setModalVisible}
                  userEmail={user.email}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.button} onPress={handleEditPress}>
              <Text style={styles.buttonText}>
                {isEditing ? "Enviar cambios" : "Editar"}
              </Text>
            </TouchableOpacity>

            {isEditing && (
              <TouchableOpacity
                style={styles.button}
                onPress={handleDiscardPress}
              >
                <Text style={styles.buttonText}>Descartar cambios</Text>
              </TouchableOpacity>
            )}
            {!isEditing && (
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  input: {
    height: 40, // Increase the height
    width: 100,
    borderColor: "#A9A9A9",
    borderWidth: 1,
    marginTop: 10,
    padding: 20,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    // Agrega los estilos que desees aquí
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    marginHorizontal: 5,
    minWidth: "auto",
    width: "32%",
    height: 40,
    backgroundColor: COLORS.text,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: SIZES.h4,
    fontWeight: "bold",
    color: COLORS.primary,
  },
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
