import { Stack } from 'expo-router';
import { Text, View, StyleSheet, ImageBackground } from 'react-native'

interface StackHeaderProps {
    image:any;
    title:string;
}

const StackHeader: React.FC<StackHeaderProps> = ({image,title}) => {
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
