import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

type AuthContextType = {
  isLoading: boolean;
  refreshToken: string | null;
  user: string | null;
  autorizationToken: string | null;
  register: (userName: string, email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
