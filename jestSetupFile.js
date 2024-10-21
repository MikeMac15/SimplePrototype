// Mocking AsyncStorage for testing
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);


// Mock expo-router
jest.mock('expo-router', () => ({
  Link: jest.fn().mockReturnValue(null),
  Stack: { Screen: jest.fn().mockReturnValue(null) },
  useNavigation: jest.fn(),
}));

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return {
    LinearGradient: View, // Mock LinearGradient as a simple View
  };
});

jest.mock('expo-sqlite', () => ({
  openDatabase: jest.fn(() => ({
    getAllAsync: jest.fn(() => Promise.resolve([])), // Mock `getAllAsync` to return an empty array
    runAsync: jest.fn(() => Promise.resolve({ lastInsertRowId: 1 })), // Mock `runAsync` to return a mock insert result
    execAsync: jest.fn(() => Promise.resolve()), // Mock `execAsync` to resolve without any result
    transaction: jest.fn((callback) => callback({
      executeSql: jest.fn(),
    })),
  })),
}));
