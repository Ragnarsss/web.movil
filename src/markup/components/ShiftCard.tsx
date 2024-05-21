import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

export const ShiftCard = () => {
  const [morningStart, setMorningStart] = useState("08:00");
  const [morningEnd, setMorningEnd] = useState("12:00");
  const [afternoonStart, setAfternoonStart] = useState("14:00");
  const [afternoonEnd, setAfternoonEnd] = useState("18:00");
  const [overtimeStart, setOvertimeStart] = useState("20:00");
  const [overtimeEnd, setOvertimeEnd] = useState("22:00");

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Turno</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Entrada Mañana:</Text>
        <Text style={styles.value}>{morningStart}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Salida Mañana:</Text>
        <Text style={styles.value}>{morningEnd}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Entrada Tarde:</Text>
        <Text style={styles.value}>{afternoonStart}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Salida Tarde:</Text>
        <Text style={styles.value}>{afternoonEnd}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Inicio Horas Extras:</Text>
        <Text style={styles.value}>{overtimeStart}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Fin Horas Extras:</Text>
        <Text style={styles.value}>{overtimeEnd}</Text>
      </View>
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
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
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
