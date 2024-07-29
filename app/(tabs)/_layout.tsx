import { Tabs } from 'expo-router';
import { useEffect, useState } from "react";

import { getRibbonImageSource } from "@/constants/Colors";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ImageBackground } from 'react-native';
import { getMenuGradient, getRibbonImage } from '@/components/DataBase/localStorage';

export default function TabLayout() {

    const [gradient, setGradient] = useState('cool-guy')
    const [ribbonImage, setRibbonImage] = useState('proud-parent')
    const getPreferences = async () => {
        const value = await getMenuGradient()
        setGradient(value)
        const ribbonImgTag = await getRibbonImage()
        setRibbonImage(ribbonImgTag)
    }
    
    useEffect(() => {
        getPreferences();
    }, [])
    const image = getRibbonImageSource(ribbonImage)




  return (
    <Tabs screenOptions={{ 
     tabBarActiveTintColor: '#999', tabBarActiveBackgroundColor:'#333', tabBarInactiveBackgroundColor:'#555', tabBarStyle:{backgroundColor:'#333'} }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'All Stats',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          headerShown:false
        }}
      />
      <Tabs.Screen
        name="statsCourses"
        options={{
          title: 'Course Specific',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}