import React, {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

export const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode);
  }, []);

  useEffect(() => {
    // Aquí puedes agregar cualquier lógica que necesites ejecutar cuando cambie isDarkMode
  }, [isDarkMode]);

  const contextValue = {
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
};
