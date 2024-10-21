import React, { useCallback, useEffect, useMemo, useReducer,  useState } from "react";
import { Alert,  ImageBackground, Modal, Pressable,  StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Hole, HoleStats, Round, ShotData } from "@/components/DataBase/Classes";
import { getAllTeeboxHoles} from "@/components/DataBase/API";
import * as Haptics from 'expo-haptics';
import VerticalCheckBoxes from "@/components/PlayComponents/VerticalCheckBoxes";
import StatMarquee from "@/components/PlayComponents/StatMarque";
import { C2HScoreData } from "@/components/Layouts/CounterThree/Header3";
import VerticalBtns3 from "@/components/Layouts/CounterThree/VerticalShotBtns3";
import { getMenuGradient, getRibbonImage } from "@/components/DataBase/localStorage";
import { getRibbonImageSource, MenuGradients, TeeColors, teeTextColor } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { initialState, reducer} from '@/components/DataBase/RoundReducer';
import SummaryModal from "@/components/RoundSummary/SummaryModal";
import useTheme from "@/constants/Theme";
import UpdatePrevScore from "@/components/UpdatePrevScore/UpdatePrevScore";
import { Feather } from "@expo/vector-icons";
import Options4 from "@/components/Layouts/CounterThree/Options4";
import NewPieChart from "@/components/Layouts/CounterThree/NewPieChart";

/**
 * CounterThree component.
 * @component
 */
