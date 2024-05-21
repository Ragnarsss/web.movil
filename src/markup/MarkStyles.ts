import { Platform, StatusBar } from "react-native";
import { StyleSheet } from "react-native";

export const MarkStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flex: 0.06,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    height: 70,
    backgroundColor: "#808080",
  },
});
