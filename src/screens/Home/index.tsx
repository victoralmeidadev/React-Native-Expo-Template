import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HomeScreenProps } from '@src/types/navigation';
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from '@src/constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.dark,
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.normal,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export const Home: React.FC<HomeScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Expo Template</Text>
      <Text style={styles.subtitle}>
        SDK 54 with New Architecture enabled{'\n'}
        React Navigation 7 • TypeScript 5.9
      </Text>
    </View>
  );
};

export default Home;
