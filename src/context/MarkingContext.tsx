import React, { createContext, useState } from "react";
import {
  MarkingContextType,
  ProviderProps,
} from "../interfaces/props.interface";
import { useAuth } from "../hooks/useAuth";
import { entryType } from "../common/enum";
import { markEntry } from "../api/apiService";

// Definir el tipo para el contexto que incluye cualquier estado o función que se quiera exponer

export const MarkingContext = createContext<MarkingContextType | undefined>(
  undefined
);

export const MarkingProvider = ({ children }: ProviderProps) => {
  const { authToken, refreshToken } = useAuth();
  const [entry, setEntry] = useState<Date | null>(null);
  const [exit, setEXit] = useState<Date | null>(null);

  // Función para agregar una nueva marca
  const mark = async (id: number, mark: entryType): Promise<boolean> => {
    const result = await markEntry(authToken as string, mark, id);
    console.log(result);
    return result.success;
  };

  // Preparar el valor del contexto con el estado y las funciones que se expondrán
  const contextValue = {
    entry,
    exit,
    mark,
  };

  return (
    <MarkingContext.Provider value={contextValue}>
      {children}
    </MarkingContext.Provider>
  );
};
