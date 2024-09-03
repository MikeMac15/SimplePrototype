import React, { useState } from "react";
import { Dimensions, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get('window');

const PictureModal: React.FC<{ modalVisible: boolean, toggleModal: () => void, imageSource: any }> = ({ modalVisible, toggleModal, imageSource }) => {


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggleModal}
        >
            <View style={styles2.modalOverlay}>
                <View style={styles2.modalContent}>
                    <Image
                        source={imageSource}
                        style={styles2.image}
                        resizeMode="contain"
                    />
                    <TouchableOpacity onPress={()=>toggleModal()} style={styles2.closeButton}>
                        <Text style={styles2.closeButtonText}>X</Text>
                    </TouchableOpacity >
                </View>
            </View>
        </Modal>
    );
};

const GIR: React.FC<{ gir: boolean, setGIR: React.Dispatch<React.SetStateAction<boolean>> }> = ({ gir, setGIR }) => {
    
    return (
        <TouchableOpacity onPress={()=> setGIR(!gir)}>

<LinearGradient colors={['#555','#444']} style={[styles.checkContainer,]}>

            <Text style={{ color: gir ? 'yellowgreen' : 'salmon' }}>GIR</Text>
            <LinearGradient colors={gir ?['yellowgreen','green']:['red','salmon']}  style={[styles.checkContainer, { borderColor: '#333', borderWidth: 1, borderRadius: 10, margin: 3 }, gir ? styles.btnRadius2 : styles.btnRadius]}>
                {gir ?
                    <Feather name="check" size={50} color={'#333'} />
                    :
                    <Feather name="x" size={50} color={'#333'} />}
        
                    </LinearGradient>
        </LinearGradient>
        </TouchableOpacity>
    );
};

const FIR: React.FC<{ fir: boolean, setFIR: React.Dispatch<React.SetStateAction<boolean>> }> = ({ fir, setFIR }) => {
    return (
        <TouchableOpacity onPress={()=> setFIR(!fir)} >
<LinearGradient colors={['#555','#444']} style={[styles.checkContainer,]}>

            <Text style={{ color: fir ? 'yellowgreen' : 'salmon' }}>FIR</Text>
            <LinearGradient colors={fir ?['yellowgreen','green']:['red','salmon']}  style={[styles.checkContainer, { borderColor: '#333', borderWidth: 1, borderRadius: 10, margin: 3 },  fir ? styles.btnRadius : styles.btnRadius2]}>
                {fir ?
                    <Feather name="check" size={50} color={'#333'} />
                    :
                    <Feather name="x" size={50} color={'#333'} />}
        
        </LinearGradient>
                    </LinearGradient>
        </TouchableOpacity>
    );
};

const ShowGreensBook: React.FC<{ showModal: () => void }> = ({ showModal }) => {
    return (
        <TouchableOpacity style={styles.bookCont} onPress={showModal}>
            <Text style={{ color: 'whitesmoke', fontSize: 10, marginBottom: 5 }}>Greens</Text>
            <Ionicons name="golf-sharp" size={25} color={'whitesmoke'} />
            <Text style={{ color: 'whitesmoke', fontSize: 10, marginBottom: 5 }}>Book</Text>
        </TouchableOpacity>
    );
};

const ShowFairwaysBook: React.FC<{ showModal: () => void }> = ({ showModal }) => {
    return (
        <TouchableOpacity style={styles.bookCont} onPress={showModal}>
            <Text style={{ color: 'whitesmoke', fontSize: 10, marginBottom: 5 }}>Yardage</Text>
            <FontAwesome6 name="golf-ball-tee" size={25} color={'whitesmoke'} />
            <Text style={{ color: 'whitesmoke', fontSize: 10, marginBottom: 5 }}>Book</Text>
        </TouchableOpacity>
    );
};

interface CheckBoxes2Props {
    gir: boolean;
    setGIR: React.Dispatch<React.SetStateAction<boolean>>;
    fir: boolean;
    setFIR: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckBoxes2: React.FC<CheckBoxes2Props> = ({ gir, setGIR, fir, setFIR }) => {
    const [greenModalVisible, setGreenModalVisible] = useState(false);
    const [fairwaysModalVisible, setFairwaysModalVisible] = useState(false);

    const toggleGreenModal = () => {
        setGreenModalVisible(!greenModalVisible);
    };

    const toggleFairwaysModal = () => {
        setFairwaysModalVisible(!fairwaysModalVisible);
    };

    const image = require('../../../../assets/images/ggwp.png');
    const image2 = require('../../../../assets/images/retro4.png');

    

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {/* <ShowGreensBook showModal={toggleGreenModal} /> */}
            <GIR gir={gir} setGIR={setGIR} />
            <FIR fir={fir} setFIR={setFIR} />
            {/* <ShowFairwaysBook showModal={toggleFairwaysModal} /> */}

            <PictureModal
                modalVisible={greenModalVisible}
                toggleModal={toggleGreenModal}
                imageSource={image}
            />
            <PictureModal
                modalVisible={fairwaysModalVisible}
                toggleModal={toggleFairwaysModal}
                imageSource={image2}
            />
        </View>
    );
};

export default CheckBoxes2;

const styles = StyleSheet.create({
    checkContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        marginHorizontal: 8,
        marginBottom:10,
        borderRadius:15,
        borderWidth: .4,
        borderColor:'#222'
     
    },
    btnRadius: {
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    btnRadius2: {
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    bookCont: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 40,
    },
});

const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    showButton: {
        padding: 10,
        backgroundColor: 'skyblue',
        borderRadius: 10,
    },
    showButtonText: {
        color: 'white',
        fontSize: 18,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: width * 0.9,
        height: height * 0.9,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 10,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 18,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
