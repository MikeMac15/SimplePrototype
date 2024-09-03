import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import * as Haptics from 'expo-haptics';
import { Hole } from '@/components/DataBase/Classes';
import LottieView from 'lottie-react-native';
import { getEmoji } from '@/constants/Emojis';
import { useRef } from 'react';

interface EmojiGIRFIRProps {
    hole: Hole;
    fir: boolean;
    setFir: (fir: boolean) => void;
    gir: boolean;
    setGir: (fir: boolean) => void;
}

const EmojiGIRFIR: React.FC<EmojiGIRFIRProps> = ({ hole, fir, setFir, gir, setGir }) => {
    const firRef = useRef<LottieView | null>(null);
    const girRef = useRef<LottieView | null>(null);

    const changeFIR = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setFir(!fir);
        setTimeout(() => firRef.current?.play(), 100); // Adding a slight delay
    }

    const changeGIR = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setGir(!gir);
        setTimeout(() => girRef.current?.play(), 100); // Adding a slight delay
    }

    return (
        <View style={{ flexDirection: 'column', justifyContent:'center', alignItems:'center' }}>

            <View style={{ marginBottom: 10, paddingBottom:10 }}>

                <TouchableOpacity activeOpacity={0.6} style={{}} onPressIn={() => {
                    hole?.par == 3 ? Haptics.notificationAsync(
                        Haptics.NotificationFeedbackType.Error
                    ) : changeFIR()
                }}>

                    <View style={[{ width: 80, height: 80, backgroundColor: "#666", borderRadius: 15, alignItems: 'center', borderWidth: 3, }, hole?.par == 3 ? { borderColor: 'grey' } : fir ? { borderColor: 'yellowgreen' } : { borderColor: 'salmon' }]}>
                        <Text style={[hole?.par == 3 ? styles.disabledColor : fir ? styles.goodText : styles.badText, { fontFamily: 'Arial' }]}>FIR</Text>
                        <Text style={{ backgroundColor: 'grey', width: '100%', height: 2 }}> </Text>

                        <LottieView
                            ref={firRef}
                            source={fir ? getEmoji('fwy') : getEmoji('missed_fwy')}
                            style={styles.animation}
                            loop={false}
                            autoPlay
                        />

                    </View>



                </TouchableOpacity>

            </View>
            <View style={{ marginTop: 10, paddingBottom:10 }}>



                <TouchableOpacity activeOpacity={0.6} style={{}} onPressIn={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); changeGIR() }}>
                    <View style={[{ width: 80, height: 80, backgroundColor: "#666", borderRadius: 15, alignItems: 'center', borderWidth: 3, }, gir ? { borderColor: 'yellowgreen' } : { borderColor: 'salmon' }]}>
                        <Text style={[gir ? styles.goodText : styles.badText, { fontFamily: 'Arial', }]}>GIR</Text>
                        <Text style={{ backgroundColor: 'grey', width: '100%', height: 2 }}> </Text>

                        <LottieView
                            ref={girRef}
                            source={gir ? getEmoji('green') : getEmoji('missed_green')}
                            style={styles.animation}
                            loop={false}
                            autoPlay
                        />

                    </View>
                </TouchableOpacity>
            </View >
            
            
            
            
            
            
            <View style={{ marginTop: 10, paddingBottom:10 }}>

                <TouchableOpacity activeOpacity={0.6} style={{}} onPressIn={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);  }}>
                    <View style={[{ width: 90, height: 62, backgroundColor: "#666", borderRadius: 15, alignItems: 'center', borderWidth: 3, borderColor:'#999' }]}>
                        
                        <LottieView
                            ref={girRef}
                            source={getEmoji('stats')}
                            style={styles.animation}
                            loop={false}
                            autoPlay
                        />

                    </View>
                </TouchableOpacity>
            </View >
        </View>


    )
}


const styles = StyleSheet.create({
    goodText: { color: 'yellowgreen' },
    goodBackground: { backgroundColor: 'yellowgreen' },
    badText: { color: 'salmon' },
    badBackground: { backgroundColor: 'salmon' },

    disabledColor: { color: 'grey' },
    disabledBackgtound: { color: 'grey' },
    animation: {
        width: 60,
        height: 60,
    },

})


export default EmojiGIRFIR;

