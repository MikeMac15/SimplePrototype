import React, { useEffect, useRef, useState } from "react";
import { Alert, Text, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import C2Buttons from "@/components/Layouts/CounterTwo/Buttons/Buttons";
import C2Options2 from "@/components/Layouts/CounterTwo/Buttons/Options2";
import { Hole, Round } from "@/components/DataBase/Classes";
import { getAllTeeboxHoles, saveFullRound, saveHoleStats } from "@/components/DataBase/API";
import C2Header from "@/components/Layouts/CounterTwo/Header";
import C2Header2 from "@/components/Layouts/CounterTwo/Header2";

const CounterTwo: React.FC = () => {
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
        const hole = teeboxHoles.find(hole => hole.num === holeNumber)
        if (hole) {
          round.addRoundHole(hole, shotData.putt, shotData.pure, shotData.good, shotData.bad, gir, 0, fir);
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
          great: 0,
          good: 0,
          bad: 0,
          putt: 0
        });
        setGir(false);
        setFir(false);
        
    
      }
    
      const nextHole = () => {
        /// move onto next hole
        /// save data
        const hole = teeboxHoles.find(hole => hole.num === holeNumber)
        if (hole) {
          round.addRoundHole(hole, shotData.putt, shotData.great, shotData.good, shotData.bad, gir, 0, fir);
    
        }
        /// prep for next hole
        resetForNewHole();
        setHoleNumber(holeNumber + 1);
        console.log(round)
      }
    

    ////////////////////////////////////////// Save Data ////////////////////////////////////





  const setShot = (shotType: string, num: number) => {
    setShotData((prevData) => ({
      ...prevData,
      [shotType]: num,
    }));
  };


  const roundRef = useRef<Round>(new Round(Number(teeID)));
  const round = roundRef.current;





  return (
    <View style={{ paddingTop: 20, backgroundColor: '#333', height:'100%' }}>
      <Stack.Screen options={{ headerShown: false }} />
      {currentHoleData
      ?
      <C2Header2 courseName={String(courseName)} holeData={currentHoleData} roundToPar={round.toPar} roundGoal={Number(strokeGoal)} getTotalShots={getTotalShots}  />
      :
''
      }
      { teeboxHoles
      ?
      <C2Options2 teeboxHoles={teeboxHoles} roundHoles={round.holes} round={round}/>
      :
      ''
      }
      <View>

        <C2Buttons
          shotData={shotData}
          setShot={setShot}
          gir={gir}
          fir={fir}
          setGir={setGir}
          setFir={setFir}
          holeNum={holeNumber}
          nextHole={nextHole}
        />
      </View>
      <View style={{ marginVertical: 10,  }}>
        <Text style={{color:'white', fontSize:20}}>
            {round.points ? `$${round.points}` : ''}
            </Text>
      </View>
    </View>
  );
};

export default CounterTwo;








// {    "bad": 0,
//      "birdies": 0,
//      "bogeys": 0,
//      "date": "",
//      "doublePlus": 0,
//      "eaglesOless": 0,
//      "eighteen": false,
//      "good": 0,
//      "great": 0, 
//      "holes": {"1": {"bad": 0, "fir": true, "firEligible": true, "gir": true, "good": 1, "hole": [Object], "pure": undefined, "putts": 2, "strat": 0, "toPar": NaN}},
//      "id": -1,
//      "pars": 0,
//      "teebox_id": 1,
//      "toPar": NaN,
//      "toPar3": 0,
//      "toPar4": NaN,
//      "toPar5": 0,
//      "totalFIR": 1,
//      "totalGIR": 1,
//      "totalPutts": 2,
//      "totalStrokes": NaN
// }