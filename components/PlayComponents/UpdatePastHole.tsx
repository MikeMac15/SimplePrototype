import { useEffect, useState } from "react";
import { Button, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import VerticalBtns from "./VerticalShotBtns";
import VerticalCheckBoxes from "./VerticalCheckBoxes";
import { HoleStats } from "../DataBase/Classes";

interface pastHoleProps {
    hole: HoleStats;

    updateHoleVisible: boolean;
    setUpdateHoleVisible: (updateHoleVisible: boolean) => void;
    saveUpdatedHole: (oldHoleData: HoleStats, newHoleData: HoleStats) => void
}

const UpdatePastHole: React.FC<pastHoleProps> = ({ hole, updateHoleVisible, setUpdateHoleVisible, saveUpdatedHole }) => {
    const [localHoleStat, setLocalHoleStat] = useState<HoleStats>();

    const [newShotData, setNewShotData] = useState<{ [key: string]: number }>({
        pure: 0,
        good: 0,
        bad: 0,
        putt: 0,
    });
    const [gir, setGir] = useState<boolean>(false)
    const [fir, setFir] = useState<boolean>(false)         ////////////////////////// Logic Needs to allow undefined??????


    const addShot = (shotType: string) => {
        setNewShotData((prevData) => ({
            ...prevData,
            [shotType]: prevData[shotType] + 1,
        }));
    };

    const subtractShot = (shotType: string) => {
        setNewShotData((prevData) => ({
            ...prevData,
            [shotType]: Math.max(prevData[shotType] - 1, 0),
        }));
    };



    const handleSave = () => {
        const updatedHole = new HoleStats(hole.hole,newShotData.putt,newShotData.pure, newShotData.good,newShotData.bad,gir,0,fir)
        
        if (updatedHole) {
            saveUpdatedHole(hole, updatedHole)
            setUpdateHoleVisible(false);
        }
    };


    const HoleInfo = () => {
        return(
            <View style={styles.holeInfo}>
                <Text>Par {hole.hole.par}</Text>
                <Text>Hole {hole.hole.num}</Text>
                <Text>Yardage {hole.hole.yardage}</Text>
            </View>
        )
    }
    const PastHoleData = () => {
        return(
            <View style={styles.holeInfo}>
                <Text>great: {hole.pure}</Text>
                <Text>good: {hole.good}</Text>
                <Text>bad: {hole.bad}</Text>
                <Text>putts: {hole.putts}</Text>
                <Text>gir: {hole.gir ? 'true' : 'false'}</Text>
                <Text>fir: {hole.fir ? 'true' : 'false'}</Text>
            </View>
        )
    }

    return (
        <View>


            {/*///////////////////////// TEE MODAL ///////////////////////*/}
            <Modal
                transparent={true}
                animationType="slide"
                visible={updateHoleVisible}
                onRequestClose={() => setUpdateHoleVisible(false)}
            >

                <View style={styles.centeredView}>


                    <View style={styles.modalView}>
                        <HoleInfo />
                        <PastHoleData />
                        <View style={styles.newShotForm}>
                                <VerticalCheckBoxes hole={hole.hole} fir={fir} setFir={setFir} gir={gir} setGir={setGir} /> 
                                <VerticalBtns addShot={addShot} subtractShot={subtractShot} shotData={newShotData} />
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonSave]}
                            onPress={() => handleSave()}>
                            <Text style={styles.textStyle}>Save</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonCancel]}
                            onPress={() => setUpdateHoleVisible(false)}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>

                </View>
            </Modal>
            {/*///////////////////////// TEE MODAL ///////////////////////*/}






        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,



    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        width: 340,
        borderRadius: 20,
        padding: 15,
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
    updateBtns: {
        flexDirection: 'row'
    },
    newShotCount: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    newShotForm: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between'

    },

    holeInfo: {
        width: '100%',
        flexDirection:'row',
        alignItems:'center', 
        justifyContent:'space-evenly', 
    },
})

export default UpdatePastHole;