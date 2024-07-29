import { openDb, tableSetUp } from "@/components/DataBase/API";
import { Link, Stack, useFocusEffect } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Button, View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getMenuImageSource } from "@/constants/Colors";

import HomeRecentRound from "@/components/HomeComponents/HomeRecentRound";
import { getMenuImage } from "@/components/DataBase/localStorage";


export default function Index() {
  const [menuImage, setMenuImage] = useState('proud-parent')


  const imageSource = getMenuImageSource(menuImage);
  

  const setUserPreferences = async() => {
    const menuImgTag = await getMenuImage()
    setMenuImage(menuImgTag)
    }
    useEffect(()=>{
            setUserPreferences();
        },[])


  const setUpDB = async () => {
    const db = await openDb();
    await tableSetUp(db);
  }


  useEffect(()=>{
    setUpDB();

  },[]);
  
  // const image = require('../assets/images/ggwp.png');





  useFocusEffect(
    useCallback(() => {
      setUserPreferences()

      return () => {
        
      };
    }, [])
  );




const MenuLink = ({href,title}:{href:string, title:string}) => {
  return (
    <View style={{transform:'scale(.95)'}}>

        <Link href={href} asChild>

          <TouchableOpacity activeOpacity={0.6}>
            <LinearGradient colors={['#444', '#222']} style={styles.Links}>

            <Text style={styles.LinkText}>{title}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Link>
    </View>
  )
}


const GGLogo = () => {
  return (
    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'baseline', marginTop:10, backgroundColor:'rgba(50,50,50,0.7)', }}>
        <Text style={{fontSize:50, fontFamily:'Arial',color:'whitesmoke', fontStyle:'italic' }}>Golf Gooder</Text>
        <Text style={{fontSize:10,fontFamily:'Arial',color:'whitesmoke', fontStyle:'italic'}}>Simple</Text>
      </View>
  )
}


  return (
    
      <ImageBackground style={styles.image} source={imageSource} resizeMode='stretch'>
      

      <Stack.Screen options={{headerTransparent:true, headerRight: () => (
                        <TouchableOpacity onPress={()=> ''} style={{flexDirection:'column', alignItems:'center'}}>
                           <FontAwesome name="user-circle" size={24} color="white" />
                          <Text style={{color:'white', marginHorizontal:5, fontSize:10}}>social</Text>
                        </TouchableOpacity>
                    ),}}/>
      <GGLogo />
      
      
      
      
      <View
        style={{
          // paddingBottom:50,
          marginTop:20,
          justifyContent: "center",
          flexDirection:'row',
          alignItems: "center",
          }}
        >
          <View>

        <MenuLink href="(play)" title="Play a Round" />
        <MenuLink href={'(myCourses)'} title="My Courses"/>
          </View>
        <View>

        <MenuLink href={'(tabs)'} title="Stat Lounge"/>
        
        <MenuLink href={'(settings)'} title="Settings"/>
        </View>

      
      </View>
          <View style={{ height:200, alignItems:'center', transform:'translateY(-30px)'}}>
          <View style={{  transform:'scaleY(0.65)'}}>
          

              <HomeRecentRound />
            
          </View>
          </View>

    </ImageBackground>
   
  );
}

const styles = StyleSheet.create({
  Links: {
    // flexDirection:'row',
    backgroundColor: 'rgba(234,234,234,0.9)',
    borderRadius:30,
    borderWidth:1,
    borderColor:'#222',
    padding:15,
    width: 175,
    alignItems:'center',
    marginVertical:10
  },
  LinkText: {color:'whitesmoke',fontSize:25,},
  image: {
    flex:1,
    justifyContent: 'center',
    // width:300

  },
})