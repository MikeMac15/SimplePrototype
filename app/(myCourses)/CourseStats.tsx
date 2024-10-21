import { getCourseHoleData, getTeeAllStats, getTeeTimelineScores } from "@/components/DataBase/API";
import { AllStats, CourseHoleData } from "@/components/DataBase/Classes";
import { getMenuGradient, getRibbonImage } from "@/components/DataBase/localStorage";
import CourseStatView from "@/components/StatComponents/courseStats/CourseStatView";

import HoleStats2 from "@/components/StatComponents/courseStats/holeStats/HoleStats2";

import { teeTextColor, TeeColors, getRibbonImageSource, MenuGradients } from "@/constants/Colors";
import StackHeader from "@/constants/StackHeader";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native"

/**
 * CourseStats component displays statistical data for a golf course.
 * It fetches and displays various statistics such as average scores, 
 * hole pars, and shot totals for a specific tee.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <CourseStats />
 *
 * @remarks
 * This component uses several hooks to manage state and side effects:
 * - `useLocalSearchParams` to get URL parameters.
 * - `useState` to manage component state.
 * - `useEffect` to fetch data when the component mounts.
 *
 * The component fetches data from several asynchronous functions:
 * - `getMenuGradient` to get the gradient preference.
 * - `getRibbonImage` to get the ribbon image preference.
 * - `getTeeAllStats` to get all statistics for a specific tee.
 * - `getTeeTimelineScores` to get timeline scores for a specific tee.
 * - `getCourseHoleData` to get hole data for a specific tee.
 *
 * The component conditionally renders different views based on the state:
 * - A dropdown menu to select between "Course Overview" and "Holes Overview".
 * - A `ScrollView` to display either `CourseStatView` or `HoleStats2` based on the selected view.
 * - A message indicating no data if there are no timeline scores.
 *
 * @function
 * @name CourseStats
 */
const CourseStats = () => {
    const height = Dimensions.get('window').height;

    const params = useLocalSearchParams();
    const { teeID, courseName, teeColor1, teeColor2 } = params;

    const [viewSelection, setViewSelection] = useState(0)
    const [showSelection, setShowSelection] = useState(false)
    const [btnTitle, setBtnTitle] = useState('Course Overview')

    const [courseHoleData, setCourseHoleData] = useState<CourseHoleData>({
        holePars: [0],
        avgScores: [0],
        totalScores: [0],
        pph: [0],
        gir: [0],
        fir: [0],
        count: 0,
        firCount: 0,
    });


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


    const [shotTotals, setShotTotals] = useState({ bad: 0, good: 0, great: 0, totalPutts: 0 });
    const [timelineScores, setTimelineScores] = useState<number[]>([])
    const [allStatTotals, setAllStatTotals] = useState<AllStats>({
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

    useEffect(() => {
        const fetchRoundData = async () => {
            try {
                const roundStats = await getTeeAllStats(Number(teeID));

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
                    firEligible: roundStats.firEligible,
                };
                const Shots = {
                    great: roundStats.great,
                    good: roundStats.good,
                    bad: roundStats.bad,
                    totalPutts: roundStats.totalPutts,
                }

                setShotTotals(Shots)
                setAllStatTotals(totals);


                const timelineScoreArray = await getTeeTimelineScores(Number(teeID));
                setTimelineScores(timelineScoreArray);

                const courseAllHoleData = await getCourseHoleData(Number(teeID));
                setCourseHoleData(courseAllHoleData);


            } catch (error) {
                console.error("Error fetching round data:", error);
            }
        };


        fetchRoundData();
    }, []);


    const DisplayView = () => {

        switch (viewSelection) {
            case 0:
                return (<ScrollView>
                    <CourseStatView AllStats={allStatTotals} ShotTimeline={timelineScores} />
                </ScrollView>
                )
            case 1:
                return (
                    <ScrollView>
                        <HoleStats2 data={courseHoleData} />
                    </ScrollView>)

        }
    }
    const ColorSeperator = () => {
        return teeColor2.length > 1
            ?
            (
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '50%', height: 5, backgroundColor: `${TeeColors[Number(teeColor1)].toLowerCase()}` }} />
                    <View style={{ width: '50%', height: 5, backgroundColor: `${TeeColors[Number(teeColor2)].toLowerCase()}` }} />
                </View>
            )
            :
            <View style={{ width: '100%', height: 5, backgroundColor: `${TeeColors[Number(teeColor1)].toLowerCase()}` }} />
    }

    const DropDown = () => {
        return (<View>
            <Button title="Course Overview" onPress={() => { setViewSelection(0); setShowSelection(!showSelection); setBtnTitle('Course Overview') }} />
            <Button title="Holes Overview" onPress={() => { setViewSelection(1); setShowSelection(!showSelection); setBtnTitle('Holes Overview') }} />

        </View>)
    }

    return (
        <LinearGradient colors={MenuGradients[gradient]} style={{ flex: 1 }}>

            <StackHeader title={String(courseName)} image={image} imageTag={ribbonImage} />

            <ColorSeperator />
            {(timelineScores.length < 1)
                ?
                <View style={{ height: height, justifyContent: 'center', alignItems: 'center' }}>

                    <Text style={{ margin: 30, color: 'whitesmoke' }}>no data.. play a round on this course to view your statistics.</Text>
                </View>
                :
                <>

                    <TouchableOpacity style={{ backgroundColor: '#111', paddingVertical: 0 }} onPress={() => setShowSelection(!showSelection)}>
                        {showSelection
                            ? <DropDown />
                            : <Button title={btnTitle} onPress={() => setShowSelection(!showSelection)} />
                        }
                    </TouchableOpacity>
                    {DisplayView()}

                </>
            }
        </LinearGradient>

    )

}
export default CourseStats;