import { Hole, HoleStats } from "@/components/DataBase/Classes";
import { router } from "expo-router";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

interface ModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  }

const ExitModal: React.FC<ModalProps> = ({modalVisible, setModalVisible}) => {

    


  


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
                <View style={[styles.modalView,{backgroundColor:'#ddd', padding:20, margin:10}]}>
                   <Text>Are You Sure You Want To Quit?</Text>
                   <Text>All Progress Will Be Deleted.</Text>
                   
                    <Pressable
                    style={[styles.button, styles.buttonCancel]}
                    onPress={() => router.dismissAll()}>
                        <Text style={styles.textStyle}>Quit</Text>
                    </Pressable>
                    <Pressable
                    style={[styles.button, styles.buttonCancel]}
                    onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                </View>
                </View>
       
           
            </View>
            </Modal>
    )
  }

  export default ExitModal;

  const styles = StyleSheet.create({

    animatedView: {
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#111',
      width:'80%',
    //   paddingVertical: 10,
      overflow: 'hidden', // Ensure content doesn't overflow when height is 0
    },
    text: {
      color: '#fff',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      
    },
    modalView: {
      margin: 20,
      
      borderRadius: 20,
      padding:0, 
      backgroundColor:'#333',

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
    scoreLabel: {
      width:45,
      height:20,
    },
    scoreValues:{
      height:20,
      width:40,
      justifyContent:'center',
      alignItems:'center',
    },
    seperator:{
      height:1,
      backgroundColor:'#555'
    }
  });
  