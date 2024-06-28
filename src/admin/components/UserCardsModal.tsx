import { StyleSheet, Text, View } from "react-native";
import React, { FC, useCallback, useState } from "react";
import { Modal } from "react-native";
import { User } from "../../interfaces/props.interface";
import { fetchTimeCards } from "../../api/apiService";
import { useAuth } from "../../hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";

interface UserCardsModalProps {
  userEmail: string;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}
const UserCardsModal: FC<UserCardsModalProps> = ({
  userEmail,
  isVisible,
  setIsVisible,
}) => {
  const { authToken, refreshAuthToken, refreshToken } = useAuth();
  const [userCards, setUserCards] = useState<User[]>([]);
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
      const response = await fetchTimeCards(authToken as string);
      if (response.statusCode === 401) {
        if (attempt <= 3) {
          await refreshTokenAndRetry(attempt + 1);
        } else {
          setError("Max retry attempts reached");
          alert("Max retry attempts reached");
        }
      } else {
        const cards = response.data;
        setUserCards(cards);
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
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <Text>UserCardModal</Text>
    </Modal>
  );
};

export default UserCardsModal;

const styles = StyleSheet.create({});
