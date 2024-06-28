import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { fetchAllTimeCards } from "../api/apiService";
import { useAuth } from "../hooks/useAuth";
import { TimeCardType } from "../interfaces/props.interface";
import AdminTimeCardsRender from "./components/AdminTimeCardsRender";

const AdminCards = () => {
  const { authToken, refreshToken, refreshAuthToken } = useAuth();
  const [filteredResults, setFilteredResults] = useState<TimeCardType[]>([]);
  const [cardsData, setCardsData] = useState<TimeCardType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCards = async (attempt = 1) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetchAllTimeCards(authToken as string);
      const cards = response.data;
      setCardsData(cards);

      if (response.statusCode === 401) {
        if (attempt <= 3) {
          // Limita el número de intentos a 3
          const refreshResponse = await refreshAuthToken(
            refreshToken as string
          );
          if (refreshResponse.success) {
            fetchCards(attempt + 1); // Incrementa el intento y reintentar
          } else {
            setError("Error refreshing token");
            alert(error);
          }
        } else {
          setError("Max retry attempts reached");
          alert(error);
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
      fetchCards();

      return () => {};
    }, [])
  );

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>Error</Text>
      ) : (
        <AdminTimeCardsRender timeCards={cardsData} />
      )}
    </View>
  );
};

export default AdminCards;
