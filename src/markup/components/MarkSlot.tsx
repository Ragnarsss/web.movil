import React, { FC, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { entryType } from "../../common/enum";
import { useMark } from "../../hooks/useMark";
import { MarkSlotProps } from "../../interfaces/props.interface";

export const MarkSlot: FC<MarkSlotProps> = ({
  entryId,
  isExpanded,
  date,
  entry,
  exit,
  user,
}) => {
  const { mark } = useMark();
  const [entryColor, setEntryColor] = useState<string>("gray");
  const [exitColor, setExitColor] = useState<string>("gray");
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
  const [bothMarksPresent, setBothMarksPresent] = useState(false);

  useEffect(() => {
    setEntryColor(entry ? "green" : "gray");
    setExitColor(exit ? "green" : "gray");
    setBothMarksPresent(entry !== null && exit !== null);
  }, [entry, exit, isRequestSuccessful, bothMarksPresent]);

  const handleMark = async (markType: entryType) => {
    try {
      const success = await mark(entryId, markType);
      console.log("Marked", success);
      setIsRequestSuccessful(success);
      if (success) {
        // Actualiza el color a verde si la marca es exitosa
        if (markType === entryType.IN) {
          setEntryColor("green");
        } else if (markType === entryType.OUT) {
          setExitColor("green");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Condición para verificar si ambos, entry y exit, tienen valores no nulos

  return (
    <View style={styles.container}>
      {isExpanded && (
        <>
          <Text>
            Trabajador: {user?.firstName || "Nombre"}{" "}
            {user?.lastName || "Apellido"}
          </Text>
          <Text>Rol: {user?.role || "Rol"}</Text>
        </>
      )}
      <View style={styles.row}>
        <View style={styles.entryExitContainer}>
          <Text style={styles.label}>Entrada</Text>
          <View style={[styles.markSlot, { backgroundColor: entryColor }]} />
          {isExpanded && <Text style={styles.timeText}>{entry}</Text>}
        </View>
        <View style={styles.entryExitContainer}>
          <Text style={styles.label}>Salida</Text>
          <View style={[styles.markSlot, { backgroundColor: exitColor }]} />
          {isExpanded && <Text style={styles.timeText}>{exit}</Text>}
        </View>
      </View>
      {isExpanded && (
        <>
          {!bothMarksPresent && (
            <View>
              <Button
                title="Marcar Entrada"
                onPress={() => {
                  handleMark(entryType.IN);
                }}
              />
              <Button
                title="Marcar Salida"
                onPress={() => {
                  handleMark(entryType.OUT);
                }}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  entryExitContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 35,
  },
  markSlot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    margin: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  timeText: {
    marginTop: 5,
    fontSize: 14,
  },
});
