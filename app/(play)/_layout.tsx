import { getMenuGradient, getRibbonImage } from "@/components/DataBase/localStorage"
import { getRibbonImageSource } from "@/constants/Colors"
// import StackHeader from "@/constants/StackHeader"
// import StackOptions from "@/constants/StackOptions"
import { Stack } from "expo-router"
import { useEffect, useState } from "react"

const PlayLayout: React.FC = () => {

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
            
            {/* <Stack.Screen name="index" options={StackOptions({ image, imageTag: ribbonImage, title: "Simple Counter" })} /> */}
            <Stack.Screen name="counterThree/index" options={{ headerShown: false }} />
            {/* <Stack.Screen name="counterTwo/index" options={{ headerShown: false }} />
            <Stack.Screen name="emoji/index" options={{ headerShown: false }} />
            <Stack.Screen name="simpleCounter/index" options={{ headerShown: false }} /> */}

        </Stack>
    );
}
