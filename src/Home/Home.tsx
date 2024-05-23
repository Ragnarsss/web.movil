import { TimeCardsRender } from "./components";

import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TimeCardsRender />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
});
