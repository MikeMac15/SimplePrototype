import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import useTheme from "@/constants/Theme";

interface StratTagsProps {
    par: number;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    holestrategy: string;
    setHoleStrategy: (strategy: string) => void;
}


const StratTags: React.FC<StratTagsProps> = ({ par, visible, setVisible, holestrategy, setHoleStrategy }) => {
    const [localStrategy, setLocalStrategy] = useState(holestrategy);
    const theme = useTheme();
    const handleSave = () => {
        setHoleStrategy(localStrategy);
        setVisible(false);
    };



    const ParSpecificPicker = () => {
        if (par === 5) {
            return (
                <Picker
                    style={{ width: 250 }}
                    selectedValue={localStrategy}
                    
                    onValueChange={(itemValue: string, itemIndex: number) => setLocalStrategy(itemValue)}
                >
                    <Picker.Item label="None" value='0' />
                    <Picker.Item label="Conservative" value='1' />
                    <Picker.Item label="Aggressive" value='2' />
                    <Picker.Item label="Pin Hunting" value='3' />
                    <Picker.Item label="Middle green" value='4' />
                    <Picker.Item label="Green in 2" value='6' />
                    <Picker.Item label="Green in 3" value='7' />
                    <Picker.Item label="No driver" value='8' />
                    <Picker.Item label="Layup to fav club" value='9' />
                </Picker>
            )
        } else if (par === 4) {

            return (
                <Picker
                    style={{ width: 250 }}
                    selectedValue={localStrategy}
                    onValueChange={(itemValue: string, itemIndex: number) => setLocalStrategy(itemValue)}
                >
                    <Picker.Item label="Conservative" value='1' />
                    <Picker.Item label="Aggressive" value='2' />
                    <Picker.Item label="Pin Hunting" value='3' />
                    <Picker.Item label="Middle green" value='4' />
                    <Picker.Item label="Green in 1" value='5' />
                    <Picker.Item label="No driver" value='8' />
                    <Picker.Item label="Layup to fav club" value='9' />
                </Picker>
            )
        } else if (par === 3) {

            return (
                <Picker
                    style={{ width: 250 }}
                    selectedValue={localStrategy}
                    onValueChange={(itemValue: string, itemIndex: number) => setLocalStrategy(itemValue)}
                >
                    <Picker.Item label="Conservative" value='1' />
                    <Picker.Item label="Aggressive" value='2' />
                    <Picker.Item label="Pin Hunting" value='3' />
                    <Picker.Item label="Middle green" value='4' />
                </Picker>
            )

        } else { return <Text>Error</Text> }
    }


    return (
        <View>


            {/*///////////////////////// TEE MODAL ///////////////////////*/}
            <Modal
                transparent={true}
                animationType="slide"
                visible={visible}
                onRequestClose={() => setVisible(false)}
            >

                <View style={styles.centeredView}>

                    <View style={styles.modalView}>
                    <Text>Hole Strategy</Text>

                        <ParSpecificPicker />

                        <Pressable
                            style={[styles.button, styles.buttonSave]}
                            onPress={() => handleSave()}>
                            <Text style={styles.textStyle}>Save</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonCancel]}
                            onPress={() => setVisible(false)}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>

                </View>
            </Modal>
            {/*///////////////////////// TEE MODAL ///////////////////////*/}





        
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,



    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        width: 275,
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10
    },
    buttonCancel: {
        backgroundColor: 'salmon',
        width: 80
    },
    buttonSave: {
        backgroundColor: '#2196F3',
        width: 80
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

export default StratTags