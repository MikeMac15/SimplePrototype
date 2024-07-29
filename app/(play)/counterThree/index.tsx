import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Text, TouchableOpacity, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";

import { Hole, Round } from "@/components/DataBase/Classes";
import { getAllTeeboxHoles, saveFullRound, saveHoleStats } from "@/components/DataBase/API";

import VerticalBtns from "@/components/PlayComponents/VerticalShotBtns";
import VerticalCheckBoxes from "@/components/PlayComponents/VerticalCheckBoxes";
import StatMarquee from "@/components/PlayComponents/StatMarque";
import C3Header3 from "@/components/Layouts/CounterThree/Header3";
import C3Options3 from "@/components/Layouts/CounterThree/Options3";
import VerticalBtns3 from "@/components/Layouts/CounterThree/VerticalShotBtns3";



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
      const holeData = await getAllTeeboxHoles(Number(teeID))
      if (holeData) {
          setTeeboxHoles(holeData)
        }
    }

    const getCurrentHole = () => {
        const hole = teeboxHoles.find(hole => hole.num === holeNumber)
        if (hole)
        setCurrentHoleData(hole)
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
    ////////////////////////////////////////// Save Data ////////////////////////////////////
    const saveRoundAndHoleStats = async (round: Round) => {
        console.log(round.totalStrokes)
        console.log(round.great)
        console.log(round.good)
        console.log(round.bad)
        console.log(round.totalPutts)

        const hole = teeboxHoles.find(hole => hole.num === holeNumber)
        if (hole) {
          round.addRoundHole(hole, shotData.putt, shotData.great, shotData.good, shotData.bad, gir, 0, fir);
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
            true,
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
          great: 0,
          good: 0,
          bad: 0,
          putt: 0
        });
        setGir(false);
        setFir(false);
        console.log(round.totalStrokes)
    
      }
    
      const nextHole = () => {
        /// move onto next hole
        /// save data
        const hole = teeboxHoles.find(hole => hole.num === holeNumber)
        if (hole) {
          roundRef.current.addRoundHole(hole, shotData.putt, shotData.great, shotData.good, shotData.bad, gir, 0, fir);
    
        }
        /// prep for next hole
        resetForNewHole();
        setHoleNumber(holeNumber + 1);
        console.log(round)
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
    )
}

  return (
    <View style={{  backgroundColor: '#333', height:'100%' }}>
      <StackScreen />
      <StatMarquee round={round} holeNumber={holeNumber} girGoal={Number(girGoal)} firGoal={Number(firGoal)} puttGoal={Number(puttGoal)}/>
      {currentHoleData
      ?
      <View style={{}}>
      

      <C3Header3 courseName={''} holeData={currentHoleData} roundToPar={round.toPar} roundGoal={Number(strokeGoal)} getTotalShots={getTotalShots} shotData={shotData} allShotData={getAllShotData()} />
      
  
     
  
      </View>
      :
''
      }
      { teeboxHoles
      ?
      <C3Options3 teeboxHoles={teeboxHoles} roundHoles={round.holes} round={round} holeNumber={holeNumber}/>
      :
      ''
      }
      <View style={{alignItems:'center', flexDirection:'row', justifyContent:'space-evenly'}}>

        <VerticalCheckBoxes hole={currentHoleData} gir={gir} setGir={setGir} fir={fir} setFir={setFir}/>
        <VerticalBtns3 addShot={addShot} subtractShot={subtractShot} shotData={shotData}/>
      </View>
      <View style={{ marginVertical: 10,  }}>
        <Text style={{color:'white', fontSize:20}}>
            {round.points ? `$${round.points}` : ''}
            </Text>
      </View>
    </View>
  );
};

export default CounterThree;




