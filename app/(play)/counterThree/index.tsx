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
import { LineChart, PieChart } from "react-native-gifted-charts";
import { RoundView } from "@/components/Layouts/CounterTwo/Buttons/Modals/RoundModal";



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
  const [timelineChoice, setTimelineChoice] = useState<number>(0);
  
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


  ////////////////////////////////////////// Save Data ////////////////////////////////////


  const getAllShotData = () => {
    const shots:ShotData = {
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
          <View style={{ backgroundColor: '#333', height: '100%' }}>
            <StatMarquee
              round={round}
              holeNumber={holeNumber}
              girGoal={Number(girGoal)}
              firGoal={Number(firGoal)}
              puttGoal={Number(puttGoal)}
            />
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
        );
      };





///////////////////////////////////////////////////////Create Own Folder When Finished///////////////////////////////////////////////////////
const HoleInsights = ({holeNum,par}:{holeNum:number,par:number}) => {

    const HoleTitle = () => {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor:'#222', paddingVertical:3 }}>
          <Text style={{ color: 'whitesmoke', fontSize: 20, fontFamily:'papyrus' }}>Hole {holeNum} Insights</Text>
          
        </View>
      );
    }
  
    const UnderOverParChart = () => {
      const ParPercentages = {
        under: 3,
        par: 80,
        over: 17,
      }
      
      const renderLegend = (text: string, count: number, color: string) => {
        return (
          <View style={{
            flexDirection: 'column', marginBottom: 12,
          }}>
            <View
              style={{
                alignItems: 'center', justifyContent: 'center',
                height: 50,
                width: 50,
                marginRight: 10,
                borderRadius: 4,
                backgroundColor: color || 'white',
                borderColor:'#111',
                borderWidth:1.5,
              }}
              >
              <Text style={{ color: 'black', fontSize: 16 }}>{`${count}%` || ''}</Text>
              <Text style={{ color: 'black', fontSize: 16 }}>{text || ''}</Text>
            </View>
          </View>
        );
      };
      
      return (
        <View>
          <PieChart
              //   strokeColor="white"
              strokeWidth={2}
              
              data={[
                { value: ParPercentages.under, color: 'skyblue' },
                { value: ParPercentages.over, color: 'salmon' },
                { value: ParPercentages.par, color: 'yellowgreen' },
                
              ]}
              innerCircleColor={'#333'}
              innerRadius={50}
              radius={80}
              textColor="whitesmoke"
              textSize={18}
              centerLabelComponent={() => {
                return (
                  <View
                  style={{
                    
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    
                    
                  }}>
                    
                      {renderLegend('Par', ParPercentages.par, 'yellowgreen')}
      
                    <View style={{ flexDirection: 'row', justifyContent:'center', alignItems:'center' }}>
                      {renderLegend('Under', ParPercentages.under, 'skyblue')}
                      {renderLegend('Over', ParPercentages.over, 'salmon')}
                    </View>
                  </View>
                );
              }}
              />
        </View  >
      );
    }
    const PastHoleStats = ({title, dataStr}:{title:string, dataStr:string}) => {
      return (
        <View style={StylesInsights.columns}>
          
            <Text style={StylesInsights.text}>{title}</Text>
          
  
          <Text style={{ color: 'white', fontSize: 20 }}>{dataStr}</Text>
        </View>
      );
    }
    const AllPastHoleStats = () => {  
      return (
            <View style={[StylesInsights.columns, {}]}>
        <View style={StylesInsights.row}>
        <PastHoleStats title="GIR" dataStr="55%"/>
        <PastHoleStats title="FIR" dataStr="72%"/>
      </View>
      <View style={StylesInsights.row}>
        <PastHoleStats title="Avg Putts" dataStr="2.1"/>
      </View>
      <View style={StylesInsights.row}>
        <PastHoleStats title="Avg Score" dataStr="4.1"/>
        <PastHoleStats title="Hole Hcp" dataStr="+0.1"/>
      </View>
      </View>
      );
    }

    const PastHoleTimeline = ({data1, refNum, title, step=false}:{data1:number[], refNum:number, title:string, step?:boolean}) => {
      
      const [stepValue,setStepValue] = useState(1)
     
          
          
          const xAxis: string[] = []
          data1.map((value)=>(xAxis.push((String(value)))))
          return (
              <View style={{}}>
          <Text style={{color:'whitesmoke', fontSize:20, textAlign:'center', marginVertical:10}}>Past {title} for Hole {holeNum}</Text>
          <LineChart

          
          {...(step ? { stepChart: true } : { areaChart: true })}
          
          
          data={data1.map(item => {
            const noStepProperties = {
              value: item,
              dataPointText: String(item),
              textColor: item > refNum ? '#FFCCCC' : item < refNum ? '#CCCCFF' : '#CCFFCC',
              dataPointColor: item > refNum ? 'salmon' : item < refNum ? 'skyblue' : 'yellowgreen'
            };
            const stepProperties = {
              value : item,
              textColor: item < refNum ? '#FFCCCC' : '#CCFFCC', 
              dataPointColor: item < refNum ? 'salmon' : 'yellowgreen'
              
            }
          
            if (!step) {
              // Return common properties as is or add additional properties
              return noStepProperties;
            } else {
              // Return common properties as is or add different properties for step
              return stepProperties;
            }
          })}
          startFillColor="#6f6a7f"
          startOpacity={0.8}
          endFillColor="#222"
          endOpacity={0.3}
          stepValue={stepValue}
          stepHeight={15}
          
          maxValue={Math.max(...data1)+1}
          scrollToEnd
          // curved
         
          dataPointsColor="#ccc"
          showXAxisIndices
          textShiftY={20}
          textColor="#ccc"
          textFontSize={14}
          rulesColor={'black'}
          yAxisTextStyle={{color:'#ccc'}}
          color="#ccc"
          />
          {/* Timeline */}
          
      </View>
      )
      
  }

  const TimelineViewer = (timelineChoice:number) => {
    switch (timelineChoice) {
      case 0:
        return <PastHoleTimeline data1={[5,4,4,6,4,3,5,3,4]} refNum={4} title="Scores"/>  
      case 1:
        return <PastHoleTimeline data1={[2,2,2,1,2,2,3,2,2]} refNum={2} title="PPH"/>
      case 2:
        return <PastHoleTimeline data1={[0,1,0,1,1,0,0,0,1]} refNum={1} title="GIR" step/>
      case 3:
        return <PastHoleTimeline data1={[1,1,1,0,1,0,1,1,0]} refNum={1} title="FIR" step/>
      default:
        break;
    }}
  
  return (

    <View style={StylesInsights.container}>
      <HoleTitle />
      <View style={{width:width, }}>
        {TimelineViewer(timelineChoice)}
      </View>

      <View style={{flexDirection:'row'}}>
        <View style={[StylesInsights.columns, {transform:'translateX(15px)', marginTop:20}]}>
          <UnderOverParChart />
        </View>
        <AllPastHoleStats />
      </View>
    



      </View>
  );
}

