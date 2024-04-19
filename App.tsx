import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import NavigationStack from "./src/navigation/NavigationStack";
import { useEffect } from "react";
import { BackHandler } from "react-native";

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
    <NavigationContainer>
      <NavigationStack />
    </NavigationContainer>
  );
}
