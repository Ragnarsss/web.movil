import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import { loginFetch } from "../api/apiService";

interface AuthContextType {
  isLoading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  user: string | null;
  autorizationToken: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [autorizationToken, setAutorizationToken] = useState<string | null>(
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

      if (response.statusCode === 200) {
        await AsyncStorage.setItem(
          "authorizationToken",
          response.data.accessToken
        );
        await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
        await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
        setAutorizationToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        setUser(response.data.user);
      }

      return response.data;
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
      await AsyncStorage.removeItem("refreshToken");
      await AsyncStorage.removeItem("user");
      setAutorizationToken(null);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfUserIsLoggedIn = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setAutorizationToken(token);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ autorizationToken, login, logout, isLoading, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
