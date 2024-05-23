import { updateAccountFetch } from "../account/AccountService";
import { loginFetch, registerFetch } from "../auth/LoginService";
import { User } from "../interfaces/apiModels.interface";
import {
  AuthContextProps,
  AuthProviderProps,
} from "../interfaces/props.interface";
import { BaseResponse } from "../interfaces/response.interface";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    loadUserFromStorage();
  }, []);

  const register = async (
    userName: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    try {
      const response = await registerFetch(userName, email, password);

      if ((response.statusCode as number) !== 201) {
        return {
          success: false,
          statusCode: response.statusCode,
          message: response.message,
        };
      }

      return {
        success: true,
        statusCode: response.statusCode,
        message: response.message,
      };
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<BaseResponse> => {
    setIsLoading(true);
    try {
      const response = await loginFetch(email, password);

      if (response.statusCode !== 200) {
        setError(response.message);
        return {
          success: false,
          statusCode: response.statusCode,
          message: response.message,
        };
      }
      await AsyncStorage.setItem("authToken", response.data.accessToken);
      await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));

      setAuthToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
      setUser(response.data.user);
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          statusCode: 500,
          message: error.message,
        };
      }
      return {
        success: false,
        statusCode: 500,
        message: "Unknown error",
      };
    } finally {
      setIsLoading(false);
    }
    return {
      success: false,
      statusCode: 500,
      message: "Internal server error",
    };
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

  const updateUser = async (user: User) => {
    const response = await updateAccountFetch(user);
  };

  const checkIfUserIsLoggedIn = async () => {
    try {
      setIsLoading(true);

      let token = await AsyncStorage.getItem("authToken");
      setAuthToken(token);

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
    updateUser,
  };

  return (
    <AuthContext.Provider
      value={{
        ...contextValue,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
