import { router, Stack, Tabs } from 'expo-router';
import { useEffect, useState } from "react";

import { getRibbonImageSource } from "@/constants/Colors";
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


  return (
    <Tabs screenOptions={{ 
      tabBarStyle: {backgroundColor:'#111'}, tabBarActiveTintColor:'#ddd', tabBarInactiveTintColor:'#888',
     }}>
      <Tabs.Screen 
      name='index'
      options={{
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />, 
                headerLeft: () => (
                  <TouchableOpacity style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} onPress={() => router.dismiss()}>
                    <Feather name="chevron-left" size={30} color="#007AFF" />
                    <Text style={{color:"#007AFF", fontSize:18}}>Menu</Text>
                  </TouchableOpacity>
                ),
                headerBackground: () => (
                    <ImageBackground
                        source={image}
                        style={StyleSheet.absoluteFill}
                    />
                ),
                headerTitleStyle: { fontSize: 25, fontWeight: '800' }
            }} />
      <Tabs.Screen
        name="statsCourses"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />, 
                  headerLeft: () => (
                    <TouchableOpacity style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} onPress={() => router.dismiss()}>
                      <Feather name="chevron-left" size={30} color="#007AFF" />
                      <Text style={{color:"#007AFF", fontSize:18}}>Menu</Text>
                    </TouchableOpacity>
                  ),
                  headerBackground: () => (
                      <ImageBackground
                          source={image}
                          style={StyleSheet.absoluteFill}
                      />
                  ),
                  headerTitleStyle: { fontSize: 25, fontWeight: '800' }
              }} />
    </Tabs>
  );
}