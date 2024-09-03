import { router, Stack, Tabs } from 'expo-router';
import { useEffect, useState } from "react";

import { getRibbonImageSource, useTextColor } from "@/constants/Colors";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { getMenuGradient, getRibbonImage } from '@/components/DataBase/localStorage';
import { AntDesign, Feather } from '@expo/vector-icons';

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
  const textColor = useTextColor(ribbonImage);


  return (
    <Tabs screenOptions={{ 
      tabBarStyle: {backgroundColor:'#111'}, tabBarActiveTintColor:'#ddd', tabBarInactiveTintColor:'#888',
     }}>
      <Tabs.Screen 
      name='index'
      options={{
        headerTintColor: textColor,
        headerTitleStyle: { fontSize: 25, fontWeight: '800' },
        
        title: 'Stats',
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />, 
                headerLeft: () => (
                  <TouchableOpacity style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} onPress={() => router.dismiss()}>
                    <Feather name="chevron-left" size={30} color={textColor} />
                    <Text style={{color:textColor, fontSize:18}}>Menu</Text>
                  </TouchableOpacity>
                ),
                headerBackground: () => (
                    <ImageBackground
                        source={image}
                        style={StyleSheet.absoluteFill}
                    />
                ),
            }} />
      <Tabs.Screen
        name="statsCourses"
        options={{
          headerTintColor: textColor,
          headerTitleStyle: { fontSize: 25, fontWeight: '800' },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />, 
                  headerLeft: () => (
                    <TouchableOpacity style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} onPress={() => router.dismiss()}>
                      <Feather name="chevron-left" size={30} color={textColor} />
                      <Text style={{color:textColor, fontSize:18}}>Menu</Text>
                    </TouchableOpacity>
                  ),
                  headerBackground: () => (
                      <ImageBackground
                          source={image}
                          style={StyleSheet.absoluteFill}
                      />
                  ),
              }} />
    </Tabs>
  );
}