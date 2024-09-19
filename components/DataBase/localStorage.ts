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

export const setHCP = async (hcp: number|string) => {
    try {
      await AsyncStorage.setItem('HCP', hcp.toString())
      console.log('set HCP to: ', hcp)
    } catch (e) {
        console.log(e)
    }
}

export const getHCP = async (): Promise<number | null> => {
    try {
        const value = await AsyncStorage.getItem('HCP');
        if (value !== null) {
          return parseFloat(value);
        }
        return null;
      } catch (e) {
        return null;
      }
}