
import {  getLastFiveRounds, RecentRoundTitleInfo } from '@/components/DataBase/API'

import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert, Pressable} from 'react-native'
import PreviousScore9 from './PreviousScore9';

import { TeeColors, teeTextColor } from '@/constants/Colors';

export default function RecentRoundStatList() {
    const [roundData, setRoundData] = useState<RecentRoundTitleInfo[]>()
    const [showModal, setShowModal] = useState(false)
    const [ roundID, setRoundID ] = useState(0)
    const [ teeID, setTeeID ] = useState(0)
    useEffect(() => {
        const fetchRounds = async () => {
            try {
                // const roundDataArray = await getAllRounds();
                const roundDataArray = await getLastFiveRounds();
                setRoundData(roundDataArray)
            } catch (error) {
                console.error("Error fetching round data: ", error);
            }
        };
    
        fetchRounds();
    }, []);

    // useEffect(()=>{
    //     const getRoundInfo = async(roundId:number) => {
    //         return await db.getAllAsync(
    //             `SELECT putts, great, good, bad, toPar FROM holestats;`);
    //         }
    //     }
    // },[])

    const showRound = (roundID:number, teebox_id:number) => {
        setRoundID(roundID)
        setTeeID(teebox_id)

        setShowModal(!showModal)
    }

    const RoundList = () => {
        return (
            <View style={{marginTop:0}}>


        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setShowModal(!showModal);
          }}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView, { backgroundColor: "#444", transform: 'scale(.8)', padding:20 }]}>
              
              <View style={{ }}>
                {<PreviousScore9 roundID={roundID} teeboxID={teeID} />}
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose,{margin:10}]}
                onPress={() => setShowModal(!showModal)}>
                <Text style={styles.textStyle}>Hide</Text>
              </Pressable>
            </View>
          </View>
        </Modal>




                <Text style={{color:'whitesmoke', fontSize:30}}>Recent Rounds:</Text>
            <View style={styles.container}>
                {roundData?.map((round, index) => (

                        <TouchableOpacity key={index} style={{ backgroundColor:'rgba(250,250,250,.05)', padding:5, borderRadius:20, marginVertical:10, flexDirection:'column', alignItems:'center', width:200, justifyContent:'center'}} onPress={()=> showRound(round.id,round.teebox_id)}>
                        
                        

                        
                        

                        {/* <Text>Teebox: {round.color}</Text> */}
                        <Text style={{color:'white'}}>{round.name}</Text>
                        <Text style={{color:'white'}}>{round.date}</Text>
                        <Text style={{color:'white'}}>{TeeColors[round.color1]} tee's</Text>
                        <Text style={{color:'white'}}>{round.totalStrokes}({round.toPar>0 ? '+' : '' }{round.toPar})</Text>
                        
                      

                        </TouchableOpacity>
                        
                ))}
            </View>
            </View>
        );
    }

    if (!roundData){
        return(
            <View>
            <Text>stat home</Text>
        </View>
    )
}
return(
    <View style={{padding:15, marginVertical:5, borderRadius:15}}>
        <RoundList/>
    </View>
)
}

const styles = StyleSheet.create({
    container:{
        
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        
        
    },centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
      },
      modalView: {
       
        backgroundColor: 'white',
        borderRadius: 20,
        
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
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Arial',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'Arial',
    
      },
})