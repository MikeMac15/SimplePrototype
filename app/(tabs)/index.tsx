
import AllShotPieChart from '@/components/StatComponents/AllShotPieChart';
import RecentRoundStatList from '@/components/StatComponents/RecentRounds';

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MenuGradients, getRibbonImageSource } from '@/constants/Colors';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { getRoundAllStats, getTimelineScores, openDb } from '@/components/DataBase/API';
import BigStats from '@/components/StatComponents/BigStats';
import { AllStats, QuickStats } from '@/components/DataBase/Classes';
import Timeline from '@/components/StatComponents/courseStats/overview/Timeline';
import CourseAveragesView from '@/components/StatComponents/courseStats/overview/CourseAveragesView';
import StackHeader from '@/constants/StackHeader';
import { getMenuGradient, getRibbonImage } from '@/components/DataBase/localStorage';
import ScoringView from '@/components/StatComponents/courseStats/overview/ScoringView';
import ToParBreakdown from '@/components/StatComponents/courseStats/overview/ToParBreakdown';
import ParSpecificStatView from '@/components/StatComponents/ParSpecificStatView';

export default function Index() {
    const [gradient, setGradient] = useState('OG-Dark');
    const [ribbonImage, setRibbonImage] = useState('proud-parent');
    const [shotTotals, setShotTotals] = useState({ bad: 0, good: 0, great: 0, totalPutts: 0 });
    const [timelineScores, setTimelineScores] = useState<number[]>([]);
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
        firEligible: 0,
    });

    const [par3Data, setPar3Data] = useState<QuickStats>({totalPutts:0,totalGIR:0,totalFIR:0,totalScore:0,avgScore:0,count:0,eaglesOrLess:0,birdies:0,pars:0,bogeys:0,doublePlus:0})
    const [par4Data, setPar4Data] = useState<QuickStats>({totalPutts:0,totalGIR:0,totalFIR:0,totalScore:0,avgScore:0,count:0,eaglesOrLess:0,birdies:0,pars:0,bogeys:0,doublePlus:0})
    const [par5Data, setPar5Data] = useState<QuickStats>({totalPutts:0,totalGIR:0,totalFIR:0,totalScore:0,avgScore:0,count:0,eaglesOrLess:0,birdies:0,pars:0,bogeys:0,doublePlus:0})
    

    
    
   
    
    async function getAllPar3Data(): Promise<void> {
        try {
            const db = await openDb();
            const data = await db.getFirstAsync<QuickStats>(
                `SELECT 
                SUM(putts) as totalPutts, 
                SUM(CASE WHEN GIR THEN 1 ELSE 0 END) as totalGIR, 
                SUM(CASE WHEN FIR THEN 1 ELSE 0 END) as totalFIR, 
                SUM(toPar) as totalScore, 
                AVG(toPar) as avgScore, 
                COUNT(*) as count,
                SUM(CASE WHEN toPar <= -2 THEN 1 ELSE 0 END) as eaglesOrLess,
                SUM(CASE WHEN toPar = -1 THEN 1 ELSE 0 END) as birdies,
                SUM(CASE WHEN toPar = 0 THEN 1 ELSE 0 END) as pars,
                SUM(CASE WHEN toPar = 1 THEN 1 ELSE 0 END) as bogeys,
                SUM(CASE WHEN toPar >= 2 THEN 1 ELSE 0 END) as doublePlus
             FROM holestats 
             JOIN hole ON hole.id = hole_id 
             WHERE hole.par = 3;`
            );
            if (data)
                setPar3Data(data);
        } catch (error) {
            console.error("Failed to fetch Par 3 data", error);
            
        }
    }
    async function getAllPar4Data(): Promise<void> {
        try {
            const db = await openDb();
            const data = await db.getFirstAsync<QuickStats>(
                `SELECT 
                SUM(putts) as totalPutts, 
                SUM(CASE WHEN GIR THEN 1 ELSE 0 END) as totalGIR, 
                SUM(CASE WHEN FIR THEN 1 ELSE 0 END) as totalFIR, 
                SUM(toPar) as totalScore, 
                AVG(toPar) as avgScore, 
                COUNT(*) as count,
                SUM(CASE WHEN toPar <= -2 THEN 1 ELSE 0 END) as eaglesOrLess,
                SUM(CASE WHEN toPar = -1 THEN 1 ELSE 0 END) as birdies,
                SUM(CASE WHEN toPar = 0 THEN 1 ELSE 0 END) as pars,
                SUM(CASE WHEN toPar = 1 THEN 1 ELSE 0 END) as bogeys,
                SUM(CASE WHEN toPar >= 2 THEN 1 ELSE 0 END) as doublePlus
             FROM holestats 
             JOIN hole ON hole.id = hole_id 
             WHERE hole.par = 4;`
                
            );
            if (data)
                setPar4Data(data);
        } catch (error) {
            console.error("Failed to fetch Par 4 data", error);
            
        }
    }
    async function getAllPar5Data(): Promise<void> {
        try {
            const db = await openDb();
            const data = await db.getFirstAsync<QuickStats>(
                `SELECT 
                SUM(putts) as totalPutts, 
                SUM(CASE WHEN GIR THEN 1 ELSE 0 END) as totalGIR, 
                SUM(CASE WHEN FIR THEN 1 ELSE 0 END) as totalFIR, 
                SUM(toPar) as totalScore, 
                AVG(toPar) as avgScore, 
                COUNT(*) as count,
                SUM(CASE WHEN toPar <= -2 THEN 1 ELSE 0 END) as eaglesOrLess,
                SUM(CASE WHEN toPar = -1 THEN 1 ELSE 0 END) as birdies,
                SUM(CASE WHEN toPar = 0 THEN 1 ELSE 0 END) as pars,
                SUM(CASE WHEN toPar = 1 THEN 1 ELSE 0 END) as bogeys,
                SUM(CASE WHEN toPar >= 2 THEN 1 ELSE 0 END) as doublePlus
             FROM holestats 
             JOIN hole ON hole.id = hole_id 
             WHERE hole.par = 5;`
                

            );
            if (data)
            setPar5Data(data);
        } catch (error) {
            console.error("Failed to fetch Par 5 data", error);
            
        }
    }

    useEffect(()=>{
        getAllPar3Data()
        getAllPar4Data()
        getAllPar5Data()
    },[])



    const getPreferences = useCallback(async () => {
        try {
            const [value, ribbonImgTag] = await Promise.all([getMenuGradient(), getRibbonImage()]);
            setGradient(value);
            setRibbonImage(ribbonImgTag);
        } catch (error) {
            console.error('Failed to fetch preferences:', error);
        }
    }, []);

    const fetchRoundData = useCallback(async () => {
        try {
          const [roundStats, timelineScoreArray] = await Promise.all([getRoundAllStats(), getTimelineScores()]);
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
            avgFIR: roundStats.avgFIR,
            firEligible: roundStats.firEligible, // Add this line
          };
          setShotTotals({ great: roundStats.great, good: roundStats.good, bad: roundStats.bad, totalPutts: roundStats.totalPutts });
          setRoundStatTotals(totals);
          setTimelineScores(timelineScoreArray);
        } catch (error) {
          console.error('Error fetching round data:', error);
        }
      }, []);
      

    useEffect(() => {
        getPreferences();
    }, [getPreferences]);

    useEffect(() => {
        fetchRoundData();
    }, [fetchRoundData]);

    const image = useMemo(() => getRibbonImageSource(ribbonImage), [ribbonImage]);

    const delayedLoading = () => {
        setTimeout(() => {
         return <Text style={{color:'whitesmoke', fontSize:20}}>No rounds played yet</Text> 
        }, 500);
    }

    if (roundStatTotals.count === 0) {return <LinearGradient colors={MenuGradients[gradient]} style={styles.container2}></LinearGradient>}
    return (
        <LinearGradient colors={MenuGradients[gradient]} style={styles.container2}>
            
            {roundStatTotals.count === 0 ?
            <View style={styles.centered}><Text style={{color:'whitesmoke', fontSize:20}}>No rounds played yet.</Text><Text style={{color:'whitesmoke', fontSize:20}}>Come back after a few rounds to view your statistics.</Text></View>
        :
                <ScrollView style={{ overflow: 'hidden' }}>
                    <View style={[styles.centered,{marginTop:10}]}>
                        <BigStats
                            avgScore={roundStatTotals.avgStrokes}
                            roundsPlayed={roundStatTotals.count}
                            holesPlayed={roundStatTotals.count * 18}
                            bestRound={roundStatTotals.minScore}
                            />
                    </View>
                    <Text style={styles.title}>Scoring Overview</Text>
                    <View style={styles.container}>
                        <View style={styles.scaleDown}>
                            <CourseAveragesView
                                best={roundStatTotals.minScore}
                                worst={roundStatTotals.maxScore}
                                avgScore={roundStatTotals.avgStrokes}
                                avgGIR={(roundStatTotals.avgGIR / 18) * 100}
                                avgFIR={(roundStatTotals.avgFIR / roundStatTotals.firEligible) * 100}
                                avgPPR={roundStatTotals.totalPutts / roundStatTotals.count}
                                count={roundStatTotals.count}
                                />
                        </View>
                        <View>
                            <Text style={styles.title}>Avg Par Score</Text>
                            <ToParBreakdown toPar3={Math.round((par3Data.avgScore+3)*10)/10} toPar4={Math.round((par4Data.avgScore+4)*10)/10} toPar5={Math.round((par5Data.avgScore+5)*10)/10} />
                        </View>
                        <View style={{width:'100%'}}>
                        <Text style={styles.title}>Scoring Timeline</Text>
                                <Timeline data1={timelineScores} />
                        </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                <View>

                                

                                    {/* <View style={{justifyContent:'center', alignItems:'center'}}>
                                        <AllShotPieChart shotTotals={shotTotals} />
                                        </View> */}
                                </View>
                                
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                                <ParSpecificStatView par3data={par3Data} par4data={par4Data} par5data={par5Data} roundStatTotals={roundStatTotals} />
                            </View>
                        <RecentRoundStatList />
                    </View>
                </ScrollView>
        }
            
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container2: {
        height: '100%',
    },
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        color: 'whitesmoke',
        fontFamily: 'arial',
        fontStyle: 'italic',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    scaleDown: {
        transform: 'scale(0.9)',
    },
    fullWidth: {
        width: '100%',
    },
    rowCentered: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});