import { DaySlot } from "./DaySlot";

import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const TimeCard = () => {
  // Añade las fechas de inicio y fin aquí. Estos valores son solo para demostración.
  const startDate = new Date();
  const endDate = new Date();

  // Formatea las fechas y horas
  const startDateTime = `${startDate.toLocaleDateString()} ${startDate.toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" }
  )}`;
  const endDateTime = `${endDate.toLocaleDateString()} ${endDate.toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" }
  )}`;

  return (
    <View style={styles.timeCard}>
      <View style={styles.headerView}>
        <Text style={styles.timeCardText}>Time Card</Text>
        <View style={styles.dateView}>
          <Text>Start: {startDateTime}</Text>
          <Text>End: {endDateTime}</Text>
        </View>
      </View>
      <View style={styles.contentView}>
        {Array.from({ length: 15 }, (_, index) => (
          <DaySlot key={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeCard: {
    width: "90%",
    height: 200,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  headerView: {
    height: 50,
    backgroundColor: "#D3D3D3",
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateView: {
    flexDirection: "column",
    padding: 2, // Añade este padding
    justifyContent: "center", // Añade esta línea para centrar el texto verticalmente
  },
  timeCardText: {
    padding: 10, // Añade este padding
  },
  contentView: {
    height: 20,
    backgroundColor: "#FFFFFF",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});
