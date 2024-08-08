import { Scorecard } from "@/app/(myCourses)/(holes)/Holes";
import { Hole, HoleStats, Round } from "@/components/DataBase/Classes";
import Score9 from "@/components/ScoreCards/ScoreCard";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

interface ModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    teeboxHoles:Hole[];
    roundHoles: {[key:number] : HoleStats};
    holeNumber: number;
    round: Round;
  }

const ScoreModal3: React.FC<ModalProps> = ({modalVisible, setModalVisible, teeboxHoles, roundHoles, holeNumber, round}) => {


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
                <Score9 holes={teeboxHoles.slice(0, 9)} title="Front Nine" holeNumber={holeNumber} round={round} />
                <Score9 holes={teeboxHoles.slice(9, 18)} title="Back Nine" holeNumber={holeNumber} round={round} />
                
                    <Pressable
                    style={[styles.button, styles.buttonCancel]}
                    onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                </View>
       
           
            </View>
            </Modal>
    )
  }

  export default ScoreModal3;

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
      padding:20, 
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
  