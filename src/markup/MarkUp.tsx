import { EntriesRender, FiltersModal } from "./components";
import { MarkStyles } from "./MarkStyles";

import React, { useState } from "react";
import { Button, SafeAreaView, View } from "react-native";

export const MarkUp = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={MarkStyles.container}>
      <View style={MarkStyles.header}>
        <Button title="Más acciones" onPress={() => {}} />
        <Button title="Filtrar" onPress={() => setModalVisible(true)} />
      </View>
      <EntriesRender />
      <FiltersModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
};
