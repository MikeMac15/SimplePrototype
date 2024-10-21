import React from 'react';
import renderer from 'react-test-renderer';
import { NavigationContainer } from '@react-navigation/native';
import Courses from '@/app/(myCourses)';// Adjust the path to your component

// Mocks for AsyncStorage and other modules can be in jestSetupFile.js
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('Courses Snapshot Test', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <NavigationContainer>
          <Courses />
        </NavigationContainer>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

