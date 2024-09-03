import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert, Modal, Pressable, FlatList, Dimensions, Vibration, ImageBackground } from "react-native"
import { Stack, router, useLocalSearchParams, } from "expo-router";
import { getAllTeeboxHoles, saveFullRound, saveHoleStats } from "@/components/DataBase/API";
import { Marquee } from "@animatereactnative/marquee";
import PieChart from "react-native-pie-chart";
import * as Haptics from 'expo-haptics';
import { LinearGradient } from "expo-linear-gradient";
import { Scorecard } from "@/app/(myCourses)/(holes)/Holes";
import StatMarquee from "@/components/PlayComponents/StatMarque";
import { getRibbonImageSource } from "@/constants/Colors";
import StratTags from "@/components/PlayComponents/OGscreens/StratTags";
import { Entypo } from "@expo/vector-icons";
import UpdatePastHole from "@/components/PlayComponents/UpdatePastHole";
import VerticalBtns from "@/components/PlayComponents/VerticalShotBtns";
import VerticalCheckBoxes from "@/components/PlayComponents/VerticalCheckBoxes";

import { Hole, Round, Course, Teebox, HoleStats } from "@/components/DataBase/Classes";
import CurrentHoleInfoV1 from "@/components/PlayComponents/OGscreens/CurrentHoleV1";





// NEXT HOLE
/*
add round data to round
reset hole info
add 1 to hole number
pull and show next hole data //// auto?
*/

// UPDATE SHOTS
/*
setSHotData
*/


