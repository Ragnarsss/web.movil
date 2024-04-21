import "react-native-gesture-handler";
import { useEffect } from "react";
import { BackHandler } from "react-native";
import { AuthProvider } from "./src/context/AuthContext";
import AppNav from "./src/navigation/AppNav";

export default function App() {
  const isAuth = null;
  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
