import { useEffect, useState } from "react";
import { Stack, Tabs } from "expo-router";

import { getRibbonImageSource } from "@/constants/Colors";
import { ImageBackground, StyleSheet } from "react-native";
import { getMenuGradient, getRibbonImage } from "@/components/DataBase/localStorage";
// import {StackHeader} from "@/constants/StackHeader";
import StackOptions from "@/constants/StackOptions";
import StackHeader from "@/constants/StackHeader";

export default function RootLayout() {
    const [ribbonImage, setRibbonImage] = useState('proud-parent')
    const getPreferences = async () => {
        const ribbonImgTag = await getRibbonImage()
        setRibbonImage(ribbonImgTag)
    }
    
    useEffect(() => {
        getPreferences();
    }, [])
    const image = getRibbonImageSource(ribbonImage)
    
    return (
      <Stack>
        {/* <Stack.Screen image={ribbonImage} imageTag={ribbonImage} title="Simple Counter" /> */}
      <Stack.Screen name="index" options={{ title: "" }} />
      <Stack.Screen name="(myCourses)" options={{headerShown:false}}  />
      {/* <Stack.Screen name="(play)" options={{headerShown:false}} /> */}
      {/* <Stack.Screen name="(settings)/index" options={{headerShown:false}} /> */}
      <Stack.Screen name="(tabs)" options={{headerShown:false}} />
    </Stack>
  );
}
