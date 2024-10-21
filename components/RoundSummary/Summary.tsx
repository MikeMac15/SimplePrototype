import { Text, View, StyleSheet } from 'react-native'
import { Round } from '../DataBase/Classes';
import RoundSumPieChart from './RoundSumPieChart';

interface SummaryProps {
    round: Round;
}

const Summary: React.FC<SummaryProps> = ({ round }) => {

    const Column = ({title1, title2, title3, data1, data2, data3, topar}:{title1:string, title2:string, title3:string, data1:number, data2:number, data3:number, topar:boolean}) => {
        return (
            <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center', marginHorizontal:26,}}>
                <Text style={styles.dataTitle}>{title1}</Text>
                <Text style={styles.data}>{ topar ? data1 >= 0 ? '+': '' : ''}{data1}</Text>
                <Text style={styles.dataTitle}>{title2}</Text>
                <Text style={styles.data}>{ data2 >= 0 ? '+': '' }{data2}</Text>
                <Text style={styles.dataTitle}>{title3}</Text>
                <Text style={styles.data}>{ topar ? data3 >= 0 ? '+': '' : ''}{data3}</Text>
            </View>
        )
    }


    return (
        <View style={{}}>
            <Text style={{textAlign:'center', color:'whitesmoke', fontSize:25, transform: 'translateY(10px)'}}>Round Summary</Text>
        <View style={styles.container}>
            {/*  |strokes| */}
            <Column title1={'Strokes'} title2={'ToPar'} title3={'Putts'} data1={round.totalStrokes} data2={round.toPar} data3={round.totalPutts} topar={false} />
            {/* |piechart| */}
            <RoundSumPieChart great={round.great} good={round.good} bad={round.bad} putts={round.totalPutts} />
            {/*  |topar|  */}
            <Column title1={"Par 3's"} title2="Par 4's" title3="Par 5's" data1={round.toPar3} data2={round.toPar4} data3={round.toPar5} topar={true} />
          

        </View>
        </View>
    )
}

export default Summary;



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // justifyContent:'space-evenly',
        // alignItems:'center',
        height: 250,
        // backgroundColor: 'rgba(0,0,0,0.9)',
    },
    data: {
        fontSize: 30,
        color: 'whitesmoke',
        marginBottom: 10
    },
    dataTitle: {
        fontSize: 18,
        color: 'whitesmoke'
    }

})