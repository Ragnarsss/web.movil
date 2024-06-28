import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import { TimeCardEntryType } from "../../interfaces/props.interface";
import TimeCardEntry from "./TimeCardEntry";

interface EntriesRenderProps {
  entries: TimeCardEntryType[];
}

const EntriesRender: FC<EntriesRenderProps> = ({ entries }) => {
  return (
    <TouchableOpacity>
      {entries.map((entry, index) => (
        <TimeCardEntry key={index} entry={entry} />
      ))}
    </TouchableOpacity>
  );
};

export default EntriesRender;
