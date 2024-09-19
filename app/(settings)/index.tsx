import { deleteDb, deleteMostRecentRoundAndHoleStats } from "@/components/DataBase/API";
import { MenuGradients, getRibbonImageSource } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState, } from "react";
import { Button, View, Text, ImageBackground, StyleSheet, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, router, useFocusEffect } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { getCounterLayoutPref, getHCP, getMenuGradient, getMenuImage, getRibbonImage, setHCP } from "@/components/DataBase/localStorage";
import StackOptions from "@/constants/StackOptions";
import StackHeader from "@/constants/StackHeader";
import useTheme from "@/constants/Theme";



export default function Settings() {
    const [gradient, setGradient] = useState('cool-guy')
    const [menuImage, setMenuImage] = useState('proud-parent')
    const [ribbonImage, setRibbonImage] = useState('proud-parent')
    const [counterLayoutPref, setCounterLayoutPref] = useState('/simpleCounter')

    const [currHCP, setCurrHCP] = useState<number>();  // state for the current handicap
    const [newHCP, setNewHCP] = useState<number>();  // state for the new handicap input

    const theme = useTheme();

    
    
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
    const setUserPreferences = async () => {
        const value = await getMenuGradient();
        const menuImgTag = await getMenuImage();
        const ribbonImgTag = await getRibbonImage();
        const layout = await getCounterLayoutPref();
        const h = await getHCP();
        
        setGradient(value);
        setMenuImage(menuImgTag);
        setRibbonImage(ribbonImgTag);
        setCounterLayoutPref(layout);

        if (typeof h === "number") {
            setCurrHCP(h);
        }
    };

    useEffect(() => {
        setUserPreferences();
    }, []);

    const handleChangeHCP = () => {
        if (typeof newHCP === 'number') {
            setCurrHCP(newHCP);  // Update the state with the new handicap
            setHCP(newHCP);  // Store the new handicap in AsyncStorage
        } else {
            console.error("Invalid handicap value");
        }
    };

    const image = getRibbonImageSource(ribbonImage);

    return (
        <LinearGradient colors={MenuGradients[gradient]} style={{height:'100%'}}>
            <StackHeader title="Settings" image={image} imageTag={ribbonImage}/>
        
        <View style={{flexDirection:'row', marginBottom:50, justifyContent:'center'}}>
            <View style={{alignItems:'center', backgroundColor:'rgba(20,20,20,0.75)', borderRadius:20, marginTop:20, marginHorizontal:2}}>
                <Text style={{color:theme.color, paddingTop:10}}>Menu Gradient</Text>
                <Button title="cool-guy" onPress={()=> setGradient('cool-guy')} />
                <Button title="sunset" onPress={()=> setGradient('sunset')} />
                <Button title="morning-dew" onPress={()=> setGradient('morning-dew')} />
                <Button title="OG-Dark" onPress={()=> setGradient('OG-Dark')} />
                <Button title="OG-Light" onPress={()=> setGradient('OG-Light')} />
            </View>
            <View style={{alignItems:'center', backgroundColor:'rgba(20,20,20,0.75)', borderRadius:20, marginTop:20, marginHorizontal:2}}>
                <Text style={{color:theme.color, paddingTop:10}}>Menu Image</Text>
                <Button title="proud-parent" onPress={()=> setMenuImage('proud-parent')} />
                <Button title="ocean" onPress={()=> setMenuImage('ocean')} />
                <Button title="sunset" onPress={()=> setMenuImage('sunset')} />
                <Button title="retro" onPress={()=> setMenuImage('retro')} />
                <Button title="JamesWebb" onPress={()=> setMenuImage('nasaJW')} />
                <Button title="palms" onPress={()=> setMenuImage('palms')} />
                <Button title="balls" onPress={()=> setMenuImage('balls')} />
            </View>
            <View style={{alignItems:'center', backgroundColor:'rgba(20,20,20,0.75)', borderRadius:20, marginTop:20, marginHorizontal:2}}>
                <Text style={{color:theme.color, paddingTop:10}}>Ribbon Image</Text>
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
            <View style={{ alignItems: 'center' }}>
                <Text style={{color:theme.color}}> Current Handicap: {currHCP}</Text>
                <View style={{ margin: 10, alignItems: 'center', backgroundColor: 'rgba(20,20,20,0.25)', padding: 20 }}>
                    <TextInput
                        style={{ backgroundColor: 'rgba(200,200,200,0.5)', padding: 10, margin: 5 }}
                        returnKeyType="done"
                        placeholder="New Handicap"
                        keyboardType="numeric"
                        onChangeText={(text) => setNewHCP(parseInt(text))}  // Store the input as a number
                    />
                    <Button title="Change HCP" onPress={handleChangeHCP} />  
                </View>
            </View>
                <Button title='Save Preferences' onPress={()=> {storeMenuGradient(); storeMenuImage(); storeRibbonImage();storeCounterLayoutPref();}} />
            {/* <Button title="Delete Database" onPress={() => deleteDb()}/> */}
            {/* <Button title="Delete Most Recent Round" onPress={()=>deleteMostRecentRoundAndHoleStats()} /> */}
        </LinearGradient>
    )
}