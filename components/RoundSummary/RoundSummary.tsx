import { Text, View, StyleSheet } from 'react-native'
import { Round } from '../DataBase/Classes';
import Summary from './Summary';
import GIRFIR from './GIRFIR';
import HoleSummaryBarChart from './HoleSummaryBarChart';
import SummaryGrade from './SummaryGrade';

interface RoundSummaryProps {
    round: Round;
    course: string;
    tee: string;
}

const RoundSummary: React.FC<RoundSummaryProps> = ({ round, course, tee }) => {


    const Header = () => {
        return(
            <View style={{flexDirection:'row', justifyContent:'space-evenly', alignItems:'center', marginTop:10}}>

                <View style={{justifyContent:'center', alignItems:'center', flexBasis:150}}>
                    
                    <Text style={styles.text}>{course}</Text>
                </View>

                <View style={{justifyContent:'center', alignItems:'center', flexBasis:150}}>
                    
                    <Text style={styles.text}>{tee}</Text>
                </View>

                <View style={{justifyContent:'center', alignItems:'center', flexBasis:100}}>
                    
                    <Text style={styles.text}>{round.date}</Text>
                </View>

            </View>
        )
    }


    return (
        <View style={styles.container}>
            <Header />
            {/* |strokes|piechart|topar| */}
            <Summary round={round} />
         
            {/* |   GIR     |    FIR   | */}
            <GIRFIR gir={round.totalGIR} fir={round.totalFIR} />
       
            {/* |     HoleBarChart     | */}
            <View style={{transform:'scaleX(0.85)', paddingRight:50}}>
                <HoleSummaryBarChart round={round} />
            </View>
            {/* |     RoundQuality     | */}
            <SummaryGrade round={round} />
        </View>
    )
}

export default RoundSummary;



const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        alignItems:'center',
        height: '100%',
        paddingBottom:10,
    },
    textTitle: {
        color:'#888',
        fontSize:12,
        marginTop:5,
    },
    text:{
        color:'#ccc',
        fontSize:16,
    }

})