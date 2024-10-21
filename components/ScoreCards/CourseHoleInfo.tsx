import { Text, View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { Hole } from '../DataBase/Classes';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { MenuGradients, TeeColors } from '@/constants/Colors';
import { getMenuGradient, getRibbonImage } from '../DataBase/localStorage';

interface CourseHoleInfoProps {
    holes: Hole[];
    allowEdit?: boolean;
}

const CourseHoleInfo: React.FC<CourseHoleInfoProps> = ({ holes, allowEdit=false }) => {
    

    const Headers = ({ inOut }: { inOut: string }) => {
        return (
            <View style={{ flexDirection: 'row', }}>
                <View style={{}}>
                    <Text style={{ fontSize: 30 }}>{inOut == "Out" ? "Front" : "Back"} Nine</Text>
                </View>

            </View>
        )
    };

    const Footers = ({ inOut, totalYrds, totalPar }: { inOut: string, totalYrds: number, totalPar: number }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={styles.squareHole}>
                    <Text style={styles.textLabel}></Text>
                    <Text style={styles.textLabel}>{inOut}</Text>
                </View>
                <View style={styles.squareHole}>
                    <Text style={styles.textLabel}>Par</Text>
                    <Text style={styles.text}>{totalPar}</Text>
                </View>
                <View style={styles.squareHole}>
                    <Text style={styles.text}>{totalYrds}</Text>
                    <Text style={styles.textYrd}>yrds</Text>
                </View>
            </View>
        )
    }

    const Seperator = () => {
        return (
            <View style={{ borderBottomColor: '#777', borderBottomWidth: 1.5, width: '100%' }} />
        )
    }

    const SplitHoles = ({ holes, totalPar, totalYrds, inOut }: { holes: Hole[], totalPar: number, totalYrds: number, inOut: string }) => {
        return (
            <View style={{ flexDirection: 'column', justifyContent: 'center', marginHorizontal: 5 }}>
                <Headers inOut={inOut} />
                {holes.map((hole, index) => {
                    return (
                        <View key={index} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center' }}>

                                <View style={{backgroundColor:TeeColors[hole.color].toLowerCase(), width:20, height:20, borderRadius:20}} />

                                <View style={styles.squareHole}>
                                    <Text style={styles.textLabel}>Hole</Text>
                                    <Text style={styles.text}>{hole.num}</Text>
                                </View>
                                <View style={styles.squareHole}>
                                    <Text style={styles.textLabel}>Par</Text>
                                    <Text style={styles.text}>{hole.par}</Text>
                                </View>
                                <View style={styles.squareHole}>
                                    <Text style={styles.text}>{hole.yardage}</Text>
                                    <Text style={styles.textYrd}>yrds</Text>
                                </View>
                                {allowEdit && <View style={{backgroundColor:'red', width:20, height:20, borderRadius:20}} >
                                    <Text>{hole.id}</Text>
                                    </View>}
                            </View>
                                    <Seperator />
                            </View>
                       
                    )
                })}
                <Footers
                    totalYrds={totalYrds}
                    totalPar={totalPar}
                    inOut={inOut}
                />
            </View>
        )
    }


    return (

        <ScrollView >
            

                <View style={styles.container}>
                    <View style={styles.scorecard}>
                        <SplitHoles
                            holes={holes.slice(0, 9)}
                            totalYrds={holes.slice(0, 9).reduce((total, hole) => total + hole.yardage, 0)}
                            totalPar={holes.slice(0, 9).reduce((total, hole) => total + hole.par, 0)}
                            inOut='Out'
                        />
                    </View>
                    <View style={styles.scorecard}>
                        <SplitHoles
                            holes={holes.slice(9, 18)}
                            totalYrds={holes.slice(9, 18).reduce((total, hole) => total + hole.yardage, 0)}
                            totalPar={holes.slice(9, 18).reduce((total, hole) => total + hole.par, 0)}
                            inOut='In'
                        />
                    </View>
                </View>

            
        </ScrollView>

    )
}

export default CourseHoleInfo;



const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        
        
    },
    scorecard: {
        backgroundColor: 'rgba(234,234,234,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginVertical: 5,
        borderRadius: 30,
    },
    square: {
        width: 60,
        height: 30,

        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        // marginHorizontal: 2,

    },
    squareHole: {
        width: 100,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginVertical: 5,

    },
    squareSum: {
        width: 60,
        height: 30,

        justifyContent: 'center',
        alignItems: 'center',


    },
    headers: {
        width: 100,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    text: {
        textAlign: 'center',
        fontSize: 24,

    },
    textLabel: {
        textAlign: 'center',
        fontSize: 20,
        marginHorizontal: 5,
        marginBottom: 2
    },
    textYrd: {
        textAlign: 'center',
        fontSize: 16,

        marginBottom: 2
    }

})