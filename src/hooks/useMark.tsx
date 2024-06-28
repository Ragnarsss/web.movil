import { useContext } from "react";
import { MarkingContext } from "../context/MarkingContext";
import { MarkingContextType } from "../interfaces/props.interface";

export const useMark = (): MarkingContextType => {
  const context = useContext(MarkingContext);
  if (!context) {
    throw new Error("useMark must be used within an MarkProvider");
  }
  return context;
};
