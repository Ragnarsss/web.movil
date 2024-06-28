import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { fetchAllTimeCards } from "../api/apiService";
import { useAuth } from "../hooks/useAuth";
import { TimeCardType } from "../interfaces/props.interface";
import AdminTimeCardsRender from "./components/AdminTimeCardsRender";
import { COLORS } from "../constants";

const AdminCards = () => {
  const { authToken, refreshToken, refreshAuthToken } = useAuth();
  const [filteredResults, setFilteredResults] = useState<TimeCardType[]>([]);
  const [cardsData, setCardsData] = useState<TimeCardType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const refreshTokenAndRetry = async (attempt: number) => {
    try {
      const refreshResponse = await refreshAuthToken(refreshToken as string);
      if (refreshResponse.success) {
        await fetchCards(attempt);
      } else {
        setError("Error refreshing token");
        alert("Error refreshing token");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      setError("Error refreshing token");
      alert("Error refreshing token");
    }
  };

  const fetchCards = async (attempt = 1) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetchAllTimeCards(authToken as string);
      if (response.statusCode === 401) {
        if (attempt <= 3) {
          await refreshTokenAndRetry(attempt + 1);
        } else {
          setError("Max retry attempts reached");
          alert("Max retry attempts reached");
        }
      } else {
        const cards = response.data;
        setCardsData(cards);
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
      setError("Error fetching cards");
      alert("Error fetching cards");
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
    <View style={{ paddingTop: 50 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.tertiary} />
      ) : error ? (
        <Text>Error</Text>
      ) : (
        <AdminTimeCardsRender timeCards={cardsData} />
      )}
    </View>
  );
};

export default AdminCards;
