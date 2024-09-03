import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, AccessibilityProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ShotData } from '@/components/DataBase/Classes';

interface BtnsProps {
  shot: number;
  setShot: (shotType: keyof ShotData, num: number) => void;
  title: string;
  color: string;
  color2: string;
  highlightColor: string;
  bubbleRange?: number[]; // Optional: Allows for dynamic bubble numbers
}

const ShotCount: React.FC<BtnsProps> = ({ shot, setShot, title, color, color2, highlightColor, bubbleRange = [0, 1, 2, 3] }) => {
  const pickedNumber = useCallback((num: number) => {
    setShot(title.toLowerCase() as keyof ShotData, num);
  }, [setShot, title]);
  
  const incrementSelected = useCallback(() => {
    setShot(title.toLowerCase() as keyof ShotData, shot + 1);
  }, [setShot, title, shot]);

  const ShotBubble = useMemo(() => {
    return (numb: number, last: boolean) => {
      const highlightedNum = () => {
        if (numb === shot || (last && shot > 3)) {
          return [color2, highlightColor];
        } else if (numb < shot) {
          return [color, highlightColor, color2];
        }
        return ['#4f4f4f', '#444'];
      };

      return (
        <TouchableOpacity
          key={numb}
          onPress={() => pickedNumber(numb)}
          style={{ margin: 3 }}
          accessibilityLabel={`Select ${numb} shots`}
          accessible
        >
          <LinearGradient
            colors={highlightedNum()}
            style={[styles.checkContainer, { borderColor: highlightColor, borderWidth: 1, borderRadius: 10, padding: 15 }]}
          >
            <Text style={{ fontSize: 20 }}>{last ? (numb < shot ? shot : numb) : numb}</Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    };
  }, [shot, pickedNumber, color, color2, highlightColor]);

  return (
    <View style={styles.container}>
      <Text style={[styles.titleText, { color }]}>{title}</Text>
      {bubbleRange.map((numb, index) => ShotBubble(numb, index === bubbleRange.length - 1))}
      <TouchableOpacity
        style={[styles.incrementButton, { backgroundColor: color }]}
        onPress={incrementSelected}
        accessibilityLabel={`Increment ${title} count`}
        accessible
      >
        <Text style={styles.incrementText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShotCount;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  titleText: {
    fontSize: 30,
    width: 90,
  },
  checkContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  incrementButton: {
    padding: 5,
    borderRadius: 20,
    margin: 5,
  },
  incrementText: {
    fontSize: 20,
  },
});
