import { deleteDb, deleteMostRecentRoundAndHoleStats } from "@/components/DataBase/API";
import { MenuGradients, getRibbonImageSource } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState, } from "react";
import { Button, View, Text, ImageBackground, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, router, useFocusEffect } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { getCounterLayoutPref, getMenuGradient, getMenuImage, getRibbonImage } from "@/components/DataBase/localStorage";
import StackOptions from "@/constants/StackOptions";
import StackHeader from "@/constants/StackHeader";



export default function Settings() {
    const [gradient, setGradient] = useState('cool-guy')
    const [menuImage, setMenuImage] = useState('proud-parent')
    const [ribbonImage, setRibbonImage] = useState('proud-parent')
    const [counterLayoutPref, setCounterLayoutPref] = useState('/simpleCounter')

    
    const storeMenuGradient = async () => {
        try {
            await AsyncStorage.setItem('MenuGradient', gradient);
        } catch (e) {
            console.error(e)
        }
    };
    const storeMenuImage = async () => {
        try {
            await AsyncStorage.setItem('MenuImage', menuImage);
        } catch (e) {
            console.error(e)
        }
    };
    const storeRibbonImage = async () => {
        try {
            await AsyncStorage.setItem('RibbonImage', ribbonImage);
        } catch (e) {
            console.error(e)
        }
    };

    const storeCounterLayoutPref = async() => {
        try { await AsyncStorage.setItem('CounterLayoutPref', counterLayoutPref);}
        catch (e) {console.error(e)}
    }
    
    const setUserPreferences = async() => {
        const value = await getMenuGradient()
        const menuImgTag = await getMenuImage()
        const ribbonImgTag = await getRibbonImage()
        const layout = await getCounterLayoutPref()
        setGradient(value)
        setMenuImage(menuImgTag)
        setRibbonImage(ribbonImgTag)
        setCounterLayoutPref(layout)
    }

    useEffect(()=>{
        setUserPreferences();
    },[])

    const image = getRibbonImageSource(ribbonImage);

    return (
        <LinearGradient colors={MenuGradients[gradient]} style={{height:'100%'}}>
            <StackHeader title="Settings" image={image} imageTag={ribbonImage}/>
            <Text>Settings</Text>
        <View style={{flexDirection:'row', marginBottom:50}}>
            <View>
                <Text>Menu Gradient</Text>
                <Button title="cool-guy" onPress={()=> setGradient('cool-guy')} />
                <Button title="sunset" onPress={()=> setGradient('sunset')} />
                <Button title="morning-dew" onPress={()=> setGradient('morning-dew')} />
                <Button title="OG-Dark" onPress={()=> setGradient('OG-Dark')} />
                <Button title="OG-Light" onPress={()=> setGradient('OG-Light')} />
            </View>
            <View>
                <Text>Menu Image</Text>
                <Button title="proud-parent" onPress={()=> setMenuImage('proud-parent')} />
                <Button title="ocean" onPress={()=> setMenuImage('ocean')} />
                <Button title="sunset" onPress={()=> setMenuImage('sunset')} />
                <Button title="retro" onPress={()=> setMenuImage('retro')} />
                <Button title="JamesWebb" onPress={()=> setMenuImage('nasaJW')} />
                <Button title="palms" onPress={()=> setMenuImage('palms')} />
                <Button title="balls" onPress={()=> setMenuImage('balls')} />
            </View>
            <View>
                <Text>Ribbon Image</Text>
                <Button title="proud-parent" onPress={()=> setRibbonImage('proud-parent')} />
                <Button title="retro" onPress={()=> setRibbonImage('retro')} />
                <Button title="JamesWebb" onPress={()=> setRibbonImage('nasaJW')} />
                <Button title="meadow" onPress={()=> setRibbonImage('meadow')} />
                <Button title="metal" onPress={()=> setRibbonImage('metal')} />
                <Button title="balls" onPress={()=> setRibbonImage('balls')} />
            </View>
        </View>
            {/* <View>
                <Text>Counter Layout</Text>
                <Button title="counterV1" onPress={()=>{setCounterLayoutPref('/simpleCounter')}} />
                <Button title="counterV2" onPress={()=>{setCounterLayoutPref('/counterTwo')}} />
                <Button title="counterV3" onPress={()=>{setCounterLayoutPref('/counterThree')}} />
                <Button title="emoji" onPress={()=>{setCounterLayoutPref('/emoji')}} />
            </View> */}
                <Button title='Save Preferences' onPress={()=> {storeMenuGradient(); storeMenuImage(); storeRibbonImage();storeCounterLayoutPref();}} />
            {/* <Button title="Delete Database" onPress={() => deleteDb()}/> */}
            {/* <Button title="Delete Most Recent Round" onPress={()=>deleteMostRecentRoundAndHoleStats()} /> */}
        </LinearGradient>
    )
}