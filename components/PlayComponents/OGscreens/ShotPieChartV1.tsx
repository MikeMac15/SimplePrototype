import { Text, View } from "react-native";
import PieChart from "react-native-pie-chart";

interface ShotData {
  [key: string]: number;
}

interface ShotPieChartV1Props {
  shotData: ShotData;
  allShotData: ShotData;
}

const ShotPieChartV1: React.FC<ShotPieChartV1Props> = ({ shotData, allShotData }) => {


    const colors = ["#36BFFA", "#97cc66", "#F97066", "#E1CAB2"]

    const hasAnyHoleShots = () => {
      return Object.values(shotData).some(value => value > 0);
    };
    const hasAnyShots = () => {
      return Object.values(allShotData).some(value => value > 0);
    };

    const HolePieChart = () => {
      return (
        <View style={{ alignItems: 'center', margin: 0, padding: 0, }}>
          <Text style={{ marginVertical: 5, fontSize: 20, fontFamily: 'Arial', fontStyle: 'italic', color: 'whitesmoke' }}>This Hole</Text>
          <PieChart widthAndHeight={150} series={[shotData.pure, shotData.good, shotData.bad, shotData.putt]} sliceColor={colors} style={{ margin: 15, marginTop: 5 }}
          />
        </View>
      )
    }
    const RoundPieChart = () => {
      return (
        <View style={{ alignItems: 'center', margin: 0, padding: 0, }}>
          <Text style={{ marginVertical: 5, fontSize: 20, fontFamily: 'Arial', fontStyle: 'italic', color: 'whitesmoke' }}>All Shots</Text>
          <PieChart widthAndHeight={150} series={[allShotData.pure, allShotData.good, allShotData.bad, allShotData.putt]} sliceColor={colors} style={{ margin: 15, marginTop: 5 }} />
        </View>
      )
    }
    const BlankPieChart = () => {
      return (
        <View style={{ alignItems: 'center', margin: 0, padding: 0, }}>
          <Text style={{ marginVertical: 5, fontSize: 20, fontFamily: 'Arial', fontStyle: 'italic', color: 'whitesmoke' }}>Good Luck!</Text>
          <PieChart widthAndHeight={150} series={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]} sliceColor={['#aaa', '#bbb', '#999', '#666', '#555', '#aaa', '#bbb', '#999', '#666', '#555']} style={{ margin: 15, marginTop: 5 }} />
        </View>
      )
    }


    return (

      <View style={{ }}>

        {/* <View style={{
          justifyContent: 'center', alignItems: 'center', shadowColor: '#444',
          shadowOffset: { width: 15, height: 20 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        }}>
          <View style={{
            justifyContent: 'center', alignItems: 'center', shadowColor: '#ccc',
            shadowOffset: { width: 10, height: -14 },
            shadowOpacity: 0.3,
            shadowRadius: 7,
          }}>
            <View style={{
              justifyContent: 'center', alignItems: 'center', shadowColor: '#ddd',
              shadowOffset: { width: -20, height: -14 },
              shadowOpacity: 0.3,
              shadowRadius: 7,
            }}>

              <View style={{
                justifyContent: 'center', alignItems: 'center', transform: "scale(.7)", shadowColor: '#ccc',
                shadowOffset: { width: -20, height: 14 },
                shadowOpacity: 0.3,
                shadowRadius: 7,
                opacity: .8,
                borderRadius: 200,
                borderWidth: 3, borderColor: '#bbb'
              }}> */}



        {hasAnyShots()
          ? hasAnyHoleShots()
            ? <HolePieChart />
            : <RoundPieChart />
          : <BlankPieChart />
        }

        {/* </View>
            </View>


          </View>

        </View> */}
      </View>


    );
  };


  export default ShotPieChartV1;