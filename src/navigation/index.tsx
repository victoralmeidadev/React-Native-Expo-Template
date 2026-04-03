import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '@src/screens/Home';
import { RootStackParamList } from '@src/types/navigation';

const MainStack = createNativeStackNavigator<RootStackParamList>();

export const MainNavigator: React.FC = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: true,
      headerBackTitle: 'Back',
    }}
  >
    <MainStack.Screen
      name="Home"
      component={Home}
      options={{
        title: 'Home',
      }}
    />
  </MainStack.Navigator>
);
