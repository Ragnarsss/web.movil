import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { User } from "../interfaces/response.interface";

type AuthContextType = {
  isLoading: boolean;
  refreshToken: string | null;
  user: User | null;
  authToken: string | null;
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
