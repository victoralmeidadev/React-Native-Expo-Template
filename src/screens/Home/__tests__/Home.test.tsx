import React from 'react';

import { render } from '@testing-library/react-native';

import { Home } from '@src/screens/Home';

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));

describe('Home Screen', () => {
  it('should render correctly', () => {
    const mockNavigation = {
      navigate: jest.fn(),
    };

    const { getByText } = render(
      <Home navigation={mockNavigation as any} route={undefined as any} />
    );

    expect(getByText(/Welcome to Expo Template/i)).toBeTruthy();
  });

  it('should display SDK and framework info', () => {
    const mockNavigation = {
      navigate: jest.fn(),
    };

    const { getByText } = render(
      <Home navigation={mockNavigation as any} route={undefined as any} />
    );

    expect(
      getByText(/Expo SDK 55 \(New Architecture by default\)/i)
    ).toBeTruthy();
    expect(getByText(/React Navigation 6/i)).toBeTruthy();
  });
});