const RoundInsights = () => {
  
    return (
      <View style={{ backgroundColor: '#333', height: '50%' }}>
        <Text style={{ color: 'whitesmoke', fontSize: 20, fontFamily:'papyrus', textAlign:'center', marginVertical:20, backgroundColor:'#222' }}>Round Insights</Text>
        <RoundView round={round}/>
      </View>
    );
  }

  const Insights = ({holeNum,par}:{holeNum:number,par:number}) => {
    return (
      <ScrollView style={{ backgroundColor: '#333', height: '100%' }}>
        <HoleInsights holeNum={holeNum} par={par} />
        <RoundInsights />
      </ScrollView>
    );
  }


const StylesInsights = StyleSheet.create({
  container: { 
    backgroundColor: '#333', 

    justifyContent:'space-evenly',
     },
  row: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
    
    
  },
  columns: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor : '#111',
    marginVertical: 10,
    marginHorizontal: 12,
     

  },
  text: {
    color: 'white',
    fontSize: 15,
  },
  circle: {
    borderRadius: 100,
    width: 90,
    height: 90,
    backgroundColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
  }
});












///////////////////////////////////////////////////////Addititon///////////////////////////////////////////////////////

const { width } = Dimensions.get('window');

const views = [
  
  // { key: 'view1', component: <Insights holeNum={1} par={4} /> },
  // { key: 'view2', component: <MainView /> },
  { key: 'view1', component: <MainView /> },
  { key: 'view2', component: <Insights holeNum={1} par={4} /> },

];

const Carousel = () => {
  const renderItem = ({ item }: { item: { key: string, component: JSX.Element } }) => {
    return <View style={{width:width}}>{item.component}</View>;
  };

  const onViewRef = useRef(() => {
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


///////////////////////////////////////////////////////Addititon///////////////////////////////////////////////////////


return (
  <View style={{ backgroundColor: '#333', height: '100%' }}>
    <StackScreen />
    <Carousel />
    {/* <MainView /> */}
  </View>
);
};

export default CounterThree;