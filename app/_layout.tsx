import { useEffect, useState } from "react";
import { Stack, Tabs } from "expo-router";

import { getRibbonImageSource } from "@/constants/Colors";
import { ImageBackground, StyleSheet } from "react-native";
import { getMenuGradient, getRibbonImage } from "@/components/DataBase/localStorage";

export default function RootLayout() {


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


    const HeaderRibbonImg = () => {
        return (
            <ImageBackground
                source={image}
                style={StyleSheet.absoluteFill}
            />
          )
          }
    
    return (
      <Stack>
      <Stack.Screen name="index" options={{ title: "" }} />
      <Stack.Screen name="(myCourses)/index" options={{ title: "My Courses" }} />
      <Stack.Screen name="(play)/index" options={{ title: "Simple Counter" }} />
      <Stack.Screen name="(settings)/index" options={{ title: "Settings" }} />
      <Stack.Screen name="(tabs)" options={{ headerShown:false }} />
    </Stack>
  );
}
