import { getMenuGradient, getRibbonImage } from "@/components/DataBase/localStorage"
import { getRibbonImageSource } from "@/constants/Colors"
import StackOptions from "@/constants/StackOptions"
import { Stack } from "expo-router"
import { useEffect, useState } from "react"

export default function CoursesLayout() {
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
      
      <Stack.Screen name="index" options={StackOptions({ image, imageTag: ribbonImage, title: "My Courses" })}  />
      <Stack.Screen name="CourseStats" options={StackOptions({ image, imageTag: ribbonImage, title: "Simple Counter" })} />
      <Stack.Screen name="(holes)/Holes" options={StackOptions({ image, imageTag: ribbonImage, title: "Settings" })} />
      {/* <Stack.Screen name="(tabs)" options={{headerShown:false}} /> */}
    </Stack>
  );
}
