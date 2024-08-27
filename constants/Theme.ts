import { useState, useEffect, useMemo } from 'react';
import { getMenuGradient } from '@/components/DataBase/localStorage';

const useTheme = () => {
  const [gradient, setGradient] = useState('OG-Dark');

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const value = await getMenuGradient();
        setGradient(value);
      } catch (error) {
        console.error('Failed to fetch preferences:', error);
      }
    };

    fetchPreferences();
  }, []);

  const theme = useMemo(() => {
    switch (gradient) {
      case 'OG-Dark':
        return {
          color: 'whitesmoke',
          background: 'black', // Example for background color
        };
      case 'OG-Light':
        return {
          color: 'black',
          background: 'white', // Example for background color
        };
        case 'cool-guy':
        return {
          color: 'whitesmoke',
          background: 'white',
        };
      default:
        return {
          color: 'black',
          background: 'white',
        };
    }
  }, [gradient]);

  return theme;
};

export default useTheme;