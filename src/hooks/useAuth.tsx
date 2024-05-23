import { useContext } from "react";
import { AuthContextProps } from "../interfaces/props.interface";
import { AuthContext } from "../context";

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
