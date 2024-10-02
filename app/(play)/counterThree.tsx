import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Alert, Button, Dimensions, FlatList, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";

import { Hole, HoleStats, Round, ShotData } from "@/components/DataBase/Classes";
import { getAllTeeboxHoles, saveFullRound, saveHoleStats } from "@/components/DataBase/API";


import VerticalCheckBoxes from "@/components/PlayComponents/VerticalCheckBoxes";
import StatMarquee from "@/components/PlayComponents/StatMarque";
import C3Header3 from "@/components/Layouts/CounterThree/Header3";
import C3Options3 from "@/components/Layouts/CounterThree/Options3";
import VerticalBtns3 from "@/components/Layouts/CounterThree/VerticalShotBtns3";

import { getMenuGradient, getRibbonImage } from "@/components/DataBase/localStorage";
import { getRibbonImageSource, MenuGradients, TeeColors, teeTextColor } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

import { initialState, reducer, State, } from '@/components/DataBase/RoundReducer';
import StratTags from "@/components/PlayComponents/OGscreens/StratTags";
import SummaryModal from "@/components/RoundSummary/SummaryModal";
import useTheme from "@/constants/Theme";
import UpdatePrevScore from "@/components/UpdatePrevScore/UpdatePrevScore";
import { Feather } from "@expo/vector-icons";




/**
 * CounterThree component.
 * @component
 */
