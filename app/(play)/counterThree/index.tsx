import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Alert, Button, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";

import { Hole, Round, ShotData } from "@/components/DataBase/Classes";
import { getAllTeeboxHoles, saveFullRound, saveHoleStats } from "@/components/DataBase/API";


import VerticalCheckBoxes from "@/components/PlayComponents/VerticalCheckBoxes";
import StatMarquee from "@/components/PlayComponents/StatMarque";
import C3Header3 from "@/components/Layouts/CounterThree/Header3";
import C3Options3 from "@/components/Layouts/CounterThree/Options3";
import VerticalBtns3 from "@/components/Layouts/CounterThree/VerticalShotBtns3";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import StackHeader from "@/constants/StackHeader";
import { getMenuGradient, getRibbonImage } from "@/components/DataBase/localStorage";
import { getRibbonImageSource, MenuGradients } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

import { initialState, reducer, } from '@/components/DataBase/RoundReducer';




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










  
  const roundRef = useRef<Round>(new Round(Number(teeID)));
  
  // const [shotColors, setShotColors] = useState<string[]>([]);
  
  const getTotalShots = () => {
    // return Object.values(shotData).reduce((total, value) => total + value, 0);
    return Object.values(state.shotData).reduce((total: number, value:any) => total + value, 0);

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
  
  useEffect(() => {
    if (teeboxHoles.length > 0) {
      setIsLoading(true);
      getCurrentHole();
      setIsLoading(false);
    }
  }, [teeboxHoles, holeNumber]);
  ////////////////////////////////////////// Save Data ////////////////////////////////////
  const saveRoundAndHoleStats = async (round: Round) => {
    try {
      await round.saveRoundAndHoleStats();
      Alert.alert('Saved')
      router.dismissAll()
    } catch (error) {
      console.error('Error saving round and hole stats:', error);
    }
  };
  const addRoundHole = () => {
    console.log('Adding round hole');
    console.log('State:', state);

    const hole = teeboxHoles.find(hole => hole.num === holeNumber)
    if (hole) {
      roundRef.current.addRoundHole(hole, state.shotData.putt, state.shotData.great, state.shotData.good, state.shotData.bad, state.gir, 0, state.fir);
    }
  }
  const nextHole = () => {
    addRoundHole();
    resetForNewHole();
    setHoleNumber(holeNumber + 1);
  }
  const lastHole = () => {
    addRoundHole();
    saveRoundAndHoleStats(roundRef.current);
  }
  ////////////////////////////////////////// Shot Data ////////////////////////////////////
  const resetForNewHole = (): void => {
    dispatch({ type: 'RESET' });
  }

  const getAllShotData = () => {
    return {
      putt: roundRef.current.totalPutts,
      great: roundRef.current.great,
      good: roundRef.current.good,
      bad: roundRef.current.bad,
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

  const StackScreen = () => {
    return (
      <Stack.Screen
        options={{
          gestureEnabled: false,
          title: `${courseName}`,
          headerStyle: { backgroundColor: "#444" },
          headerTitleStyle: { color: 'whitesmoke', fontSize: 20, fontWeight: '800', fontFamily: 'Papyrus' },
          headerLeft: () => (
            <TouchableOpacity onPress={() => exitAlert()} >
              <Text style={{ color: 'salmon', }}>Exit</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            Object.keys(roundRef.current.holes).length == 17
              ? <Button title='Finish' onPress={() => lastHole()} />
              : <Button title='Next >' onPress={() => nextHole()} />
            ),
          }}
          />
        );
      };

  ////////////////////////////////////////// Main View ////////////////////////////////////
  const Marquee = useMemo(() => (
    <StatMarquee
          round={roundRef.current}
          holeNumber={holeNumber}
          girGoal={Number(girGoal)}
          firGoal={Number(firGoal)}
          puttGoal={Number(puttGoal)}
        />), [holeNumber, girGoal, firGoal, puttGoal]);

  const memoizedC3Options = useMemo(() => (
    <C3Options3
      teeboxHoles={teeboxHoles}
      roundHoles={roundRef.current.holes}
      round={roundRef.current}
      holeNumber={holeNumber}
    />
  ), [teeboxHoles]);

  const MainView = () => {
    if (isLoading) {
      return <Text>Loading...</Text>;
    }
  
    if (!teeboxHoles.length || !currentHoleData) {
      return <Text>No hole data available.</Text>;
    }
  
    return (
      <View style={{}}>
        {/* <StatMarquee
          round={roundRef.current}
          holeNumber={holeNumber}
          girGoal={Number(girGoal)}
          firGoal={Number(firGoal)}
          puttGoal={Number(puttGoal)}
        /> */}
        
      <View style={{  height:'100%', justifyContent:'flex-start', marginTop:10}}>
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
        <View style={{height:'50%', justifyContent:'center'}}>
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <VerticalCheckBoxes
            hole={currentHoleData}
            gir={state.gir}
            setGir={setGir}
            fir={state.fir}
            setFir={setFir}
          />
          <VerticalBtns3
            addShot={addShot}
            subtractShot={subtractShot}
            shotData={state.shotData}
            addShotColor={addShotColor}
            subShotColor={subShotColor}
          />
        </View>
        </View>
      </View>
      </View>
    );
  };





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


///////////////////////////////////////////////////////Addititon///////////////////////////////////////////////////////


return (
  <>
    <StackHeader image={image} imageTag={ribbonImage} title={`${courseName}`} roundRef={roundRef} lastHole={lastHole} nextHole={nextHole} teeboxHoles={teeboxHoles}/>
  {/* <View style={{ backgroundColor: '#333', height: '100%' }}> */}
  <LinearGradient colors={MenuGradients[gradient]} style={{ flex: 1 }}>
    {Marquee}
    {isLoading || !teeboxHoles.length || !currentHoleData
    ? <Text>Loading...</Text>
    :
    <>
    <View style={{  height:'100%', justifyContent:'flex-start', marginTop:10}}>
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
        <View style={{height:'50%', justifyContent:'center'}}>
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <VerticalCheckBoxes
            hole={currentHoleData}
            gir={state.gir}
            setGir={setGir}
            fir={state.fir}
            setFir={setFir}
          />
          <VerticalBtns3
            addShot={addShot}
            subtractShot={subtractShot}
            shotData={state.shotData}
            addShotColor={addShotColor}
            subShotColor={subShotColor}
          />
        </View>
        </View>
      </View>
    </>
  }
  </LinearGradient>
  </>
);
};

export default CounterThree;