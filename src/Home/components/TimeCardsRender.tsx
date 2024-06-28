import { TimeCard } from "./TimeCard";

import React, { FC } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import { TimeCardType } from "../../interfaces/props.interface";

interface RenderProps {
  timeCards: TimeCardType[];
}

export const TimeCardsRender: FC<RenderProps> = ({ timeCards }) => {
  const renderHeader = () => {
    return (
      <SafeAreaView style={styles.header}>
        <Text
          style={{
            alignContent: "center",
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          Tarjetas
        </Text>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, alignContent: "center" }}>
      <FlatList
        ListHeaderComponent={renderHeader}
        style={styles.flatList}
        contentContainerStyle={styles.contentContainer}
        data={timeCards}
        renderItem={({ item }) => <TimeCard {...item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 0.94,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    // Estilo para el mensaje de error
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  header: {
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 100,
      height: 100,
    },
    shadowOpacity: 0.58,
    zIndex: 100,
    shadowRadius: 16.0,
    elevation: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
});
