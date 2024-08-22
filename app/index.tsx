import { openDb, tableSetUp } from "@/components/DataBase/API";
import { Link, Stack, useFocusEffect } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Button, View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getMenuImageSource } from "@/constants/Colors";

import HomeRecentRound from "@/components/HomeComponents/HomeRecentRound";
import { getMenuImage } from "@/components/DataBase/localStorage";
import { ThemeProvider } from "@react-navigation/native";



export default function Index() {
  const [menuImage, setMenuImage] = useState('proud-parent')


  const imageSource = getMenuImageSource(menuImage);


  const setUserPreferences = async () => {
    const menuImgTag = await getMenuImage()
    setMenuImage(menuImgTag)
  }
  useEffect(() => {
    setUserPreferences();
  }, [])


  const setUpDB = async () => {
    const db = await openDb();
    await tableSetUp(db);
  }


  useEffect(() => {
    setUpDB();

  }, []);

  // const image = require('../assets/images/ggwp.png');





  useFocusEffect(
    useCallback(() => {
      setUserPreferences()

      return () => {

      };
    }, [])
  );




  const MenuLink = ({ hurl, title }: { hurl: string, title: string }) => {


    return (
      <View style={{ transform: 'scale(.95)' }}>

        <Link href={hurl} asChild>

          <TouchableOpacity activeOpacity={0.6}>
            <LinearGradient colors={['#444', '#222']} style={styles.Links}>

              <Text style={styles.LinkText}>{title}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Link>
      </View>
    )
  }





  return (


    <ImageBackground style={styles.image} source={imageSource} resizeMode='stretch'>


      <Stack.Screen options={{
        headerTransparent: true, headerRight: () => (
          <TouchableOpacity onPress={() => ''} style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(20,20,20,0.6)', padding: 2, borderRadius: 30 }}>
            <FontAwesome5 name="user-friends" size={30} color="white" />
            <Text style={{ color: 'white', marginHorizontal: 5, fontSize: 10 }}>Social</Text>
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <Link href={("/(settings)")} asChild>

            <TouchableOpacity onPress={() => ''} style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(20,20,20,0.6)', borderRadius: 30 }}>
              <FontAwesome name="cog" size={30} color="white" />
              <Text style={{ color: 'white', marginHorizontal: 5, fontSize: 10 }}>Settings</Text>
            </TouchableOpacity>

          </Link>
        ),
      }} />

      <View style={{ justifyContent: 'center', alignItems: 'center', height: 150 }}>

        <Image

style={{ width: 300, height: 200 }}
source={require('../assets/images/logo.png')}
/>
      </View>



      {/*///////////////////////////////////////////////// Old /////////////////////////////////////////////////¿ */}
      {/* <View
          style={{
            // paddingBottom:50,
            marginTop:20,
            justifyContent: "center",
            flexDirection:'row',
            alignItems: "center",
            }}
            >
            <View>
            
            <MenuLink hurl="(play)" title="Play a Round" />
            <MenuLink hurl='(myCourses)' title="My Courses"/>
            </View>
            <View>
            
            <MenuLink hurl='(tabs)' title="Stat Lounge"/>
            
            <MenuLink hurl='(settings)' title="Settings"/>
            </View>
            
            
            </View> */}

      <View
        style={{
          // paddingBottom:50,
          // marginTop: 20,
          justifyContent: "center",
          flexDirection: 'row',
          alignItems: "center",
        }}
        >
        <View>
          <MenuLink hurl="(play)" title="Play a Round" />
          <MenuLink hurl='(myCourses)' title="My Courses" />
          <MenuLink hurl='(tabs)' title="Stat Lounge" />
        </View>
      </View>



      <View style={{ height: 200, alignItems: 'center', transform: 'translateY(-30px)' }}>
        <View style={{ transform: 'scaleY(0.75)' }}>
  


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
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#222',
    padding: 15,
    width: 175,
    alignItems: 'center',
    marginVertical: 10
    // marginVertical: 5
  },
  LinkText: { color: 'whitesmoke', fontSize: 25, },
  image: {
    flex: 1,
    justifyContent: 'center',
    // width:300

  },
})