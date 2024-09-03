import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Alert, Text, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import C2Buttons from "@/components/Layouts/CounterTwo/Buttons/Buttons";
import C2Options2 from "@/components/Layouts/CounterTwo/Buttons/Options2";
import { Hole, Round, ShotData } from "@/components/DataBase/Classes";
import { getAllTeeboxHoles, saveFullRound, saveHoleStats } from "@/components/DataBase/API";
import C2Header from "@/components/Layouts/CounterTwo/Header";
import C2Header2 from "@/components/Layouts/CounterTwo/Header2";
import StackHeader from "@/constants/StackHeader";
import { getMenuGradient, getRibbonImage } from "@/components/DataBase/localStorage";
import { getRibbonImageSource } from "@/constants/Colors";
import { initialState, reducer } from "@/components/DataBase/RoundReducer";
import C3Options3 from "@/components/Layouts/CounterThree/Options3";

const CounterTwo: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const params = useLocalSearchParams();
  const { courseID, courseName, teeID, girGoal, puttGoal, firGoal, strokeGoal } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [teeboxHoles, setTeeboxHoles] = useState<Hole[]>([]);
  const [currentHoleData, setCurrentHoleData] = useState<Hole>();
  const [holeNumber, setHoleNumber] = useState<number>(1);


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

  const setShotCount = (shotType: keyof ShotData, count: number) => {
    dispatch({ type: 'SET_SHOT_COUNT', shotType, count });
  };  
  const setGir = (value: boolean) => {
    dispatch({ type: 'SET_GIR', value });
  };
  const setFir = (value: boolean) => {
    dispatch({ type: 'SET_FIR', value });
  };

    
    
    
    
    ////////////////////////////////////////// Visuals ////////////////////////////////////
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
  
  
  










  return (
    <View style={{ paddingTop: 20, backgroundColor: '#333', height:'100%' }}>
      <StackHeader image={image} imageTag={ribbonImage} title={`${courseName}`} roundRef={roundRef} lastHole={lastHole} nextHole={nextHole} teeboxHoles={teeboxHoles}/>
      {currentHoleData
      ?
      <C2Header2 courseName={String(courseName)} holeData={currentHoleData} roundToPar={roundRef.current.toPar} roundGoal={Number(strokeGoal)} getTotalShots={getTotalShots}  />
      :
''
      }
      { teeboxHoles && currentHoleData
      ?
      // <C2Options2 teeboxHoles={teeboxHoles} roundHoles={roundRef.current.holes} round={roundRef.current}/>
      <C3Options3 holeNumber={currentHoleData.num} teeboxHoles={teeboxHoles} roundHoles={roundRef.current.holes} round={roundRef.current}/>
      :
      ''
      }
      <View>

        <C2Buttons
          shotData={state.shotData}
          setShot={setShotCount}
          gir={state.gir}
          fir={state.fir}
          setGir={setGir}
          setFir={setFir}
          holeNum={holeNumber}
          nextHole={nextHole}
        />
      </View>
      {/* <View style={{ marginVertical: 10,  }}>
        <Text style={{color:'white', fontSize:20}}>
            {round.points ? `$${round.points}` : ''}
            </Text>
      </View> */}
    </View>
  );
};

export default CounterTwo;
