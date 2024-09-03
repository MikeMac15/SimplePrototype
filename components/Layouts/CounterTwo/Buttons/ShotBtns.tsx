import React from 'react';
import { View, StyleSheet } from "react-native";
import ShotCount from "./ShotCount";
import { ShotData } from '@/components/DataBase/Classes';

interface ShotButtonsProps {
  shotData: { [key in keyof ShotData]: number };
  setShot: (shotType: keyof ShotData, num: number) => void;
}

const ShotBtns: React.FC<ShotButtonsProps> = ({ shotData, setShot }) => {
  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <ShotCount shot={shotData.great} setShot={setShot} title="Great" color='#8ecbe8' color2="#60aacc" highlightColor="#5035ab" />
      <ShotCount shot={shotData.good} setShot={setShot} title="Good" color='#92c730' color2="#85ad44" highlightColor="#3cfaa1" />
      <ShotCount shot={shotData.bad} setShot={setShot} title="Bad" color='#c74130' color2="#de4a3a" highlightColor="#fa8b3c" />
      <ShotCount shot={shotData.putt} setShot={setShot} title="Putt" color='#fcc76a' color2="#d9b06a" highlightColor="#bf62a9" />
    </View>
  );
};

export default ShotBtns;

const styles = StyleSheet.create({});
