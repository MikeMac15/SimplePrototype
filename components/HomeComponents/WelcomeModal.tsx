import { useState } from 'react';
import { Text, View, StyleSheet, Modal, Alert, Pressable, TextInput, Touchable, TouchableOpacity } from 'react-native'
import { setHCP } from '../DataBase/localStorage';

interface WelcomeModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ modalVisible, setModalVisible }) => {
    const [hcp, setHcp] = useState('');

    const UpdateHcpAndDismiss = () => {
        setHCP(parseInt(hcp));
        setModalVisible(false);
    }

    const GetStartedInstructions = () => {
        return (
            <View style={{marginTop:25}}>
                <Text style={{ color: 'whitesmoke', fontSize: 22, textAlign: 'center', marginBottom:10 }}>How to get started</Text>
                <View style={{marginLeft:20}}>
                    <Text style={{ color: 'whitesmoke', fontSize: 15, marginVertical:5 }}>1. Go to My Courses</Text>

                    <View style={{ paddingLeft: 20, marginBottom:15 }}>
                        <Text style={{ color: 'whitesmoke', fontSize: 13 }}> - Add Course</Text>
                        <Text style={{ color: 'whitesmoke', fontSize: 13 }}> - Add Teebox</Text>
                        <Text style={{ color: 'whitesmoke', fontSize: 13 }}> - Input all hole information</Text>
                    </View>

                    <Text style={{ color: 'whitesmoke', fontSize: 15, marginVertical:5 }}>2. Play a Round</Text>
                    <View style={{ paddingLeft: 20, marginBottom:15 }}>
                        <Text style={{ color: 'whitesmoke', fontSize: 13 }}> - Choose Course & Teebox</Text>
                        <Text style={{ color: 'whitesmoke', fontSize: 13 }}> - Play your first round</Text>
                    </View>
                    <Text style={{ color: 'whitesmoke', fontSize: 15, marginVertical:5 }}>3. Check out your Stats</Text>
                    <View style={{ paddingLeft: 20, marginBottom:15 }}>
                        <Text style={{ color: 'whitesmoke', fontSize: 13 }}> - Left Tab is an overview</Text>
                        <Text style={{ color: 'whitesmoke', fontSize: 13 }}> - Right Tab is Course Specific</Text>
                    </View>
                    <Text style={{ color: 'whitesmoke', fontSize: 15, marginVertical:5 }}>4. Customize the app</Text>
                    <View style={{ paddingLeft: 20, marginBottom:15 }}>
                        <Text style={{ color: 'whitesmoke', fontSize: 13 }}> - Press the Settings button (top left)</Text>
                        
                    </View>

                </View>
            </View>
        )
    }


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>


                <View style={styles.modalView}>


                    {/* <WelcomeWindow /> */}
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'whitesmoke', fontSize: 26, marginVertical:10 }}>Welcome to Golf Gooder!</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'whitesmoke', fontSize: 15 }}>Please enter your handicap: </Text>
                            <TextInput
                                style={styles.textInputBox}
                                value={hcp}
                                placeholder="0"
                                onChangeText={(text) => setHcp(text)}
                                keyboardType="number-pad"
                                maxLength={2}
                                returnKeyType="done"
                            />
                        </View>
                        <Text style={{ fontSize: 10, color: 'whitesmoke' }}>Not Sure?</Text>
                        <Text style={{ fontSize: 10, color: 'whitesmoke' }}>Just input your avg score over par ( 102 - 72 = +30hcp )</Text>
                    </View>

                    <GetStartedInstructions />




                    <TouchableOpacity
                        style={[styles.button, hcp.length > 0 ? styles.buttonSave : styles.buttonDisabled , { marginTop: 20 }]}
                        onPress={() => hcp.length > 0 ? UpdateHcpAndDismiss() : ''}>
                        <Text style={styles.textStyle}>Get Started</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </Modal>
    )
}

export default WelcomeModal;


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: '90%',
        margin: 20,
        backgroundColor: '#444',
        borderRadius: 20,
        padding: 35,
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

    buttonSave: {
        // backgroundColor: 'antiquewhite',
        backgroundColor: '#2196F3',
        width: 110
    },
    buttonDisabled: {
        // backgroundColor: 'antiquewhite',
        backgroundColor: '#666',
        width: 110
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    textInputBox: {
        backgroundColor: '#FFF',
        color: 'black',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 10,
        fontSize: 20
    },
});

