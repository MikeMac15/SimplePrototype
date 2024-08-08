import { Alert, Animated, Button, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, Ionicons, MaterialCommunityIcons, Entypo, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Hole, HoleStats, Round } from "@/components/DataBase/Classes";
// import ScoreModal from "../CounterTwo/Buttons/Modals/ScoreModal";
import RoundModal from "../CounterTwo/Buttons/Modals/RoundModal";
import ExitModal from "../CounterTwo/Buttons/Modals/ExitModal";
import ScoreModal3 from "./ScoreModal3";
// import ImagesModal from "../CounterTwo/Buttons/Modals/ImagesModal";

interface OptionsProps {
  teeboxHoles:Hole[];
  roundHoles: { [num: number]: HoleStats };
  round: Round
  holeNumber: number
}
const C3Options3: React.FC<OptionsProps> = ({teeboxHoles, roundHoles, round, holeNumber}) => {



  



    const OptionBtn2 = (title:string, icon:string) => {
      const [modalVisible, setModalVisible] = useState(false)
        const Icon = () => {

            switch (icon) {
                case 'score':
                    return <Entypo name="document" color={'whitesmoke'} size={25} />
                case 'bar':
                      return <Ionicons name='stats-chart-sharp' color={'whitesmoke'} size={25} />
                // case 'dot':
                //     return <AntDesign name='dotchart' color={'whitesmoke'} size={25} />
                // case 'yrd':
                //   return <MaterialIcons name="share-location" color={'whitesmoke'} size={25} />
                // case 'green':
                //   return <MaterialIcons name="golf-course" color={'whitesmoke'} size={25} />
                case 'exit':
                    return <MaterialCommunityIcons name="exit-run" color={'whitesmoke'} size={25} />
                    
                    }}
          const Modal = () => {
            switch (icon) {
                case 'score':
                    return <ScoreModal3 modalVisible={modalVisible} setModalVisible={setModalVisible} teeboxHoles={teeboxHoles} roundHoles={roundHoles} holeNumber={holeNumber} round={round} />
                case 'bar':
                    return <RoundModal modalVisible={modalVisible} setModalVisible={setModalVisible} round={round} />
                // case 'dot':
                //     return <PrevModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
                // case 'yrd':
                //     return <ImagesModal modalVisible={modalVisible} setModalVisible={setModalVisible} holeNumber={holeNumber}  green={false}/>
                // case 'green':
                //     return <ImagesModal modalVisible={modalVisible} setModalVisible={setModalVisible} holeNumber={holeNumber} green={true}/>
                case 'exit':
                    return <ExitModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
                    
                    }
                }

                
        return (
            
                <TouchableOpacity style={{flexDirection:'column', alignItems:'center'}} onPress={()=>setModalVisible(true)}>
                    <View style={{marginBottom:2}}>
                        {Icon()}
                        {modalVisible ? Modal() : ''}
                    </View>
                    <View>
                        <Text style={{color:'whitesmoke', fontSize:10}}>{title}</Text>
                    </View>
                </TouchableOpacity>
           
        )
    }

    const [height] = useState(new Animated.Value(0)); // Initialize height as 0
  const animationDuration = 300; // Animation duration in milliseconds
    const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    Animated.timing(height, {
      toValue: isVisible ? 55 : 0, // Target height: 60 when visible, 0 when hidden
      duration: animationDuration,
      useNativeDriver: false, // Set to false because height is a non-transform property
    }).start();
  }, [isVisible, height]);




    return(
        <View style={{width:'110%', flexDirection:'row'}}>
                <TouchableOpacity style={{ marginLeft:20, marginVertical:5,}} onPress={() => setIsVisible(!isVisible)}>
                   
                    {isVisible ?
                    <AntDesign name='caretcircleoup' color={'whitesmoke'} size={20} />
                    :
                    <Ionicons name='caret-down-circle-outline' color={'whitesmoke'} size={20} />
                }
                </TouchableOpacity>

                <Animated.View style={[styles.animatedView, { height,}, {}]}>
        {/* {OptionBtn2('Yard Book', 'yrd')}
        {OptionBtn2('GreensBook', 'green')} */}
        {OptionBtn2('Scorecard', 'score')}
        {OptionBtn2('RoundStats', 'bar')}
        
        
        {OptionBtn2('Exit Round', 'exit')}
    </Animated.View>
   
    </View>
    )
}

export default C3Options3;


const styles = StyleSheet.create({

    animatedView: {
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#111',
      width:'80%',
    //   paddingVertical: 10,
      overflow: 'hidden', // Ensure content doesn't overflow when height is 0
    },
    text: {
      color: '#fff',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      
      borderRadius: 20,
      padding:20, 
      backgroundColor:'#333',

      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginTop: 10
    },
    buttonCancel: {
      backgroundColor: 'salmon',
      width: 80
    },
    buttonSave: {
      backgroundColor: '#2196F3',
      width: 80
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    scoreLabel: {
      width:45,
      height:20,
    },
    scoreValues:{
      height:20,
      width:40,
      justifyContent:'center',
      alignItems:'center',
    },
    seperator:{
      height:1,
      backgroundColor:'#555'
    }
  });
  