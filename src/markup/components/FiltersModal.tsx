import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";

interface FiltersModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FiltersModal: FC<FiltersModalProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text>Contenido del Modal</Text>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text>Cerrar Modal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%", // El modal ocupará el 80% del ancho de la pantalla
    height: "70%", // El modal ocupará el 70% de la altura de la pantalla
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Fondo semi-transparente más oscuro
  },
});
