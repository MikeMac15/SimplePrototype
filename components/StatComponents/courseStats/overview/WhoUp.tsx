import { AntDesign } from '@expo/vector-icons'
import { Text, View, StyleSheet} from 'react-native'


interface WhoUpProps {
    parOrLess: number,
    bogeyOrWorse: number
}

const WhoUp: React.FC<WhoUpProps> = ({ parOrLess, bogeyOrWorse }) => {
    const userWinning: boolean = parOrLess > bogeyOrWorse ? true : false
    const directionLeft: boolean = userWinning ? true : false
    const diff: number = parOrLess > bogeyOrWorse ? (parOrLess - bogeyOrWorse) : (bogeyOrWorse - parOrLess)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Who's Winning?</Text>
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>

            <Text style={styles.explaination}>You are </Text>
            <View style={styles.upDwn}>   
                        <AntDesign name={userWinning ? 'arrowup' : 'arrowdown'} color={userWinning ? 'yellowgreen' : 'salmon'} size={20} />
                        <Text style={[{fontStyle:'italic', fontSize:25}, {color: userWinning ? 'yellowgreen' : 'salmon'}]}>{diff}</Text>
                    </View> 
            <Text style={styles.explaination}> against this course.</Text>
            </View>
            <View style={styles.mainRow}>
                <View style={styles.box}>
                    <Text style={[styles.name, {color: userWinning ? 'yellowgreen' : 'salmon' }]}>Me</Text>
                    <View style={styles.upDwn}>
                        <AntDesign name={userWinning ? 'arrowup' : 'arrowdown'} color={userWinning ? 'yellowgreen' : 'salmon'} size={20} />
                        <Text style={[styles.numbers, {color: userWinning ? 'yellowgreen' : 'salmon'}]}>{parOrLess}</Text>
                    </View>
                    <Text style={styles.what}>Pars or Better</Text>
                </View>
                <View style={{marginHorizontal:20}}>
                    <Text style={{fontSize:18, marginBottom:5, marginTop:10, color:'#888'}}>vs.</Text>
                    <AntDesign name={userWinning ? 'arrowleft' : 'arrowright'} size={30} color={userWinning ? 'yellowgreen' : 'salmon'}/>
                    
                </View>
                <View style={styles.box}>
                    <Text style={[styles.name, {color: userWinning ? 'salmon' : 'yellowgreen' }]}>Course</Text>
                    <View style={styles.upDwn}>   
                        <AntDesign name={userWinning ? 'arrowdown' : 'arrowup'} color={userWinning ? 'salmon' : 'yellowgreen'} size={20} />
                        <Text style={[styles.numbers, {color: userWinning ? 'salmon' : 'yellowgreen'}]}>{bogeyOrWorse}</Text>
                    </View> 
                    <Text style={styles.what}>Bogeys Or Worse</Text>
                </View>

            </View>


        </View>
    )
}

export default WhoUp;

const styles = StyleSheet.create({
    container: {

paddingVertical:20
    },
    mainRow: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'flex-start',
    },
    box: {
        justifyContent:'center',
        alignItems:'center'
    },
    upDwn: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    }, 
    numbers: {
        fontSize: 35,
        fontStyle:'italic',
    },
    name: {
        fontSize:25, 
        fontStyle:'italic'
    },
    what: {
        fontSize:10,
        fontStyle:'italic',
        color:'#888'
    },

    title: {
        fontSize:20,
        color:'whitesmoke',
        textAlign:'center',
        marginTop:20,
        
    },
    explaination: {
        fontSize:16,
        color: 'whitesmoke',
        marginVertical:10,
        
    }

})