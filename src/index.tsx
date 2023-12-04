import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import { MainNavigator } from "./navigation";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </>
  );
}
