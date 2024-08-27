import { Stack } from 'expo-router';
import { StyleSheet, ImageBackground, TouchableOpacity, Text, Button } from 'react-native'
import useTheme from './Theme';

interface StackHeaderProps {
    image:any;
    title:string;
    play?:boolean;
    roundRef?:any;
    lastHole?: () => void;
    nextHole?: () => void;
}

const StackHeader: React.FC<StackHeaderProps> = ({image,title, play=false, roundRef, lastHole, nextHole}) => {
    const theme = useTheme();
    if (play && roundRef && lastHole && nextHole) {
        return (
            <Stack.Screen options={{
                gestureEnabled: false,
                title: title,
                
                headerBackground: () => (
                    <ImageBackground
                        source={image}
                        style={[StyleSheet.absoluteFill, { flex: 1 }]}
                    />
                ),
                headerTitleStyle: { color: 'whitesmoke', fontSize: 25, fontWeight: 'bold', fontFamily: 'Papyrus' },
                
                headerBlurEffect: 'systemUltraThinMaterialDark',
          headerLeft: () => (
            <TouchableOpacity onPress={() => ''} >
              <Text style={{ color: 'salmon', }}>Scorecard</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            Object.keys(roundRef.current.holes).length == 17
              ? <Button title='Finish' onPress={() => lastHole()} />
              : <Button title='Next >' onPress={() => nextHole()} />
            ),
          }}
          />
        )
    }
  return (
    <Stack.Screen options={{
                title: title,
                headerBackTitle: "Menu",
                headerBackground: () => (
                    <ImageBackground
                        source={image}
                        style={[StyleSheet.absoluteFill, { flex: 1 }]}
                    />
                ),
                headerTitleStyle: { fontSize: 25, fontWeight: '800' }
            }} />
)
}

export default StackHeader;
