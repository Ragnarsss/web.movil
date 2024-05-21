import { ShiftCard } from "./ShiftCard";

import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";

export const EntriesRender = () => {
  //esta data en realidad viene de la api y se guarda en el estado
  //o quizas venga de un contexto que tenga que ver con la informacion de los turnos del usuario+5
  const [data, setData] = useState(Array.from({ length: 20 }));

  return (
    <FlatList
      style={styles.flatList}
      data={data}
      renderItem={({ item }) => <ShiftCard />}
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
