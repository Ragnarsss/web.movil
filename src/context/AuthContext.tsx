import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactNode, createContext, useState } from "react";
import { loginFetch } from "../api/apiService";

interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authorizationToken, setAuthorizationToken] = useState<string | null>(
    null
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await loginFetch(email, password);

      if (response.data && response.data.token) {
        await AsyncStorage.setItem("authorizationToken", response.data.token);
        await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
        setAuthorizationToken(response.data.token);
        setRefreshToken(response.data.refreshToken);
        setUser(response.data.user);
      }
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem("token");
      setAuthorizationToken(null);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ token: authorizationToken, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
