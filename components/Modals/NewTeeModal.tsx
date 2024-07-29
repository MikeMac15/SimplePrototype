import React, {useState} from "react"
import { StyleSheet, Text, View, TouchableOpacity, Alert, Modal, Pressable, TextInput, Button } from "react-native"
import { Picker } from "@react-native-picker/picker"

export default function NewTeeModal({ courseID, teeModalVisible }: { courseID: number | undefined, teeModalVisible: boolean }) {
    if (!courseID) {
        return <Text>Error: Course ID is missing</Text>;
    }

    const [modalVisible, setModalVisible] = useState(teeModalVisible);
    const [teeColor, setTeeColor] = useState('White');

    const addNewTeebox = () => {
        // Implement your logic to add a new teebox
    };

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
                    <Text>New Tee Color:</Text>
                    <Picker
                        style={{ width: 150 }}
                        selectedValue={teeColor}
                        onValueChange={(itemValue, itemIndex) => setTeeColor(itemValue)}>
                        <Picker.Item label="Black" value='Black' />
                        <Picker.Item label="Blue" value='Blue' />
                        <Picker.Item label="White" value='White' />
                        <Picker.Item label="Red" value='Red' />
                        <Picker.Item label="Gold" value='Gold' />
                        <Picker.Item label="Silver" value='Silver' />
                        <Picker.Item label="Green" value='Green' />
                    </Picker>
                    <Pressable
                        style={[styles.button, styles.buttonSave]}
                        onPress={addNewTeebox}>
                        <Text style={styles.textStyle}>Save</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonCancel]}
                        onPress={() => { setModalVisible(!modalVisible); }}>
                        <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
          },
          modalView: {
            margin: 20,
            backgroundColor: 'white',
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
          modalText: {
            marginBottom: 15,
            textAlign: 'center',
          },
          textInputBox: {
            backgroundColor: '#ccc',
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius:20
          }
    });