import { FlatList } from "react-native";
import React, { FC } from "react";
import { TimeCard } from "../../Home";
import { TimeCardType } from "../../interfaces/props.interface";

interface RenderTimeCardProps {
  timeCards: TimeCardType[];
}

const AdminTimeCardsRender: FC<RenderTimeCardProps> = ({ timeCards }) => {
  return (
    <FlatList
      style={{
        width: "100%",
        height: "100%",
        padding: 10,
        marginVertical: 10,
      }}
      contentContainerStyle={{
        alignItems: "center",
      }}
      data={timeCards}
      renderItem={({ item }) => (
        <TimeCard
          id={item.id}
          entries={item.entries}
          periodStart={item.periodStart}
          periodEnd={item.periodEnd}
          user={item.user}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default AdminTimeCardsRender;
