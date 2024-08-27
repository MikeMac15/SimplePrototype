/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const MenuGradients: { [key: string]: string[] } = {
  'cool-guy': ['#3b705d', '#01383b'],
  'sunset': ['#ff859b', '#ffbb33'],
  'morning-dew': ['#82f3ff', '#fce674', '#f5d33b'],
  'OG-Dark': ['#2f2f2f', '#111'],
  'OG-Light': ['whitesmoke', '#aaa'],
};

export const MenuImgTag: { [key: string]: any } = {
  'proud-parent': 'ggwp.png',
  'retro': 'retro4.png',
};

export const getMenuImageSource = (menuImage: string) => {
  switch (menuImage) {
    case 'proud-parent':
      return require('../assets/images/ggwp.png');
    case 'ocean':
      return require('../assets/images/ocean.png');
    case 'sunset':
      return require('../assets/images/sunset.png');
    case 'retro':
      return require('../assets/images/retro4.png');
    case 'nasaJW':
      return require('../assets/images/nasaJW1.png');
    default:
      return require('../assets/images/ggwp.png');
    }
  };
      
      export const getRibbonImageSource = (menuImage: string) => {
        switch (menuImage) {
          case 'proud-parent':
      return require('../assets/images/crayon-skies-ribbon.png');
    case 'retro':
      return require('../assets/images/retro-ribbon.png');
    case 'nasaJW':
      return require('../assets/images/jw2-ribbon.png');
    default:
      return require('../assets/images/ggwp.png');
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const TeeColors: { [key: number]: string } = {
  0: 'none',
  1: 'Black',
  2: 'Blue',
  3: 'White',
  4: 'Red',
  5: 'Gold',
  6: 'Silver',
  7: 'Green',
}

export const teeTextColor = (color:number) : string => {
  switch (color) {
    case 1:
      return '#888';
        
    case 2:
      return 'skyblue';

    case 3:
      return 'whitesmoke';
    
    case 4:
      return 'salmon';
    
    case 5:
      return '#f2c23d';
    
    case 6:
      return '#e3e1dc';
    
    case 7:
      return 'yellowgreen';
        
    default:
      return 'grey'
  }
}

export const GIRFIRColors = (data:number, count:number) => {
  const dif = data/count;
  if (dif > 0.75) {
    return 'yellowgreen'
  } else if (dif > 0.60) {
    return '#ddfa84'
  } else if (dif > 0.45) {
    return '#e7fcb8'
  } else if (dif >= 0.35) {
    return '#faaba2'
 } else {
    return 'salmon'
  }
  
}

export const PuttColors = (data:number) => {
  if (data < 1.75) {
    return 'yellowgreen'
  } else if (data < 1.95) {
    return '#ddfa84'
  } else if (data < 2.15) {
    return '#e7fcb8'
  } else if (data < 2.25) {
    return '#faaba2'
  } else {
    return 'salmon'
  }
}

export const AvgScoreColors = (data:number, hcp:number = 0, par:number) => {
  let dif = 0;
  if (hcp!=0) {
    dif = (data - (hcp/18)) - par;
  } else {
    dif = data - par;
  }

  if (dif <= 0) {
    return 'yellowgreen'
  } else if (dif < 0.5) {
    return '#ddfa84'
  } else if (dif < 0.75) {
    return '#e7fcb8'
  } else if (dif < 1) {
    return '#faaba2'
  } else {
    return 'salmon'
  }
}