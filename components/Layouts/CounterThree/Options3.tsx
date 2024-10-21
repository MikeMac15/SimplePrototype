import { Alert, Animated, Button, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, Ionicons, MaterialCommunityIcons, Entypo, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Hole, HoleStats, Round } from "@/components/DataBase/Classes";
// import ScoreModal from "../CounterTwo/Buttons/Modals/ScoreModal";
import RoundModal from "../CounterTwo/Buttons/Modals/RoundModal";
import ExitModal from "../CounterTwo/Buttons/Modals/ExitModal";
import ScoreModal3 from "./ScoreModal3";
import HoleInsightsModal from "../CounterTwo/Buttons/Modals/HoleInsights";
import ShotTrackerModal from "@/components/Location/ShotTrackerModal";
import useTheme from "@/constants/Theme";
// import ImagesModal from "../CounterTwo/Buttons/Modals/ImagesModal";
interface OptionsProps {
  teeboxHoles: Hole[];
  roundHoles: { [num: number]: HoleStats };
  round: Round;
  holeNumber: number;
}

// Define a union type for valid modal keys
type IconType = 'score' | 'bar' | 'dot' | 'track' | 'exit';

const C3Options3: React.FC<OptionsProps> = ({ teeboxHoles, roundHoles, round, holeNumber }) => {
  const theme = useTheme();
  const [modalVisibility, setModalVisibility] = useState<{
    [key in IconType]: boolean;
  }>({
    score: false,
    bar: false,
    dot: false,
    track: false,
    exit: false,
  });
  
  const toggleModal = (icon: IconType) => {
    setModalVisibility((prev) => ({
      ...prev,
      [icon]: !prev[icon],
    }));
  };
  
  const OptionBtn2 = (title: string, icon: IconType) => {
    const Icon = () => {
      switch (icon) {
        case 'score':
          return <Entypo name="document" color={theme.color} size={25} />;
          case 'bar':
            return <Ionicons name="stats-chart-sharp" color={theme.color} size={25} />;
            case 'dot':
              return <AntDesign name="dotchart" color={theme.color} size={25} />;
              case 'track':
                return <MaterialIcons name="share-location" color={theme.color} size={25} />;
                case 'exit':
                  return <MaterialCommunityIcons name="exit-run" color={theme.color} size={25} />;
                }
              };
              
              const Modal = () => {
                switch (icon) {
                  case 'score':
                    return (
                      <ScoreModal3
                      modalVisible={modalVisibility[icon]}
                      setModalVisible={() => toggleModal(icon)}
                      teeboxHoles={teeboxHoles}
                      roundHoles={roundHoles}
                      holeNumber={holeNumber}
                      round={round}
                      />
                    );
                    case 'bar':
                      return <RoundModal modalVisible={modalVisibility[icon]} setModalVisible={() => toggleModal(icon)} round={round} />;
        case 'dot':
          return (
            <HoleInsightsModal
              modalVisible={modalVisibility[icon]}
              setModalVisible={() => toggleModal(icon)}
              holeID={teeboxHoles[holeNumber - 1].id}
              holePar={teeboxHoles[holeNumber - 1].par}
              holeNumber={teeboxHoles[holeNumber - 1].num}
            />
          );
        case 'track':
          return <ShotTrackerModal modalVisible={modalVisibility[icon]} setModalVisible={() => toggleModal(icon)} />;
        case 'exit':
          return <ExitModal modalVisible={modalVisibility[icon]} setModalVisible={() => toggleModal(icon)} />;
      }
    };

    return (
      <TouchableOpacity
        style={{ flexDirection: 'column', alignItems: 'center' }}
        onPress={() => toggleModal(icon)}
      >
        <View style={{ marginBottom: 2 }}>
          {Icon()}
          {modalVisibility[icon] ? Modal() : null}
        </View>
        <View>
          <Text style={{ color: theme.color, fontSize: 10 }}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // const [height] = useState(new Animated.Value(0)); // Initialize height as 0
  // const animationDuration = 300; // Animation duration in milliseconds
  // const [isVisible, setIsVisible] = useState(true);
  
  // useEffect(() => {
  //   Animated.timing(height, {
  //     toValue: isVisible ? 55 : 0, // Target height: 55 when visible, 0 when hidden
  //     duration: animationDuration,
  //     useNativeDriver: false, // Set to false because height is a non-transform property
  //   }).start();
  // }, [isVisible, height]);

  
  return (
    // <View style={{ width: '115%', flexDirection: 'row', alignItems: 'center' }}>
    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
      {/* <TouchableOpacity style={{ marginLeft: 20, marginVertical: 5 }} onPress={() => setIsVisible(!isVisible)}>
        {isVisible ? (
          <AntDesign name="caretcircleoup" color={'whitesmoke'} size={20} />
        ) : (
          <Ionicons name="caret-down-circle-outline" color={'whitesmoke'} size={20} />
        )}
      </TouchableOpacity> */}

      {/* <Animated.View style={[styles.animatedView, { height }]}> */}
      <View style={[styles.animatedView,{width:'100%'}]}>
        {/* {OptionBtn2('Track Shot', 'track')} */}
        {OptionBtn2('Scorecard', 'score')}
        {OptionBtn2('HoleHistory', 'dot')}
        {OptionBtn2('RoundStats', 'bar')}
        {OptionBtn2('Exit Round', 'exit')}
      </View>
      {/* </Animated.View> */}
    </View>
  );
};

export default C3Options3;


const styles = StyleSheet.create({

    animatedView: {
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
      // backgroundColor: '#111',
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
  