import { Stack } from 'expo-router';
import { StyleSheet, ImageBackground, TouchableOpacity, Text, Button } from 'react-native'
import useTheme from './Theme';
import { useEffect, useMemo, useState } from 'react';
import { Hole } from '@/components/DataBase/Classes';
import ScoreModal3 from '@/components/Layouts/CounterThree/ScoreModal3';

interface StackHeaderProps {
  image: any;
  imageTag: string;
  title: string;
  roundRef?: any;
  teeboxHoles?: Hole[];
  lastHole?: () => void;
  nextHole?: () => void;
  scorecard?: () => void;
}

const StackHeader: React.FC<StackHeaderProps> = ({ image, imageTag, title, roundRef, lastHole, nextHole, scorecard, teeboxHoles }) => {
  const [textColor, setTextColor] = useState('red');
  const [modalVisible, setModalVisible] = useState(false);

  const textColorMemo = useMemo(() => {
    switch (imageTag) {
      case 'proud-parent':
        return '#222';
      case 'retro':
        return '#fff';
      case 'nasaJW':
        return '#ddd';
      default:
        return 'red';
    }
  }, [imageTag]);

  useEffect(() => {
    setTextColor(textColorMemo);
  }, [textColorMemo]);

  if (roundRef && lastHole && nextHole) {
  
    return (
      <Stack.Screen options={{
        gestureEnabled: false,
        title: title,

        headerBackground: () => (
          <ImageBackground
            source={image}
            style={[StyleSheet.absoluteFill, { flex: 1 }]}
          />
        ),
        headerTitleStyle: { color: textColor, fontSize: 25, fontWeight: 'bold', fontFamily: 'Papyrus' },

        headerBlurEffect: 'systemUltraThinMaterialDark',
        headerLeft: () => (
          <TouchableOpacity onPress={() => setModalVisible(true)} >
            <Text style={{ color: 'salmon', }}>Scorecard</Text>
            {teeboxHoles &&
              <ScoreModal3 modalVisible={modalVisible} setModalVisible={setModalVisible} teeboxHoles={teeboxHoles} roundHoles={roundRef.current.holes} holeNumber={Object.keys(roundRef.current.holes).length} round={roundRef.current} />
            }
          </TouchableOpacity>
        ),
        headerRight: () => (
          Object.keys(roundRef.current.holes).length == 17
            ? <Button title='Finish' onPress={() => lastHole()} />
            : <Button title='Next >' onPress={() => nextHole()} />
        ),
      }}
      />
    )
  }

  return (
    <Stack.Screen options={{
      headerTintColor: textColor,
      title: title,
      headerBackTitle: "Menu",
      headerBackground: () => (
        <ImageBackground
          source={image}
          style={[StyleSheet.absoluteFill, { flex: 1 }]}
        />
      ),
      headerTitleStyle: {  fontSize: 25, fontWeight: '800' },
      
    }} />
  )
}
  

export default StackHeader;
