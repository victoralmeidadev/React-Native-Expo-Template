import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';

const MainStack = createNativeStackNavigator();

export const MainNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Home" component={Home} />
  </MainStack.Navigator>
);
