import { useEffect } from "react";
import { BackHandler } from "react-native";
import "react-native-gesture-handler";
import { AuthProvider } from "./src/context";
import { AppNav } from "./src/navigation";

export default function App() {
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
