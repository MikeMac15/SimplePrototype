import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Haptics from 'expo-haptics';
import React from "react";
import { ShotData } from "@/components/DataBase/Classes";
import { Fontisto } from "@expo/vector-icons";

interface BtnsProps {
    addShot: (shotType: keyof ShotData) => void;
    subtractShot: (shotType: keyof ShotData) => void;
    shotData: ShotData;
    addShotColor: (color: string) => void;
    subShotColor: (color: string) => void;
}
const EmojiShotBtns: React.FC<BtnsProps> = ({addShot, subtractShot, shotData, addShotColor, subShotColor}) => {

    const addShotGreat =()=> {
      addShot('great');
      addShotColor('skyblue');
    }
    const subShotGreat =()=> {
      subtractShot('great');
      subShotColor('skyblue');
    }
    const addShotGood =()=> {
      addShot('good');
      addShotColor('yellowgreen');
    }
    const subShotGood =()=> {
      subtractShot('good');
      subShotColor('yellowgreen');
    }
    const addShotBad =()=> {
      addShot('bad');
      addShotColor('salmon');
    }
    const subShotBad =()=> {
      subtractShot('bad');
      subShotColor('salmon');
    }
    const addShotPutt =()=> {
      addShot('putt');
      addShotColor('#E1CAB2');
    }
    const subShotPutt =()=> {
      subtractShot('putt');
      subShotColor('#E1CAB2');
    }

    return (
      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
  
  
        <TouchableOpacity activeOpacity={0.5} style={styles.shotBtn2} onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          onPress={() => addShotGreat()}
          onLongPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft); subShotGreat(); }}>
          <View style={{ backgroundColor: '#555', borderRadius: 20, borderWidth: 3, borderColor: '#73c7eb' }}>
            <View style={styles.centeredRow}>
  
              <View style={[styles.BtnCountContainer2, styles.greatBackground]}>
                <Text style={styles.BtnCount} >{shotData.great}</Text>
              </View>
  
              {/* <Text style={[styles.BtnText2, styles.greatText, styles.textShadow]}>Great</Text> */}
              <Fontisto name="smiley" size={24} color="black" />
  
            </View>
          </View>
        </TouchableOpacity>
  
  
        <TouchableOpacity activeOpacity={0.8} style={styles.shotBtn2} onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          onPress={() => addShotGood()}
          onLongPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft); subShotGood() }}>
          <View style={{ backgroundColor: '#555', borderRadius: 20, borderWidth: 3, borderColor: 'yellowgreen' }}>
            <View style={styles.centeredRow}>
  
  
              <View style={[styles.BtnCountContainer2, styles.goodBackground]}>
                <Text style={styles.BtnCount} >{shotData.good}</Text>
              </View>
  
              <Text style={[styles.BtnText2, styles.goodText, styles.textShadow]}>Good</Text>
  
            </View>
          </View>
        </TouchableOpacity>
  
  
        <TouchableOpacity activeOpacity={0.8} style={styles.shotBtn2} onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          onPress={() => addShotBad()}
          onLongPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft); subShotBad() }}>
          <View style={{ backgroundColor: '#555', borderRadius: 20, borderWidth: 3, borderColor: 'salmon' }}>
  
            <View style={styles.centeredRow}>
  
              <View style={[styles.BtnCountContainer2, styles.badBackground]}>
                <Text style={styles.BtnCount} >{shotData.bad}</Text>
              </View>
  
              <Text style={[styles.BtnText2, styles.badText, styles.textShadow]}>Bad</Text>
  
            </View>
          </View>
        </TouchableOpacity>
  
        <TouchableOpacity activeOpacity={0.8} style={styles.shotBtn2} onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          onPress={() => addShotPutt()}
          onLongPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft); subShotPutt() }}>
  
          <View style={{ backgroundColor: '#555', borderRadius: 20, borderWidth: 3, borderColor: '#E1CAB2' }}>
            <View style={styles.centeredRow}>
  
              <View style={[styles.BtnCountContainer2, styles.puttBackground]}>
                <Text style={styles.BtnCount} >{shotData.putt}</Text>
              </View>
  
              <Text style={[styles.BtnText2, styles.puttText, styles.textShadow]}>Putt</Text>
  
            </View>
          </View>
        </TouchableOpacity>
  
      </View>
  
    )
  }

  const styles = StyleSheet.create({
    greatText: { color: 'skyblue' },
    greatBackground: { backgroundColor: 'skyblue' },
    goodText: { color: 'yellowgreen' },
    goodBackground: { backgroundColor: 'yellowgreen' },
    badText: { color: 'salmon' },
    badBackground: { backgroundColor: 'salmon' },
    puttText: { color: '#E1CAB2' },
    puttBackground: { backgroundColor: '#E1CAB2' },
  

    shotBtn2: {
        width: 225,
        marginVertical: 5,
      },
    centeredRow: { flexDirection: 'row', alignItems: 'center', },
    textShadow: {
        shadowColor: '#555',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: .7,
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
        width: 75, paddingHorizontal: 10, paddingVertical: 8, borderBottomLeftRadius: 15, borderTopLeftRadius: 15,
        opacity: 0.8
      },
      BtnCount: {
        fontSize: 40,
        textAlign: 'center',
        marginLeft: 5,
        fontStyle: 'italic',
        fontWeight: '400',
        fontFamily: 'Arial',
      },
  })
export default EmojiShotBtns;