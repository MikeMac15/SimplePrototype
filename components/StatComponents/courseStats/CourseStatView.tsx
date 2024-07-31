import { Text, View, ScrollView } from "react-native"
import CourseAveragesView from "./overview/CourseAveragesView";
import Timeline from "./overview/Timeline";
import WhoUp from "./overview/WhoUp";
import { LinearGradient } from "expo-linear-gradient";
import ToParBreakdown from "./overview/ToParBreakdown";
import ScoringView from "./overview/ScoringView";
import { AllStats, ShotData } from "@/components/DataBase/Classes";

interface CourseStatProps {
    AllStats: AllStats,
    Subjective: ShotData,
    ShotTimeline: number[],
}

const CourseStatView: React.FC<CourseStatProps> = ({AllStats,Subjective,ShotTimeline}) => {
    
    const ParsOrLess = AllStats.eaglesOless + AllStats.birdies + AllStats.pars;
    const BogeysOrWorse = AllStats.bogies + AllStats.doublePlus;


    return (
    <LinearGradient colors={['#1f1f1f','#222','#444']}>
        {/* Timeline                                                                                            30                            40 */}
        <Timeline data1={ShotTimeline}/>
        {/* Averages */}
        <CourseAveragesView avgScore={AllStats.avgStrokes} avgPPR={AllStats.totalPutts/AllStats.count} avgGIR={(AllStats.avgGIR/18)*100} avgFIR={(AllStats.avgFIR/14)*100} count={AllStats.count} best={AllStats.minScore} worst={AllStats.maxScore} />
        {/* ToPar Breakdown */}
        <ToParBreakdown toPar3={AllStats.toPar3} toPar4={AllStats.toPar4} toPar5={AllStats.toPar5} />
   
        {/* Who's Winning? */}
        <WhoUp parOrLess={ParsOrLess} bogeyOrWorse={BogeysOrWorse} />
        {/* Scoring Barchart */}
        <ScoringView eagleOless={AllStats.eaglesOless} birdies={AllStats.birdies} pars={AllStats.pars} bogeys={AllStats.bogies} dblPlus={AllStats.doublePlus} />
    </LinearGradient>
    )
    // return (
    // <LinearGradient colors={['#1f1f1f','#222','#444']}>
    //     {/* Timeline                                                                                            30                            40 */}
    //     <Timeline data1={[77,85,82,83,76,80,84,88,89,74,76,93,77,85,82,83,76,80,84,88,89,74,76,93,80,74,70,78,85,77,89,74,76,93,80,74,70,78,85,77]}/>
    //     {/* Averages */}
    //     <CourseAveragesView avgScore={82} avgPPR={35} avgGIR={51} avgFIR={53} count={12} best={75} worst={89} />
    //     {/* ToPar Breakdown */}
    //     <ToParBreakdown toPar3={.34} toPar4={.77} toPar5={.29} />
   
    //     {/* Who's Winning? */}
    //     <WhoUp parOrLess={108} bogeyOrWorse={84} />
    //     {/* Scoring Barchart */}
    //     <ScoringView eagleOless={1} birdies={4} pars={28} bogeys={12} dblPlus={4} />
    // </LinearGradient>
    // )

}
export default CourseStatView;