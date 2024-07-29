import AsyncStorage from "@react-native-async-storage/async-storage";

export const getMenuGradient = async(): Promise<string> => {
    try {
        const value = await AsyncStorage.getItem('MenuGradient');
        if (value !== null) {
          return value;
        }
        return 'OG-Dark'
      } catch (e) {
        return 'OG-Dark'
      }
}
export const getMenuImage = async(): Promise<string> => {
    try {
        const value = await AsyncStorage.getItem('MenuImage');
        if (value !== null) {
          return value;
        }
        return 'proud-parent'
      } catch (e) {
        return 'proud-parent'
      }
}
export const getRibbonImage = async(): Promise<string> => {
    try {
        const value = await AsyncStorage.getItem('RibbonImage');
        if (value !== null) {
          return value;
        }
        return 'proud-parent'
      } catch (e) {
        return 'proud-parent'
      }
}


export const getCounterLayoutPref = async(): Promise<string> => {
    try {
        const value = await AsyncStorage.getItem('CounterLayoutPref');
        if (value !== null){
            return value;
        }
        return '/simpleCounter';
    } catch (e) {
        return '/simpleCounter';
    }
}