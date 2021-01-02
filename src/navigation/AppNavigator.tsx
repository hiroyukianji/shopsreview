import React, { useContext } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
/* navigator */
import { MainTabNavigation } from "./MainTabNavigator";
/* screens */
import { AuthScreen } from "../screens/AuthScreen";
/* contexts */
import { UserContext } from "../contexts/userContext";

export const AppNavigation = () => {
  const { user } = useContext(UserContext);
  return (
    <NavigationContainer>
      {!user ? <AuthScreen /> : <MainTabNavigation />}
    </NavigationContainer>
  );
};
