import { ShiftCard } from "./ShiftCard";

import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";

export const EntriesRender = () => {
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
