import { getHoleStatsByHoleID } from "@/components/DataBase/API";
import { HoleInsights } from "@/components/DataBase/Classes";
import { useEffect, useState } from "react";
import { Alert, Button, Dimensions, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LineChart, PieChart } from "react-native-gifted-charts";

const { width } = Dimensions.get('window');

interface ModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  holeID: number;
  holePar:number;
  holeNumber?: number;
}


const HoleInsightsModal: React.FC<ModalProps> = ({ modalVisible, setModalVisible, holeID, holePar, holeNumber }) => {

  const [timelineChoice, setTimelineChoice] = useState<number>(0);
  const [holeInsight, setHoleInsight] = useState<HoleInsights>({
    scores: [],
    pph: [],
    gir: [],
    fir: []
  });

  const fetchHoleInsight = async () => {
    try {
      const data = await getHoleStatsByHoleID(holeID);
      
      setHoleInsight(data);
    } catch (error) {
      console.error('Error fetching hole insights:', error);
    }
  };

  useEffect(() => {
    fetchHoleInsight();
  }, []);

  const averageOut = (arr: number[]): number => {
    if (arr.length === 0) return 0; // Handle empty array
    return arr.reduce((a, b) => a + b, 0) / arr.length; // Provide initial value of 0
  };


  const HoleTitle = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#222', paddingVertical: 3, }}>
        <Text style={{ color: 'whitesmoke', fontSize: 20, fontFamily: 'papyrus' }}>Hole {holeNumber} Insights</Text>

      </View>
    );
  }

  const CalcParPercentages = () => {
    let under = 0
    let par = 0
    let over = 0

    holeInsight.scores.map((score) => {
      if (score < holePar) {
        under++
      } else if (score === holePar) {
        par++
      } else {
        over++
      }
    })
    return {
      under: under / holeInsight.scores.length * 100,
      par: par / holeInsight.scores.length * 100,
      over: over / holeInsight.scores.length * 100,
    }
  }

  const UnderOverParChart = () => {
    const ParPercentages = CalcParPercentages();

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
              borderColor: '#111',
              borderWidth: 1.5,
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
            { value: ParPercentages.over, color: 'salmon' },
            { value: ParPercentages.under, color: 'skyblue' },
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

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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
  const PastHoleStats = ({ title, title2 = '', dataStr }: { title: string, title2?: string, dataStr: string }) => {
    return (
      <View style={title2 ? { flexDirection: "row", justifyContent: 'center', alignItems: 'center' } : { flexDirection: "row", }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: 70 }}>
          <Text style={[StylesInsights.text,{textAlign:'center'}]}>{title}</Text>
          {title2 ? <Text style={StylesInsights.text}>{title2}</Text>
            : ''}
        </View>


        <Text style={{ color: 'white', fontSize: 20, marginHorizontal: 10 }}>{dataStr}</Text>
      </View>
    );
  }
  const AllPastHoleStats = () => {
    return (
      <View style={[StylesInsights.columns, {alignItems:'flex-start'}]}>

        <PastHoleStats title="Avg" title2="Score" dataStr={`${averageOut(holeInsight.scores).toFixed(1)}`} />
        <PastHoleStats title="Avg" title2="Putts" dataStr={`${averageOut(holeInsight.pph).toFixed(1)}`} />
        {/* <PastHoleStats title="Hole" title2="Hcp" dataStr="+0.1"/> */}
        <PastHoleStats title="GIR" dataStr={`${(averageOut(holeInsight.gir) * 100).toFixed(1)}%`} />
        <PastHoleStats title="FIR" dataStr={`${(averageOut(holeInsight.fir) * 100).toFixed(1)}%`} />

      </View>
    );
  }

  const PastHoleTimeline = ({ data1, refNum, title, step = false }: { data1: number[], refNum: number, title: string, step?: boolean }) => {

    const xAxis: string[] = []
    data1.map((value) => (xAxis.push((String(value)))))
    return (
      <View style={{}}>
        <Text style={{ color: 'whitesmoke', fontSize: 20, textAlign: 'center', marginVertical: 10 }}>Past {title}</Text>
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
              value: item,
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
          stepValue={1}
          stepHeight={15}
          width={width * .8}
          maxValue={Math.max(...data1) + 1}
          
          scrollToEnd
          // curved

          dataPointsColor="#ccc"
          showXAxisIndices
          textShiftY={20}
          textColor="#ccc"
          textFontSize={14}
          rulesColor={'black'}
          hideYAxisText
          color="#ccc"
        />
        {/* Timeline */}
        <TimeLineChoice />
      </View>
    )

  }

  const TimelineViewer = ({ timelineChoice }: { timelineChoice: number }) => {



    switch (timelineChoice) {
      case 0:
        return <PastHoleTimeline data1={holeInsight.scores} refNum={holePar} title="Scores" />
      case 1:
        return <PastHoleTimeline data1={holeInsight.pph} refNum={2} title="PPH" />
      case 2:
        return <PastHoleTimeline data1={holeInsight.gir} refNum={1} title="GIR" step />
      case 3:
        return <PastHoleTimeline data1={holeInsight.fir} refNum={1} title="FIR" step />
      default:
        break;
    }
  }

  const TimeLineChoice = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', transform: 'translateY(-20px)' }}>

        <TouchableOpacity onPress={() => setTimelineChoice(0)}>
          <Text style={[styles.text, timelineChoice === 0 && styles.selectedText]}>Score</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTimelineChoice(1)}>
          <Text style={[styles.text, timelineChoice === 1 && styles.selectedText]}>PPH</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTimelineChoice(2)}>
          <Text style={[styles.text, timelineChoice === 2 && styles.selectedText]}>GIR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTimelineChoice(3)}>
          <Text style={[styles.text, timelineChoice === 3 && styles.selectedText]}>FIR</Text>
        </TouchableOpacity>

      </View>
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>


      <View style={StylesInsights.centeredView}>



        <View style={StylesInsights.modalView}>
          {holeInsight.scores.length === 0 ? <Text style={{ color: 'whitesmoke', fontSize: 20 }}>No data available</Text> 
          :
          <View style={StylesInsights.container}>
            <HoleTitle />
            <View style={{}}>
              <TimelineViewer timelineChoice={timelineChoice} />

            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={[StylesInsights.columns, { transform: 'translateX(15px)', marginTop: 20 }]}>
                <UnderOverParChart />
              </View>
              <AllPastHoleStats />
            </View>

          </View>
          }
          <Pressable
          style={[StylesInsights.button, StylesInsights.buttonCancel]}
          onPress={() => setModalVisible(!modalVisible)}>
            <Text style={StylesInsights.textStyle}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default HoleInsightsModal;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 16,
    color: '#aaa',
  },
  selectedText: {
    color: '#007bff', // Highlight color when selected
  },
});

const StylesInsights = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    transform: 'scale(.90)',
    margin: 20,

    borderRadius: 20,
    padding: 20,
    backgroundColor: '#3f3f3f',

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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    // backgroundColor: '#333', 


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
    // marginVertical: 10,
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
