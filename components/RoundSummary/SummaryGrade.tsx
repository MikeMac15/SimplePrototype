import { Text, View, StyleSheet } from 'react-native'
import { Round } from '../DataBase/Classes';
import { calculateScore, getRoundGrade } from '../DataBase/Points';
import { useEffect, useMemo, useState } from 'react';
import { getHCP } from '../DataBase/localStorage';

interface SummaryGradeProps {
    round: Round;
}

const SummaryGrade: React.FC<SummaryGradeProps> = ({ round }) => {

    const [hcp, setHcp] = useState<number|null>(null);

    useEffect(() => {
        const fetchHcp = async() => {
            const h = await getHCP(); 
            setHcp(h);
        };
        fetchHcp();
    },[])

    
    
    const grade = getRoundGrade(round, hcp ? hcp : 0);
    
    





    const Column = ({titles, data}:{titles:string[], data:number[]}) => {
        return (
            <View>
                {titles.map((title, index) => {
                    return (
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:2, marginLeft:15}} key={index}>
                            <Text style={{color:'whitesmoke'}}>{title} </Text>
                            <Text style={{color:'#CCC', fontSize:20}}>{ data[index]}</Text>
                       

                        </View>
                    )
                })}
            </View>
        )
    }
   

    const titles = ['Great', 'Good', 'Bad', 'Putts', 'GIR', 'FIR'];
    const data = [round.great, round.good, round.bad, round.totalPutts, round.totalGIR, round.totalFIR];
    const titles2 = ['Eagle-','Birdies', 'Pars', 'Bogeys', 'Dbl+','HCP'];
    const data2 = [round.eaglesOless, round.birdies, round.pars, round.bogeys, round.doublePlus, hcp ? hcp : 0];


    const gradeColor = (grade:string) => {
        if (grade === "F") return 'red';
        if (grade === "D") return 'salmon';
        if (grade === "C") return 'orange';
        if (grade === "C+") return 'gold';
        if (grade === "B") return 'yellow';
        if (grade === "B+") return 'lightgreen';
        if (grade === "A") return 'yellowgreen';
        if (grade === "A+") return 'skyblue';
        return 'green';
    };


    return (
        <View style={styles.container}>
            <Text style={{textAlign:'center', fontSize:22, color:'whitesmoke'}}>SummaryGrade</Text>
            <View style={{ alignItems:'center', flexDirection:'row'}}>
            <View style={{ alignItems:'center'}}>

            <Text style={{fontSize:100, marginHorizontal:10, color:gradeColor(grade), textShadowColor:gradeColor(grade), textShadowOffset:{width:2,height:2}, textShadowRadius:4}}>{grade}</Text>
            <Text style={{fontSize:16, marginHorizontal:10, color:'#555'}}>({calculateScore(round,hcp ? hcp : 0).toFixed(2)})</Text>
            </View>
            <View style={{marginHorizontal:10}}>
                <Column titles={titles} data={data} />
            </View>
            <View style={{marginHorizontal:10}}>
                <Column titles={titles2} data={data2} />
            </View>
            </View>
        </View>
    )
}

export default SummaryGrade;



const styles = StyleSheet.create({
    container: {

    },

})