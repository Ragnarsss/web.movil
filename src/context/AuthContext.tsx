import { BaseResponse } from "../interfaces/response.interface";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import { fetchRefreshAuth, loginFetch, registerFetch } from "../api/apiService";
import { roles } from "../common/enum";
import { AuthContextType } from "../interfaces/props.interface";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [role, setRole] = useState<roles | null>(null);
  const [email, setEmail] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (authToken) {
        const authToken = await AsyncStorage.getItem("authToken");
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        const role = await AsyncStorage.getItem("role");
        const email = await AsyncStorage.getItem("email");

        if (role) {
          setRole(role as roles);
        }

        if (email) {
          setEmail(email);
        }

        if (refreshToken) {
          setRefreshToken(refreshToken);
        }
        setAuthToken(authToken);
      }
    };

    loadData();
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
    return {
      success: false,
      statusCode: 500, // Fallback to a generic error code if none is provided
      message: "An unexpected error occurred",
    };
  };

  const login = async (
    loginEmail: string,
    password: string
  ): Promise<BaseResponse> => {
    setIsLoading(true);
    try {
      const response = await loginFetch(loginEmail, password);
      if (response.statusCode !== 200) {
        setError(response.message);
        return {
          success: false,
          statusCode: response.statusCode,
          message: response.message,
        };
      }

      const dataToStore = response.data;
      const { accessToken, refreshToken, role, email } = dataToStore;

      await AsyncStorage.setItem("authToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      await AsyncStorage.setItem("role", role);
      await AsyncStorage.setItem("email", email);

      setAuthToken(accessToken);
      setRefreshToken(refreshToken);
      setRole(role as roles);
      setEmail(email);
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

  const refreshAuthToken = async (): Promise<BaseResponse> => {
    setIsLoading(true);
    try {
      if (!refreshToken) {
        return {
          success: false,
          statusCode: 401,
          message: "Unauthorized",
        };
      }
      const response = await fetchRefreshAuth(refreshToken);

      if (!response.success) {
        setError(response.message);
        return {
          success: false,
          statusCode: response.statusCode,
          message: response.message,
        };
      }

      console.log("mewTok", response.data.accessToken);

      await AsyncStorage.setItem("authToken", response.data.accessToken);

      setAuthToken(response.data.access_token);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    return {
      success: false,
      statusCode: 500,
      message: "Internal server error",
    };
  };
  const checkIfUserIsLoggedIn = async () => {
    try {
      setIsLoading(true);

      let authToken = await AsyncStorage.getItem("authToken");
      setAuthToken(authToken);

      let refreshToken = await AsyncStorage.getItem("refreshToken");
      setRefreshToken(refreshToken);

      let role = await AsyncStorage.getItem("role");
      setRole(role as roles);

      let email = await AsyncStorage.getItem("email");
      setEmail(email);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  const contextValue = {
    refreshAuthToken,
    refreshToken,
    isLoading,
    authToken,
    register,
    logout,
    login,
    error,
    email,
    role,
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