export default function SimpleCounter() {
  const params = useLocalSearchParams();
  const { courseID, courseName, teeID, girGoal, puttGoal, firGoal, strokeGoal } = params;
  const [isLoading, setIsLoading] = useState(true)
  const [teeboxHoles, setTeeboxHoles] = useState<Hole[]>([])
  const [currentHoleData, setCurrentHoleData] = useState<Hole>()
  const [holeNumber, setHoleNumber] = useState<number>(1)
  const [shotData, setShotData] = useState<{ [key: string]: number }>({
    pure: 0,
    good: 0,
    bad: 0,
    putt: 0,
  });
  const [allShotData, setAllShotData] = useState<{ [key: string]: number }>({
    pure: 0,
    good: 0,
    bad: 0,
    putt: 0,
  });
  const [gir, setGir] = useState<boolean>(false)
  const [fir, setFir] = useState<boolean>(false)


  const [modalVisible, setModalVisible] = useState(false);
  const [stratTagsVisible, setStratTagsVisible] = useState(false);
  const [stratTagId, setStratTagId] = useState('0');






  const [oldHoleStat, setOldHoleStat] = useState<HoleStats>();
  const [updateHoleVisible, setUpdateHoleVisible] = useState(false);
  const [editEnabled, setEditEnabled] = useState(false);

  const getCurrentHole = () => {
    const hole = teeboxHoles.find(hole => hole.num === holeNumber)
    if (hole)
    setCurrentHoleData(hole)
  }






//////////////////////////////////////////////          FIniSH            //////////////////////////////////////////////

const updateThisHolesData = (hole: HoleStats) =>
  {
    setOldHoleStat(hole);
    setUpdateHoleVisible(!updateHoleVisible);
  }

const saveUpdatedHole = (oldHoleData:HoleStats, newHoleData:HoleStats) => {
  round.subtractRoundHole(oldHoleData);
  round.updateRoundHole(newHoleData);
  
}


  /*                                      ^
                                          |
                                          |
  finish testing if the modal shows       |
  when save in child ---------------------  btn pressed 
  {
  minus- old hole data from round then
  call round.holes[holeNum] = newHoleStat
  close modal   setUpdateHoleVisible(!updateHoleVisible)
}


  */

//////////////////////////////////////////////          FIniSH            //////////////////////////////////////////////














  const getTotalShots = () => {
    return Object.values(shotData).reduce((total, value) => total + value, 0);
  };
  const addShot = (shotType: string) => {
    setShotData((prevData) => ({
      ...prevData,
      [shotType]: prevData[shotType] + 1,
    }));
    setAllShotData((prevData) => ({
      ...prevData,
      [shotType]: prevData[shotType] + 1,
    }));
  };

  const subtractShot = (shotType: string) => {
    setShotData((prevData) => ({
      ...prevData,
      [shotType]: Math.max(prevData[shotType] - 1, 0),
    }));
    setAllShotData((prevData) => ({
      ...prevData,
      [shotType]: Math.max(prevData[shotType] - 1, 0),
    }));
  };



  // const image = require('../../../assets/images/metal.png')


  const roundRef = useRef<Round>(new Round(Number(teeID)));
  const round = roundRef.current;






  const getHoles = async () => {
    const holeData = await getAllTeeboxHoles(Number(teeID))
    if (holeData) {
      setTeeboxHoles(holeData)
    }
  }

  useEffect(() => {
    getHoles();
    console.log('getting holes')
  }, [])
  useEffect(() => {
    setIsLoading(false);
    getCurrentHole();
  }, [teeboxHoles])

  useEffect(()=> getCurrentHole(),[holeNumber])


  const saveRoundAndHoleStats = async (round: Round) => {
    const hole = teeboxHoles.find(hole => hole.num === holeNumber)
    if (hole) {
      round.addRoundHole(hole, shotData.putt, shotData.pure, shotData.good, shotData.bad, gir, Number(stratTagId), fir);
    }
    try {
      const roundId: number = await saveFullRound(
        round.teebox_id,
        round.totalStrokes,
        round.totalPutts,
        round.great,
        round.good,
        round.bad,
        round.totalGIR,
        round.totalFIR,
        round.eaglesOless,
        round.birdies,
        round.pars,
        round.bogeys,
        round.doublePlus,
        round.toPar,
        round.toPar3,
        round.toPar4,
        round.toPar5,
        round.eighteen,
      );

      for (const key in round.holes) {
        const holeStat = round.holes[key];
        await saveHoleStats(
          holeStat.hole.id,
          roundId,
          holeStat.putts,
          holeStat.gir,
          holeStat.fir,
          holeStat.hole.par === 3 ? true : false, /// FIR_ELI
          holeStat.toPar,
          holeStat.strat ? holeStat.strat : 0 /// if no strat chosen
        );
      }
      console.log('All hole stats saved successfully');
      Alert.alert('Saved')
      router.dismissAll()

    } catch (error) {
      console.error('Error saving round and hole stats:', error);
    }
  };

  const resetForNewHole = (): void => {
    setShotData({
      strokes: 0,
      pure: 0,
      good: 0,
      bad: 0,
      putt: 0
    });
    setGir(false);
    setFir(false);
    setStratTagId('0')

  }

  const nextHole = () => {
    /// move onto next hole
    /// save data
    const hole = teeboxHoles.find(hole => hole.num === holeNumber)
    if (hole) {
      round.addRoundHole(hole, shotData.putt, shotData.pure, shotData.good, shotData.bad, gir, Number(stratTagId), fir);

    }
    /// prep for next hole
    resetForNewHole();
    setHoleNumber(holeNumber + 1);
  }

  const saveRound = () => {

  }

  

  const HoleInfoShadows = (text: string) => {
    const hole = teeboxHoles.find(hole => hole.num === holeNumber)
    let yardage = false
    if (text[0] === '2') {
      yardage = true
    }


    return (
      <View style={{
        marginRight: 10
      }}>



        <View style={styles.shadowView1}>
          <View style={styles.shadowView2}>

            <View style={styles.shadowView3}>
              <View style={styles.shadowView4}>


                {/* <View style={styles.shadowView5}> */}

                <LinearGradient colors={['#bbb', '#999', '#888']} style={{ borderRadius: 10, paddingHorizontal: 10 }}>


                  {
                    hole ?
                      <Text style={[styles.textShadow, styles.holeStatText]}>{text}</Text>
                      :
                      <Text style={{ fontStyle: 'italic', fontSize: 40 }}></Text>
                  }
                </LinearGradient>
              </View>
            </View>
          </View>
        </View>
      </View>
      // </View>
    )
  }

  const ShotBtns = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 25 }}>


        <View>


          <View style={[styles.shadowView1, { marginVertical: 10, marginHorizontal: 10, padding: 5 }]}><View style={styles.shadowView2}><View style={styles.shadowView3}><View style={styles.shadowView4}>

            <TouchableOpacity activeOpacity={0.5} style={styles.shotBtn} onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
              onPress={() => addShot('pure')}
              onLongPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft); subtractShot('pure') }}>
              <LinearGradient colors={['#bbb', '#999', '#888']} style={{ backgroundColor: '#555', borderRadius: 20, borderWidth: 1, borderTopColor: '#777', borderBottomColor: '#999', borderLeftColor: '#bbb', borderRightColor: '#888' }}>
                <View style={styles.centeredRow}>

                  <View style={[styles.BtnCountContainer, styles.pureBackground]}>
                    <Text style={styles.BtnCount} >{shotData.pure}</Text>
                  </View>

                  <Text style={[styles.BtnText, styles.pureText, styles.textShadow]}>Great</Text>

                </View>
              </LinearGradient>
            </TouchableOpacity>

          </View></View></View></View>









          <View style={[styles.shadowView1, { marginVertical: 10, marginHorizontal: 10, padding: 5 }]}><View style={styles.shadowView2}><View style={styles.shadowView3}><View style={styles.shadowView4}>



            <TouchableOpacity activeOpacity={0.8} style={styles.shotBtn} onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
              onPress={() => addShot('putt')}
              onLongPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft); subtractShot('putt') }}>

              <LinearGradient colors={['#bbb', '#999', '#888']} style={{ backgroundColor: '#555', borderRadius: 20, borderWidth: 1, borderTopColor: '#777', borderBottomColor: '#999', borderLeftColor: '#bbb', borderRightColor: '#888' }}>
                <View style={styles.centeredRow}>

                  <View style={[styles.BtnCountContainer, styles.puttBackground]}>
                    <Text style={styles.BtnCount} >{shotData.putt}</Text>
                  </View>

                  <Text style={[styles.BtnText, styles.puttText, styles.textShadow]}>Putt</Text>

                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View></View></View></View>

        </View>


        <View>

          <View style={[styles.shadowView1, { marginVertical: 10, marginHorizontal: 10, padding: 5 }]}><View style={styles.shadowView2}><View style={styles.shadowView3}><View style={styles.shadowView4}>


            <TouchableOpacity activeOpacity={0.8} style={styles.shotBtn} onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
              onPress={() => addShot('good')}
              onLongPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft); subtractShot('good') }}>
              <LinearGradient colors={['#bbb', '#999', '#888']} style={{ backgroundColor: '#555', borderRadius: 20, borderWidth: 1, borderTopColor: '#777', borderBottomColor: '#999', borderLeftColor: '#bbb', borderRightColor: '#888' }}>
                <View style={styles.centeredRow}>


                  <View style={[styles.BtnCountContainer, styles.goodBackground]}>
                    <Text style={styles.BtnCount} >{shotData.good}</Text>
                  </View>

                  <Text style={[styles.BtnText, styles.goodText, styles.textShadow]}>Good</Text>

                </View>
              </LinearGradient>
            </TouchableOpacity>

          </View></View></View></View>



          <View style={[styles.shadowView1, { marginVertical: 10, marginHorizontal: 10, padding: 5 }]}><View style={styles.shadowView2}><View style={styles.shadowView3}><View style={styles.shadowView4}>


            <TouchableOpacity activeOpacity={0.8} style={styles.shotBtn} onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
              onPress={() => addShot('bad')}
              onLongPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft); subtractShot('bad') }}>
              <LinearGradient colors={['#bbb', '#999', '#888']} style={{ backgroundColor: '#555', borderRadius: 20, borderWidth: 1, borderTopColor: '#777', borderBottomColor: '#999', borderLeftColor: '#bbb', borderRightColor: '#888' }}>

                <View style={styles.centeredRow}>

                  <View style={[styles.BtnCountContainer, styles.badBackground]}>
                    <Text style={styles.BtnCount} >{shotData.bad}</Text>
                  </View>

                  <Text style={[styles.BtnText, styles.badText, styles.textShadow]}>Bad</Text>

                </View>
              </LinearGradient>
            </TouchableOpacity>

          </View></View></View></View>






        </View>


      </View>

    )
  }

  const CheckBoxes = () => {
    const hole = teeboxHoles.find(hole => hole.num === holeNumber)

    const changeFIR = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setFir(!fir);
    }
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 20 }}>








        <View style={styles.shadowView1}><View style={styles.shadowView2}><View style={styles.shadowView3}><View style={styles.shadowView4}>
          <View style={{
            alignItems: 'center',
            backgroundColor: '#666', borderRadius: 20, borderWidth: 0.5, borderTopColor: '#bbb', borderBottomColor: '#999', borderLeftColor: '#bbb', borderRightColor: '#888'
          }}>
            <TouchableOpacity activeOpacity={0.6} style={{}} onPressIn={() => {
              hole?.par == 3 ? Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
              ) : changeFIR()
            }}>





              <View style={[{ width: 70, height: 70, backgroundColor: "#666", borderRadius: 15, alignItems: 'center', borderWidth: 3, }, hole?.par == 3 ? { borderColor: 'grey' } : fir ? { borderColor: 'yellowgreen' } : { borderColor: 'salmon' }]}>
                <Text style={[hole?.par == 3 ? styles.disabledColor : fir ? styles.goodText : styles.badText, { fontFamily: 'Arial' }]}>FIR</Text>
                <Text style={{ backgroundColor: 'grey', width: '100%', height: 2 }}> </Text>

                <Text style={[{ fontSize: 40, fontStyle: 'italic', fontFamily: 'Arial', }, hole?.par == 3 ? styles.disabledColor : fir ? styles.goodText : styles.badText]}>{fir ? 'V' : 'X'}</Text>

              </View>



            </TouchableOpacity>
          </View></View></View></View></View>







        <View style={styles.shadowView1}><View style={styles.shadowView2}><View style={styles.shadowView3}><View style={styles.shadowView4}>
          <View style={{
            alignItems: 'center',
            backgroundColor: '#666', borderRadius: 20, borderWidth: 0.5, borderTopColor: '#bbb', borderBottomColor: '#999', borderLeftColor: '#bbb', borderRightColor: '#888'
          }}>


            <TouchableOpacity activeOpacity={0.6} style={{}} onPressIn={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setGir(!gir) }}>
              <View style={[{ width: 70, height: 70, backgroundColor: "#666", borderRadius: 15, alignItems: 'center', borderWidth: 3, }, gir ? { borderColor: 'yellowgreen' } : { borderColor: 'salmon' }]}>
                <Text style={[gir ? styles.goodText : styles.badText, { fontFamily: 'Arial', }]}>GIR</Text>
                <Text style={{ backgroundColor: 'grey', width: '100%', height: 2 }}> </Text>

                <Text style={[{ fontSize: 40, fontStyle: 'italic', fontFamily: 'Arial', }, gir ? styles.goodText : styles.badText]}>{gir ? 'V' : 'X'}</Text>

              </View>
            </TouchableOpacity>
          </View></View></View></View></View>
        {/* <TouchableOpacity activeOpacity={0.6} style={{marginTop:5}} onPress={()=> ''} onLongPress={()=> ''}>
                <View style={[{width:70, height:70, backgroundColor: "#666", borderRadius:15,  alignItems:'center', borderWidth:3,}, shotData.putt <= 2 ? {borderColor:'yellowgreen'} : {borderColor:'salmon'}]}>
                    <Text style={shotData.putt <= 2 ? styles.goodText : styles.badText}>Putt</Text>
                    <Text style={{backgroundColor:'grey', width:'100%', height:2}}> </Text>
                    
                    <Text style={[{fontSize:40, fontStyle:'italic'}, shotData.putt <= 2 ? styles.goodText : styles.badText]}>{shotData.putt}</Text>

                </View>
            </TouchableOpacity> */}
      </View>
    )
  }

  const Score9 = (holes: Hole[], title: string) => {
    const holesPlayed = Object.keys(round.holes).length
    if (holesPlayed > 0) {
      return (
        <View style={{ backgroundColor: 'tan' }}>

          <View style={styles.scorecard}>
            <Text style={{ textAlign: 'center', fontFamily: 'Arial', fontSize: 17, fontStyle: 'italic' }}>{title}</Text>
            <View style={{ flexDirection: 'row', borderWidth: 0.5 }} >
              <View style={{ width: 50 }}>
                <Text style={styles.text}>Hole: </Text>
              </View>
              {holes.map(hole => (
                <View style={{ width: 36.25, borderLeftWidth: 0.5, borderRightWidth: 0.5, borderColor: 'grey', borderTopWidth: 0.5, backgroundColor: hole.num == holeNumber ? 'gold' : hole.num % 2 == 0 ? 'tan' : 'antiquewhite' }} key={hole.id}>
                  <Text style={styles.text}>{hole.num}</Text>
                </View>
              ))}

            </View>


            


            
            
          

            <View style={{ flexDirection: 'row', borderWidth: 0.5 }} >
              <View style={{ width: 50 }}>
                <Text style={[styles.text, { marginTop: 3 }]}>Par: </Text>
              </View>
              {holes.map(hole => (
                <View style={{ width: 36.25, height: 25, justifyContent: 'center', alignItems: 'center', borderLeftWidth: 0.5, borderBottomWidth: 0.5, borderRightWidth: 0.5, borderColor: 'grey', borderTopWidth: 0.5, backgroundColor: hole.num == holeNumber ? 'gold' : hole.num % 2 == 0 ? 'tan' : 'antiquewhite' }} key={hole.id}>
                  <Text style={[styles.text, { color: '#444' }]}>{hole.par}</Text>
                </View>
              ))}

            </View>

        


















            {/* Score Row */}
            <View style={{ flexDirection: 'row', borderWidth: 0.5 }}>
              <View style={{ width: 50 }}>
                <Text style={[styles.text, { marginLeft: 5, marginTop: 3 }]}>You: </Text>
              </View>
              {holes.map(hole => (
                <View
                  style={{
                    width: 36.25,
                    height: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderLeftWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderRightWidth: 0.5,
                    borderColor: 'grey',
                    borderTopWidth: 0.5,
                    backgroundColor: hole.num == holeNumber ? 'gold' : hole.num % 2 == 0 ? 'tan' : 'antiquewhite'
                  }}
                  key={hole.id}
                >
                  <Text style={[styles.text, { color: '#444' }]}>{round.holes[hole.num] ? Number(round.holes[hole.num]?.toPar) : '-'}</Text>
                </View>
              ))}
            </View>
            {/* Great Row */}
            <View style={{ flexDirection: 'row', borderWidth: 0.5 }}>
              <View style={{ width: 50 }}>
                <Text style={[styles.text, { marginTop: 3, fontSize: 14, }]}>Great: </Text>
              </View>
              {holes.map(hole => (
                <View
                  style={{
                    width: 36.25,
                    height: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderLeftWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderRightWidth: 0.5,
                    borderColor: 'grey',
                    borderTopWidth: 0.5,
                    backgroundColor: hole.num == holeNumber ? 'gold' : hole.num % 2 == 0 ? 'tan' : 'antiquewhite'
                  }}
                  key={hole.id}
                >
                  <View style={{ backgroundColor: '#444', borderRadius: 200, paddingHorizontal: 5 }}>
                    <Text style={[styles.text, { color: round.holes[hole.num]?.great ? 'skyblue' : 'grey' }]}>{round.holes[hole.num] ? Number(round.holes[hole.num]?.great) : '-'}</Text>
                  </View>
                </View>
              ))}
            </View>
            {/* Good Row */}
            <View style={{ flexDirection: 'row', borderWidth: 0.5 }}>
              <View style={{ width: 50 }}>
                <Text style={[styles.text, { marginTop: 3, fontSize: 14, }]}>Good: </Text>
              </View>
              {holes.map(hole => (
                <View
                  style={{
                    width: 36.25,
                    height: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderLeftWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderRightWidth: 0.5,
                    borderColor: 'grey',
                    borderTopWidth: 0.5,
                    backgroundColor: hole.num == holeNumber ? 'gold' : hole.num % 2 == 0 ? 'tan' : 'antiquewhite'
                  }}
                  key={hole.id}
                >
                  <View style={{ backgroundColor: '#444', borderRadius: 200, paddingHorizontal: 5 }}>
                    <Text style={[styles.text, { color: round.holes[hole.num]?.good ? 'yellowgreen' : 'grey' }]}>{round.holes[hole.num] ? Number(round.holes[hole.num]?.good) : '-'}</Text>
                  </View>
                </View>
              ))}
            </View>
            {/* Bad Row */}
            <View style={{ flexDirection: 'row', borderWidth: 0.5 }}>
              <View style={{ width: 50 }}>
                <Text style={[styles.text, { marginTop: 3, }]}>Bad: </Text>
              </View>
              {holes.map(hole => (
                <View
                  style={{
                    width: 36.25,
                    height: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderLeftWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderRightWidth: 0.5,
                    borderColor: 'grey',
                    borderTopWidth: 0.5,
                    backgroundColor: hole.num == holeNumber ? 'gold' : hole.num % 2 == 0 ? 'tan' : 'antiquewhite'
                  }}
                  key={hole.id}
                >
                  <View style={{ backgroundColor: '#444', borderRadius: 200, paddingHorizontal: 5 }}>
                    <Text style={[styles.text, { color: round.holes[hole.num]?.bad ? 'salmon' : 'grey' }]}>{round.holes[hole.num] ? Number(round.holes[hole.num]?.bad) : '-'}</Text>
                  </View>
                </View>
              ))}
            </View>
            {/* Puut Row */}
            <View style={{ flexDirection: 'row', borderWidth: 0.5 }}>
              <View style={{ width: 50 }}>
                <Text style={[styles.text, { marginTop: 3, }]}>Putts: </Text>
              </View>
              {holes.map(hole => (
                <View
                  style={{
                    width: 36.25,
                    height: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderLeftWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderRightWidth: 0.5,
                    borderColor: 'grey',
                    borderTopWidth: 0.5,
                    backgroundColor: hole.num == holeNumber ? 'gold' : hole.num % 2 == 0 ? 'tan' : 'antiquewhite'
                  }}
                  key={hole.id}
                >
                  <View style={{ backgroundColor: '#444', borderRadius: 200, paddingHorizontal: 5 }}>
                    <Text style={[styles.text, { color: round.holes[hole.num]?.putts ? round.holes[hole.num]?.putts >= 3 ? 'salmon' : 'gold' : 'grey' }]}>{round.holes[hole.num] ? Number(round.holes[hole.num]?.putts) : '-'}</Text>
                  </View>
                </View>
              ))}
            </View>
            

            {/* <View style={{ flexDirection: 'row', borderWidth: 0.5 }} >
                <View style={{ width: 50 }}>
                  <Text style={[styles.text, { marginTop: 3, }]}>Edit </Text>
                </View>
                {Object.entries(round.holes).map((hole,num) => (
                  <View
                    style={{
                      width: 36.25,
                      height: 25,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderLeftWidth: 0.5,
                      borderBottomWidth: 0.5,
                      borderRightWidth: 0.5,
                      borderColor: 'grey',
                      borderTopWidth: 0.5,
                      backgroundColor: num == holeNumber ? 'gold' : num % 2 == 0 ? 'tan' : 'antiquewhite'
                    }}
                    key={num}
                  >
                    <TouchableOpacity style={{ backgroundColor: '#444', borderRadius: 200, paddingHorizontal: 5 }} onPress={()=> updateThisHolesData(hole[1])}>
                      <Text>
                        <Entypo name="edit" size={10} color={'lightblue'} />
                        </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View > */}
         






        </View>
        </View >

      )
}
return;
  }


