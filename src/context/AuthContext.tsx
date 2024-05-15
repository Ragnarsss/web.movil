import { loginFetch, registerFetch } from "../api/apiService";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactNode, createContext, useEffect, useState } from "react";

interface AuthContextType {
  isLoading: boolean;
  refreshToken: string | null;
  user: string | null;
  autorizationToken: string | null;
  register: (userName: string, email: string, password: string) => void;
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
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);

  const register = async (
    userName: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    try {
      await registerFetch(userName, email, password);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await loginFetch(email, password);

      if (response.statusCode === 200) {
        const { user, accessToken, refreshToken } = response.data;

        await AsyncStorage.setItem("authToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        await AsyncStorage.setItem("user", JSON.stringify(user));

        setAuthToken(accessToken);
        setRefreshToken(refreshToken);
        setUser(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);

      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("refreshToken");
      await AsyncStorage.removeItem("user");

      setAuthToken(null);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfUserIsLoggedIn = async () => {
    try {
      setIsLoading(true);

      let token = await AsyncStorage.getItem("authToken");
      setAutorizationToken(token);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  const contextValue = {
    refreshToken,
    authToken,
    isLoading,
    user,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
