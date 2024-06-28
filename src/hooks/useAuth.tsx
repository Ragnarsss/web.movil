import { useContext } from "react";
import { AuthContext } from "../context";
import { AuthContextType } from "../interfaces/props.interface";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
