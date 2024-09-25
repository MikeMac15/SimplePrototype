import { getAllCourses,getAllCourseTeeboxes} from "@/components/DataBase/API";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput } from "react-native";
import { Picker } from "react-native-ui-lib";

import { MenuGradients, TeeColors, getRibbonImageSource } from "@/constants/Colors";
import { Course, CourseAndTees, Teebox } from "@/components/DataBase/Classes";
import { getMenuGradient, getRibbonImage } from "@/components/DataBase/localStorage";

import StackOptions from "@/constants/StackOptions";


export default function Play() {
  const [courses, setCourses] = useState<CourseAndTees[]>([]);
  const [courseID, setCourseID] = useState(-1);
  const [courseName, setCourseName] = useState('');
  const [teeID, setTeeID] = useState(-1);
  const [teeName, setTeeName] = useState('');
  const [chosenCourse, setChosenCourse] = useState<CourseAndTees|null>();
  const [gradient, setGradient] = useState('cool-guy');
  const [ribbonImage, setRibbonImage] = useState('proud-parent');

  const [roundType, setRoundType] = useState('');
  const [gir, setGIR] = useState('7');
  const [fir, setFIR] = useState('7');
  const [strokes, setStrokes] = useState('75');
  const [putts, setPutts] = useState('36');
  const [goodToGo, setGTG] = useState(false);

  const getPreferences = async () => {
    const value = await getMenuGradient();
    setGradient(value);
    const ribbonImgTag = await getRibbonImage();
    setRibbonImage(ribbonImgTag);
  };

  useEffect(() => {
    getPreferences();
  }, []);

  useEffect(() => {
    if (gir && fir && strokes && putts && teeName && courseName) {
      setGTG(true);
    }
  }, [gir, fir, strokes, putts, teeName, courseName]);

  const getCourses = async () => {
    const coursesData: Course[] = await getAllCourses();
    const coursesWithTeeboxes: CourseAndTees[] = await Promise.all(coursesData.map(async (course) => {
      const teeData: Teebox[] = await getAllCourseTeeboxes(course.id);
      return { ...course, teeboxes: teeData };
    }));
    setCourses(coursesWithTeeboxes);
  };

  const getCourseByID = (course_id: number) => {
    return courses.find((course) => course.id === course_id);
  };

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    if (courseID !== -1) {
      const selectedCourse = getCourseByID(courseID);
      if (selectedCourse) {
        setCourseName(selectedCourse.name);
        setChosenCourse(selectedCourse);
      }
    }
  }, [courseID]);

  useEffect(() => {
    if (teeID !== -1 && chosenCourse) {
      const tee = chosenCourse.teeboxes.find(tee => tee.id === teeID);
      if (tee) {
        setTeeName(tee.color2 > 0 ? `${TeeColors[tee.color1]}&${TeeColors[tee.color2]}` : TeeColors[tee.color1]);
      }
    }
  }, [teeID]);

  const ribbonSource = getRibbonImageSource(ribbonImage);

  const PlayBtn = () => (
    <TouchableOpacity
      disabled={!goodToGo}
      onPress={() => {
        if (!goodToGo) {
          Alert.alert('Set your goals for the round.', 'No goals + No prep = No progress', [{ text: 'OK' }]);
        } else {
          router.push({
            pathname: '/(play)/counterThree',
            params: {
              courseID: chosenCourse?.id,
              courseName,
              teeID,
              girGoal: gir,
              puttGoal: putts,
              firGoal: fir,
              strokeGoal: strokes,
            },
          });
        }
      }}
    >
      <LinearGradient
        colors={goodToGo ? ['yellowgreen', 'darkgreen'] : ['#4f4f4f', '#333']}
        style={[goodToGo ? styles.playBtn : styles.playBtnDisabled, { marginVertical: 20 }]}
      >
        <Text style={{ color: goodToGo ? 'whitesmoke' : '#888' }}>
          {goodToGo ? `Play ${chosenCourse?.name} ${teeName} tee's` : 'Play'}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

//   const JustPlayBtn = () => {
//     const JustPlay = async () => {
//       // Get Just Play course ID
//       const justPlayId: number | null = await getJustPlayCourse();
//       if (justPlayId) {
//         setCourseID(justPlayId);
//         //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//         // router.push({
//         //   pathname: '/(play)/counterThree',
//         //   params: {
//         //     courseID: chosenCourse?.id,
//         //     courseName,
//         //     teeID,
//         //     girGoal: gir,
//         //     puttGoal: putts,
//         //     firGoal: fir,
//         //     strokeGoal: strokes,
//         //   },
//         // });
//         //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//       }
//     }

//     return (
//       <View style={{ justifyContent: 'center', alignItems: 'center', }}>

//         <TouchableOpacity
//           onPress={() => {
//             // Use router.push for navigation
//             JustPlay();
//           }}
//         >
//           <LinearGradient
//             colors={['#4f4f4f', '#333']}
//             style={[styles.playBtn, { marginTop: 0 }]}
//           >
//             <Text style={{ color: 'whitesmoke' }}>
//               Just Play
//             </Text>
//           </LinearGradient>
//         </TouchableOpacity>


//         <Text style={{ color: 'whitesmoke', }}>
//           (non course-specific round)
//         </Text>

//       </View>
//     )
//   }
  const SkinsSetup = () => {
    const [players, setPlayers] = useState([
      { name: '', buyIn: '0', color: 'aqua' },
      { name: '', buyIn: '0', color: 'orange' },
      { name: '', buyIn: '0', color: 'violet' },
      { name: '', buyIn: '0', color: 'gold' },
      // { name: 'Mike', buyIn: '50', color: 'aqua' },
      // { name: 'Jamie', buyIn: '20', color: 'orange' },
      // { name: 'Kelsey', buyIn: '20', color: 'violet' },
      // { name: 'Grant', buyIn: '100', color: 'gold' },
    ]);
    const [playerCount, setPlayerCount] = useState(4);
    const [gameLength, setGameLength] = useState(18);
    const [serializedPlayers, setSerializedPlayers] = useState('');

    // Update serialized players when players or playerCount change
    useEffect(() => {
      const selectedPlayers = players.slice(0, playerCount);
      setSerializedPlayers(JSON.stringify(selectedPlayers));
    }, [players, playerCount]);
    
    const handlePlayerChange = (index: number, key: keyof typeof players[0], value: string | number) => {
      setPlayers((prevPlayers) => {
        const updatedPlayers = [...prevPlayers];
        updatedPlayers[index] = { ...updatedPlayers[index], [key]: value };
        return updatedPlayers;
      });
    };
    
    const SkinsPlayBtn = () => {
      return (
        <Link href={{
          pathname: '/(play)/skins',
          params: {
            players: serializedPlayers, // passing serialized players
            gameLength,
          },
        }}
        asChild>
          <TouchableOpacity style={[skinstyles.button, skinstyles.buttonSave, { marginTop: 20 }]}>
            <Text style={[skinstyles.textStyle, { color: '#111' }]}>Play Skins Match</Text>
          </TouchableOpacity>
        </Link>
      );
    };

    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>Skins Game</Text>
        <Text style={{ color: 'whitesmoke' }}>How many holes?</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          {[9, 18].map((count) => (
            <TouchableOpacity
              key={count}
              onPress={() => setGameLength(count)}
              style={{
                backgroundColor: gameLength === count ? 'yellowgreen' : '#333',
                padding: 10,
                margin: 5,
                borderRadius: 5,
              }}>
              <Text style={{ color: gameLength === count ? 'whitesmoke' : '#888' }}>{count}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <Text style={{ color: 'whitesmoke' }}>How many players?</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          {[2, 3, 4].map((count) => (
            <TouchableOpacity
              key={count}
              onPress={() => setPlayerCount(count)}
              style={{
                backgroundColor: playerCount === count ? 'yellowgreen' : '#333',
                padding: 10,
                margin: 5,
                borderRadius: 5,
              }}>
              <Text style={{ color: playerCount === count ? 'whitesmoke' : '#888' }}>{count}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {players.slice(0, playerCount).map((player, index) => (
          <View key={index} style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
              <Text style={{ color: player.color, marginRight: 5 }}>Player {index + 1}:</Text>
              <TextInput
                placeholder="Player Name"
                placeholderTextColor="#aaa"
                value={player.name}
                onChangeText={(text) => handlePlayerChange(index, 'name', text)}
                style={{ backgroundColor: '#555', color: 'whitesmoke', padding: 10, borderRadius: 5 }}
              />
              <Text style={{ marginLeft: 5, color: 'whitesmoke' }}>$</Text>
              <TextInput
                placeholder="Buy In"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                value={player.buyIn.toString()}
                onChangeText={(text) => handlePlayerChange(index, 'buyIn', parseFloat(text) || 0)}
                style={{ backgroundColor: '#555', color: 'whitesmoke', padding: 10, borderRadius: 5 }}
              />
            </View>
          </View>
        ))}
        {/* <SkinsPlayBtn /> */}
      </View>
    );
};








  const skinstyles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      width: '90%',
      margin: 20,
      backgroundColor: '#444',
      borderRadius: 20,
      padding: 35,
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
      backgroundColor: 'yellowgreen',
      
    },
    buttonIncomplete: {
      backgroundColor: '#888',
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
    textInputBox: {
      backgroundColor: '#ccc',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 20
    }
  });







  // const Goals = () => {
  //   return (

  //     <View>
  //       <Text style={styles.title}>Goals for this Round</Text>

  //       <View style={{ flexDirection: 'row' }}>

  //         {['Total Strokes', 'Total Putts'].map((goal, index) => (
  //           <LinearGradient key={index} colors={['#4f4f4f', '#333']} style={styles.inputTable} >
  //             <Text style={styles.inputTitle}>{goal}</Text>
  //             <TextInput
  //               style={styles.goalInput}
  //               onChangeText={goal === 'Total Strokes' ? setStrokes : setPutts}
  //               value={goal === 'Total Strokes' ? strokes : putts}
  //               placeholder={goal === 'Total Strokes' ? "75" : "36"}
  //               keyboardType="numeric"
  //             />
  //           </LinearGradient>
  //         ))}

  //       </View>


  //       <View style={{ flexDirection: 'row' }}>
  //         {["Green's In Reg", "Fwy's In Reg"].map((goal, index) => (
  //           <LinearGradient key={index} colors={['#4f4f4f', '#333']} style={styles.inputTable} >
  //             <Text style={styles.inputTitle}>{goal}</Text>
  //             <TextInput
  //               style={styles.goalInput}
  //               onChangeText={goal === 'GIR' ? setGIR : setFIR}
  //               value={goal === 'GIR' ? gir : fir}
  //               placeholder={goal === 'GIR' ? "9/18" : "7/14"}
  //               keyboardType="numeric"
  //             />
  //           </LinearGradient>
  //         ))}

  //       </View>
  //     </View>
  //   )

  // }




  const CourseTeeSelector = () => {
    return (<>
      <LinearGradient colors={['#4f4f4f', '#333']} style={styles.gradient}>
        <Picker
          label="What Course Are You Playing?"
          value={courseID}
          placeholder={courseName ? courseName : 'Select a Course'}
          onChange={value => setCourseID(Number(value))}
          labelColor={'whitesmoke'}
          labelStyle={{ fontSize: 16, textAlign: 'center' }}
          placeholderTextColor={"whitesmoke"}
          textAlign="center"
          color={'whitesmoke'}
          topBarProps={{ title: 'Course' }}>

          {courses.map((course) => (<Picker.Item key={course.id} label={course.name} value={course.id} />))}
        </Picker>
      </LinearGradient>

      <LinearGradient colors={['#4f4f4f', '#333']} style={[styles.gradient, styles.marginVertical]}>
        <Picker
          label="Teebox"
          value={teeID}
          placeholder={teeName ? teeName : 'Select a teebox'}
          onChange={value => setTeeID(Number(value))}
          labelColor={'whitesmoke'}
          labelStyle={{ fontSize: 16, textAlign: 'center' }}
          placeholderTextColor={"whitesmoke"}
          textAlign="center"
          color={'whitesmoke'}
          pickerModalProps={{ title: 'Teebox', height: 300 }}

        >
          {/* {chosenCourse?.teeboxes.map((tee) => (
            <Picker.Item key={tee.id} label={tee.color2 > 0 ? `${TeeColors[tee.color1]} & ${TeeColors[tee.color2]} combo` : TeeColors[tee.color1]} value={tee.id} />
          ))} */}
          {chosenCourse?.teeboxes?.map((tee) => (
  <Picker.Item key={tee.id} label={tee.color2 > 0 ? `${TeeColors[tee.color1]} & ${TeeColors[tee.color2]} combo` : TeeColors[tee.color1]} value={tee.id} />
))}

        </Picker>
      </LinearGradient>
    </>
    )
  }



  const RoundTypeBtn = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        {['Keep Stats', 'Skins/Match'].map((type, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setRoundType(type)}
            style={{
              backgroundColor: roundType === type ? 'yellowgreen' : '#333',
              padding: 10,
              margin: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: roundType === type ? '#222' : '#888' }}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  const RoundTypeSelector = () => {
    return (
      <LinearGradient colors={['#4f4f4f', '#333']} style={[styles.gradient, styles.marginVertical]}>
        <Text style={{ color: 'whitesmoke', textAlign: 'center' }}>Round Type</Text>
        <RoundTypeBtn />
      </LinearGradient>
    )
  }



  return (


    <LinearGradient colors={MenuGradients[gradient]} >
      <Stack.Screen options={StackOptions({ image: ribbonSource, imageTag: ribbonImage, title: 'Round Setup' })} />

      
        <View style={styles.container}>
          {/* <StackHeader image={ribbonSource} imageTag={`${ribbonImage}`} title="Round Setup" /> */}

          <RoundTypeSelector />

          {roundType === 'Keep Stats' &&
            <>
              <CourseTeeSelector />
              {/* <Goals /> */}

              <PlayBtn />
              {/* <JustPlayBtn /> */}
            </>
          }

          {roundType === 'Skins/Match' &&
            <>
            <SkinsSetup />
            
            </>
          }
        </View>


   
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#111',
    height: '100%',
    paddingHorizontal: 20,

    alignItems: 'center',
  },
  gradient: {
    backgroundColor: '#444',
    width: 300,
    borderRadius: 7,
    borderColor: '#333',
    borderWidth: 1,
    paddingVertical: 10,
  },
  marginVertical: {
    marginVertical: 20,
  },
  picker: {
    color: 'whitesmoke',
    textAlign: 'center',
    fontSize: 16,
  },
  placeholder: {
    color: 'whitesmoke',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    padding: 5,
    color: 'whitesmoke',
    textShadowColor: '#111',
    textShadowRadius: 3.5,
    textShadowOffset: { width: 1.25, height: 1.25 }
  },
  goalTable: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  inputTable: {
    display: 'flex',
    flexDirection: 'column',
    borderColor: '#333',
    borderRadius: 10,
    paddingVertical: 15,
    borderWidth: 1,
    width: 150,
    margin: 5
  },
  inputTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold',
    paddingBottom: 10,
    color: 'whitesmoke'
  },
  goalInput: {
    fontSize: 20,
    color: 'whitesmoke',
    textAlign: 'center'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  playBtn: {
    // backgroundColor: 'whitesmoke',
    borderRadius: 10,
    borderColor: '#333',
    borderWidth: 1.5,
    padding: 10,
  },
  playBtnDisabled: {
    backgroundColor: 'grey',
    opacity: 0.5,
    padding: 10,
  },
});