import { AllStats } from "@/components/DataBase/Classes";
import CourseStatView from "@/components/StatComponents/courseStats/CourseStatView";
import HoleStats from "@/components/StatComponents/courseStats/holeStats/HoleStats";

import { teeTextColor, TeeColors } from "@/constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native"

const CourseStats = () => {
    const params = useLocalSearchParams();
    const { teeID, courseName, teeColor1, teeColor2 } = params;

    const [viewSelection, setViewSelection] = useState(0)
    const [showSelection, setShowSelection] = useState(false)
    const [btnTitle, setBtnTitle] = useState('Course Overview')

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
                const roundStats = await getCourseAllStats();

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


    const DisplayView = () => {

        switch (viewSelection) {
            case 0:
                return <CourseStatView />
            case 1:
                return <HoleStats title='Average Score' data={[0]} />
            case 2:
                return <HoleStats title='Total Score' data={[0]} />
            case 3:
                return <HoleStats title='Putts Per Hole' data={[0]} />
            case 4:
                return <HoleStats title='Green In Regulation' data={[0]} />
            case 5:
                return <HoleStats title='Fairway In Regulation' data={[0]} />
        }
    }


    const DropDown = () => {
        return (<View>
            <Button title="Course Overview" onPress={()=>{setViewSelection(0); setShowSelection(!showSelection); setBtnTitle('Course Overview')}} />
            <Button title="Average Score" onPress={()=>{setViewSelection(1); setShowSelection(!showSelection); setBtnTitle('Average Score')}} />
            <Button title="Total Score" onPress={()=>{setViewSelection(2); setShowSelection(!showSelection); setBtnTitle('Total Score')}} />
            <Button title="Putts Per Hole" onPress={()=>{setViewSelection(3); setShowSelection(!showSelection); setBtnTitle('Putts Per Hole')}} />
            <Button title="Green In Regulation" onPress={()=>{setViewSelection(4); setShowSelection(!showSelection); setBtnTitle('Green In Regulation')}} />
            <Button title="Fairway In Regulation" onPress={()=>{setViewSelection(5); setShowSelection(!showSelection); setBtnTitle('Fairway In Regulation')}} />
            
        </View>)
    }

    return (
        <ScrollView>
            <Stack.Screen options={{ title: `Course Stats`, }} />
            <View style={{}}>
                <Text style={{ textAlign: 'center' }}>{`${String(courseName)} ${TeeColors[Number(teeColor1)]} ${Number(teeColor2) > 0 ? TeeColors[Number(teeColor2)] : ''}`}</Text>

            </View>
            <TouchableOpacity style={{ backgroundColor: '#111', paddingVertical:0}} onPress={()=>setShowSelection(!showSelection)}>
                {showSelection
                ? <DropDown />
                : <Button title={btnTitle} onPress={()=> setShowSelection(!showSelection)} />
                }
            </TouchableOpacity>
            {DisplayView()}

        </ScrollView>
    )

}
export default CourseStats;