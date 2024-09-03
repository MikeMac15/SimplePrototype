import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Haptics from 'expo-haptics';
import React, { useRef } from "react";
import { ShotData } from "@/components/DataBase/Classes";
import LottieView from 'lottie-react-native';
import { getEmoji } from "@/constants/Emojis";

interface BtnsProps {
    addShot: (shotType: keyof ShotData) => void;
    subtractShot: (shotType: keyof ShotData) => void;
    shotData: ShotData;
    addShotEmoji: (emoji: string) => void;
    subShotEmoji: (emoji: string) => void;
}

const EmojiShotBtns: React.FC<BtnsProps> = ({ addShot, subtractShot, shotData, addShotEmoji, subShotEmoji }) => {
    const greatRef = useRef<LottieView | null>(null);
    const goodRef = useRef<LottieView | null>(null);
    const badRef = useRef<LottieView | null>(null);
    const puttRef = useRef<LottieView | null>(null);

    const addShotGreat = () => {
        addShot('great');
        addShotEmoji('great');
        setTimeout(() => greatRef.current?.play(), 100); // Play only once after state change
    }

    const subShotGreat = () => {
        subtractShot('great');
        subShotEmoji('great');
        setTimeout(() => greatRef.current?.play(), 100); // Play only once after state change
    }

    const addShotGood = () => {
        addShot('good');
        addShotEmoji('good');
        setTimeout(() => goodRef.current?.play(), 100); // Play only once after state change
    }

    const subShotGood = () => {
        subtractShot('good');
        subShotEmoji('good');
        setTimeout(() => goodRef.current?.play(), 100); // Play only once after state change
    }

    const addShotBad = () => {
        addShot('bad');
        addShotEmoji('bad');
        setTimeout(() => badRef.current?.play(), 100); // Play only once after state change
    }

    const subShotBad = () => {
        subtractShot('bad');
        subShotEmoji('bad');
        setTimeout(() => badRef.current?.play(), 100); // Play only once after state change
    }

    const addShotPutt = () => {
        addShot('putt');
        addShotEmoji('putt');
        setTimeout(() => puttRef.current?.play(), 100); // Play only once after state change
    }

    const subShotPutt = () => {
        subtractShot('putt');
        subShotEmoji('putt');
        setTimeout(() => puttRef.current?.play(), 100); // Play only once after state change
    }

    return (
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
            <TouchableOpacity activeOpacity={0.5} style={styles.shotBtn2} onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                onPress={addShotGreat}
                onLongPress={subShotGreat}>
                <View style={{ backgroundColor: '#555', borderRadius: 20, borderWidth: 3, borderColor: '#73c7eb' }}>
                    <View style={styles.centeredRow}>
                        <View style={[styles.BtnCountContainer2]}>
                            <Text style={styles.BtnCount}>{shotData.great} </Text>
                            <Text style={[styles.BtnCount2]}>x</Text>
                        </View>
                        <View style={{ marginLeft:10 }}><LottieView ref={greatRef} source={getEmoji('great')} loop={false} style={styles.emoji} /></View>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={styles.shotBtn2} onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                onPress={addShotGood}
                onLongPress={subShotGood}>
                <View style={{ backgroundColor: '#555', borderRadius: 20, borderWidth: 3, borderColor: 'yellowgreen' }}>
                    <View style={styles.centeredRow}>
                        <View style={[styles.BtnCountContainer2]}>
                            <Text style={styles.BtnCount}>{shotData.good} </Text>
                            <Text style={[styles.BtnCount2]}>x</Text>
                        </View>
                        <View style={{ marginLeft:10 }}><LottieView ref={goodRef} source={getEmoji('good')} loop={false} style={styles.emoji} /></View>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={styles.shotBtn2} onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                onPress={addShotBad}
                onLongPress={subShotBad}>
                <View style={{ backgroundColor: '#555', borderRadius: 20, borderWidth: 3, borderColor: 'salmon' }}>
                    <View style={styles.centeredRow}>
                        <View style={[styles.BtnCountContainer2]}>
                            <Text style={[styles.BtnCount]}>{shotData.bad} </Text>
                            <Text style={[styles.BtnCount2]}>x</Text>
                        </View>
                        <View style={{ marginLeft:10 }}>
                        <LottieView ref={badRef} source={getEmoji('bad')} loop={false} style={styles.emoji} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={styles.shotBtn2} onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                onPress={addShotPutt}
                onLongPress={subShotPutt}>
                <View style={{ backgroundColor: '#555', borderRadius: 20, borderWidth: 3, borderColor: '#E1CAB2' }}>
                    <View style={styles.centeredRow}>
                        <View style={[styles.BtnCountContainer2]}>
                            <Text style={styles.BtnCount}>{shotData.putt} </Text>
                            <Text style={[styles.BtnCount2]}>x</Text>
                        </View>
                        <View style={{ marginLeft:10 }}><LottieView ref={puttRef} source={getEmoji('putt')} loop={false} style={styles.emoji} /></View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    greatText: { color: 'skyblue' },

    goodText: { color: 'yellowgreen' },

    badText: { color: 'salmon' },
   
    puttText: { color: '#E1CAB2' },

    shotBtn2: {
        width: 175,
        marginVertical: 5,
      
    },
    centeredRow: { 
        flexDirection: 'row', 
        alignItems: 'center',
        paddingVertical: 3,
    },
    textShadow: {
        shadowColor: '#555',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 1,
    },
    BtnText2: {
        textAlign: 'center',
        fontSize: 40,
        fontStyle: 'italic',
        fontWeight: '600',
        paddingHorizontal: 15,
        fontFamily: 'Arial',
    },
    BtnCountContainer2: {
        width: 80,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
        opacity: 0.8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    BtnCount: {
        color: 'white',
        fontSize: 40,
        textAlign: 'center',
        marginLeft: 5,
        fontStyle: 'italic',
        fontWeight: '400',
        fontFamily: 'Arial',
    },
    BtnCount2: {
        color: 'whitesmoke',
        fontSize: 30,
        textAlign: 'center',
        marginTop: 5,
        marginLeft: 5,
        fontStyle: 'italic',
        fontWeight: '400',
        fontFamily: 'Arial',
    },
    emoji: {
        width: 60,
        height: 60,
    },
});

export default EmojiShotBtns;
