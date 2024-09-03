import { useEffect, useState } from "react";
import { Stack, Tabs } from "expo-router";

import { getRibbonImageSource } from "@/constants/Colors";
import { ImageBackground, StyleSheet } from "react-native";
import { getMenuGradient, getRibbonImage } from "@/components/DataBase/localStorage";
// import {StackHeader} from "@/constants/StackHeader";
import StackOptions from "@/constants/StackOptions";

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
    
    return (
      <Stack>
        {/* <StackHeader pageName="(play)/index" image={HeaderRibbonImg} imageTag={ribbonImage} title="Simple Counter" /> */}
      <Stack.Screen name="index" options={{ title: "" }} />
      <Stack.Screen name="(myCourses)" options={{headerShown:false}}  />
      <Stack.Screen name="(play)/index" options={StackOptions({ image, imageTag: ribbonImage, title: "Simple Counter" })} />
      <Stack.Screen name="(settings)/index" options={StackOptions({ image, imageTag: ribbonImage, title: "Settings" })} />
      <Stack.Screen name="(tabs)" options={{headerShown:false}} />
    </Stack>
  );
}
