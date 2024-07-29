import { StyleSheet, Text, View } from "react-native"
import { Shot, toPars } from "../DataBase/Classes";
import { LinearGradient } from "expo-linear-gradient";
const BigStats = ({roundsPlayed,  holesPlayed, bestRound, avgScore}:{roundsPlayed: number, holesPlayed: number, bestRound: number, avgScore: number  }) => {
    return (
        <View>
        <View style={{flexDirection:'row',justifyContent:'space-evenly', alignItems:'center'}}>

                <LinearGradient colors={['#4f4f4f', '#333']} style={styles.statSquare}>
                  <Text style={{color:'whitesmoke', fontSize:16, fontFamily:'arial', fontStyle:'italic',}}>Rounds Played</Text>
                  <Text style={{color:'whitesmoke', fontSize:40,marginLeft:10, fontFamily:'arial', fontStyle:'italic',}}>{roundsPlayed}</Text>
                </LinearGradient>
                
                
                <LinearGradient colors={['#4f4f4f', '#333']} style={styles.statSquare}>
                  <Text style={{color:'whitesmoke', fontSize:16, fontFamily:'arial', fontStyle:'italic',}}>Holes Played</Text>
                  <Text style={{color:'whitesmoke', fontSize:40,marginLeft:10, fontFamily:'arial', fontStyle:'italic',}}>{holesPlayed}</Text>
                </LinearGradient>
                
              </View>
        <View style={{flexDirection:'row',justifyContent:'space-evenly', alignItems:'center'}}>

                <LinearGradient colors={['#4f4f4f', '#333']} style={styles.statSquare}>
                  <Text style={{color:'whitesmoke', fontSize:20, fontFamily:'arial', fontStyle:'italic',}}>Avg. Score</Text>
                  <Text style={{color:'whitesmoke', fontSize:40,marginLeft:10, fontFamily:'arial', fontStyle:'italic',}}>{avgScore}</Text>
                </LinearGradient>
                
                <LinearGradient colors={['#4f4f4f', '#333']} style={styles.statSquare}>
                  <Text style={{color:'whitesmoke', fontSize:20, fontFamily:'arial', fontStyle:'italic',}}>Best Round</Text>
                  <Text style={{color:'whitesmoke', fontSize:40,marginLeft:10, fontFamily:'arial', fontStyle:'italic',}}>{bestRound}</Text>
                </LinearGradient>
               

              </View>
              </View>
                
    )
    {/* <View style={{backgroundColor:'#555', padding:10, borderRadius:15, flexDirection:'row', justifyContent:'center', alignItems:'center',marginVertical:5}}>
      <Text style={{color:'whitesmoke', fontSize:20, fontFamily:'arial', fontStyle:'italic',}}>Putts Per Hole:</Text>
      <Text style={{color:'whitesmoke', fontSize:40,marginLeft:10, fontFamily:'arial', fontStyle:'italic',}}>{Math.floor((shotTotals.putts/holesPlayed)*100)/100}</Text>
    </View> */}

    {/* <View style={{backgroundColor:'#555', padding:10, borderRadius:15, flexDirection:'row', justifyContent:'center', alignItems:'center',marginVertical:5}}>
      <Text style={{color:'whitesmoke', fontSize:20, fontFamily:'arial', fontStyle:'italic',}}>Total Par 3 Score:</Text>
      <Text style={{color:'whitesmoke', fontSize:40,marginLeft:10, fontFamily:'arial', fontStyle:'italic',}}>{roundStatTotals.toPar3 > 0 ? '+' : ''}{roundStatTotals.toPar3}</Text>
    </View>
    <View style={{backgroundColor:'#555', padding:10, borderRadius:15, flexDirection:'row', justifyContent:'center', alignItems:'center',marginVertical:5}}>
      <Text style={{color:'whitesmoke', fontSize:20, fontFamily:'arial', fontStyle:'italic',}}>Total Par 4 Score:</Text>
      <Text style={{color:'whitesmoke', fontSize:40,marginLeft:10, fontFamily:'arial', fontStyle:'italic',}}>{roundStatTotals.toPar4 > 0 ? '+' : ''}{roundStatTotals.toPar4}</Text>
    </View>
    <View style={{backgroundColor:'#555', padding:10, borderRadius:15, flexDirection:'row', justifyContent:'center', alignItems:'center',marginVertical:5}}>
      <Text style={{color:'whitesmoke', fontSize:20, fontFamily:'arial', fontStyle:'italic',}}>Total Par 5 Score:</Text>
      <Text style={{color:'whitesmoke', fontSize:40,marginLeft:10, fontFamily:'arial', fontStyle:'italic',}}>{roundStatTotals.toPar5 > 0 ? '+' : ''}{roundStatTotals.toPar5}</Text>
    </View> */}
}
export default BigStats;

const styles = StyleSheet.create({
  statSquare : {
     
    padding:10, 
    borderRadius:15, 
    flexDirection:'column', 
    justifyContent:'center', 
    alignItems:'center', 
    marginTop:10, 
    marginBottom:5, 
    width:150, 
    marginHorizontal:2, 
    height:100
  }
})