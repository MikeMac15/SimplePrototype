import { openDb, tableSetUp } from "@/components/DataBase/API";
import { Link, Stack, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Button, View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getMenuImageSource } from "@/constants/Colors";

import HomeRecentRound from "@/components/HomeComponents/HomeRecentRound";
import { getHCP, getMenuImage, setHCP } from "@/components/DataBase/localStorage";
import WelcomeModal from "@/components/HomeComponents/WelcomeModal";



export default function Index() {
  const [menuImage, setMenuImage] = useState('ocean');
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const imageSource = getMenuImageSource(menuImage);

  const setUserPreferences = useCallback(async () => {
    const menuImgTag = await getMenuImage();
    setMenuImage(menuImgTag);
    // check is user has turned off the welcome modal
    
    const hcp = await getHCP();
    if (hcp === null) {
      setShowWelcomeModal(true);
      
    }
  }, []);

  const setUpDB = async () => {
    const db = await openDb();
    await tableSetUp(db);
  };

  useEffect(() => {
    setUpDB();
  }, []);

  // refresh preferences when the screen is focused
  useFocusEffect(
    useCallback(() => {
      setUserPreferences();
    }, [setUserPreferences])
  );

  return (


    <ImageBackground style={styles.image} source={imageSource} resizeMode='stretch'>


      <Stack.Screen options={{
        headerTransparent: true, headerRight: () => (
          <TouchableOpacity onPress={() => ''} style={{ flexDirection: 'column', alignItems: 'center', }}>
            <FontAwesome5 name="users" size={30} color="#777" />
            <Text style={{ color: '#777', marginHorizontal: 5, fontSize: 10 }}>Social</Text>
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <Link href={("/(settings)")} asChild>

            <TouchableOpacity onPress={() => ''} style={{ flexDirection: 'column', alignItems: 'center', }}>
              <FontAwesome name="cog" size={30} color="white" />
              <Text style={{ color: 'white', marginHorizontal: 5, fontSize: 10 }}>Settings</Text>
            </TouchableOpacity>

          </Link>
        ),
      }} />

      { showWelcomeModal && <WelcomeModal modalVisible={showWelcomeModal} setModalVisible={setShowWelcomeModal} /> }

      <View style={{ justifyContent: 'center', alignItems: 'center', height: 150 }}>

        {/* <View style={{ backgroundColor:'rgba(0,0,0,0.6)', borderRadius:20 }}> */}
        <Image
          resizeMode="cover"
          style={{ width: 300, height: 200 }}
          source={require('../assets/images/logo.png')}
        />
      </View>


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

          <View style={{ transform: 'scale(.95)' }}>

            <Link push href={'/(play)'} asChild>

              <TouchableOpacity activeOpacity={0.6}>
                <LinearGradient colors={['#444', '#222']} style={styles.Links}>

                  <Text style={styles.LinkText}>{"Play A Round"}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Link>
          </View>

          <View style={{ transform: 'scale(.95)' }}>

            <Link push href={'/(myCourses)/'} asChild>

              <TouchableOpacity activeOpacity={0.6}>
                <LinearGradient colors={['#444', '#222']} style={styles.Links}>

                  <Text style={styles.LinkText}>{"My Courses"}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Link>
          </View>

          <View style={{ transform: 'scale(.95)' }}>

            <Link href={'/(tabs)'} asChild>

              <TouchableOpacity activeOpacity={0.6}>
                <LinearGradient colors={['#444', '#222']} style={styles.Links}>

                  <Text style={styles.LinkText}>{"Statistics"}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Link>
          </View>

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