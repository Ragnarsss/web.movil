import React, { useRef, useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  Animated,
  Easing,
} from "react-native";
import { View } from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import Evil from "react-native-vector-icons/EvilIcons";

const PopUpMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;

  const options = [
    {
      title: "Option 1",
      Icon: <Fontisto name="date" size={24} />,
      action: () => alert("Option 1"),
    },
    {
      title: "Option 1",
      Icon: <Fontisto name="date" size={24} />,
      action: () => alert("Option 1"),
    },
    {
      title: "Option 1",
      Icon: <Fontisto name="date" size={24} />,
      action: () => alert("Option 1"),
    },
    {
      title: "Option 1",
      Icon: <Fontisto name="date" size={24} />,
      action: () => alert("Option 1"),
    },
    {
      title: "Option 1",
      Icon: <Fontisto name="date" size={24} />,
      action: () => alert("Option 1"),
    },
  ];

  function resizeBox(to) {
    to === 1 && setModalVisible(true);
    Animated.timing(scale, {
      toValue: to,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => to === 0 && setModalVisible(false));
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={() => resizeBox(1)}>
        <Fontisto name="filter" size={15} />
      </TouchableOpacity>
      <Modal transparent visible={modalVisible}>
        <SafeAreaView
          style={{ flex: 1 }}
          onTouchStart={() => setModalVisible(false)}
        >
          <Animated.View style={styles.popup}>
            {options.map((option, index) => (
              <TouchableOpacity
                style={
                  (styles.option,
                  { borderBottomWidth: index === options.length - 1 ? 0 : 1 })
                }
                key={index}
                onPress={option.action}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 7,
                  }}
                >
                  <Text>{option.title}</Text>
                  {option.Icon}
                </View>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  popup: {
    borderRadius: 8,
    borderColor: "#333",
    borderWidth: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    position: "absolute",
    top: 50,
    right: 5,
    minWidth: 150,
    paddingVertical: 5,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 7,
    borderBottomColor: "#ccc",
  },
  button: {
    borderRadius: 50, // Esto hace que el botón sea redondo
    width: 35, // Ancho del botón
    height: 35, // Altura del botón
    right: 10,

    backgroundColor: "#007bff", // Color de fondo del botón
    justifyContent: "center", // Centra el contenido (el texto "+") verticalmente
    alignItems: "center", // Centra el contenido (el texto "+") horizontalmente
  },
  text: {
    color: "white", // Color del texto
    fontSize: 24, // Tamaño del texto
  },
});

export default PopUpMenu;
