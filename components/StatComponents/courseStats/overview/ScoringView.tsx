import { Text, View, StyleSheet } from 'react-native'
import { BarChart } from 'react-native-gifted-charts';

export const ScoringBarChart = ({pars, over, under}:{pars:number, over:number, under:number}) => {
    const barData = [
        
        {value: under, label: 'Under', frontColor: 'skyblue'},
        {value: pars, label: 'Par', frontColor: 'yellowgreen'},
        {value: over, label: 'Over', frontColor: 'salmon'},
        
    ];
    return (
        <View>
            <BarChart
                
                barWidth={20}
                height={170}
                barBorderRadius={3}
                
                frontColor="#888"
                yAxisTextStyle={{color:'#ccc'}}
                xAxisLabelTextStyle={{color:'#ccc'}}
                data={barData}
                yAxisThickness={0}
                xAxisThickness={0}
            />
        </View>
    );
};



interface ScoringViewProps {
  eagleOless:number,
  birdies:number,
  pars:number,
  bogeys:number,
  dblPlus:number,
  
}

const ScoringView: React.FC<ScoringViewProps> = ({eagleOless,birdies,pars,bogeys,dblPlus}) => {


    const ScoringText = ({title,value, extra}:{title:string, value:number, extra:string}) => {
        return (
            <View style={{ alignItems:'center', flexDirection:'row'}}>
                <Text style={styles.value}>{value}</Text>
            <View style={{ justifyContent:'flex-start', alignItems:'flex-start',}}>
                <Text style={styles.title}>{title}</Text>
                {
                    extra.length > 0
                    ? <Text style={styles.extra}>{extra}</Text>
                    : ''
                }
                </View>
    
                </View>
        )
    }





  return (
<View style={styles.container}>
    <View style={{flexDirection:'row'}}>
    
    <View style={{flexDirection:'column',marginTop:10}}>
    <View>
    <ScoringText title='Eagles' extra='(or less)' value={eagleOless} />
    <ScoringText title='Birdies' extra='' value={birdies} />
    </View>
    <ScoringText title='Pars' extra='' value={pars} />
    <View>

    <ScoringText title='Bogeys' extra='' value={bogeys} />
    <ScoringText title='Dbl Bogeys' value={dblPlus} extra='(or more)'/>
    </View>
    </View>
<ScoringBarChart pars={pars} over={bogeys + dblPlus} under={birdies + eagleOless}/>
    </View>
</View>
)
}

export default ScoringView;



const styles = StyleSheet.create({
container: {
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:20
},
title: {
    color: '#ddd',
    fontSize: 20,
},
value: {
    color: '#ddd',
    fontSize: 30,
    width:50,
    textAlign:'center'
},
extra:{
    fontSize:8,
    color:'#aaa'
}

})