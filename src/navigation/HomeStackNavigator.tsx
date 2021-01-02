import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
/* screens */
import { MainStackNavigation } from "../navigation/MainStackNavigator";
import { CrateReviewScreen } from "../screens/CreateReviewScreen";
/* types */
import { RootStackParamList } from "../types/navigation";

const Stack = createStackNavigator<RootStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

export const HomeStackNavigation = () => {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={MainStackNavigation}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="CreateReview" component={CrateReviewScreen} />
    </RootStack.Navigator>
  );
};
