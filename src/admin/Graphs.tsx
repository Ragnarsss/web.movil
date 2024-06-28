import React, { useState } from "react";
import { Dimensions, SafeAreaView, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { COLORS } from "../constants";
import { fetchAllTimeCards, fetchTimeCards } from "../api/apiService";
import { useAuth } from "../hooks/useAuth";
import { User } from "../interfaces/props.interface";
import { useFocusEffect } from "@react-navigation/native";
const Graphs = () => {
  const fetchCards = async () => {
    const { authToken } = useAuth();
    const [cardsData, setCardsData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    setIsLoading(true);
    setError("");
    try {
      const response = await fetchAllTimeCards(authToken as string);
      const cards = response.data;
      setCardsData(cards);
    } catch (error) {
      console.error("Error fetching cards:", error);
      setError("Error fetching cards");
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchCards();

      return () => {};
    }, [])
  );
  return (
    <SafeAreaView>
      <Text>Bezier Line Chart</Text>
      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: COLORS.primary,
          backgroundGradientTo: COLORS.tertiary,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          margin: 8,
          borderRadius: 16,
          width: "auto",
          maxWidth: "90%",
        }}
      />
    </SafeAreaView>
  );
};

export default Graphs;
