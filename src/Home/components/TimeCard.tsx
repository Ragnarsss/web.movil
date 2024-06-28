import React, { FC } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import TimeCardEntry from "./TimeCardEntry";
import { TimeCardEntryType, User } from "../../interfaces/props.interface";

interface TimeCardProps {
  id: string;
  entries: TimeCardEntryType[];
  periodStart: Date;
  periodEnd: Date;
  user: User;
}

export const TimeCard: FC<TimeCardProps> = ({
  id,
  entries,
  periodStart,
  periodEnd,
  user,
}) => {
  // Formatea las fechas y horas
  const startDateTime = new Date(periodStart).toLocaleString();
  const endDateTime = new Date(periodEnd).toLocaleString();
  return (
    <SafeAreaView style={styles.timeCard}>
      <Text>Time Card ID: {id}</Text>
      <View style={styles.headerView}>
        <Text style={styles.timeCardText}>
          User: {user.userName ? user.userName : user.email}
        </Text>
        <View style={styles.dateView}>
          <Text>Period Start: {startDateTime}</Text>
          <Text>Period End: {endDateTime}</Text>
        </View>
      </View>
      <View style={styles.contentView}>
        {entries.map((entry, index) => (
          <TimeCardEntry key={index} entry={entry} />
        ))}
      </View>
    </SafeAreaView>
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
    height: "auto",
    backgroundColor: "#FFFFFF",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});
