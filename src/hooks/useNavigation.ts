import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function useAppNavigation() {
  return useNavigation<NavigationProp>();
}
