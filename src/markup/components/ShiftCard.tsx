import { MarkSlot } from "./MarkSlot";

import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export const ShiftCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Turno</Text>
      <View style={styles.row}>
        <MarkSlot status="notMarked" />
        <MarkSlot status="notMarked" />
        <MarkSlot status="notMarked" />
        <MarkSlot status="notMarked" />
        <MarkSlot status="notMarked" />
        <MarkSlot status="notMarked" />
      </View>
      <Button title="Marcar" />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    margin: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
