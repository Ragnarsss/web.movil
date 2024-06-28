import { MarkSlot } from "./MarkSlot";

import React, { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatDate } from "../../common/utils";
import { ShiftCardProps } from "../../interfaces/props.interface";
import Icon from "react-native-vector-icons/FontAwesome";

export const ShiftCard: FC<ShiftCardProps> = ({ entryId, entry }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <TouchableOpacity onPress={handleExpand} style={styles.card}>
      <Text style={styles.title}>Turno - {formatDate(entry.date)}</Text>

      <Icon
        name={isExpanded ? "arrow-up" : "arrow-down"} // Cambia el icono basado en isExpanded
        size={20} // Tamaño del icono
        style={styles.expandIcon} // Estilo para posicionar el icono
      />

      <View style={styles.row}>
        <MarkSlot
          entryId={entry.id}
          isExpanded={isExpanded}
          updateComplete={setIsComplete}
          isComplete={isComplete}
          date={formatDate(entry.date)}
          entry={formatDate(entry.entry)}
          exit={formatDate(entry.exit)}
          user={entry.user}
        />
      </View>
    </TouchableOpacity>
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
    position: "relative",
  },
  expandIcon: {
    position: "absolute", // Posiciona el icono absolutamente dentro de card
    right: 10, // 10 píxeles desde el lado derecho de card
    top: 10, // 10 píxeles desde la parte superior de card
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
