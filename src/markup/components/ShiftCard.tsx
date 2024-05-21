import { MarkSlot } from "./MarkSlot";

import React, { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const ShiftCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [markTimes, setMarkTimes] = useState<(Date | null)[]>(
    Array(6).fill(null)
  );

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMark = () => {
    // Creamos una copia del estado actual de markTimes
    const newMarkTimes = [...markTimes];

    // Buscamos el primer índice en el array que sea null, lo que indica que no se ha marcado aún
    const firstNullIndex = newMarkTimes.indexOf(null);

    // Si encontramos un índice null (es decir, firstNullIndex no es -1), entonces hay un espacio para una nueva marca
    if (firstNullIndex !== -1) {
      // Asignamos la hora actual al primer espacio null que encontramos
      newMarkTimes[firstNullIndex] = new Date();

      // Actualizamos el estado de markTimes con el nuevo array
      setMarkTimes(newMarkTimes);
    }
  };

  return (
    <TouchableOpacity onPress={handleExpand} style={styles.card}>
      <Text style={styles.title}>Turno</Text>
      <View style={styles.row}>
        {markTimes.map((markTime, index) => {
          const markHour = markTime?.getHours();
          const markMinute = markTime?.getMinutes();
          return (
            <MarkSlot
              key={index}
              status={markTime ? "marked" : "notMarked"}
              showTime={isExpanded}
              markTime={
                markHour && markMinute
                  ? `${markHour}:${
                      markMinute < 10 ? "0" + markMinute : markMinute
                    }`
                  : ""
              }
            />
          );
        })}
      </View>
      {isExpanded && (
        <Button
          title="Marcar"
          onPress={handleMark}
          disabled={markTimes.every((markTime) => markTime !== null)}
        />
      )}
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
