import { Text, View, StyleSheet } from 'react-native'

interface HoleStatsProps {
    title: string,
    data: number[],
    percentage?: boolean
}

const HoleStats: React.FC<HoleStatsProps> = ({title, data, percentage  = false}) => {

    const chunkArray = (arr:number[],chunkSize:number): number[][] =>{
        const chunkArr:number[][] = [];
        for (let i = 0; i < arr.length; i += chunkSize){
            chunkArr.push(arr.slice(i, i + chunkSize));
        }
        return chunkArr;
    }

    const adjustedColor = (val: number) => {
        const min = Math.min(...data);
        const max = Math.max(...data);
        let colorVal = (val - min)/(max - min);
        if ( colorVal > 0.5){
            colorVal = (colorVal * 100);
            return `HSL(80,${colorVal}%,50%)`;
        } else if ( colorVal <= 0.5){
            colorVal = ((1 - colorVal)*100);
            return `HSL(5,${colorVal}%,50%)`;
        }
    }

    const HoleDataSquare = ({holeNum, data}:{holeNum: number, data: number}) => {
        
        return (
            
            <View style={[styles.square,{backgroundColor:adjustedColor(data)}]}>
            <View style={styles.squareTitle}>
                <Text style={styles.holeNum}>{`Hole ${holeNum}`}</Text>
            </View>
                <View>
                    <Text>{data.toFixed(2)}</Text>
                </View>
            </View>
        )
    }



    const chunkData = chunkArray(data, 3);

  return (
<View style={styles.container}>
    <View style={styles.contRow}>
    {
    chunkData.map((row, rowIdx)=>(
        <View key={rowIdx} style={{}}>
            {row.map((num, idx)=> (
                <HoleDataSquare holeNum={idx+1+(rowIdx*3)} data={num} />
            ))
            }
        </View>
            
    ))
}
    
</View>
</View>
)
}

export default HoleStats;



const styles = StyleSheet.create({
container: {

},
square: {
    borderRadius:20,
    borderWidth:2,
    borderColor:'#3a3a3a'
},
squareTitle: {
    backgroundColor:'#444'
},
holeNum: {},
contRow: {},

})