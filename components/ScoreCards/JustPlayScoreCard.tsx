import { Text, View, StyleSheet, Pressable, Modal, Alert } from 'react-native'
import { Round } from '../DataBase/Classes';

interface JustPlayScoreCardProps {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    modalVisible: boolean;
    round: Round;
}

const JustPlayScoreCard: React.FC<JustPlayScoreCardProps> = ({ round, setModalVisible, modalVisible }) => {
    const front = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const back = [10, 11, 12, 13, 14, 15, 16, 17, 18];
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



                    <View >
                        <View style={{ flexDirection: 'row' }}>
                        <View  style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal:0.5, marginVertical:5 }}>
                                            <Text style={styles.textBox}>Hole</Text>
                                            <Text style={styles.textBox}>Par</Text>
                                            <Text style={styles.textBox}>Score</Text>
                                            <Text style={styles.textBox}>ToPar</Text>
                                        </View>
                            {front.map((holeNum, index) => {
                                if (round.holes[holeNum] === undefined) {
                                    return (
                                        <View key={index} style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal:0.5 }}>
                                            <Text style={styles.box}>{holeNum}</Text>
                                            <Text style={styles.box}>-</Text>
                                            <Text style={styles.box}>-</Text>
                                            <Text style={styles.box}>-</Text>
                                        </View>
                                    )
                                } else {

                                    return (
                                        <View key={index} style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal:0.5 }}>
                                            <Text style={styles.box}>{holeNum}</Text>
                                            <Text style={styles.box}>{round.holes[holeNum].hole.par}</Text>
                                            <Text style={styles.box}>{round.holes[holeNum].toPar + round.holes[holeNum].hole.par}</Text>
                                            <Text style={styles.box}>{round.holes[holeNum].toPar > 0 ? '+' : ''}{round.holes[holeNum].toPar}</Text>
                                        </View>
                                    )
                                }
                            })}
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                        <View  style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal:0.5, marginVertical:5 }}>
                                            <Text style={styles.textBox}>Hole</Text>
                                            <Text style={styles.textBox}>Par</Text>
                                            <Text style={styles.textBox}>Score</Text>
                                            <Text style={styles.textBox}>ToPar</Text>
                                        </View>
                            {back.map((holeNum, index) => {
                                if (round.holes[holeNum] === undefined) {
                                    return (
                                        <View key={index} style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal:0.5 }}>
                                            <Text style={styles.box}>{holeNum}</Text>
                                            <Text style={styles.box}>-</Text>
                                            <Text style={styles.box}>-</Text>
                                            <Text style={styles.box}>-</Text>
                                        </View>
                                    )
                                } else {

                                    return (
                                        <View key={index} style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal:0.5 }}>
                                            <Text style={styles.box}>{holeNum}</Text>
                                            <Text style={styles.box}>{round.holes[holeNum].hole.par}</Text>
                                            <Text style={styles.box}>{round.holes[holeNum].toPar + round.holes[holeNum].hole.par}</Text>
                                            <Text style={styles.box}>{round.holes[holeNum].toPar}</Text>
                                        </View>
                                    )
                                }
                            })}
                        </View>
                    </View>




                    <Pressable
                        style={[styles.button, styles.buttonCancel, { marginTop: 20 }]}
                        onPress={() => setModalVisible(false)}>
                        <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                </View>


            </View>
        </Modal>
    )
}

export default JustPlayScoreCard;



const styles = StyleSheet.create({
    textBox:{
        width: 50, 
        height:30,
        textAlign:'left', 
        paddingLeft:4, 
        fontSize:14,
        marginVertical:.5,
        backgroundColor:'#ccc',
    },
    box:{
        width:30,
        height:30,
        backgroundColor:'#ccc',
        textAlign:'center',
        marginVertical:.5,
        fontSize:18,
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
        borderRadius: 20
    }
});













