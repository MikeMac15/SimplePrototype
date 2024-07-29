import { Animated, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, Ionicons, MaterialCommunityIcons, Entypo, FontAwesome6 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
const C2Options = () => {

    const OptionBtn = (title:string, icon:string) => {
        const Icon = () => {

            switch (icon) {
                case 'score':
                    return <Entypo name="document" color={'whitesmoke'} size={22} />
                case 'dot':
                    return <AntDesign name='dotchart' color={'whitesmoke'} size={22} />
                case 'bar':
                    return <Ionicons name='stats-chart-sharp' color={'whitesmoke'} size={22} />
                case 'exit':
                    return <MaterialCommunityIcons name="exit-run" color={'whitesmoke'} size={22} />
                    
                    }
                }
        return (
            
                <View style={{flexDirection:'column', alignItems:'center'}}>
                    <View style={{marginBottom:2}}>
                        {Icon()}
                    </View>
                    <View>
                        <Text style={{color:'whitesmoke', fontSize:10}}>{title}</Text>
                    </View>
                </View>
           
        )
    }

    const [height] = useState(new Animated.Value(0)); // Initialize height as 0
  const animationDuration = 300; // Animation duration in milliseconds
    const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    Animated.timing(height, {
      toValue: isVisible ? 60 : 0, // Target height: 60 when visible, 0 when hidden
      duration: animationDuration,
      useNativeDriver: false, // Set to false because height is a non-transform property
    }).start();
  }, [isVisible, height]);

    return(
        <View>
                <TouchableOpacity style={{flexDirection:'row', justifyContent:'center', alignItems:isVisible?'center':'flex-start', marginVertical:5,}} onPress={() => setIsVisible(!isVisible)}>
                    <Text style={styles.text}>Other Options </Text>
                    {isVisible ?
                    <FontAwesome6 name='sort-up' color={'whitesmoke'} />
                    :
                    <FontAwesome6 name='sort-down' color={'whitesmoke'} />
                }
                </TouchableOpacity>

                <Animated.View style={[styles.animatedView, { height }, {}]}>
        {OptionBtn('Scorecard', 'score')}
        {OptionBtn('RoundStats', 'bar')}
        {OptionBtn('PrevStats', 'dot')}
        {OptionBtn('Exit Round', 'exit')}
    </Animated.View>
    </View>
    )
}

export default C2Options;


const styles = StyleSheet.create({

    animatedView: {
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#444',
    //   paddingVertical: 10,
      overflow: 'hidden', // Ensure content doesn't overflow when height is 0
    },
    text: {
      color: '#fff',
    },
  });
  