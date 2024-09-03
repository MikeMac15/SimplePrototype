import { router, Stack } from 'expo-router';
import { StyleSheet, ImageBackground, TouchableOpacity, Text, Button, TextStyle } from 'react-native'
import useTheme from './Theme';
import { useEffect, useMemo, useState } from 'react';
import { Hole } from '@/components/DataBase/Classes';
import ScoreModal3 from '@/components/Layouts/CounterThree/ScoreModal3';
import { BlurEffectTypes } from 'react-native-screens';
import { useTextColor } from './Colors';
import { Feather } from '@expo/vector-icons';

export const StackOptions = ({ image, imageTag, title}:{ image: any; imageTag: string; title: string; }) => {

  const textColor = useTextColor(imageTag);

  const options = {
    title: title,
    headerTintColor: textColor,
    headerBackTitle: "Menu",
    headerLeft: () => (
      <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => router.dismiss()}>
        <Feather name="chevron-left" size={30} color={textColor} />
        <Text style={{ color: textColor, fontSize: 18 }}>Menu</Text>
      </TouchableOpacity>
    ),
    headerBackground: () => (
      <ImageBackground source={image} style={StyleSheet.absoluteFillObject} />
    ),
    headerTitleStyle: { fontSize: 25, fontWeight: '800' as TextStyle['fontWeight'] },
  };

  return options;
};

export default StackOptions;