// const HoleInfo = () => {
//   const hole = teeboxHoles.find(hole => hole.num === holeNumber)
//   return (
//     <ImageBackground source={image}>
//       <View style={{ flexDirection: 'row', width: width }}>

//         {isLoading
//           ?
//           <Text>loading</Text>
//           :
//           <View style={{
//             flexDirection: 'column',
//             justifyContent: 'space-evenly',
//             flex: 1,

//             paddingLeft: 10
//           }}>
//             {HoleInfoShadows(`Hole ${hole?.num}`)}
//             {HoleInfoShadows(`Par ${hole?.par}`)}
//             {HoleInfoShadows(`${hole?.yardage}yrds`)}
//           </View>
//         }

//         <StatPieChart />
//       </View>
//     </ImageBackground>
//   )
// }


////////////////////////////////////// ADD IN EAGLESOBETTER AND DOUBLEPLUS ?///////////////////////////////////
const RoundStats = () => {

  return (

    <View style={{ width: width, backgroundColor: '#555', flexDirection: 'column' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 10 }}>
        <View style={{}}>
          <View style={styles.roundStatView}>
            <Text style={[styles.roundStatText, round.totalStrokes / Object.keys(round.holes).length <= 100 / 18 ? styles.goodText : styles.badText]}>Total Strokes: </Text>
            <Text style={[styles.roundStat, round.totalStrokes / Object.keys(round.holes).length <= 100 / 18 ? styles.goodText : styles.badText]}>{round.totalStrokes}</Text>
          </View>

          <View style={styles.roundStatView}>
            <Text style={[styles.roundStatText, round.totalStrokes / Object.keys(round.holes).length <= 100 / 18 ? styles.goodText : styles.badText]}>Score: </Text>
            <Text style={[styles.roundStat, round.totalStrokes / Object.keys(round.holes).length <= 100 / 18 ? styles.goodText : styles.badText]}>{round.toPar3 > 0 ? '+' : ''}{round.toPar}</Text>
          </View>



          <View style={styles.roundStatView}>
            <Text style={[styles.roundStatText, round.totalPutts / Object.keys(round.holes).length <= 40 / 18 ? styles.goodText : styles.badText]}>Total Putts: </Text>
            <Text style={[styles.roundStat, round.totalPutts / Object.keys(round.holes).length <= 40 / 18 ? styles.goodText : styles.badText]}>{round.totalPutts}</Text>
          </View>

        </View>
        <View style={{ paddingVertical: 0 }}>

          <View style={styles.roundStatView}>
            <Text style={[styles.roundStatText, round.bogeys / Object.keys(round.holes).length <= 15 / 18 ? styles.goodText : styles.badText]}>Pars: </Text>
            <Text style={[styles.roundStat, round.bogeys / Object.keys(round.holes).length <= 15 / 18 ? styles.goodText : styles.badText]}>{round.pars}</Text>
          </View>
          <View style={styles.roundStatView}>
            < Text style={[styles.roundStatText, styles.goodText]}>Birdies: </Text>
            <Text style={[styles.roundStat, styles.goodText]}>{round.birdies}</Text>
          </View>

          <View style={styles.roundStatView}>
            <Text style={[styles.roundStatText, round.bogeys / Object.keys(round.holes).length <= 15 / 18 ? styles.goodText : styles.badText]}>Bogeys: </Text>
            <Text style={[styles.roundStat, round.bogeys / Object.keys(round.holes).length <= 15 / 18 ? styles.goodText : styles.badText]}>{round.bogeys}</Text>

          </View>
        </View>
        <View style={{ paddingVertical: 0 }}>
          <View style={styles.roundStatView}>

            <Text style={[styles.roundStatText, round.toPar3 / Object.keys(round.holes).length <= 4 / Object.keys(round.holes).length ? styles.goodText : styles.badText]}>Par3's: </Text>
            <Text style={[styles.roundStat, round.totalStrokes / Object.keys(round.holes).length <= 100 / 18 ? styles.goodText : styles.badText]}>{round.toPar3 > 0 ? '+' : ''}{round.toPar3}</Text>

          </View>

          <View style={styles.roundStatView}>
            <Text style={[styles.roundStatText, round.toPar4 / Object.keys(round.holes).length <= 10 / Object.keys(round.holes).length ? styles.goodText : styles.badText]}>Par4's: </Text>
            <Text style={[styles.roundStat, round.toPar4 / Object.keys(round.holes).length <= 10 / Object.keys(round.holes).length ? styles.goodText : styles.badText]}>{round.toPar4 > 0 ? '+' : ''}{round.toPar4}</Text>

          </View>

          <View style={styles.roundStatView}>
            <Text style={[styles.roundStatText, round.toPar5 / Object.keys(round.holes).length <= 14 / Object.keys(round.holes).length ? styles.goodText : styles.badText]}>Par5's: </Text>
            <Text style={[styles.roundStat, round.toPar5 / Object.keys(round.holes).length <= 14 / Object.keys(round.holes).length ? styles.goodText : styles.badText]}>{round.toPar5 > 0 ? '+' : ''}{round.toPar5}</Text>

          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: 20 }}>
        <View style={[styles.roundStatView, { flexDirection: 'row' }]}>
          <Text style={styles.roundStatText}>Greens: </Text>
          <Text style={styles.roundStat}>{round.totalGIR}/{girGoal}</Text>

        </View>

        <View style={[styles.roundStatView, { flexDirection: 'row' }]}>
          <Text style={styles.roundStatText}>Fairways: </Text>
          <Text style={styles.roundStat}>{round.totalFIR}/{firGoal}</Text>

        </View>

      </View>

    </View>
  )
}










