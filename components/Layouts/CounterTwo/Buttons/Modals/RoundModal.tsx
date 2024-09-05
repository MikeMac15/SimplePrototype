import { Hole, HoleStats, Round } from "@/components/DataBase/Classes";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

export const RoundView = ({round}:{round:Round}) => {
    const holesPlayed = Object.keys(round.holes).length;
    const data = [{ value: 0 }];
    const [max,setMax] = useState(0);
    for (let i = 0; i < holesPlayed; i++) {
        const holeStats = round.holes[i + 1];
        if (holeStats) {
            data.push({ value: holeStats.toPar });

            if (holeStats.toPar > max) {
                setMax(holeStats.toPar);
            }
        }
    }

    const HoleTitle = () => {
        return (
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#222', paddingVertical: 3}}>
            <Text style={{ color: 'whitesmoke', fontSize: 20, fontFamily: 'papyrus' }}>Round Insights</Text>
    
          </View>
        );
      }
    
    return (
    
    
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>

       
        {/* <View style={{width:350, paddingRight:0, transform:'scaleX(.8)'}}>
            {data.length > 2
            ?
            <LineChart
            
            maxValue={3}
            adjustToWidth
            height={150}
            mostNegativeValue={-3}
            areaChart
            data={data}
            startFillColor="rgb(46, 217, 255)"
            startOpacity={0.8}
            endFillColor="rgb(203, 241, 250)"
            endOpacity={0.3}
            />
            :''
        }
        </View> */}
      
            <View>

            
        <HoleTitle />

        <View style={{ flexDirection: 'row', marginVertical:10 }}>
            
            <View style={styles.leftStatFull}>
                
                <View style={{marginBottom:20, justifyContent:'center', alignItems:'center'}}>
                    <Text style={styles.rightStatLabel}>To Par</Text>
                    <Text style={[styles.rightStatNum]}>{round.toPar > 0 ? '+': ''}{round.toPar}</Text>
                </View>
                <View style={{marginBottom:20, justifyContent:'center', alignItems:'center'}}>
                    <Text style={styles.rightStatLabel}>Strokes</Text>
                    <Text style={[styles.rightStatNum]}>{round.totalStrokes}</Text>
                </View>

                <View style={{marginBottom:20, justifyContent:'center', alignItems:'center'}}>
                    <Text style={styles.rightStatLabel}>Total Putts</Text>
                    <Text style={[styles.rightStatNum,{color: round.totalPutts > 0 ? 'antiquewhite' : 'whitesmoke'}]}>{round.totalPutts}</Text>
                </View>
                <View style={styles.leftStat}>
                    <Text style={styles.rightStatLabel}>Great: </Text>
                    <Text style={[styles.rightStatNum,{color: round.great > 0 ? 'skyblue' : 'whitesmoke'}]}>{round.great}</Text>
                </View>
                <View style={styles.leftStat}>
                    <Text style={styles.rightStatLabel}>Good: </Text>
                    <Text style={[styles.rightStatNum,{color: round.good > 0 ? 'yellowgreen' : 'whitesmoke'}]}>{round.good}</Text>
                </View>
                <View style={styles.leftStat}>
                    <Text style={styles.rightStatLabel}>Bad: </Text>
                    <Text style={[styles.rightStatNum,{color: round.bad > 0 ? 'salmon' : 'whitesmoke'}]}>{round.bad}</Text>
                </View>


            </View>



            <View style={{justifyContent:'center', alignItems:'center', width:225}}>
            <View style={styles.circle}>
                <Text style={{ fontSize: 40, color: 'whitesmoke' }}>{round.toPar3 > 0 ? '+' : ''}{round.toPar3}</Text>
                <Text style={{ fontSize: 10, color: 'whitesmoke' }}>Par 3's</Text>
            </View>
            
            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>

            <View style={styles.circle}>
            <Text style={{ fontSize: 40, color: 'whitesmoke' }}>{round.toPar4 > 0 ? '+' : ''}{round.toPar4}</Text>
            <Text style={{ fontSize: 10, color: 'whitesmoke' }}>Par 4's</Text>
            </View>
            <View style={styles.circle}>
            <Text style={{ fontSize: 40, color: 'whitesmoke' }}>{round.toPar5 > 0 ? '+' : ''}{round.toPar5}</Text>
            <Text style={{ fontSize: 10, color: 'whitesmoke' }}>Par 5's</Text>
            </View>
            </View>
        <View style={{marginVertical:10, transform:'scaleX(.9)', paddingRight:30}}>
            <View style={{flexDirection:'row'}}>
                <View><Text style={{fontSize:20, color:'whitesmoke', width:40}}>GIR:</Text></View>
                <View style={{width:180, backgroundColor:'#444'}}>
                <View style={{width:Object.keys(round.holes).length*10, backgroundColor:'salmon', borderWidth:.5, borderColor:'#222'}}>
                    <View style={[styles.girBar, {width:round.totalGIR*10}]}>
                        <Text>{round.totalGIR}</Text>
                    </View>
                    </View>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <View><Text style={{fontSize:20, color:'whitesmoke', width:40}}>FIR:</Text></View>
                <View style={{width:180, backgroundColor:'#444'}}>
                <View style={{width:Object.keys(round.holes).length, backgroundColor:'salmon', borderWidth:.5, borderColor:'#222'}}>
                    <View style={[styles.girBar, {width:round.totalGIR}]}>
                        <Text>{round.totalGIR}</Text>
                    </View>
                    </View>
                </View>
            </View>

            
        </View>
            </View>


            
        </View>


        <View style={styles.boxStatFull}>

                <LinearGradient colors={['#444','#393939']} style={styles.boxStat}>
                    <Text style={[styles.boxStatLabel,{color: round.eaglesOless > 0 ? 'skyblue' : 'whitesmoke'}]}>Eagles(-): </Text>
                    <Text style={[styles.boxStatNum,{color: round.eaglesOless > 0 ? 'skyblue' : 'whitesmoke'}]}>{round.eaglesOless}</Text>
                </LinearGradient>
                <LinearGradient colors={['#444','#393939']} style={styles.boxStat}>
                    <Text style={[styles.boxStatLabel,{color: round.birdies > 0 ? 'skyblue' : 'whitesmoke'}]}>Birdies: </Text>
                    <Text style={[styles.boxStatNum,{color: round.birdies > 0 ? 'skyblue' : 'whitesmoke'}]}>{round.birdies}</Text>
                </LinearGradient>
                <LinearGradient colors={['#444','#393939']} style={styles.boxStat}>
                    <Text style={[styles.boxStatLabel,{color: round.pars > 0 ? 'yellowgreen' : 'whitesmoke'}]}>Pars: </Text>
                    <Text style={[styles.boxStatNum,{color: round.pars > 0 ? 'yellowgreen' : 'whitesmoke'}]}>{round.pars}</Text>
                </LinearGradient>
                <LinearGradient colors={['#444','#393939']} style={styles.boxStat}>
                    <Text style={[styles.boxStatLabel,{color: round.bogeys > 5 ? 'salmon' : 'whitesmoke'}]}>Bogeys: </Text>
                    <Text style={[styles.boxStatNum,{color: round.bogeys > 5 ? 'salmon' : 'whitesmoke'}]}>{round.bogeys}</Text>
                </LinearGradient>
                <LinearGradient colors={['#444','#393939']} style={styles.boxStat}>
                    <Text style={[styles.boxStatLabel,{color: round.doublePlus > 0 ? 'salmon' : 'whitesmoke'}]}>Dbl(+): </Text>
                    <Text style={[styles.boxStatNum,{color: round.doublePlus > 0 ? 'salmon' : 'whitesmoke'}]}>{round.doublePlus}</Text>
                </LinearGradient>


            </View>

            </View>
      

    </View>)
}
interface ModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    round: Round;
}

