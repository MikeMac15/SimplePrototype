
import AllShotPieChart from '@/components/StatComponents/AllShotPieChart';
import RecentRoundStatList from '@/components/StatComponents/RecentRounds';
import { Stack } from 'expo-router';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native'

import { MenuGradients, getRibbonImageSource } from '@/constants/Colors';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { getRoundAllStats, getTimelineScores } from '@/components/DataBase/API';
import BigStats from '@/components/StatComponents/BigStats';
import { AllStats, Shot, TimelineStats, toPars } from '@/components/DataBase/Classes';
import { getMenuGradient, getRibbonImage } from '@/components/DataBase/localStorage';
import ParStatistics from '@/components/StatComponents/ParStats';

import ScoringView, { ScoringBarChart } from '@/components/StatComponents/courseStats/overview/ScoringView';
import { green } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import Timeline from '@/components/StatComponents/courseStats/overview/Timeline';
import CourseAveragesView from '@/components/StatComponents/courseStats/overview/CourseAveragesView';



export default function index() {
    //////////////////////////////////////////////////////////////////////////
    const [gradient, setGradient] = useState('cool-guy')
    const [ribbonImage, setRibbonImage] = useState('proud-parent')
    const getPreferences = async () => {
        const value = await getMenuGradient()
        setGradient(value)
        const ribbonImgTag = await getRibbonImage()
        setRibbonImage(ribbonImgTag)
    }

    useEffect(() => {
        getPreferences();
    }, [])
    const image = getRibbonImageSource(ribbonImage)
    //////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////
    const [shotTotals, setShotTotals] = useState({ bad: 0, good: 0, great: 0, totalPutts: 0 });
    const [timelineScores, setTimelineScores] = useState<number[]>([])
    const [roundStatTotals, setRoundStatTotals] = useState<AllStats>({
        count: 0,
        minScore: 0,
        maxScore: 0,
        avgStrokes: 0,
        eaglesOless: 0,
        birdies: 0,
        pars: 0,
        bogies: 0,
        doublePlus: 0,
        toPar3: 0,
        toPar4: 0,
        toPar5: 0,
        great: 0,
        good: 0,
        bad: 0,
        totalPutts: 0,
        avgGIR: 0,
        avgFIR: 0,
    });


    useEffect(() => {
        const fetchRoundData = async () => {
            try {
                const roundStats = await getRoundAllStats();

                const totals = {
                    count: roundStats.count,
                    minScore: roundStats.minScore,
                    maxScore: roundStats.maxScore,
                    avgStrokes: roundStats.avgStrokes,
                    eaglesOless: roundStats.eaglesOless,
                    birdies: roundStats.birdies,
                    pars: roundStats.pars,
                    bogies: roundStats.bogies,
                    doublePlus: roundStats.doublePlus,
                    toPar3: roundStats.toPar3,
                    toPar4: roundStats.toPar4,
                    toPar5: roundStats.toPar5,
                    great: roundStats.great,
                    good: roundStats.good,
                    bad: roundStats.bad,
                    totalPutts: roundStats.totalPutts,
                    avgGIR: roundStats.avgGIR,
                    avgFIR: roundStats.avgFIR
                };
                const Shots = {
                    great: roundStats.great,
                    good: roundStats.good,
                    bad: roundStats.bad,
                    totalPutts: roundStats.totalPutts,
                }

                setShotTotals(Shots)
                setRoundStatTotals(totals);


                const timelineScoreArray = await getTimelineScores();
                setTimelineScores(timelineScoreArray)


            } catch (error) {
                console.error("Error fetching round data:", error);
            }
        };


        fetchRoundData();
    }, []);

    //////////////////////////////////////////////////////////////////////////








    return (

        <LinearGradient colors={MenuGradients[gradient]} style={styles.container2}>

            <Stack.Screen options={{
                title: 'StatHub',
                headerBackTitle: "Menu",
                headerBackground: () => (
                    <ImageBackground
                        source={image}
                        style={[StyleSheet.absoluteFill, { flex: 1 }]}
                    />
                ),
                headerTitleStyle: { fontSize: 25, fontWeight: '800' }
            }} />
            <SQLiteProvider databaseName='golfGooderSimple.db' >


                <ScrollView style={{ overflow: 'hidden' }}>
                            <Text style={{ fontSize: 25, color: 'whitesmoke', fontFamily: 'arial', fontStyle: 'italic', marginTop: 20, marginBottom: 0, textAlign:'center' }}>Scoring Overview</Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                <BigStats avgScore={roundStatTotals.avgStrokes} roundsPlayed={roundStatTotals.count} holesPlayed={roundStatTotals.count * 18} bestRound={roundStatTotals.minScore} />
                        </View>
                    <View style={styles.container}>

                        <View style={{ transform: 'scale(0.9)' }}>
                            <CourseAveragesView best={roundStatTotals.minScore} worst={roundStatTotals.maxScore} avgScore={roundStatTotals.avgStrokes} avgGIR={(roundStatTotals.avgGIR / 18) * 100} avgFIR={(roundStatTotals.avgFIR / 14) * 100} avgPPR={(roundStatTotals.totalPutts / roundStatTotals.count)} count={roundStatTotals.count} />
                        </View>
                                <Timeline data1={timelineScores} />
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                <View>

                                <ScoringView eagleOless={roundStatTotals.eaglesOless} birdies={roundStatTotals.birdies} pars={roundStatTotals.pars} bogeys={roundStatTotals.bogies} dblPlus={roundStatTotals.doublePlus} />
                                    <View style={{justifyContent:'center', alignItems:'center'}}>
                                        <AllShotPieChart shotTotals={shotTotals} />
                                    </View>
                                </View>
                                
                            </View>


                        <ParStatistics />

                        <RecentRoundStatList />
                    </View>
                </ScrollView>
            </SQLiteProvider>
        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    container2: {


        height: '100%',

        // padding: 20,
        // alignItems: 'center',
    },
    container: {


        // marginVertical:20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})