import { Text, View, StyleSheet, Modal, Pressable, Alert, TouchableOpacity } from 'react-native'

import { Hole, HoleStats, Round, ShotData } from '../DataBase/Classes';
import { State } from '../DataBase/RoundReducer';
import VerticalBtns3 from '../Layouts/CounterThree/VerticalShotBtns3';
import VerticalCheckBoxes from '../PlayComponents/VerticalCheckBoxes';
import useTheme from '@/constants/Theme';
import { useEffect, useState } from 'react';

interface UpdatePrevScoreProps {
    // round: Round;
    updateRoundHole: (newHoleData: HoleStats) => void
    hole: number;
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    state: State;
    currentHoleData: Hole;

}

const UpdatePrevScore: React.FC<UpdatePrevScoreProps> = ({ modalVisible, setModalVisible, hole, updateRoundHole, state, currentHoleData }) => {

    const [great, setGreat] = useState<number>(state.shotData.great);
    const [good, setGood] = useState<number>(state.shotData.good);
    const [bad, setBad] = useState<number>(state.shotData.bad);
    const [putt, setPutt] = useState<number>(state.shotData.putt);
    const [gir, setGir] = useState<boolean>(state.gir);
    const [fir, setFir] = useState<boolean>(state.fir);


    const theme = useTheme();

    const DataColView = ({ title, data, color }: { title?: string, data: string, color: string }) => {
        return (
            <View style={{ margin: 5, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#333', borderRadius: 10, borderWidth: 2, borderColor: color }}>
                {title && <Text style={{ color: theme.color, fontSize: 14, fontStyle: 'italic' }}>{title}</Text>}
                <Text style={{ color: theme.color, fontSize: data.length < 12 ? 22 : 18, fontWeight: 'bold', fontStyle: 'italic' }}>{data}</Text>
            </View>
        )
    }
    const getScoreString = (total:number) => {
        const toPar = total - currentHoleData.par;
        switch (toPar) {
            case -2:
                return 'Eagle';
            case -1:
                return 'Birdie';
            case 0:
                return 'Par';
            case 1:
                return 'Bogey';
            case 2:
                return 'Double Bogey';
            case 3:
                return 'Triple Bogey';
            case 4:
                return 'Monster Bogey';
            default:
                return 'Monster Bogey';

        }
    };

    const [total, setTotal] = useState(state.shotData.great + state.shotData.good + state.shotData.bad + state.shotData.putt)
    const [scoreString, setScoreString] = useState('Par');

    useEffect(() => {
        setTotal(great + good + bad + putt);
    },[great,good,bad,putt])
    useEffect(() => {
        // Update the score string whenever total changes
        setScoreString(getScoreString(total));
    }, [total]);

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
                    <View style={styles.container}>

                        <Text style={styles.modalText}>Update Hole {hole} Stats</Text>



                        <View style={{ flexDirection: 'row', justifyContent:'center' }}>
                            <DataColView title='Strokes' data={total.toString()} color={'#111'} />
                            <DataColView data={scoreString} color={'#111'} />
                            
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => currentHoleData.par !== 3 ? setFir(!fir) : ''} style={[styles.shotBtnView,{flexDirection:'column', borderColor: currentHoleData.par !== 3 ?  fir ? 'yellowgreen' : 'salmon' : '#888' , opacity: currentHoleData.par !== 3 ? 1 : 0.3}]}>
                                    <Text style={{ fontSize: 18, color: currentHoleData.par !== 3 ?  fir ? 'yellowgreen' : 'salmon' : '#888' }}>Fairway In Reg</Text>
                                    <Text style={{ fontSize: 26, color: currentHoleData.par !== 3 ?  fir ? 'yellowgreen' : 'salmon' : '#888' }}>{ currentHoleData.par !== 3 ? fir ? 'Yes' : 'No' : 'Par 3'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setGir(!gir)} style={[styles.shotBtnView,{flexDirection:'column', borderColor: gir ? 'yellowgreen' : 'salmon'}]}>
                                    <Text style={{ fontSize: 18, color: gir ? 'yellowgreen' : 'salmon' }}>Green In Reg</Text>
                                    <Text style={{ fontSize: 26, color: gir ? 'yellowgreen' : 'salmon' }}>{gir ? 'Yes' : 'No'}</Text>
                                </TouchableOpacity>
                                {/* <DataColView title='GIR' data={state.gir ? 'Yes' : 'No'} color={state.gir ? 'yellowgreen' : 'salmon'} />
            <DataColView title='FIR' data={state.fir ? 'Yes' : 'No'} color={state.fir ? 'yellowgreen' : 'salmon'} /> */}
                            </View>
                            <View style={{ marginHorizontal: 20 }}>
                                <TouchableOpacity onPress={()=> setGreat(great + 1)} onLongPress={()=> setGreat(great - 1)} style={[styles.shotBtnView, {borderColor:'skyblue'}]}>

                                    <Text style={{ color: 'skyblue', fontSize: 34 }}>{great}</Text>
                                    <Text style={{ color: 'skyblue', fontSize: 16, marginHorizontal: 8 }}>x</Text>
                                    <Text style={{ color: 'skyblue', fontSize: 34 }}>Great</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> setGood(good + 1)} onLongPress={()=> setGood(good - 1)} style={[styles.shotBtnView, {borderColor:'yellowgreen'}]}>

                                    <Text style={{ color: 'yellowgreen', fontSize: 34 }}>{good}</Text>
                                    <Text style={{ color: 'yellowgreen', fontSize: 16, marginHorizontal: 8 }}>x</Text>
                                    <Text style={{ color: 'yellowgreen', fontSize: 34 }}>Good</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> setBad(bad + 1)} onLongPress={()=> setBad(bad - 1)} style={[styles.shotBtnView, {borderColor:'salmon'}]}>

                                    <Text style={{ color: 'salmon', fontSize: 34 }}>{bad}</Text>
                                    <Text style={{ color: 'salmon', fontSize: 16, marginHorizontal: 8 }}>x</Text>
                                    <Text style={{ color: 'salmon', fontSize: 34 }}>Bad</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> setPutt(putt + 1)} onLongPress={()=> setPutt(putt - 1)} style={[styles.shotBtnView, {borderColor:'tan'}]}>

                                    <Text style={{ color: 'tan', fontSize: 34 }}>{putt}</Text>
                                    <Text style={{ color: 'tan', fontSize: 16, marginHorizontal: 8 }}>x</Text>
                                    <Text style={{ color: 'tan', fontSize: 34 }}>Putts</Text>

                                </TouchableOpacity>
                            </View>
                        </View>








                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                        <Pressable
                            style={[styles.button, styles.buttonSave, { marginTop: 20 }]}
                            onPress={() => { updateRoundHole(new HoleStats(currentHoleData, putt, great, good, bad, gir,0, fir)); setModalVisible(false);}}>
                            <Text style={styles.textStyle}>Save</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonCancel, { marginTop: 20 }]}
                            onPress={() => setModalVisible(false)}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>


            </View>
        </Modal>
    )
}

export default UpdatePrevScore;



const styles = StyleSheet.create({
    container: {

    },
    shotBtnView: { 
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#333',
        backgroundColor: '#111'

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
})