import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Text, TouchableOpacity, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";

import { Hole, Round } from "@/components/DataBase/Classes";
import { getAllTeeboxHoles, saveFullRound, saveHoleStats } from "@/components/DataBase/API";


import VerticalCheckBoxes from "@/components/PlayComponents/VerticalCheckBoxes";
import StatMarquee from "@/components/PlayComponents/StatMarque";
import C3Header3 from "@/components/Layouts/CounterThree/Header3";
import C3Options3 from "@/components/Layouts/CounterThree/Options3";
import VerticalBtns3 from "@/components/Layouts/CounterThree/VerticalShotBtns3";


/**
 * CounterThree component.
 * @component
 */
const CounterThree: React.FC = () => {
  const params = useLocalSearchParams();
  const { courseID, courseName, teeID, girGoal, puttGoal, firGoal, strokeGoal } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [teeboxHoles, setTeeboxHoles] = useState<Hole[]>([]);
  const [currentHoleData, setCurrentHoleData] = useState<Hole>();
  const [holeNumber, setHoleNumber] = useState<number>(1);
  const [shotData, setShotData] = useState<{ [key: string]: number }>({
    great: 0,
    good: 0,
    bad: 0,
    putt: 0,
  });
  const [gir, setGir] = useState<boolean>(false);
  const [fir, setFir] = useState<boolean>(false);

  const roundRef = useRef<Round>(new Round(Number(teeID)));
  const round = roundRef.current;

  const getTotalShots = () => {
    return Object.values(shotData).reduce((total, value) => total + value, 0);
  };

  ////////////////////////////////////////// SetUp ////////////////////////////////////
  const getHoles = async () => {
    try {
      const holeData = await getAllTeeboxHoles(Number(teeID));
      if (holeData) {
        setTeeboxHoles(holeData);
      }
    } catch (error) {
      console.error('Error fetching holes:', error);
    }
  };

  const getCurrentHole = () => {
    const hole = teeboxHoles.find(hole => hole.num === holeNumber);
    if (hole) {
      setCurrentHoleData(hole);
    }
  };

  useEffect(() => {
    getHoles();
  }, [])
  useEffect(() => {
    setIsLoading(false);
    getCurrentHole();
  }, [teeboxHoles])

  useEffect(() => getCurrentHole(), [holeNumber])
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

  const resetForNewHole = (): void => {
    setShotData({
      strokes: 0,
      great: 0,
      good: 0,
      bad: 0,
      putt: 0
    });
    setGir(false);
    setFir(false);
  }

  const addRoundHole = () => {
    const hole = teeboxHoles.find(hole => hole.num === holeNumber)
    if (hole) {
      roundRef.current.addRoundHole(hole, shotData.putt, shotData.great, shotData.good, shotData.bad, gir, 0, fir);
    }
  }
  const nextHole = () => {
    
    addRoundHole();
    
    resetForNewHole();
    setHoleNumber(holeNumber + 1);
    
  }
  const lastHole = () => {
    
    addRoundHole();
    saveRoundAndHoleStats(round);
    
    
  }


  ////////////////////////////////////////// Save Data ////////////////////////////////////


  const getAllShotData = () => {
    const shots = {
      great: round.great,
      good: round.good,
      bad: round.bad,
      putt: round.totalPutts,
    }

    return shots
  }


  const addShot = (shotType: string) => {
    setShotData((prevData) => ({
      ...prevData,
      [shotType]: prevData[shotType] + 1,
    }));

  };

  const subtractShot = (shotType: string) => {
    setShotData((prevData) => ({
      ...prevData,
      [shotType]: Math.max(prevData[shotType] - 1, 0),
    }));

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
            Object.keys(round.holes).length == 17
              ? <Button title='Finish' onPress={() => lastHole()} />
              : <Button title='Next >' onPress={() => nextHole()} />
          ),
        }}
      />
    );
  };

  return (
    <View style={{ backgroundColor: '#333', height: '100%' }}>
      <StackScreen />
      <StatMarquee round={round} holeNumber={holeNumber} girGoal={Number(girGoal)} firGoal={Number(firGoal)} puttGoal={Number(puttGoal)} />
      {currentHoleData && (
        <View>
          <C3Header3 courseName={''} holeData={currentHoleData} roundToPar={round.toPar} roundGoal={Number(strokeGoal)} getTotalShots={getTotalShots} shotData={shotData} allShotData={getAllShotData()} />
        </View>
      )}
      {teeboxHoles && (
        <C3Options3 teeboxHoles={teeboxHoles} roundHoles={round.holes} round={round} holeNumber={holeNumber} />
      )}
      <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <VerticalCheckBoxes hole={currentHoleData} gir={gir} setGir={setGir} fir={fir} setFir={setFir} />
        <VerticalBtns3 addShot={addShot} subtractShot={subtractShot} shotData={shotData} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ color: 'white', fontSize: 20 }}>
          {round.points ? `$${round.points}` : ''}
        </Text>
      </View>
    </View>
  );
};

export default CounterThree;