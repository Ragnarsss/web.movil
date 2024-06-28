import React, { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import TimeCardEntry from "./TimeCardEntry";
import { TimeCardEntryType, User } from "../../interfaces/props.interface";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

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
  const [isExpanded, setIsExpanded] = useState(false);
  // Formatea las fechas y horas
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  const startDateTime = dateFormatter.format(new Date(periodStart));
  const endDateTime = dateFormatter.format(new Date(periodEnd));

  // Split ID
  const displayId = id.split("-")[0];

  return (
    <SafeAreaView style={styles.timeCard}>
      <Text style={styles.sectionTitle}>Time Card ID: {displayId}</Text>
      <View style={styles.headerView}>
        <Text style={styles.userText}>
          User: {user.userName ? user.userName : user.email}
        </Text>
        <View style={styles.dateView}>
          <Text style={styles.dateText}>Period Start: {startDateTime}</Text>
          <Text style={styles.dateText}>Period End: {endDateTime}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.contentView, { justifyContent: "flex-start" }]} // Asegura que el contenido comience desde la izquierda
        onPress={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <>
            <View
              style={[
                styles.sectionTitle,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                },
              ]}
            >
              <Text>Hide entries</Text>
              <MaterialIcons name="expand-less" size={24} color="#FFF" />
            </View>
            {entries.length === 0 ? (
              <Text style={styles.NotFoundText}>No entries found</Text>
            ) : (
              entries.map((entry, index) => (
                <TimeCardEntry key={index} entry={entry} />
              ))
            )}
          </>
        ) : (
          <View
            style={[
              styles.sectionTitle,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              },
            ]}
          >
            <Text>Show entries</Text>
            <MaterialIcons name="expand-more" size={24} color="#FFF" />
          </View>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  timeCard: {
    width: "90%",
    height: "auto",
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
  dateView: {
    flexDirection: "column",
    justifyContent: "center",
  },
  timeCardText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  contentView: {
    backgroundColor: "transparent",
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
  },
  userText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    color: "#FFF",
  },
  NotFoundText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
});
