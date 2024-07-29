// import React from 'react';
// import { Alert, Image, ImageSourcePropType, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

// interface ImagesProps {
//   modalVisible: boolean;
//   setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
//   green: boolean;
//   holeNumber: number;
// }

// const ImagesModal: React.FC<ImagesProps> = ({ modalVisible, setModalVisible, green, holeNumber }) => {
//   // const images: { green: ImageMap; fwy: ImageMap } = {
//   //   green: {
//   //      1: require('../../../../../assets/images/holes/g1.png'),
//   //      2: require('../../../../../assets/images/holes/g2.png'),
//   //      3: require('../../../../../assets/images/holes/g3.png'),
//   //      4: require('../../../../../assets/images/holes/g4.png'),
//   //      5: require('../../../../../assets/images/holes/g5.png'),
//   //      6: require('../../../../../assets/images/holes/g6.png'),
//   //      7: require('../../../../../assets/images/holes/g7.png'),
//   //      8: require('../../../../../assets/images/holes/g8.png'),
//   //      9: require('../../../../../assets/images/holes/g9.png'),
//   //     10: require('../../../../../assets/images/holes/g10.png'),
//   //     11: require('../../../../../assets/images/holes/g11.png'),
//   //     12: require('../../../../../assets/images/holes/g12.png'),
//   //     13: require('../../../../../assets/images/holes/g13.png'),
//   //     14: require('../../../../../assets/images/holes/g14.png'),
//   //     15: require('../../../../../assets/images/holes/g15.png'),
//   //     16: require('../../../../../assets/images/holes/g16.png'),
//   //     17: require('../../../../../assets/images/holes/g17.png'),
//   //     18: require('../../../../../assets/images/holes/g18.png'),
//   //   },
//   //   fwy: {
//   //      1: require('../../../../../assets/images/holes/fwy1.png'),
//   //      2: require('../../../../../assets/images/holes/fwy2.png'),
//   //      3: require('../../../../../assets/images/holes/fwy3.png'),
//   //      4: require('../../../../../assets/images/holes/fwy4.png'),
//   //      5: require('../../../../../assets/images/holes/fwy5.png'),
//   //      6: require('../../../../../assets/images/holes/fwy6.png'),
//   //      7: require('../../../../../assets/images/holes/fwy7.png'),
//   //      8: require('../../../../../assets/images/holes/fwy8.png'),
//   //      9: require('../../../../../assets/images/holes/fwy9.png'),
//   //     10: require('../../../../../assets/images/holes/fwy10.png'),
//   //     11: require('../../../../../assets/images/holes/fwy11.png'),
//   //     12: require('../../../../../assets/images/holes/fwy12.png'),
//   //     13: require('../../../../../assets/images/holes/fwy13.png'),
//   //     14: require('../../../../../assets/images/holes/fwy14.png'),
//   //     15: require('../../../../../assets/images/holes/fwy15.png'),
//   //     16: require('../../../../../assets/images/holes/fwy16.png'),
//   //     17: require('../../../../../assets/images/holes/fwy17.png'),
//   //     18: require('../../../../../assets/images/holes/fwy18.png'),
//   //   },
//   // };

//   type ImageMap = {
//     [key: number]: ImageSourcePropType;
//   };

//   const ImageView = () => {
//     const imageSource = green ? images.green[holeNumber] : images.fwy[holeNumber];
//     return <Image source={imageSource} style={styles.image} />;
//   };

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={modalVisible}
//       onRequestClose={() => {
//         Alert.alert('Modal has been closed.');
//         setModalVisible(!modalVisible);
//       }}
//     >
//       <View style={styles.centeredView}>
//         <View style={styles.modalView}>
//           <ImageView />
//           <Pressable
//             style={[styles.button, styles.buttonCancel]}
//             onPress={() => setModalVisible(!modalVisible)}
//           >
//             <Text style={styles.textStyle}>Cancel</Text>
//           </Pressable>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default ImagesModal;

//   const styles = StyleSheet.create({

//     animatedView: {
//       justifyContent: 'space-evenly',
//       alignItems: 'center',
//       flexDirection: 'row',
//       backgroundColor: '#111',
//       width:'80%',
//     //   paddingVertical: 10,
//       overflow: 'hidden', // Ensure content doesn't overflow when height is 0
//     },
//     text: {
//       color: '#fff',
//     },
//     centeredView: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginTop: 22,
//     },
//     modalView: {
//       margin: 20,
      
//       borderRadius: 20,
//       padding:20, 
//       backgroundColor:'#333',

//       alignItems: 'center',
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.25,
//       shadowRadius: 4,
//       elevation: 5,
//     },
//     button: {
//       borderRadius: 20,
//       padding: 10,
//       elevation: 2,
//       marginTop: 10
//     },
//     buttonCancel: {
//       backgroundColor: 'salmon',
//       width: 80
//     },
//     buttonSave: {
//       backgroundColor: '#2196F3',
//       width: 80
//     },
//     textStyle: {
//       color: 'white',
//       fontWeight: 'bold',
//       textAlign: 'center',
//     },
//     modalText: {
//       marginBottom: 15,
//       textAlign: 'center',
//     },
//     scoreLabel: {
//       width:45,
//       height:20,
//     },
//     scoreValues:{
//       height:20,
//       width:40,
//       justifyContent:'center',
//       alignItems:'center',
//     },
//     seperator:{
//       height:1,
//       backgroundColor:'#555'
//     },
//     image: {
//         width: 350,
//         height: 500,
//         marginBottom: 15,
//         resizeMode:'contain'
//       },
//   });
  