const { width } = Dimensions.get('window');

const views = [
  // { key: 'view1', component: <HoleInfo /> },
  { key: 'view1', component: <CurrentHoleInfoV1 teeboxHoles={teeboxHoles} round={round} holeNumber={holeNumber} shotData={shotData} allShotData={allShotData} /> },
  { key: 'view2', component: <RoundStats /> },
  { key: 'view3', component: Score9(teeboxHoles.slice(0, 9), 'Front Nine') },
  { key: 'view4', component: Score9(teeboxHoles.slice(9, 18), 'Back Nine') },
];

const Carousel = () => {
  const renderItem = ({ item }) => {
    return <View style={{}}>{item.component}</View>;
  };

  const onViewRef = useRef((viewableItems) => {
    // You can handle view change events here
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (


    <FlatList
      data={views}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      horizontal
      pagingEnabled
      snapToAlignment="center"
      showsHorizontalScrollIndicator={false}
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
    />

  );
};


const statTag = (id: string) => {
  switch (id) {
    case '0':
      return "None";
    case '1':
      return "Conservative";
    case '2':
      return "Aggressive";
    case '3':
      return "Pin Hunting";
    case '4':
      return 'Middle Green';
    case '5':
      return "Green in 1";
    case '6':
      return "Green in 2";
    case '7':
      return "Green in 3";
    case '8':
      return "No driver";
    case '9':
      return "Layup to fav club";
    default:
      return 'None'; // or some default value or error handling
  }
};

const exitAlert = () => {
  Alert.alert(
    "Exit Confirmation",
    "Are you sure you want to exit? \n This will delete all shot data.",
    [
      {
        text: "Cancel",
        
      },
      { text: "OK", onPress: () => router.dismissAll() }
    ],
    { cancelable: false }
  );
};



return (
  <>
    {isLoading ? (
      <View>
        <Text>Loading</Text>
      </View>
    ) : (
      <View style={styles.container}>
      <View style={{}}>
        <Stack.Screen
          options={{
            gestureEnabled: false,
            title: `${courseName}`,
            headerStyle: { backgroundColor: "#444" },
            headerTitleStyle: { color: 'whitesmoke', fontSize: 20, fontWeight: '800', fontFamily: 'Papyrus' },
            headerLeft: () => (
              // <Button title='Score' onPress={() => setModalVisible(!modalVisible)} />
              <TouchableOpacity onPress={()=> exitAlert()} >
                <Text style={{color:'salmon', }}>Exit</Text>
              </TouchableOpacity>


            ),

            headerRight: () => (

              Object.keys(round.holes).length == 17
                ?
                <Button title='Finish' onPress={() => saveRoundAndHoleStats(round)} />

                :
                <Button title='Next >' onPress={() => nextHole()} />

            ),
          }}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView, { backgroundColor: "antiquewhite" }]}>
              <Text style={styles.modalText}>Scorecard</Text>
              <View style={{ transform: 'scale(.95)' }}>
                {Scorecard(teeboxHoles)}
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

          {oldHoleStat
          ?
            <UpdatePastHole hole={oldHoleStat} updateHoleVisible={updateHoleVisible} setUpdateHoleVisible={setUpdateHoleVisible} saveUpdatedHole={saveUpdatedHole}  />
          :
          ''
          }

     

          <StatMarquee round={round} holeNumber={holeNumber} girGoal={Number(girGoal)} firGoal={Number(firGoal)} puttGoal={Number(puttGoal)} />
     

       

         

            <Carousel />
       


          {/* StratTag + Modal */}
          {teeboxHoles[holeNumber] ?
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#333', width: width, marginVertical:10 }}>
              <Text style={{color:'white'}}>Hole Strategy: </Text>
              <Button title={`${statTag(stratTagId)}`} onPress={() => setStratTagsVisible(!stratTagsVisible)} />
              <StratTags par={teeboxHoles[holeNumber-1].par} visible={stratTagsVisible} setVisible={setStratTagsVisible} holestrategy={stratTagId} setHoleStrategy={setStratTagId} />
            </View>
            : ''
          }

          <View style={{ backgroundColor: '#333', width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            {currentHoleData ?
            <VerticalCheckBoxes hole={currentHoleData} fir={fir} setFir={setFir} gir={gir} setGir={setGir} />
            
          :
          ''}
            <VerticalBtns addShot={addShot} subtractShot={subtractShot} shotData={shotData} />
        
        </View>
      </View>
      </View>
    )}
  </>
);
};



const styles = StyleSheet.create({
  container: {

    backgroundColor: "#333",
    // paddingTop:10,
    width: '100%',
    height: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
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
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Arial',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Arial',

  },

  pureText: { color: 'skyblue' },
  pureBackground: { backgroundColor: 'skyblue' },
  goodText: { color: 'yellowgreen' },
  goodBackground: { backgroundColor: 'yellowgreen' },
  badText: { color: 'salmon' },
  badBackground: { backgroundColor: 'salmon' },
  puttText: { color: '#E1CAB2' },
  puttBackground: { backgroundColor: '#E1CAB2' },

  disabledColor: { color: 'grey' },
  disabledBackgtound: { color: 'grey' },

  BtnCountContainer: {
    width: 50, paddingHorizontal: 10, paddingVertical: 10, borderBottomLeftRadius: 20, borderTopLeftRadius: 20,
    opacity: 0.8
  },
  BtnCountContainer2: {
    width: 75, paddingHorizontal: 10, paddingVertical: 8, borderBottomLeftRadius: 15, borderTopLeftRadius: 15,
    opacity: 0.8
  },
  BtnCount: {
    fontSize: 40,
    textAlign: 'center',
    marginLeft: 5,
    fontStyle: 'italic',
    fontWeight: '400',
    fontFamily: 'Arial',
  },
  shotBtn: {
    width: 155,
    // backgroundColor: '#999',
    borderRadius: 20,
    // borderWidth:1,
    // borderColor:"#777",

  },
  shotBtn2: {
    width: 225,
    marginVertical: 5,
  },
  BtnText: {
    textAlign: 'center',
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: '600',
    paddingHorizontal: 15,
    fontFamily: 'Arial',

  },
  BtnText2: {
    textAlign: 'center',
    fontSize: 40,
    fontStyle: 'italic',
    fontWeight: '600',
    paddingHorizontal: 15,
    fontFamily: 'Arial',

  },
  centeredRow: { flexDirection: 'row', alignItems: 'center', },

  shadowView1: {
    justifyContent: 'center', alignItems: 'center', shadowColor: '#ddd',
    shadowOffset: { width: -7, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  shadowView2: {
    justifyContent: 'center', alignItems: 'center', shadowColor: '#ccc',
    shadowOffset: { width: 5, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  shadowView3: {
    justifyContent: 'center', alignItems: 'center', shadowColor: '#444',
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },

  shadowView4: {
    justifyContent: 'center', alignItems: 'center', shadowColor: '#666',
    shadowOffset: { width: -7, height: 7 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  shadowView5: {
    alignItems: 'center',
    backgroundColor: '#b1b1b1', paddingHorizontal: 10, borderRadius: 20, borderWidth: 0.5, borderTopColor: '#bbb', borderBottomColor: '#999', borderLeftColor: '#bbb', borderRightColor: '#888'
  },

  textShadow: {
    shadowColor: '#555',
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: .7,
    shadowRadius: 1,
  },
  // textShadowMarquee: {
  //   shadowColor: '#222',
  //   shadowOffset: { width: 3, height: 2 },
  //   shadowOpacity: .7,
  //   shadowRadius: 2,
  // },

  holeStatText: { fontFamily: 'Arial', fontStyle: 'italic', fontSize: 30, color: '#222' },

  roundStatText: {
    fontFamily: 'Arial', fontStyle: 'italic', fontSize: 17, color: '#ddd', fontWeight: '500',
    shadowColor: '#222',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  roundStat: {
    fontStyle: 'italic', fontSize: 20, color: '#ddd', fontWeight: '800',
    shadowColor: '#222',
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: .7,
    shadowRadius: 1,
  },
  roundStatView: { justifyContent: 'center', alignItems: 'center' },


  scorecard: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  text: {
    textAlign: 'center', fontFamily: 'Arial', fontSize: 17, fontStyle: 'italic'
  },
  newHoleInfoText: {
    fontSize: 40,
    fontFamily: 'Arial',
    fontStyle: 'italic',
  }, 
  titleText: {
    color: 'white',
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '600',
    marginBottom: 5,
    marginRight: 2
  },

});