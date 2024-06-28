import { useFocusEffect } from "@react-navigation/native";
import { TimeCardsRender } from "./components";

import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchTimeCards } from "../api/apiService";
import { useAuth } from "../hooks/useAuth";
import { TimeCardType } from "../interfaces/props.interface";

export const Home = () => {
  const { authToken, refreshToken } = useAuth();
  const [timeCards, setTimeCards] = useState<TimeCardType[]>([]);

  const fetchEntries = async (attempt = 1) => {
    try {
      const response = await fetchTimeCards(authToken as string);
      setTimeCards(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
      alert(error);
    } finally {
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEntries();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <TimeCardsRender timeCards={timeCards} />
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
