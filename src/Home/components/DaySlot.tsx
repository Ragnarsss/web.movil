import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";

export const DaySlot = () => {
  return (
    <View style={styles.markDay}>
      <Text style={styles.text}>WD</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  markDay: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    backgroundColor: "#FF6347",
    margin: 5,
    alignContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
