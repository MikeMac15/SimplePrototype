import { useEffect, useMemo, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native'

interface GIRFIRProps {
    gir: number;
    fir: number;
}

export const ProgressBar = ({ data, text }: { data: number, text: string }) => {
    const getColor = useMemo(() => {
        if (data < 25) return 'red';
        if (data <= 40) return 'salmon';
        if (data > 75) return 'skyblue';
        if (data > 40) return 'yellowgreen';
        return '#333'; // default color
    }, [data]);

    return (
        <View style={styles.container}>
          <Text style={styles.label}>{`${data.toFixed(0)}%`}</Text>
          <View style={styles.bar}>
            <View style={[styles.filler, { width: `${data}%`, backgroundColor: getColor }]} />
          </View>
          <Text style={[styles.label, { marginTop: 5 }]}>{text}</Text>
        </View>
    );
};

const GIRFIR: React.FC<GIRFIRProps> = ({gir, fir}) => {
    const [color, setColor] = useState('#333');



  return (
<View style={{flexDirection:'row'}}>
    <ProgressBar data={Math.floor((gir/18)*100)}  text='Greens In Regulation' />
    <View style={{width:1,backgroundColor:'#333', borderRadius:20}} />
    <ProgressBar data={Math.floor((fir/14)*100)} text='Fairways In Regulation' />
</View>
)
}

export default GIRFIR;



const styles = StyleSheet.create({
    container: {
        width: '70%',
        alignItems: 'center',
    
      },
    
label: {
    marginBottom: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'whitesmoke',
  },
  bar: {
    height: 10,
    width: '90%',
    backgroundColor: '#e0e0df',
    borderRadius: 10,
    overflow: 'hidden',
  },
  filler: {
    height: '100%',
    backgroundColor: '#76c7c0',
    borderRadius: 9,
  },

})