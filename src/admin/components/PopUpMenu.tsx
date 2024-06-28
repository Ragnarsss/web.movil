import React, { useRef, useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  Animated,
  Easing,
  View,
  GestureResponderEvent, // Import View from react-native directly
} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import { COLORS } from "../../constants";

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

  // Función para manejar el cierre del modal solo si se toca fuera del popup
  const handleModalClose = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      setModalVisible(false);
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={() => resizeBox(1)}>
        <Fontisto name="filter" size={15} />
      </TouchableOpacity>
      <Modal transparent visible={modalVisible}>
        <SafeAreaView style={{ flex: 1 }} onTouchStart={handleModalClose}>
          <Animated.View style={[styles.popup, { transform: [{ scale }] }]}>
            {options.map((option, index) => (
              <TouchableOpacity
                style={[
                  styles.option,
                  { borderBottomWidth: index === options.length - 1 ? 0 : 1 },
                ]}
                key={index}
                onPress={option.action}
              >
                <View style={styles.optionContent}>
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
    borderColor: COLORS.primary,
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 7,
    borderBottomColor: COLORS.secondary,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 7,
    paddingRight: 10,
  },
  button: {
    borderRadius: 50,
    width: 35,
    height: 35,
    right: 10,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PopUpMenu;
