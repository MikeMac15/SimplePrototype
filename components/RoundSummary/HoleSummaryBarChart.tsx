import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { Round } from '../DataBase/Classes';
import { BarChart } from 'react-native-gifted-charts';
import { useState } from 'react';

interface HoleSummaryBarChartProps {
    round: Round;
}

const HoleSummaryBarChart: React.FC<HoleSummaryBarChartProps> = ({round}) => {
    const [maxValue, setMaxValue] = useState(0);
    const width = Dimensions.get('window').width+10;
    
    const getPerformanceColor = (toPar: number) => {
        switch (toPar) {
          case -2:
            return { color: 'skyblue' }; // Green for Birdie
          case -1:
            return { color: 'yellowgreen' }; // Green for Birdie
          case 0:
            return { color: 'yellowgreen' }; // Yellow for Par
          case 1:
            return { color: 'salmon' }; // Orange for Bogey
          case 2:
            return { color: 'salmon' };  // Red for Double Bogey
          default:
            return { color: 'red' };  // Red for Triple Bogey or worse
        }
      };
    
      // Dynamically create stack data based on round's holes
      const stackData = Object.values(round.holes).map(hole => {
        const performance = getPerformanceColor(hole.toPar);

        if (hole.toPar + hole.hole.par >= maxValue) {
            setMaxValue(hole.toPar + hole.hole.par + 1);}
    

    
        if (hole.toPar >= 0){

            return {
                stacks: [
                    { value: hole.hole.par, color: '#bbb' }, // Example: putts visualized in blue
                    { value: hole.toPar, color: performance.color }, // Example: putts visualized in blue
                    // { value: performance.value, color: performance.color } // Performance based on toPar
                ],
                label: `${hole.hole.num}`, // Hole number as label
            };
        }
        else {
            return {
                stacks: [
                    { value: hole.toPar * -1, color: performance.color }, // Example: putts visualized in blue
                    { value: hole.toPar + hole.hole.par, color: '#bbb'  }, // Example: putts visualized in blue
                ],
                label: `${hole.hole.num}`, // Hole number as label
            };
        }
        });

  return (
<View style={styles.container}>
<BarChart
width={width}
rotateLabel
barWidth={10}
spacing={12}
noOfSections={3}
height={100}
maxValue={maxValue}
barBorderRadius={6}
stackData={stackData}
xAxisColor={'#888'}
yAxisColor={'#888'}
xAxisLabelTextStyle={{ color: 'whitesmoke' }}
yAxisTextStyle={{ color: 'whitesmoke' }}
/>
</View>
)
}

export default HoleSummaryBarChart;



const styles = StyleSheet.create({
container: {
    marginVertical: 20,
},

})