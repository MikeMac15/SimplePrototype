import { Hole, HoleStats, Round } from '@/components/DataBase/Classes';
import RoundSummary from '@/components/RoundSummary/RoundSummary';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text, View, StyleSheet, Modal, Pressable, Alert, Button, Dimensions } from 'react-native'



const summaryTest = () => {

// const round = new Round(1, 1, '10/08/2024', 79, 32, 14, 20, 13, 8, 10,0,2,10,7,2,7,3,4,0,true);
const round = new Round(1);// 1, '10/08/2024', 79, 32, 14, 20, 13, 8, 10,0,2,10,7,2,7,3,4,0,true);
round.date = '10/08/2024';

const hole1 = new Hole(1, 1, 1, 1, 4, 287);
const hole2 = new Hole(2, 1, 1, 2, 3, 207);
const hole3 = new Hole(3, 1, 1, 3, 5, 502);
const hole4 = new Hole(4, 1, 1, 4, 4, 390);
const hole5 = new Hole(5, 1, 1, 5, 3, 180);
const hole6 = new Hole(6, 1, 1, 6, 4, 400);
const hole7 = new Hole(7, 1, 1, 7, 5, 520);
const hole8 = new Hole(8, 1, 1, 8, 4, 350);
const hole9 = new Hole(9, 1, 1, 9, 3, 200);
const hole10 = new Hole(10, 1, 1, 10, 4, 420);
const hole11 = new Hole(11, 1, 1, 11, 5, 540);
const hole12 = new Hole(12, 1, 1, 12, 4, 370);
const hole13 = new Hole(13, 1, 1, 13, 3, 190);
const hole14 = new Hole(14, 1, 1, 14, 4, 410);
const hole15 = new Hole(15, 1, 1, 15, 5, 530);
const hole16 = new Hole(16, 1, 1, 16, 4, 340);
const hole17 = new Hole(17, 1, 1, 17, 3, 220);
const hole18 = new Hole(18, 1, 1, 18, 4, 380);

// Define all 18 HoleStats
round.addRoundHole(hole1, 2, 1, 1, 0, true, 0, true);
round.addRoundHole(hole2, 2, 0, 1, 1, true, 0, false);
round.addRoundHole(hole3, 2, 1, 1, 1, true, 0, true);
round.addRoundHole(hole4, 2, 1, 0, 1, true, 0, true);
round.addRoundHole(hole5, 2, 0, 1, 1, false, 0, false);
round.addRoundHole(hole6, 1, 1, 3, 1, false, 0, true);
round.addRoundHole(hole7, 1, 2, 1, 1, true, 0, false);
round.addRoundHole(hole8, 2, 0, 1, 1, false, 0, true);
round.addRoundHole(hole9, 2, 1, 0, 1, true, 0, false);
round.addRoundHole(hole10, 2, 0, 1, 1, true, 0, false);
round.addRoundHole(hole11, 1, 2, 1, 1, false, 0, true);
round.addRoundHole(hole12, 2, 1, 0, 1, true, 0, true);
round.addRoundHole(hole13, 2, 0, 1, 1, false, 0, false);
round.addRoundHole(hole14, 2, 1, 1, 1, true, 0, true);
round.addRoundHole(hole15, 2, 0, 1, 1, true, 0, false);
round.addRoundHole(hole16, 2, 1, 0, 1, false, 0, true);
round.addRoundHole(hole17, 1, 1, 1, 1, true, 0, false);
round.addRoundHole(hole18, 2, 0, 1, 1, true, 0, true);


const [modalVisible, setModalVisible] = useState(false);
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
            <Button title='Show Modal' onPress={() => setModalVisible(true)} />
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
                }}>
              <View style={styles.centeredView}>
  
                 
                  <View style={[styles.modalView]}>
                  <View style={{transform:'scale(0.8)',height: height * 0.7, width:width * 0.7}}>
                    
                  <RoundSummary round={round} course='Dominion Meadows' tee='Black' />

                  </View>
                    <Pressable
                      style={[styles.button, styles.buttonCancel, {marginTop: 20}]}
                      onPress={() => {setModalVisible(false); router.dismissAll()}}>
                          <Text style={styles.textStyle}>Menu</Text>
                      </Pressable>
                  </View>
         
             
              </View>
              </Modal>
        </View>
    )
}

export default summaryTest;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
    },
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
