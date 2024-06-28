import { View, Text } from "react-native";
import React, { FC } from "react";

interface TimeCardEntryProps {
  entry: any;
}

const TimeCardEntry: FC<TimeCardEntryProps> = ({ entry }) => {
  return (
    /**
       LOG  entries [{"afternoon_end": null, 
       "afternoon_start": null, 
       "date": "2024-07-01T00:00:00.000Z", 
       "id": 1, 
       "morning_end": null, 
       "morning_start": null, 
       "overtime_end": null, 
       "overtime_start": null, 
       "total_hours": null}]  
      
       */
    <View>
      <Text>Time Card Entry - {entry.date}</Text>
      <Text>
        {entry.entry ? entry.entry : "Entrada No marcado"} -{" "}
        {entry.exit ? entry.exit : "Salida No marcado"} -{" "}
      </Text>
    </View>
  );
};

export default TimeCardEntry;
