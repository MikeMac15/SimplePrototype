import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Feather } from "@expo/vector-icons"
const GIR = () => {
    const [gir, setGIR] = useState(false)
    return (
        <View style={styles.checkContainer}>
            <Text style={{color:'yellowgreen'}}>GIR</Text>
            
                <View style={[styles.checkContainer,{borderColor:'yellowgreen', borderWidth:3, borderRadius:10, margin:3}, styles.btnRadius]}>
                    <Feather name="check" size={50} color={'yellowgreen'}/>
                </View>
          
        </View>
    )
}
const FIR = () => {
    const [fir, setFIR] = useState(false)
    return (
        <View style={styles.checkContainer}>
            <Text style={{color:'yellowgreen'}}>FIR</Text>
            
                <View style={[styles.checkContainer,{borderColor:'yellowgreen', borderWidth:3, borderRadius:10, margin:3}, styles.btnRadius2]}>
                    <Feather name="check" size={50} color={'yellowgreen'}/>
                </View>
          
        </View>
    )
}

const CheckBoxes = () => {
    return (
        <View style={{flexDirection:'row', justifyContent:'center'}}>
            <GIR />
            <FIR />
        </View>
    )
}

export default CheckBoxes;

const styles = StyleSheet.create({
    checkContainer: {
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        padding:2,
        marginHorizontal:15,
    },
    btnRadius: {
        borderTopLeftRadius:20,
        borderBottomRightRadius:20,
     },
     btnRadius2: {
        borderTopRightRadius:20,
        borderBottomLeftRadius:20,
     },
})