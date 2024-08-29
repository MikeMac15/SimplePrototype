import { getAllTeeboxHoles } from '@/components/DataBase/API';
import { Hole, Round, ShotData } from '@/components/DataBase/Classes';
import { getMenuGradient, getRibbonImage } from '@/components/DataBase/localStorage';
import EmojiHeader from '@/components/Layouts/Emoji/EmojiHeader';
import { getRibbonImageSource } from '@/constants/Colors';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native'

import { initialState, reducer, } from '@/components/DataBase/RoundReducer';
import EmojiShotBtns from '@/components/Layouts/Emoji/EmojiShotBtns';

interface indexProps {

}
// courseID, 
// courseName, 
// teeID, 
// girGoal, 
// puttGoal, 
// firGoal, 
// strokeGoal


const index: React.FC<indexProps> = ({ }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const params = useLocalSearchParams();
    const { courseID, courseName, teeID, girGoal, puttGoal, firGoal, strokeGoal } = params;
    const [isLoading, setIsLoading] = useState(true);


    //////////////////////////////////// Visuals ////////////////////////////////////
    const [visualPreferences, setVisualPreferences] = useState({
        gradient: 'OG-Dark',
        ribbonImage: 'proud-parent',
    });
    // Fetch visual preferences and set state
    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const [value, ribbonImgTag] = await Promise.all([getMenuGradient(), getRibbonImage()]);
                if (value && ribbonImgTag) {
                    setVisualPreferences({ gradient: value, ribbonImage: ribbonImgTag });
                }
            } catch (error) {
                console.error('Failed to fetch preferences:', error);
            }
        };

        fetchPreferences();
    }, []);
    const image = useMemo(() => getRibbonImageSource(visualPreferences.ribbonImage), [visualPreferences.ribbonImage]);

//////////////////////////////////// Round Setup ////////////////////////////////////
    const [teeboxHoles, setTeeboxHoles] = useState<Hole[]>([]);
    const [currentHoleData, setCurrentHoleData] = useState<Hole | null>(null);
    const [holeNumber, setHoleNumber] = useState<number>(1);
    const roundRef = useRef<Round>(new Round(Number(teeID)));
    const getCurrentHole = () => {
        const hole = teeboxHoles.find(hole => hole.num === holeNumber);
        if (hole) {
            setCurrentHoleData(hole);
        } else {
            console.error('Current hole not found');
        }
    };
    useEffect(() => {
        const fetchHoles = async () => {
            try {
                setIsLoading(true);
                const holeData = await getAllTeeboxHoles(Number(teeID));
                if (holeData) {
                    setTeeboxHoles(holeData);
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
    useEffect(() => {
        if (teeboxHoles.length > 0) {
            setIsLoading(true);
            getCurrentHole();
            setIsLoading(false);
        }
    }, [teeboxHoles, holeNumber]);

////////////////////////////////////////// Shot Data ////////////////////////////////////

    // Reset state for a new hole
    const resetForNewHole = useCallback((): void => {
        dispatch({ type: 'RESET' });
    }, [dispatch]);
    // Get all shot data from the round reference
    const getAllShotData = useCallback(() => ({
        putt: roundRef.current.totalPutts,
        great: roundRef.current.great,
        good: roundRef.current.good,
        bad: roundRef.current.bad,
    }), []);
    // Action handlers for shots and GIR/FIR
    const addShot = useCallback((shotType: keyof ShotData) => {
        dispatch({ type: 'ADD_SHOT', shotType });
    }, [dispatch]);
    const subtractShot = useCallback((shotType: keyof ShotData) => {
        dispatch({ type: 'SUBTRACT_SHOT', shotType });
    }, [dispatch]);
    const setGir = useCallback((value: boolean) => {
        dispatch({ type: 'SET_GIR', value });
    }, [dispatch]);
    const setFir = useCallback((value: boolean) => {
        dispatch({ type: 'SET_FIR', value });
    }, [dispatch]);
    const addShotColor = useCallback((color: string) => {
        dispatch({ type: 'ADD_SHOT_COLOR', color });
    }, [dispatch]);
    const subShotColor = useCallback((color: string) => {
        dispatch({ type: 'SUB_SHOT_COLOR', color });
    }, [dispatch]);

//////////////////////////////////// Round Setup ////////////////////////////////////
    // Helper function to add hole data to the round
    const addRoundHole = useCallback(() => {

        const hole = teeboxHoles.find(hole => hole.num === holeNumber);
        if (hole) {
            roundRef.current.addRoundHole(
                hole,
                state.shotData.putt,
                state.shotData.great,
                state.shotData.good,
                state.shotData.bad,
                state.gir,
                0, // strategy
                state.fir
            );
        }
    }, [state, teeboxHoles, holeNumber]);
    // Move to the next hole
    const nextHole = useCallback(() => {
        addRoundHole();
        resetForNewHole();
        setHoleNumber(prev => prev + 1);
    }, [addRoundHole, resetForNewHole]);
    // Save round and hole stats at the end of the round
    const lastHole = useCallback(async () => {
        addRoundHole();
        try {
            await roundRef.current.saveRoundAndHoleStats();
            Alert.alert('Saved');
            router.dismissAll();
        } catch (error) {
            console.error('Error saving round and hole stats:', error);
        }
    }, [addRoundHole]);

    return (
        <View style={styles.container}>
            <EmojiHeader />
            <EmojiShotBtns addShot={addShot} subtractShot={subtractShot} addShotColor={addShotColor} subShotColor={subShotColor} shotData={state.shotData}/>
            <Text>Emoji</Text>
        </View>
    )
}

export default index;



const styles = StyleSheet.create({
    container: {

    },

})