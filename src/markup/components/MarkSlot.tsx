import { StyleSheet, Text, View } from "react-native";
import React from "react";

export const MarkSlot = ({
  status,
}: {
  status: "marked" | "notMarked" | "late";
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
  return <View style={{ width: 20, height: 20, backgroundColor }} />;
};

const styles = StyleSheet.create({});
