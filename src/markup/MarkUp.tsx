import { MarkingProvider } from "../context/MarkingContext";
import { EntriesRender } from "./components";
import { MarkStyles } from "./MarkStyles";

import React, { useState } from "react";
import { SafeAreaView } from "react-native";

export const MarkUp = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <MarkingProvider>
      <SafeAreaView style={MarkStyles.container}>
        <EntriesRender />
      </SafeAreaView>
    </MarkingProvider>
  );
};