const JustPlay: React.FC = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const params = useLocalSearchParams();
    const { courseID, courseName, teeID, girGoal, puttGoal, firGoal, strokeGoal } = params;
    const [isLoading, setIsLoading] = useState(true);
    const [teeboxHoles, setTeeboxHoles] = useState<Hole[]>([]);
    const [currentHoleData, setCurrentHoleData] = useState<Hole>();
    const [holeNumber, setHoleNumber] = useState<number>(1);
    const [summaryModal, setSummaryModal] = useState(false);
    const [par, setPar] = useState<number | null>(null);

    const [gradient, setGradient] = useState('OG-Dark');
    const [ribbonImage, setRibbonImage] = useState('proud-parent');
    const getPreferences = useCallback(async () => {
        try {
            const [value, ribbonImgTag] = await Promise.all([getMenuGradient(), getRibbonImage()]);
            setGradient(value);
            setRibbonImage(ribbonImgTag);
        } catch (error) {
            console.error('Failed to fetch preferences:', error);
        }
    }, []);
    useEffect(() => {
        getPreferences();
    }, [getPreferences]);
    const image = useMemo(() => getRibbonImageSource(ribbonImage), [ribbonImage]);




    const [currentRound, setCurrentRound] = useState<Round>(new Round(Number(teeID)));


    const addRoundHole = (hole: Hole, putts: number, great: number, good: number, bad: number, gir: boolean, strat: number, fir: boolean) => {
        setCurrentRound(currentRound.addJustPlayRoundHole( holeNumber, hole, putts, great, good, bad, gir, strat, fir));

    };

    const updateRoundHole = (newHoleData: HoleStats) => {
        console.log('Updating round hole:', newHoleData);
        setCurrentRound(prevRound => {
            // Create a new updated round object
            const updatedRound = prevRound.updateJustPlayRoundHole(newHoleData, holeNumber);
            return updatedRound; // Return the new round object
        });
    };

    const theme = useTheme();
    const getTotalShots = () => {
        // return Object.values(shotData).reduce((total, value) => total + value, 0);
        return Object.values(state.shotData).reduce((total: number, value: any) => total + value, 0);

    };

    ////////////////////////////////////////// SetUp ////////////////////////////////////
    const getCurrentHole = () => {
        if (currentRound.holes[holeNumber]) {
          const holeStats = currentRound.holes[holeNumber];
          setCurrentHoleData(holeStats.hole);
        } else if (par && teeboxHoles.length > 0) {
          const hole = teeboxHoles[par - 3];
          if (hole) {
            setCurrentHoleData(hole);
          } else {
            console.error('Current hole not found');
          }
        }
      };

    useEffect(() => {
        const fetchHoles = async () => {
            try {
                setIsLoading(true);
                const holeData = await getAllTeeboxHoles(Number(teeID));

                if (holeData) {
                    setTeeboxHoles(holeData);
                    //   console.log('Hole data:', holeData);
                } else {
                    console.error('No hole data found');
                }
            } catch (error) {
                console.error('Error fetching holes:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHoles();
    }, [teeID]);

    const [updateHole, setUpdateHole] = useState(false);

    useEffect(() => {
        if (holeNumber in currentRound.holes) {
            const holeStats = currentRound.holes[holeNumber];
            loadHoleStatsIntoState(holeStats);
            setUpdateHole(true);
        } else if (par && teeboxHoles.length > 0) {
            getCurrentHole(); // Fallback logic to get current hole
            setUpdateHole(false);
        } else {
            resetForNewHole();
            setUpdateHole(false);
        }
        console.log('Current round:', currentRound);
    }, [currentRound, teeboxHoles, holeNumber, par]);







    ////////////////////////////////////////// Save Data ////////////////////////////////////
    const saveRoundAndHoleStats = async (round: Round) => {
        try {
            await round.saveRoundAndHoleStats();
            Alert.alert('Saved')
            setSummaryModal(true);
        } catch (error) {
            console.error('Error saving round and hole stats:', error);
        }
    };


    const lastHole = async () => {
        if (currentHoleData) {
            const updatedRound = currentRound.addRoundHole(
                currentHoleData,
                state.shotData.putt,
                state.shotData.great,
                state.shotData.good,
                state.shotData.bad,
                state.gir,
                Number(strategy),
                state.fir
            );
            setCurrentRound(updatedRound);
            await saveRoundAndHoleStats(updatedRound); // Save after updating
            setSummaryModal(true);
        }
    }
    ////////////////////////////////////////// Shot Data ////////////////////////////////////
    const resetForNewHole = (): void => {
        dispatch({ type: 'RESET' });
        setStrategy('0');
        setPar(null);
    }

    const getAllShotData = () => {
        return {
            putt: currentRound.totalPutts,
            great: currentRound.great,
            good: currentRound.good,
            bad: currentRound.bad,
        };
    };
    const addShot = (shotType: keyof ShotData) => {
        dispatch({ type: 'ADD_SHOT', shotType });
    };
    const subtractShot = (shotType: keyof ShotData) => {
        dispatch({ type: 'SUBTRACT_SHOT', shotType });
    };
    const setGir = (value: boolean) => {
        dispatch({ type: 'SET_GIR', value });
    };
    const setFir = (value: boolean) => {
        dispatch({ type: 'SET_FIR', value });
    };
    const addShotColor = (color: string) => {
        dispatch({ type: 'ADD_SHOT_COLOR', color });
    };

    const subShotColor = (color: string) => {
        dispatch({ type: 'SUB_SHOT_COLOR', color });
    };
    ///////////////////////////////////////////////////////Strats///////////////////////////////////////////////////////
    const [strategy, setStrategy] = useState('0');
    const [showStrat, setShowStrat] = useState(false);

    const WhatStrat: { [key: string]: string } = {
        '0': 'No Strategy',
        '1': 'Conservative',
        '2': 'Aggressive',
        '3': 'Pin Hunting',
        '4': 'Middle green',
        '5': 'Green in 1',
        '6': 'Green in 2',
        '7': 'Green in 3',
        '8': 'No driver',
        '9': 'Layup to fav club',
    };


    const StackScreen = () => {
        return (
            <Stack.Screen
                options={{
                    gestureEnabled: false,
                    title: `${courseName}`,
                    headerBackVisible: false,
                    headerBackground: () => (
                        <ImageBackground
                            source={image}
                            style={[StyleSheet.absoluteFill, { width: '100%', height: '99.9%' }]}
                        />
                    ),
                    headerTitleStyle: { color: "whitesmoke", fontSize: 25, fontWeight: 'bold', fontFamily: 'Papyrus' },

                    headerBlurEffect: 'systemUltraThinMaterialDark',
                }}
            />)
    };

    ////////////////////////////////////////// Main View ////////////////////////////////////
    const Marquee = useMemo(() => (
        <StatMarquee
            round={currentRound}
            holeNumber={holeNumber}
            girGoal={Number(girGoal)}
            firGoal={Number(firGoal)}
            puttGoal={Number(puttGoal)}
        />), [holeNumber, girGoal, firGoal, puttGoal, currentRound]);

    const memoizedOptions = useMemo(() => (
        <Options4
            teeboxHoles={teeboxHoles}
            roundHoles={currentRound.holes}
            round={currentRound}
            holeNumber={holeNumber}
        />
    ), [teeboxHoles, holeNumber, currentRound]);


    const previousHole = () => {
        if (holeNumber > 1 && currentRound.holes[holeNumber - 1]) {
          setHoleNumber(holeNumber - 1);
          loadHoleStatsIntoState(currentRound.holes[holeNumber - 1]);
        } else {
          console.error('No previous hole data found');
        }
      };

    const nextHole = () => {
        if (holeNumber > Object.keys(currentRound.holes).length && currentHoleData) {
            console.log(`Adding round hole:${holeNumber}`, currentHoleData);
            addRoundHole(currentHoleData, state.shotData.putt, state.shotData.great, state.shotData.good, state.shotData.bad, state.gir, Number(strategy), state.fir);
            resetForNewHole();
            // setHoleNumber(holeNumber + 1);
        } else {
            console.log(1)
            const nextHoleStats = currentRound.holes[holeNumber + 1];
            if (nextHoleStats) {
                console.log(2)
                loadHoleStatsIntoState(nextHoleStats);
            }
        }
        setHoleNumber(holeNumber + 1);
        console.log(3)
        
    }

    const loadHoleStatsIntoState = useCallback((prevHoleStats: HoleStats) => {
        dispatch({ type: 'SET_SHOT_COUNT', shotType: 'great', count: prevHoleStats.great });
        dispatch({ type: 'SET_SHOT_COUNT', shotType: 'good', count: prevHoleStats.good });
        dispatch({ type: 'SET_SHOT_COUNT', shotType: 'bad', count: prevHoleStats.bad });
        dispatch({ type: 'SET_SHOT_COUNT', shotType: 'putt', count: prevHoleStats.putts });
        dispatch({ type: 'SET_GIR', value: prevHoleStats.gir });
        dispatch({ type: 'SET_FIR', value: prevHoleStats.fir });
        setStrategy(String(prevHoleStats.strat));
    }, []);
    const DataColView = ({ title, data, color }: { title?: string, data: string, color: string }) => {
        return (
            <View style={{ margin: 5, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#333', borderRadius: 10, borderWidth: 2, borderColor: color }}>
                {title && <Text style={{ color: theme.color, fontSize: 14, fontStyle: 'italic' }}>{title}</Text>}
                <Text style={{ color: theme.color, fontSize: data.length < 12 ? 22 : 18, fontWeight: 'bold', fontStyle: 'italic' }}>{data}</Text>
            </View>
        )
    }

    const ShowOldData = () => {

        const [showModal, setShowModal] = useState(false);

        const total = state.shotData.great + state.shotData.good + state.shotData.bad + state.shotData.putt
        if (!currentHoleData) {
            return <Text>No data</Text>
        }

        const getScoreString = () => {
            const toPar = total - currentHoleData.par;
            switch (toPar) {
                case -2:
                    return 'Eagle';
                case -1:
                    return 'Birdie';
                case 0:
                    return 'Par';
                case 1:
                    return 'Bogey';
                case 2:
                    return 'Double Bogey';
                case 3:
                    return 'Triple Bogey';
                case 4:
                    return 'Monster Bogey';
                default:
                    return 'Monster Bogey';

            }
        };

        return (
            <View style={{ alignItems: 'center', marginTop: 0 }}>
                <UpdatePrevScore hole={holeNumber} updateRoundHole={updateRoundHole} modalVisible={showModal} setModalVisible={setShowModal} state={state} currentHoleData={currentHoleData} />
                <View style={{ flexDirection: 'row' }}>
                    <DataColView title='Strokes' data={total.toString()} color={'#111'} />
                    <DataColView data={getScoreString()} color={'#111'} />
                    <DataColView title='To Par' data={(total - currentHoleData.par).toString()} color={'#111'} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10, opacity: currentHoleData.par !== 3 ? 1 : 0.2 }}>
                            <Text style={{ fontSize: 18, color: currentHoleData.par !== 3 ? state.fir ? 'yellowgreen' : 'salmon' : '#888' }}>Fairway In Reg</Text>
                            <Text style={{ fontSize: 26, color: currentHoleData.par !== 3 ? state.fir ? 'yellowgreen' : 'salmon' : '#888' }}>{currentHoleData.par !== 3 ? state.fir ? 'Yes' : 'No' : 'Par 3'}</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                            <Text style={{ fontSize: 18, color: state.gir ? 'yellowgreen' : 'salmon' }}>Green In Reg</Text>
                            <Text style={{ fontSize: 26, color: state.gir ? 'yellowgreen' : 'salmon' }}>{state.gir ? 'Yes' : 'No'}</Text>
                        </View>
                        {/* <DataColView title='GIR' data={state.gir ? 'Yes' : 'No'} color={state.gir ? 'yellowgreen' : 'salmon'} />
            <DataColView title='FIR' data={state.fir ? 'Yes' : 'No'} color={state.fir ? 'yellowgreen' : 'salmon'} /> */}
                    </View>
                    <View style={{ marginHorizontal: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <Text style={{ color: 'skyblue', fontSize: 34 }}>{state.shotData.great}</Text>
                            <Text style={{ color: 'skyblue', fontSize: 16, marginHorizontal: 8 }}>x</Text>
                            <Text style={{ color: 'skyblue', fontSize: 34 }}>Great</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                            <Text style={{ color: 'yellowgreen', fontSize: 34 }}>{state.shotData.good}</Text>
                            <Text style={{ color: 'yellowgreen', fontSize: 16, marginHorizontal: 8 }}>x</Text>
                            <Text style={{ color: 'yellowgreen', fontSize: 34 }}>Good</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <Text style={{ color: 'salmon', fontSize: 34 }}>{state.shotData.bad}</Text>
                            <Text style={{ color: 'salmon', fontSize: 16, marginHorizontal: 8 }}>x</Text>
                            <Text style={{ color: 'salmon', fontSize: 34 }}>Bad</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                            <Text style={{ color: 'tan', fontSize: 34 }}>{state.shotData.putt}</Text>
                            <Text style={{ color: 'tan', fontSize: 16, marginHorizontal: 8 }}>x</Text>
                            <Text style={{ color: 'tan', fontSize: 34 }}>Putts</Text>

                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={() => { setShowModal(!showModal); }} style={{ backgroundColor: '#007AFF', borderRadius: 10, padding: 5, marginTop: 20 }}>
                    <Text style={{ color: theme.color, fontSize: 20, textAlign: 'center' }}>Update Hole Data</Text>
                </TouchableOpacity>

            </View>
        )
    }


    const HoleNavigation = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20 }}>

                <TouchableOpacity onPress={previousHole} disabled={holeNumber === 1}>
                    <LinearGradient colors={['#454545', '#2d2d2d']} style={[styles.holeNav, { borderColor: 'rgba(20,20,20,0.25)', borderWidth: 2, opacity: holeNumber === 1 ? 0.05 : 1 }]}>
                        <Feather name="chevron-left" size={24} color="whitesmoke" />
                        <Text style={{ color: 'whitesmoke', fontSize: 20, marginRight: 10 }}> Hole {holeNumber - 1}</Text>
                    </LinearGradient>
                </TouchableOpacity>


                <Text style={{ color: 'whitesmoke', fontSize: 20 }}>Hole {holeNumber}</Text>
                {holeNumber < 18
                    ?
                    <TouchableOpacity onPress={() => {getTotalShots() > 0 ? nextHole() : ''}}>
                        <LinearGradient colors={['#454545', '#2d2d2d']} style={[styles.holeNav, { borderColor: 'rgba(20,20,20,0.25)', borderWidth: 2 }]}>
                            <Text style={{ color: 'whitesmoke', fontSize: 20, marginLeft: 10 }}>Hole {holeNumber + 1}</Text>
                            <Feather name="chevron-right" size={24} color="whitesmoke" />
                        </LinearGradient>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => lastHole()}>
                        <LinearGradient colors={['#454545', '#333']} style={[styles.holeNav, { borderColor: 'rgba(150,150,150,0.15)', borderWidth: 1 }]}>
                            <Text style={{ color: 'whitesmoke', fontSize: 20 }}>Finish Round</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                }
            </View>
        );
    };
    ///////////////////////////////////////////////////////Return///////////////////////////////////////////////////////


    const ParSelector = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                <Text style={{ color: theme.color, fontSize: 30, textAlign: 'center', }}>What is par for Hole {holeNumber}?</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => setPar(3)} style={{ backgroundColor: 'rgba(50,50,50,.95)', borderRadius: 10, padding: 10, margin: 10 }}>
                        <Text style={{ color: '#aaa', fontSize: 60, textAlign: 'center' }}>3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setPar(4)} style={{ backgroundColor: 'rgba(50,50,50,.95)', borderRadius: 10, padding: 10, margin: 10 }}>
                        <Text style={{ color: '#aaa', fontSize: 60, textAlign: 'center' }}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setPar(5)} style={{ backgroundColor: 'rgba(50,50,50,.95)', borderRadius: 10, padding: 10, margin: 10 }}>
                        <Text style={{ color: '#aaa', fontSize: 60, textAlign: 'center' }}>5</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }


    const AfterParSelector = () => {
        const [showChangePar, setShowChangePar] = useState(false);

        const ChangeParModal = () => {
            return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showChangePar}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setShowChangePar(!showChangePar);
                    }}>
                    <View style={styles2.centeredView}>


                        <View style={styles2.modalView}>
                            <ParSelector />

                            <Pressable
                                style={[styles2.button, styles2.buttonCancel, { marginTop: 20 }]}
                                onPress={() => setShowChangePar(false)}>
                                <Text style={styles2.textStyle}>Cancel</Text>
                            </Pressable>
                        </View>


                    </View>
                </Modal>
            )
        }


        return (
            <TouchableOpacity activeOpacity={0.6} style={{ marginBottom: 10 }} onPressIn={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setShowChangePar(!showChangePar) }}>
                <ChangeParModal />
                <View style={[{
                    flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                    backgroundColor: "#666", borderRadius: 15, alignItems: 'center', borderWidth: 3, shadowOffset: { width: 1.5, height: 1 },
                    shadowOpacity: 0.5,
                    shadowRadius: 3,
                }, { borderColor: '#888', shadowColor: '#999' }]}>
                    <Text style={{ color: 'whitesmoke', fontSize: 30 }}>Par </Text>

                    {/* <Text style={[{ fontSize: 40, fontStyle: 'italic', fontFamily: 'Arial', }, gir ? styles.goodText : styles.badText]}>{gir ? 'V' : 'X'}</Text> */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>

                        <Text style={{ color: 'whitesmoke', fontSize: 30 }}>{par ? par : 4}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }



    return (
        <>
            {/* <StackHeader image={image} imageTag={ribbonImage} title={`${courseName}`} roundRef={currentRound} lastHole={lastHole} nextHole={nextHole} teeboxHoles={teeboxHoles} /> */}
            <StackScreen />
            {summaryModal &&
                <SummaryModal round={currentRound} course={String(courseName)} tee={TeeColors[Number(teeID)]} />
            }
            <LinearGradient colors={MenuGradients[gradient]} style={{ flex: 1 }}>
                {currentHoleData && <View style={{ height: 5, backgroundColor: `${teeTextColor(currentHoleData.color)}` }} />}
                {Marquee}
                {isLoading || !teeboxHoles || !currentHoleData
                    ?
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: theme.color, fontSize: 40, textAlign: 'center', marginBottom: 10 }}>Welcome Screen.</Text>
                        <ParSelector />
                    </View>
                    :
                    <>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                            <NewPieChart shotData={state.shotData} allShotData={getAllShotData()} />
                            <View style={{}}>
                                <Text style={{ color: theme.color, fontSize: 40, textAlign: 'center', marginBottom: 10 }}>Hole {holeNumber}</Text>
                                {teeboxHoles && memoizedOptions}
                            </View>
                        </View>

                        <View style={{}}>


                            <HoleNavigation />
                            {holeNumber <= Object.keys(currentRound.holes).length
                                ?
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                                    <ShowOldData />

                                </View>

                                :
                                par

                                    ?


                                    <View style={{}}>
                                        <View style={{ transform: 'scale(1.5)', marginBottom: 20 }}>

                                            <C2HScoreData totalShots={getTotalShots()} holePar={par} shotColors={state.shotColors} />
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                                                <AfterParSelector />

           
                                                <VerticalCheckBoxes
                                                    hole={currentHoleData}
                                                    gir={state.gir}
                                                    setGir={setGir}
                                                    fir={state.fir}
                                                    setFir={setFir}
                                                />
                                            </View>
                                            {/* <View style={{transform:'scaleX(.95)'}}> */}

                                            <VerticalBtns3
                                                addShot={addShot}
                                                subtractShot={subtractShot}
                                                shotData={state.shotData}
                                                addShotColor={addShotColor}
                                                subShotColor={subShotColor}
                                            />
                                            {/* </View> */}
                                        </View>
                                    </View>
                                    : <ParSelector />
                            }

                        </View>
                    </>
                }
            </LinearGradient>
        </>
    );

};

export default JustPlay;

const styles = StyleSheet.create({
    holeNav: {
        backgroundColor: '#3a3a3a',
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: '#fff',

    },
});

const styles2 = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: '90%',
        margin: 20,
        backgroundColor: '#444',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10
    },
    buttonCancel: {
        backgroundColor: 'salmon',
        width: 80
    },
    buttonSave: {
        backgroundColor: '#2196F3',
        width: 80
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    textInputBox: {
        backgroundColor: '#ccc',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20
    }
});