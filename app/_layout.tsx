import { Stack } from "expo-router";


export default function RootLayout() {
  
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
