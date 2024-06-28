import React, { FC } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { formatEsDate, formatHours } from "../../common/utils";

interface TimeCardEntryProps {
  entry: any;
}

const TimeCardEntry: FC<TimeCardEntryProps> = ({ entry }) => {
  return (
    <SafeAreaView style={styles.entryContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.entryHeader}>
          Entrada {formatEsDate(entry.date)}
        </Text>
      </View>
      <View style={styles.entryDetails}>
        <Text style={styles.detailText}>
          {entry.entry
            ? `Inicio: ${formatHours(entry.entry)}`
            : "Entrada no registrada"}
        </Text>
        <Text style={styles.detailText}>
          {entry.entry
            ? `Fin: ${formatHours(entry.entry)}`
            : "Salida no registrada"}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TimeCardEntry;

const styles = StyleSheet.create({
  entryContainer: {
    backgroundColor: "#f0f0f0", // Un fondo claro para cada entrada
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    width: "100%",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  entryText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#333", // Texto oscuro para contraste
  },
  entryHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    alignItems: "center",
  },
  entryDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
  },
});
