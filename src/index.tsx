import React from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { MainNavigator } from '@src/navigation';
import { RootStackParamList } from '@src/types/navigation';

export const RootApp: React.FC = () => {
  const navigationRef =
    React.useRef<NavigationContainerRef<RootStackParamList>>(null);

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer ref={navigationRef}>
        <MainNavigator />
      </NavigationContainer>
    </>
  );
};

export default RootApp;
