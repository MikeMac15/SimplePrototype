import { Text, View, StyleSheet, Modal, Pressable, Alert } from 'react-native'

interface DefaultModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    ChildComponent: React.FC;
}

const DefaultModal: React.FC<DefaultModalProps> = ({modalVisible,setModalVisible,ChildComponent}) => {
    return(
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
                    <ChildComponent />

                    <Pressable
                      style={[styles.button, styles.buttonCancel, {marginTop: 20}]}
                      onPress={() => setModalVisible(!modalVisible)}>
                          <Text style={styles.textStyle}>Cancel</Text>
                      </Pressable>
                  </View>
         
             
              </View>
              </Modal>
  )
}

export default DefaultModal;



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

