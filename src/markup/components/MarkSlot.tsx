import React, { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface MarkSlotProps {
  status: "marked" | "notMarked" | "late";
  showTime?: boolean;
  markTime?: string;
}

export const MarkSlot: FC<MarkSlotProps> = ({
  status = "notMarked",
  showTime = false,
  markTime = "",
}) => {
  let backgroundColor;
  switch (status) {
    case "marked":
      backgroundColor = "green";
      break;
    case "notMarked":
      backgroundColor = "gray";
      break;
    case "late":
      backgroundColor = "red";
      break;
  }
  return (
    <View>
      <View style={{ ...styles.markSlot, backgroundColor }} />
      <Text style={{ marginLeft: -7 }}>
        {showTime && <Text>{markTime}</Text>}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  markSlot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
