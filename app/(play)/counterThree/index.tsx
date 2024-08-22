import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";

import { Hole, Round, ShotData } from "@/components/DataBase/Classes";
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
  const [shotData, setShotData] = useState<ShotData>({
    great: 0,
    good: 0,
    bad: 0,
    putt: 0,
  });
  const [gir, setGir] = useState<boolean>(false);
  const [fir, setFir] = useState<boolean>(false);
  
  
  const roundRef = useRef<Round>(new Round(Number(teeID)));
  const round = roundRef.current;
  const [shotColors, setShotColors] = useState<string[]>([]);
  
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
    setShotColors([]);
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
  ////////////////////////////////////////// Shot Data ////////////////////////////////////
  const getAllShotData = () => {
    const shots:ShotData = {
      great: round.great,
      good: round.good,
      bad: round.bad,
      putt: round.totalPutts,
    }
    return shots
  };
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

  const MainView = () => {
  
    const addShotColor = (color: string) => {
      setShotColors(prevColors => [...prevColors, color]);
    };
  
    const subShotColor = (color: string) => {
      setShotColors(prevColors => {
        const lastColorIdx = prevColors.lastIndexOf(color);
        if (lastColorIdx !== -1) {
          const newShotColorArr = [
            ...prevColors.slice(0, lastColorIdx),
            ...prevColors.slice(lastColorIdx + 1)
          ];
          return newShotColorArr;
        }
        return prevColors; // Return the original state if color not found
      });
    };
  
  
    return (
      <View style={{}}>
        <StatMarquee
          round={round}
          holeNumber={holeNumber}
          girGoal={Number(girGoal)}
          firGoal={Number(firGoal)}
          puttGoal={Number(puttGoal)}
        />
      <View style={{  height:'100%', justifyContent:'flex-start', marginTop:10}}>
        {currentHoleData && (
          <View>
            <C3Header3
              courseName={''}
              holeData={currentHoleData}
              shotColors={shotColors}
              getTotalShots={getTotalShots}
              shotData={shotData}
              allShotData={getAllShotData()}
            />
          </View>
        )}
        {teeboxHoles && (
          <C3Options3
            teeboxHoles={teeboxHoles}
            roundHoles={round.holes}
            round={round}
            holeNumber={holeNumber}
          />
        )}
        <View style={{height:'50%', justifyContent:'center'}}>
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <VerticalCheckBoxes
            hole={currentHoleData}
            gir={gir}
            setGir={setGir}
            fir={fir}
            setFir={setFir}
          />
          <VerticalBtns3
            addShot={addShot}
            subtractShot={subtractShot}
            shotData={shotData}
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
  <View style={{ backgroundColor: '#333', height: '100%' }}>
    <StackScreen />
    {/* <Carousel /> */}
    <MainView />
  </View>
);
};

export default CounterThree;