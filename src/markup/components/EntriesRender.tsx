import { useFocusEffect } from "@react-navigation/native";
import { ShiftCard } from "./ShiftCard";

import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { fetchTimeEntries } from "../../api/apiService";
import { useAuth } from "../../hooks/useAuth";
import { useMark } from "../../hooks/useMark";
import { TimeCardEntryType } from "../../interfaces/props.interface";

export const EntriesRender = () => {
  const { authToken, refreshToken, refreshAuthToken } = useAuth();
  const { mark } = useMark();
  const [timeEntries, setTimeEntries] = useState<TimeCardEntryType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEntrie = async (attempt = 1) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetchTimeEntries(authToken as string);
      setTimeEntries(response);

      if (response.statusCode === 401) {
        if (attempt <= 3) {
          // Limita el número de intentos a 3
          const refreshResponse = await refreshAuthToken(
            refreshToken as string
          );
          if (refreshResponse.success) {
            fetchEntrie(attempt + 1); // Incrementa el intento y reintentar
          } else {
            setError("Error refreshing token");
          }
        } else {
          setError("Max retry attempts reached");
        }
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
      setError("Error fetching cards");
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEntrie();

      return () => {};
    }, [])
  );

  return (
    <FlatList
      style={styles.flatList}
      data={timeEntries}
      renderItem={({ item }) => {
        return <ShiftCard key={item.id} entry={item} entryId={item.id} />;
      }}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 0.94,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});