const RoundModal: React.FC<ModalProps> = ({ modalVisible, setModalVisible, round }) => {
 



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

                    <RoundView round={round} />

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

export default RoundModal;

const styles = StyleSheet.create({


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
transform:'scale(.95)',
        borderRadius: 20,
        padding: 20,
        backgroundColor: '#333',

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
        width: 45,
        height: 20,
    },
    scoreValues: {
        height: 20,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    seperator: {
        height: 1,
        backgroundColor: '#555'
    },

    midCircleDiv: {
        flexDirection: 'row',
        backgroundColor: '#222',
        width: 325,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    circleStat: {
        flexDirection: 'row',

        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleLabel: {
        fontSize: 20,
        color: 'whitesmoke'
    },
    circleNum: {
        fontSize: 30,
        color: 'white',
        marginLeft: 10
    },
    leftStatFull: {
    //   backgroundColor:'grey',
        // justifyContent:'flex-start',
        alignItems:'flex-start',
        justifyContent:'center',
        width:120,
    },
    boxStatFull: {
    //   backgroundColor:'grey',
        // justifyContent:'flex-start',
        flexDirection:'row',
        alignItems:'center',
        
    },
    leftStat: {
        flexDirection: 'row',
        // justifyContent:'flex-start',
        alignItems: 'center',
// backgroundColor:'white'
    },
    boxStat: {
        width:65,
        flexDirection: 'column',
        // justifyContent:'flex-start',
        alignItems: 'center',
backgroundColor:'white',
margin:2

    },
    leftStatLabel: {
        width: 115,
        fontSize: 15,
        color: 'whitesmoke',
        textAlign: 'center'
    },
    leftStatNum: {

        fontSize: 25,
        color: 'whitesmoke',
        textAlign: 'left'
    },
    boxStatLabel: {
       
        fontSize: 12,
        color: 'whitesmoke',
        textAlign: 'center'
    },
    boxStatNum: {

        fontSize: 25,
        color: 'whitesmoke',
        textAlign: 'left'
    },
    rightStatLabel: {
        width: 80,
        fontSize: 15,
        color: 'whitesmoke',
        textAlign: 'center'
    },
    rightStatNum: {

        fontSize: 25,
        color: 'whitesmoke',
        textAlign: 'left'
    },
    circle: {
        height:100,
        width:100,
        backgroundColor: '#444',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center' ,
        marginHorizontal:8,
    },
    girBar: {
        height:20,
        backgroundColor:'yellowgreen'
    }
});
