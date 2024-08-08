import { Text, View } from "react-native";
import PieChart from "react-native-pie-chart";
import C3Header3 from "./Header3";
import { ShotData } from "@/components/DataBase/Classes";



interface ShotPieChartV1Props {
  shotData: ShotData;
  allShotData: ShotData;
}

const NewPieChart: React.FC<ShotPieChartV1Props> = ({ shotData, allShotData }) => {
    console.log('shotData:', shotData);

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
          <PieChart widthAndHeight={150} series={[shotData.great, shotData.good, shotData.bad, shotData.putt]} sliceColor={colors} style={{}}
          />
        </View>
      )
    }
    const RoundPieChart = () => {
      return (
        <View style={{ alignItems: 'center', margin: 0, padding: 0, }}>
          <Text style={{ marginVertical: 5, fontSize: 20, fontFamily: 'Arial', fontStyle: 'italic', color: 'whitesmoke' }}>All Shots</Text>
          <PieChart widthAndHeight={150} series={[allShotData.great, allShotData.good, allShotData.bad, allShotData.putt]} sliceColor={colors} style={{ }} />
        </View>
      )
    }
    const BlankPieChart = () => {
      return (
        <View style={{ alignItems: 'center', margin: 0, padding: 0, }}>
          <Text style={{ marginVertical: 5, fontSize: 20, fontFamily: 'Arial', fontStyle: 'italic', color: 'whitesmoke' }}>Good Luck!</Text>
          <PieChart widthAndHeight={150} series={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]} sliceColor={['#aaa', '#bbb', '#999', '#666', '#555', '#aaa', '#bbb', '#999', '#666', '#555']} style={{}} />
        </View>
      )
    }


    return (

      
      <View style={{ marginHorizontal:20, marginBottom:20 }}>
       


        {hasAnyShots()
          ? hasAnyHoleShots()
            ? <HolePieChart />
            : <RoundPieChart />
          : <BlankPieChart />
        }

        
      </View>


    );
  };


  export default NewPieChart;