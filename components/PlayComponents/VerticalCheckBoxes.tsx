import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Haptics from 'expo-haptics';
import React from "react";
import { Hole } from "@/components/DataBase/Classes";

interface CheckBoxProps {
    hole: Hole;
    fir: boolean;
    setFir: (fir: boolean) => void;
    gir: boolean;
    setGir: (fir: boolean) => void;
}

const VerticalCheckBoxes: React.FC<CheckBoxProps> = ({ hole, fir, setFir, gir, setGir }) => {
    
  
    const changeFIR = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setFir(!fir);
    }
    return (
      <View style={{ flexDirection: 'column', marginVertical: 20 }}>
  
        <View style={{ marginBottom: 20 }}>
  
          <TouchableOpacity activeOpacity={0.6} style={{}} onPressIn={() => {
            hole?.par == 3 ? Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Error
            ) : changeFIR()
          }}>
  
            <View style={[{ width: 70, height: 70, backgroundColor: "#666", borderRadius: 15, alignItems: 'center', borderWidth: 3, }, hole?.par == 3 ? { borderColor: 'grey' } : fir ? { borderColor: 'yellowgreen' } : { borderColor: 'salmon' }]}>
              <Text style={[hole?.par == 3 ? styles.disabledColor : fir ? styles.goodText : styles.badText, { fontFamily: 'Arial' }]}>FIR</Text>
              <Text style={{ backgroundColor: 'grey', width: '100%', height: 2 }}> </Text>
  
              <Text style={[{ fontSize: 40, fontStyle: 'italic', fontFamily: 'Arial', }, hole?.par == 3 ? styles.disabledColor : fir ? styles.goodText : styles.badText]}>{fir ? 'V' : 'X'}</Text>
  
            </View>
  
  
  
          </TouchableOpacity>
  
        </View>
        <View style={{ marginTop: 20 }}>
  
  
  
          <TouchableOpacity activeOpacity={0.6} style={{}} onPressIn={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setGir(!gir) }}>
            <View style={[{ width: 70, height: 70, backgroundColor: "#666", borderRadius: 15, alignItems: 'center', borderWidth: 3, }, gir ? { borderColor: 'yellowgreen' } : { borderColor: 'salmon' }]}>
              <Text style={[gir ? styles.goodText : styles.badText, { fontFamily: 'Arial', }]}>GIR</Text>
              <Text style={{ backgroundColor: 'grey', width: '100%', height: 2 }}> </Text>
  
              <Text style={[{ fontSize: 40, fontStyle: 'italic', fontFamily: 'Arial', }, gir ? styles.goodText : styles.badText]}>{gir ? 'V' : 'X'}</Text>
  
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


  })

  export default VerticalCheckBoxes;