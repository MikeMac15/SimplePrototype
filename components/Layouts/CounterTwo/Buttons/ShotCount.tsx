import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface BtnsProps {
  shot: number;
  setShot: (shotType: string, num: number) => void;
  title: string;
  color: string;
  color2: string;
  highlightColor: string;
}

const ShotCount: React.FC<BtnsProps> = ({ shot, setShot, title, color, color2, highlightColor }) => {
  const pickedNumber = (num: number) => {
    setShot(title.toLowerCase(), num);
  };

  const incrementSelected = () => {
    setShot(title.toLowerCase(), shot + 1);
  };

  const ShotBubble = (numb: number, last: boolean) => {
    const highlightedNum = () => {
      if (numb === shot || (last && shot > 3)) {
        return [color2, highlightColor];
      } else if (numb < shot) {
        return [color, highlightColor, color2];
      }
      return ['#4f4f4f', '#444'];
    };

    return (
      <TouchableOpacity onPress={() => pickedNumber(numb)}>
        <LinearGradient
          colors={highlightedNum()}
          key={numb}
          style={[{ padding: 15, borderRadius: 20, margin: 5 }, styles.checkContainer, { borderColor: highlightColor, borderWidth: 1, borderRadius: 10, margin: 3 }]}
        >
          <Text style={{ fontSize: 20 }}>{last ? (numb < shot ? shot : numb) : numb}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 5 }}>
      <Text style={{ fontSize: 30, width: 90, color: color }}>{title}</Text>
      {ShotBubble(0, false)}
      {ShotBubble(1, false)}
      {ShotBubble(2, false)}
      {ShotBubble(3, true)}
      <TouchableOpacity
        style={[{ backgroundColor: color }, { padding: 5, borderRadius: 20, margin: 5 }]}
        onPress={incrementSelected}
      >
        <Text style={{ fontSize: 20 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShotCount;

const styles = StyleSheet.create({
  checkContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
