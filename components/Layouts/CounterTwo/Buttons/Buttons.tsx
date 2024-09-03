import React from 'react';
import { StyleSheet, View } from "react-native";
import ShotBtns from "./ShotBtns";
import CheckBoxes2 from "./CheckBoxes2";
import HoleBtns from "./HoleBtns";
import { ShotData } from '@/components/DataBase/Classes';

interface C2ButtonsProps {
  shotData: { [key in keyof ShotData]: number };
  setShot: (shotType: keyof ShotData, num: number) => void;
  gir: boolean;
  fir: boolean;
  setGir: React.Dispatch<React.SetStateAction<boolean>>;
  setFir: React.Dispatch<React.SetStateAction<boolean>>;
  holeNum: number;
  nextHole: () => void;
}

const C2Buttons: React.FC<C2ButtonsProps> = ({ shotData, setShot, gir, fir, setGir, setFir, holeNum, nextHole }) => {
  return (
    <View style={styles.container}>
      <HoleBtns holeNum={holeNum} nextHole={nextHole}/>
      <CheckBoxes2 gir={gir} fir={fir} setGIR={setGir} setFIR={setFir} />
      <ShotBtns shotData={shotData} setShot={setShot} />
    </View>
  );
};

export default C2Buttons;

const styles = StyleSheet.create({
  container: {marginVertical:30},
});
