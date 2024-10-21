
import { StyleSheet, Text, View } from "react-native";
import PieChart from "react-native-pie-chart";
import AllShotPieChart from "../StatComponents/AllShotPieChart";
import { BarChart } from "react-native-gifted-charts";
import { MostRecentRound, Round } from "../DataBase/Classes";
import { useCallback, useEffect, useState } from "react";
import { getRecentRounds } from "../DataBase/API";
import { TeeColors, teeTextColor } from "@/constants/Colors";
import { useFocusEffect } from "expo-router";


  
  
  
  interface Shot {
      putts:number,
      great:number,
      good:number,
      bad:number
    }

    
const HomeRecentRound = () => {
    const [recentRound, setRecentRound] = useState<MostRecentRound>()


    const getMostRecentRound = async() => {
        try {

            const recent: MostRecentRound = await getRecentRounds()
            if (recent)
                setRecentRound(recent)
        } catch {
            
        }
    }
    

    useFocusEffect(
        useCallback(() => {
          getMostRecentRound();
        }, [])
      );


    const CourseName = () => {
        if (recentRound)
        return (
            <View style={styles2.statsCourseTitle}>
                <Text style={styles2.courseName}>{recentRound.courseName}</Text>
                <Text style={{color: teeTextColor(Number(recentRound.color)), marginLeft:5}}>{TeeColors[Number(recentRound.color)]}</Text>
                <Text style={{color:'whitesmoke', marginLeft:5}}>{recentRound.date}</Text>
            </View>
        )
    }
    const HomeRRStats = () => {

        const Statwithlabel = (title:string, statNum: number, plus:boolean, refStat: number | undefined = undefined) => {
            if (refStat){
                return(
                    <View style={styles2.statCont}>
                        <Text style={styles2.statLabel}>{title} </Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={styles2.statStatNum}> {statNum > 0 && plus ? '+' : ''}{statNum}</Text>
                        <Text style={styles2.refStatNum}>({refStat > 0 ? '+' : ''}{refStat})</Text>
                        </View>
                    </View>
                )
                } else {
                    
                    return(
                        <View style={styles2.statCont}>
                    <Text style={styles2.statLabel}>{title} </Text>
                         <Text style={styles2.statStatNum}> {statNum > 0 && plus ? '+' : ''}{statNum}</Text>
                    
                    
                </View>
            )
        }
    }
        if (recentRound)
        return (
            <View style={{}}>
                {Statwithlabel('Total Strokes', recentRound.totalStrokes, false, (recentRound.toPar3 + recentRound.toPar4 + recentRound.toPar5)) }
                <View style={{flexDirection:'row'}}>
                <View>

                {Statwithlabel("Putts", recentRound.totalPutts, false) }
                {Statwithlabel("Greens", recentRound.totalGIR, false) }
                {Statwithlabel("Fairways", recentRound.totalFIR, false) }
               
                </View>
                <View>

                {Statwithlabel("Par3's", recentRound.toPar3, true) }
                {Statwithlabel("Par4's", recentRound.toPar4, true) }
                {Statwithlabel("Par5's", recentRound.toPar5, true) }
               
                </View>
                </View>
            </View>
        )
    }


    const StatChart = () => {
        let shot: Shot = {
            putts:0,
            great:0,
            good:0,
            bad:0}
        if (recentRound){

            shot = {
                putts: recentRound.totalPutts,
                great: recentRound.great,
                good: recentRound.good,
                bad: recentRound.bad
            } 
        }
        const barData = [
            {value: shot.putts, label: 'Putts', frontColor:'#777'},
            {value: shot.great, label: 'Great', frontColor:'skyblue'},
            {value: shot.good, label: 'Good', frontColor: 'yellowgreen'},
            {value: shot.bad, label: 'Bad', frontColor: 'salmon'},
            
        ];
        return (
            // <View style={{backgr}}>
                 <BarChart

                    backgroundColor={'rgba(20,20,20,.1)'}
                    shiftX={-40}
                    shiftY={-35}
                    isAnimated
                    isThreeD
                    topColor={'#444'}
                    sideColor={'#555'}
                        horizontal
                        barWidth={25}
                        barBorderRadius={6}
                        frontColor="lightgray"
                        data={barData}
                        yAxisThickness={1}
                        xAxisThickness={1}
                        xAxisColor={'white'}
                        yAxisColor={'white'}
                        
                        xAxisLabelsVerticalShift={20}
                        xAxisIndicesColor={'black'}
                        xAxisLabelTextStyle={{color:'white', fontSize:16, fontWeight:'600'}}
                        yAxisTextStyle={{color:'white'}}
                    />
            // </View>
        )
    } 




    return(
        <View style={{transform:'scaleY(.85)'}}>
            
    <View style={styles.mainCont}>
        <CourseName />
    <View style={[{flexDirection:'row',alignItems:'center', justifyContent:'center'}]}>
        <View style={styles.pie}>
            <StatChart />
            
        </View>
        <View style={{marginRight:10}}>
            <HomeRRStats />
        </View>
    </View>
        </View>
        </View>
    )
}


const styles = StyleSheet.create({
    mainCont: {
        // width:300,
        // height:150,
        backgroundColor:'rgba(50,50,50,.85)',
        flexDirection:'column',
        transform:'scaleX(.7)',
        justifyContent:'center',
        alignItems:'center',
         borderRadius:20,
        padding:20

    },
    pie: {
        alignItems:'center', justifyContent:'center',
        transform:'scaleX(.75)',
       
        // backgroundColor:'white'
    }
})
const styles2 = StyleSheet.create({
    statsCourseTitle: {
        // backgroundColor:'rgba(20,20,20,.95)',
        // width:150,
        // height:126,
        // margin:20
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'baseline'
    },
    courseName: {
        fontSize:30,
        color:'whitesmoke'
    },
    statCont: {
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-end',
        marginLeft:10
    },
    statLabel: {
        fontSize:18,
        color:'#ddd'
        },
        statStatNum: {
        fontSize:26,
        color:'whitesmoke',
        fontWeight:'600'

    },
        refStatNum: {
        fontSize:12,
        color:'whitesmoke',
        marginTop:5,
        marginLeft:2
    },
})



export default HomeRecentRound;

