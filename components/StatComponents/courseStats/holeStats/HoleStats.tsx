import { LinearGradient } from 'expo-linear-gradient';
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
        const max = Math.min(...data);
        const min = Math.max(...data);
        let colorVal = (val - min)/(max - min);
        if ( colorVal > 0.5){
            colorVal = (colorVal * 100);
            return `hsl(80,${colorVal}%,50%)`;
        } else if ( colorVal <= 0.5){
            colorVal = ((1 - colorVal)*100);
            return `hsl(5,${colorVal}%,50%)`;
        }
    }

    const HoleDataSquare = ({holeNum, data}:{holeNum: number, data: number}) => {
        
        return (
            
            <View style={[styles.square,{}]}>
            <View style={styles.squareTitle}>
                <Text style={[styles.holeNum,{color:`${adjustedColor(data)}`}]}>{`Hole ${holeNum}`}</Text>
                {/* <Text style={[styles.holeNum,{color:`#999`}]}>{`Hole ${holeNum}`}</Text> */}
            </View>
                <View>
                    <Text style={[styles.holeData,{color:`${adjustedColor(data)}`}]}>{data.toFixed(2)}</Text>
                    {/* <Text style={[styles.holeData,{color:`whitesmoke`}]}>{data.toFixed(1)}</Text> */}
                </View>
            </View>
        )
    }



    const chunkData = chunkArray(data, 3);

  return (
<LinearGradient colors={['#333','#111']} style={styles.container}>
    <View style={styles.cont}>
    {
    chunkData.map((row, rowIdx)=>(
        <View key={rowIdx} style={styles.contRow}>
            {row.map((num, idx)=> (
                <HoleDataSquare key={idx} holeNum={idx+1+(rowIdx*3)} data={num} />
            ))
            }
        </View>
            
    ))
}
    
</View>
</LinearGradient>
)
}

export default HoleStats;



const styles = StyleSheet.create({
container: {
    // flexDirection:'row',
    // alignItems:'center',
    // justifyContent:'space-evenly',
    height:'100%',
},
square: {
    borderRadius:20,
    borderWidth:3,
    borderColor:'#3a3a3a',
    
    // backgroundColor:'whitesmoke',
    
},
squareTitle: {
    backgroundColor:'#333',
    paddingVertical:5,
    paddingHorizontal:15,
    borderTopLeftRadius:17,
    borderTopRightRadius:17,
},
holeNum: {
    textAlignVertical:'top',
    fontSize:17
},
holeData: {
    textAlignVertical:'top',
    textAlign:'center',
    paddingVertical:10,
    fontSize:25,
    color:'whitesmoke'
},
cont: {flexDirection:'column',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%'


},
contRow:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginVertical:5,
},

})