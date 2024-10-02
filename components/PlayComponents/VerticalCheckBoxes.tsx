import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Haptics from 'expo-haptics';
import React from "react";
import { Hole } from "@/components/DataBase/Classes";
import { Feather } from "@expo/vector-icons";

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
          hole?.par === 3 ? Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Error
          ) : changeFIR()
        }}>

          <View style={[{
            width: 70, height: 70, backgroundColor: "#666", borderRadius: 15, alignItems: 'center', borderWidth: 3, shadowOffset: { width: 1.5, height: 1 },
            shadowOpacity: 0.5,
            shadowRadius: 3,
          }, hole?.par === 3 ? { borderColor: "#4a4a4a", shadowColor: "#4a4a4a" } : fir ? { borderColor: 'yellowgreen', shadowColor: 'yellowgreen' } : { borderColor: 'salmon', shadowColor: 'salmon' }]}>
            <Text style={[hole?.par === 3 ? { color: "#4a4a4a" } : fir ? styles.goodText : styles.badText, { fontFamily: 'Arial' }]}>FIR</Text>
            <Text style={{ backgroundColor: "grey", width: '100%', height: 2 }}> </Text>


            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
              {hole?.par === 3 ? <Feather name="x" size={45} color="#4a4a4a" /> : fir ? <Feather name="check" size={45} color="yellowgreen" /> : <Feather name="x" size={45} color="salmon" />}
            </View>

          </View>



        </TouchableOpacity>

      </View>
      <View style={{ marginTop: 20 }}>



        <TouchableOpacity activeOpacity={0.6} style={{}} onPressIn={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setGir(!gir) }}>
          <View style={[{
            width: 70, height: 70, backgroundColor: "#666", borderRadius: 15, alignItems: 'center', borderWidth: 3, shadowOffset: { width: 1.5, height: 1 },
            shadowOpacity: 0.5,
            shadowRadius: 3,
          }, gir ? { borderColor: 'yellowgreen', shadowColor: 'yellowgreen' } : { borderColor: 'salmon', shadowColor: 'salmon' }]}>
            <Text style={[gir ? styles.goodText : styles.badText, { fontFamily: 'Arial', }]}>GIR</Text>
            <Text style={{ backgroundColor: 'grey', width: '100%', height: 2 }}> </Text>
            {/* <Text style={[{ fontSize: 40, fontStyle: 'italic', fontFamily: 'Arial', }, gir ? styles.goodText : styles.badText]}>{gir ? 'V' : 'X'}</Text> */}
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
              {gir ? <Feather name="check" size={45} color="yellowgreen" /> : <Feather name="x" size={45} color="salmon" />}
            </View>

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