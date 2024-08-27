import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AllStats, QuickStats } from "../DataBase/Classes";
import { BarChart } from "react-native-gifted-charts";
import ScoringView from "./courseStats/overview/ScoringView";


type ParViewProps = {
    par3data: QuickStats,
    par4data: QuickStats,
    par5data: QuickStats,
    roundStatTotals: AllStats
}


const ParSpecificStatView: React.FC<ParViewProps> = ({ par3data, par4data, par5data, roundStatTotals }) => {


    const StatView = ({ par, stat }: { par: number, stat: number | string }) => {
        return (
            <View>
                <Text style={styles.statTitle}>
                    {`Par ${par}`}
                </Text>
                <Text style={styles.statData}>
                    {stat}
                </Text>
            </View>
        )
    }

    const CategoryView = ({ title, data3, data4, data5 }: { title: string, data3: number | string, data4: number | string, data5: number | string }) => {
        return (
            <View style={styles.stats}>
                <Text style={styles.statTitle1}>{title}</Text>
                <View style={styles.idk}>

                    <StatView stat={data3} par={3} />
                    <StatView stat={data4} par={4} />
                    <StatView stat={data5} par={5} />

                </View>
            </View>
        )
    }

    const ChartComparison = ({ avg, total, putts, par }: { avg: string, total: number, putts: string, par: number }) => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 15 }}>
                <Text style={styles.statTitle}>
                    {`Par ${par}`}
                </Text>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.parText}>{avg}</Text>
                    <Text style={styles.parText}>{total > 0 ? "+" : ''}{total}</Text>
                    <Text style={styles.parText}>{putts}</Text>

                </View>
            </View>
        )
    }

    const ParComparison = ({ data, par }: { data: QuickStats, par: string }) => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 15 }}>
                <Text style={styles.statTitle}>
                    {`Par ${par}`}
                </Text>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.parText}>{data.eaglesOrLess}</Text>
                    <Text style={styles.parText}>{data.birdies}</Text>
                    <Text style={styles.parText}>{data.pars}</Text>
                    <Text style={styles.parText}>{data.bogeys}</Text>
                    <Text style={styles.parText}>{data.doublePlus}</Text>

                </View>
            </View>
        )
    }
    const ChartComparisonYLabels = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Text >

                </Text>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.statTitle2}>Avg Score</Text>
                    <Text style={styles.statTitle2}>Totals</Text>
                    <Text style={styles.statTitle2}>PPH</Text>
                    

                </View>
            </View>
        )
    }
    const ParComparisonYLabels = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Text >

                </Text>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.statTitle2}>-2 or Less</Text>
                    <Text style={styles.statTitle2}>Birdies</Text>
                    <Text style={styles.statTitle2}>Pars</Text>
                    <Text style={styles.statTitle2}>Bogeys</Text>
                    <Text style={styles.statTitle2}>+2 or More</Text>

                </View>
            </View>
        )
    }


    const GIRFIRComparison = () => {
        const calculatePercentage = (total: number, count: number) => {
            return count > 0 ? Math.round((total / count) * 100) : 0;
        };

        const data = [
            { value: calculatePercentage(par3data.totalGIR, par3data.count), frontColor: '#6b910a', gradientColor: '#c6f748', label: 'Par3' },
            { value: calculatePercentage(par4data.totalGIR, par4data.count), frontColor: '#6b910a', gradientColor: '#c6f748', spacing: 5, label: 'Par4' },
            { value: calculatePercentage(par4data.totalFIR, par4data.count), frontColor: '#006DFF', gradientColor: '#03b1fc' },
            { value: calculatePercentage(par5data.totalGIR, par5data.count), frontColor: '#6b910a', gradientColor: '#c6f748', spacing: 5, label: 'Par5' },
            { value: calculatePercentage(par5data.totalFIR, par5data.count), frontColor: '#006DFF', gradientColor: '#03b1fc' },
        ];

        return (
            <View
                style={{
                    margin: 10,
                    padding: 16,
                    borderRadius: 20,
                    backgroundColor: 'rgba(15,15,15,.4)',
                }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                    GIR/FIR Overview
                </Text>
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <BarChart
                        data={data}
                        barWidth={20}
                        initialSpacing={20}
                        spacing={30}
                        barBorderRadius={4}
                        showGradient
                        yAxisThickness={0}
                        xAxisType={'dashed'}
                        xAxisColor={'lightgray'}
                        yAxisTextStyle={{ color: 'lightgray' }}
                        stepValue={20}
                        maxValue={100}
                        noOfSections={5}
                        labelWidth={40}
                        xAxisLabelTextStyle={{ color: 'lightgray', textAlign: 'center' }}
                        showLine
                        lineConfig={{
                            color: 'whitesmoke',
                            thickness: 3,
                            curved: true,
                            hideDataPoints: true,
                            shiftY: 20,
                            initialSpacing: 0,
                        }}
                    />
                </View>
                <CategoryView
                    title='Greens In Reg'
                    data3={`${((par3data.totalGIR / par3data.count) * 100).toFixed(0)}%`}
                    data4={`${((par4data.totalGIR / par4data.count) * 100).toFixed(0)}%`}
                    data5={`${((par5data.totalGIR / par5data.count) * 100).toFixed(0)}%`} />


                <View style={styles.spacer} />

                <CategoryView
                    title='Fwys In Reg'
                    data3={`-`}
                    data4={`${((par4data.totalFIR / par4data.count) * 100).toFixed(0)}%`}
                    data5={`${((par5data.totalFIR / par5data.count) * 100).toFixed(0)}%`} />
            </View>
        );
    };



    return (
        <View style={styles.container}>
          
            <View>

                


                <View style={{backgroundColor: 'rgba(15,15,15,.4)', padding: 10, borderRadius: 30, marginVertical:10 }}>
                    <Text style={styles.statTitle1}>Par Overview</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10,}}>

                    <ChartComparisonYLabels />
                    <ChartComparison avg={(par3data.avgScore + 3).toFixed(1)} total={par3data.totalScore} putts={(par3data.totalPutts / par3data.count).toFixed(1)} par={3} />
                    <ChartComparison avg={(par4data.avgScore + 4).toFixed(1)} total={par4data.totalScore} putts={(par4data.totalPutts / par4data.count).toFixed(1)} par={4} />
                    <ChartComparison avg={(par5data.avgScore + 5).toFixed(1)} total={par5data.totalScore} putts={(par5data.totalPutts / par5data.count).toFixed(1)} par={5} />
                    </View>
                </View>



                <View style={{backgroundColor: 'rgba(15,15,15,.4)', padding: 10, borderRadius: 30, marginVertical:10 }}>
                    <Text style={styles.statTitle1}>Scoring Breakdown</Text>

                    <View style={{transform:'scale(0.85)'}}>
                        <ScoringView eagleOless={roundStatTotals.eaglesOless} birdies={roundStatTotals.birdies} pars={roundStatTotals.pars} bogeys={roundStatTotals.bogies} dblPlus={roundStatTotals.doublePlus} />
                    </View>
                    
                    <Text style={[styles.statTitle1,{fontSize:16}]}>Par Specific</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10,}}>
                    <ParComparisonYLabels />
                    <ParComparison data={par3data} par='3' />
                    <ParComparison data={par4data} par='4' />
                    <ParComparison data={par5data} par='5' />
                </View>
                </View>

                {par3data && par4data && par5data &&
                    <View>
                        <GIRFIRComparison />
                    </View>
                }

            </View>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {

        padding: 10,
        borderRadius: 15,
        flexDirection: 'column',

        
        marginVertical: 5,
        marginHorizontal: 2,

    },
    title: {
        color: 'whitesmoke',
        fontSize: 25,
        fontFamily: 'arial',
        fontStyle: 'italic',
    },
    statTitle1: {
        color: '#ddd', fontSize: 20, fontFamily: 'arial', fontStyle: 'italic', textAlign: 'center',
    },
    statTitle: {
        color: '#999', fontSize: 12, fontFamily: 'arial', fontStyle: 'italic', textAlign: 'center',
    },
    statTitle2: {
        color: '#999', fontSize: 16, fontFamily: 'arial', fontStyle: 'italic', textAlign: 'center', marginVertical: 5, height: 30,
    },
    statData: {
        color: 'whitesmoke', fontSize: 20, fontFamily: 'arial', fontStyle: 'italic', textAlign: 'center',
    },
    stats: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    },
    spacer: { height: .5, backgroundColor: '#222', },
    statExt: {
        fontSize: 8, color: '#999', textAlign: 'center'
    },
    idk: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-evenly'
    },
    parText: {
        color: 'whitesmoke',
        fontSize: 25,
        fontFamily: 'arial',
        fontStyle: 'italic',
        textAlign: 'center',
        marginVertical: 5,
        marginHorizontal: 5,
        height: 30
    }
})

export default ParSpecificStatView;