const CounterThree: React.FC = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const params = useLocalSearchParams();
  const { courseID, courseName, teeID, girGoal, puttGoal, firGoal, strokeGoal } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [teeboxHoles, setTeeboxHoles] = useState<Hole[]>([]);
  const [currentHoleData, setCurrentHoleData] = useState<Hole>();
  const [holeNumber, setHoleNumber] = useState<number>(1);
  const [summaryModal, setSummaryModal] = useState(false);

  const [gradient, setGradient] = useState('OG-Dark');
  const [ribbonImage, setRibbonImage] = useState('proud-parent');
  const getPreferences = useCallback(async () => {
    try {
      const [value, ribbonImgTag] = await Promise.all([getMenuGradient(), getRibbonImage()]);
      setGradient(value);
      setRibbonImage(ribbonImgTag);
    } catch (error) {
      console.error('Failed to fetch preferences:', error);
    }
  }, []);
  useEffect(() => {
    getPreferences();
  }, [getPreferences]);
  const image = useMemo(() => getRibbonImageSource(ribbonImage), [ribbonImage]);




  const [currentRound, setCurrentRound] = useState<Round>(new Round(Number(teeID)));


  const addRoundHole = (hole: Hole, putts: number, great: number, good: number, bad: number, gir: boolean, strat: number, fir: boolean) => {
    setCurrentRound(currentRound.addRoundHole(hole, putts, great, good, bad, gir, strat, fir));

  };

  const updateRoundHole = (newHoleData: HoleStats) => {
    console.log('Updating round hole:', newHoleData);
    setCurrentRound(prevRound => {
      // Create a new updated round object
      const updatedRound = prevRound.updateRoundHole(newHoleData);
      return updatedRound; // Return the new round object
    });
  };







  // const roundRef = useRef<Round>(new Round(Number(teeID)));
  // roundRef.current.date = new Date().toLocaleDateString();
  // const [shotColors, setShotColors] = useState<string[]>([]);
  const theme = useTheme();
  const getTotalShots = () => {
    // return Object.values(shotData).reduce((total, value) => total + value, 0);
    return Object.values(state.shotData).reduce((total: number, value: any) => total + value, 0);

  };

  ////////////////////////////////////////// SetUp ////////////////////////////////////
  const getCurrentHole = () => {
    const hole = teeboxHoles.find(hole => hole.num === holeNumber);
    if (hole) {
      setCurrentHoleData(hole);
    } else {
      console.error('Current hole not found');
    }
  };

  useEffect(() => {
    const fetchHoles = async () => {
      try {
        setIsLoading(true);
        const holeData = await getAllTeeboxHoles(Number(teeID));
        if (holeData) {
          setTeeboxHoles(holeData);
        } else {
          console.error('No hole data found');
        }
      } catch (error) {
        console.error('Error fetching holes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHoles();
  }, [teeID]);

  const [updateHole, setUpdateHole] = useState(false);

  useEffect(() => {
    if (teeboxHoles.length > 0) {
      setIsLoading(true);
      getCurrentHole();
      setIsLoading(false);
    }
    if (holeNumber in currentRound.holes) {
      const holeStats = currentRound.holes[holeNumber];
      loadHoleStatsIntoState(holeStats);
      setUpdateHole(true);
    } else {
      resetForNewHole();
      setUpdateHole(false);
    }
  }, [currentRound, teeboxHoles, holeNumber]);
  ////////////////////////////////////////// Save Data ////////////////////////////////////
  const saveRoundAndHoleStats = async (round: Round) => {
    try {
      await round.saveRoundAndHoleStats();
      Alert.alert('Saved')
      setSummaryModal(true);
    } catch (error) {
      console.error('Error saving round and hole stats:', error);
    }
  };

  // const nextHole = () => {
  //   if (currentHoleData){
  //     addRoundHole(currentHoleData, state.shotData.putt, state.shotData.great, state.shotData.good, state.shotData.bad, state.gir, Number(strategy), state.fir);
  //     resetForNewHole();
  //     setHoleNumber(holeNumber + 1);
  //   }
  // }
  const lastHole = () => {
    if (currentHoleData) {
      const updatedRound = currentRound.addRoundHole(
        currentHoleData,
        state.shotData.putt,
        state.shotData.great,
        state.shotData.good,
        state.shotData.bad,
        state.gir,
        Number(strategy),
        state.fir
      );
      setCurrentRound(updatedRound);
      setTimeout(() => {
        saveRoundAndHoleStats(updatedRound);
      }, 500);
    }
  }
  ////////////////////////////////////////// Shot Data ////////////////////////////////////
  const resetForNewHole = (): void => {
    dispatch({ type: 'RESET' });
    setStrategy('0');
  }

  const getAllShotData = () => {
    return {
      putt: currentRound.totalPutts,
      great: currentRound.great,
      good: currentRound.good,
      bad: currentRound.bad,
    };
  };
  const addShot = (shotType: keyof ShotData) => {
    dispatch({ type: 'ADD_SHOT', shotType });
  };
  const subtractShot = (shotType: keyof ShotData) => {
    dispatch({ type: 'SUBTRACT_SHOT', shotType });
  };
  const setGir = (value: boolean) => {
    dispatch({ type: 'SET_GIR', value });
  };
  const setFir = (value: boolean) => {
    dispatch({ type: 'SET_FIR', value });
  };
  const addShotColor = (color: string) => {
    dispatch({ type: 'ADD_SHOT_COLOR', color });
  };

  const subShotColor = (color: string) => {
    dispatch({ type: 'SUB_SHOT_COLOR', color });
  };

  ///////////////////////////////////////////////////////Strats///////////////////////////////////////////////////////
  const [strategy, setStrategy] = useState('0');
  const [showStrat, setShowStrat] = useState(false);

  const WhatStrat: { [key: string]: string } = {
    '0': 'No Strategy',
    '1': 'Conservative',
    '2': 'Aggressive',
    '3': 'Pin Hunting',
    '4': 'Middle green',
    '5': 'Green in 1',
    '6': 'Green in 2',
    '7': 'Green in 3',
    '8': 'No driver',
    '9': 'Layup to fav club',
  };


  const StackScreen = () => {
    return (
      <Stack.Screen
        options={{
          gestureEnabled: false,
          title: `${courseName}`,
          headerBackVisible: false,
          headerBackground: () => (
            <ImageBackground
              source={image}
              style={[StyleSheet.absoluteFill, { width: '100%', height: '99.9%' }]}
            />
          ),
          headerTitleStyle: { color: "whitesmoke", fontSize: 25, fontWeight: 'bold', fontFamily: 'Papyrus' },

          headerBlurEffect: 'systemUltraThinMaterialDark',
        }}
      />)
  };

  ////////////////////////////////////////// Main View ////////////////////////////////////
  const Marquee = useMemo(() => (
    <StatMarquee
      round={currentRound}
      holeNumber={holeNumber}
      girGoal={Number(girGoal)}
      firGoal={Number(firGoal)}
      puttGoal={Number(puttGoal)}
    />), [holeNumber, girGoal, firGoal, puttGoal, currentRound]);

  const memoizedC3Options = useMemo(() => (
    <C3Options3
      teeboxHoles={teeboxHoles}
      roundHoles={currentRound.holes}
      round={currentRound}
      holeNumber={holeNumber}
    />
  ), [teeboxHoles, holeNumber, currentRound]);
  ///////////////////////////////////////////////////////Create Own Folder When Finished///////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////Carousel///////////////////////////////////////////////////////



  // const views = [

  //   // { key: 'view1', component: <Insights holeNum={1} par={4} /> },
  //   // { key: 'view2', component: <MainView /> },
  //   { key: 'view1', component: <MainView /> },
  //   { key: 'view2', component: <Insights holeNum={1} par={4} /> },

  // ];

  // const Carousel = () => {
  //   const renderItem = ({ item }: { item: { key: string, component: JSX.Element } }) => {
  //     return <View style={{width:width}}>{item.component}</View>;
  //   };

  //   const onViewRef = useRef(() => {
  //     // You can handle view change events here
  //   });

  //   const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  //   return (


  //     <FlatList
  //       data={views}
  //       renderItem={renderItem}
  //       keyExtractor={(item) => item.key}
  //       horizontal
  //       pagingEnabled
  //       snapToAlignment="center"
  //       showsHorizontalScrollIndicator={false}
  //       onViewableItemsChanged={onViewRef.current}
  //       viewabilityConfig={viewConfigRef.current}
  //     />

  //   );
  // }; 

  const previousHole = () => {
    if (holeNumber > 1) {
      setHoleNumber(holeNumber - 1);
      const previousHoleStats = currentRound.holes[holeNumber];
      if (previousHoleStats) {
        loadHoleStatsIntoState(previousHoleStats); // Function to load the stats back into your form
      }
    }
  };

  const nextHole = () => {
    if (currentHoleData?.num === Object.keys(currentRound.holes).length + 1) {
      addRoundHole(currentHoleData, state.shotData.putt, state.shotData.great, state.shotData.good, state.shotData.bad, state.gir, Number(strategy), state.fir);
      resetForNewHole();
      setHoleNumber(holeNumber + 1);
    } else {
      setHoleNumber(holeNumber + 1);
      const nextHoleStats = currentRound.holes[holeNumber];
      if (nextHoleStats) {
        loadHoleStatsIntoState(nextHoleStats);
      }
    }
  }

  const loadHoleStatsIntoState = (prevHoleStats: HoleStats) => {
    dispatch({ type: 'SET_SHOT_COUNT', shotType: 'great', count: prevHoleStats.great });
    dispatch({ type: 'SET_SHOT_COUNT', shotType: 'good', count: prevHoleStats.good });
    dispatch({ type: 'SET_SHOT_COUNT', shotType: 'bad', count: prevHoleStats.bad });
    dispatch({ type: 'SET_SHOT_COUNT', shotType: 'putt', count: prevHoleStats.putts });
    dispatch({ type: 'SET_GIR', value: prevHoleStats.gir });
    dispatch({ type: 'SET_FIR', value: prevHoleStats.fir });
    setStrategy(String(prevHoleStats.strat));
  };

  const DataColView = ({ title, data, color }: { title?: string, data: string, color: string }) => {
    return (
      <View style={{ margin: 5, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#333', borderRadius: 10, borderWidth: 2, borderColor: color }}>
        {title && <Text style={{ color: theme.color, fontSize: 14, fontStyle: 'italic' }}>{title}</Text>}
        <Text style={{ color: theme.color, fontSize: data.length < 12 ? 22 : 18, fontWeight: 'bold', fontStyle: 'italic' }}>{data}</Text>
      </View>
    )
  }

  const ShowOldData = () => {

    const [showModal, setShowModal] = useState(false);

    const total = state.shotData.great + state.shotData.good + state.shotData.bad + state.shotData.putt
    if (!currentHoleData) {
      return <Text>No data</Text>
    }

    const getScoreString = () => {
      const toPar = total - currentHoleData.par;
      switch (toPar) {
        case -2:
          return 'Eagle';
        case -1:
          return 'Birdie';
        case 0:
          return 'Par';
        case 1:
          return 'Bogey';
        case 2:
          return 'Double Bogey';
        case 3:
          return 'Triple Bogey';
        case 4:
          return 'Monster Bogey';
        default:
          return 'Monster Bogey';

      }
    };

    return (
      <View style={{ alignItems: 'center', marginTop: 0 }}>
        <UpdatePrevScore hole={holeNumber} updateRoundHole={updateRoundHole} modalVisible={showModal} setModalVisible={setShowModal} state={state} currentHoleData={currentHoleData} />
        <View style={{ flexDirection: 'row' }}>
          <DataColView title='Strokes' data={total.toString()} color={'#111'} />
          <DataColView data={getScoreString()} color={'#111'} />
          <DataColView title='To Par' data={(total - currentHoleData.par).toString()} color={'#111'} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
              <Text style={{ fontSize: 18, color: state.fir ? 'yellowgreen' : 'salmon' }}>Fairway In Reg</Text>
              <Text style={{ fontSize: 26, color: state.fir ? 'yellowgreen' : 'salmon' }}>{state.fir ? 'Yes' : 'No'}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
              <Text style={{ fontSize: 18, color: state.gir ? 'yellowgreen' : 'salmon' }}>Green In Reg</Text>
              <Text style={{ fontSize: 26, color: state.gir ? 'yellowgreen' : 'salmon' }}>{state.gir ? 'Yes' : 'No'}</Text>
            </View>
            {/* <DataColView title='GIR' data={state.gir ? 'Yes' : 'No'} color={state.gir ? 'yellowgreen' : 'salmon'} />
            <DataColView title='FIR' data={state.fir ? 'Yes' : 'No'} color={state.fir ? 'yellowgreen' : 'salmon'} /> */}
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

              <Text style={{ color: 'skyblue', fontSize: 34 }}>{state.shotData.great}</Text>
              <Text style={{ color: 'skyblue', fontSize: 16, marginHorizontal: 8 }}>x</Text>
              <Text style={{ color: 'skyblue', fontSize: 34 }}>Great</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

              <Text style={{ color: 'yellowgreen', fontSize: 34 }}>{state.shotData.good}</Text>
              <Text style={{ color: 'yellowgreen', fontSize: 16, marginHorizontal: 8 }}>x</Text>
              <Text style={{ color: 'yellowgreen', fontSize: 34 }}>Good</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

              <Text style={{ color: 'salmon', fontSize: 34 }}>{state.shotData.bad}</Text>
              <Text style={{ color: 'salmon', fontSize: 16, marginHorizontal: 8 }}>x</Text>
              <Text style={{ color: 'salmon', fontSize: 34 }}>Bad</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

              <Text style={{ color: 'tan', fontSize: 34 }}>{state.shotData.putt}</Text>
              <Text style={{ color: 'tan', fontSize: 16, marginHorizontal: 8 }}>x</Text>
              <Text style={{ color: 'tan', fontSize: 34 }}>Putts</Text>

            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => { setShowModal(!showModal); }} style={{ backgroundColor: '#007AFF', borderRadius: 10, padding: 5, marginTop: 20 }}>
          <Text style={{ color: theme.color, fontSize: 20, textAlign: 'center' }}>Update Hole Data</Text>
        </TouchableOpacity>

        {/* <DataColView title='Great' data={(state.shotData.great).toString()} color={'skyblue'}/>
          <DataColView title='Good' data={(state.shotData.good).toString()} color={'yellowgreen'}/>
          <DataColView title='Bad' data={(state.shotData.bad).toString()} color={'salmon'}/>
        <DataColView title='Putts' data={(state.shotData.putt).toString()} color={'tan'}/> */}
      </View>
    )
  }


  const HoleNavigation = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, marginHorizontal: 20 }}>

        <TouchableOpacity onPress={previousHole} disabled={holeNumber === 1}>
          <LinearGradient colors={['#454545', '#2d2d2d']} style={[styles.holeNav,{borderColor:'rgba(20,20,20,0.25)', borderWidth:2}]}>
            <Feather name="chevron-left" size={24} color="whitesmoke" />
            <Text style={{ color: 'whitesmoke', fontSize: 20, marginRight:10 }}> Hole {holeNumber - 1}</Text>
          </LinearGradient>
        </TouchableOpacity>


        <Text style={{ color: 'whitesmoke' }}>Hole {holeNumber}</Text>
        {holeNumber < teeboxHoles.length
          ?
          <TouchableOpacity onPress={() => nextHole()} >
            <LinearGradient colors={['#454545', '#2d2d2d']} style={[styles.holeNav,{borderColor:'rgba(20,20,20,0.25)', borderWidth:1}]}>

              <Text style={{ color: 'whitesmoke', fontSize: 20, marginLeft:10 }}>Hole {holeNumber + 1}</Text>
              <Feather name="chevron-right" size={24} color="whitesmoke" />
            </LinearGradient>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => lastHole()}>
            <LinearGradient colors={['#454545', '#333']} style={[styles.holeNav,{borderColor:'rgba(150,150,150,0.15)', borderWidth:1}]}>
              <Text style={{ color: 'whitesmoke', fontSize: 20 }}>Finish Round</Text>
            </LinearGradient>
          </TouchableOpacity>
        }
      </View>
    );
  };
  ///////////////////////////////////////////////////////Return///////////////////////////////////////////////////////


  return (
    <>
      {/* <StackHeader image={image} imageTag={ribbonImage} title={`${courseName}`} roundRef={currentRound} lastHole={lastHole} nextHole={nextHole} teeboxHoles={teeboxHoles} /> */}
      <StackScreen />
      {summaryModal &&
        <SummaryModal round={currentRound} course={String(courseName)} tee={TeeColors[Number(teeID)]} />
      }
      <LinearGradient colors={MenuGradients[gradient]} style={{ flex: 1 }}>
        {currentHoleData && <View style={{ height: 5, backgroundColor: `${teeTextColor(currentHoleData.color)}` }} />}
        {Marquee}
        {isLoading || !teeboxHoles.length || !currentHoleData
          ? <Text>Loading...</Text>
          :
          <>
            <View style={{ height: '100%', justifyContent: 'flex-start', marginTop: 5 }}>
              {currentHoleData && (
                <View>
                  <C3Header3
                    courseName={''}
                    holeData={currentHoleData}
                    shotColors={state.shotColors}
                    getTotalShots={getTotalShots}
                    shotData={state.shotData}
                    allShotData={getAllShotData()}
                  />
                </View>
              )}
              {teeboxHoles && memoizedC3Options}

              <HoleNavigation />
              {updateHole
                ?
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                  <ShowOldData />

                </View>

                :

                <View style={{ justifyContent: 'center' }}>
                  <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => setShowStrat(true)} style={{ width: 100, backgroundColor: 'rgba(50,50,50,.15)', borderRadius: 10, padding: 5 }}>
                        <Text style={{ color: theme.color, fontSize: 16, textAlign: 'center' }}>Strategy:</Text>
                        <Text
                          numberOfLines={1} // Ensures single-line text
                          ellipsizeMode="tail" // Truncate text at the end
                          style={{ color: theme.color, fontSize: 16, textAlign: 'center' }}
                        >
                          {WhatStrat[strategy]}
                        </Text>
                      </TouchableOpacity>
                      <StratTags par={currentHoleData.par} setHoleStrategy={setStrategy} holestrategy={strategy} setVisible={setShowStrat} visible={showStrat} />

                      <VerticalCheckBoxes
                        hole={currentHoleData}
                        gir={state.gir}
                        setGir={setGir}
                        fir={state.fir}
                        setFir={setFir}
                      />
                    </View>
                    <VerticalBtns3
                      addShot={addShot}
                      subtractShot={subtractShot}
                      shotData={state.shotData}
                      addShotColor={addShotColor}
                      subShotColor={subShotColor}
                    />
                  </View>
                </View>

              }

            </View>
          </>
        }
      </LinearGradient>
    </>
  );

};

export default CounterThree;

const styles = StyleSheet.create({
  holeNav: {
    backgroundColor: '#3a3a3a',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: '#fff',
  
  },
});