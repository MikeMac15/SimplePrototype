import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Hole, Round } from "../DataBase/Classes"
import { Entypo } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient";

interface score9Props {
    holes:Hole[];
    holeNumber:number;
    title:string;
    round:Round;
}
const Score9: React.FC<score9Props> = ({holes,holeNumber,title, round}) => {

    const color1 = '#999'
    const color2 = '#666'




    const holesPlayed = Object.keys(round.holes).length
    
      return (
        <View style={{ backgroundColor: '#222' }}>

          <View style={styles.scorecard}>
            <Text style={{ textAlign: 'center', fontFamily: 'Arial', fontSize: 17, fontStyle: 'italic', color:'white' }}>{title}</Text>
            <View style={{ flexDirection: 'row', borderWidth: 0.5 }} >
              <View style={{ width: 50 }}>
                <Text style={styles.text}>Hole: </Text>
              </View>
              {holes.map(hole => (
                <View style={{ width: 36.25, borderLeftWidth: 0.5, borderRightWidth: 0.5, borderColor: 'grey', borderTopWidth: 0.5, backgroundColor: hole.num == holeNumber ? '#222' : hole.num % 2 == 0 ? color1 : color2 }} key={hole.id}>
                  <Text style={styles.text}>{hole.num}</Text>
                </View>
              ))}

            </View>



            <View style={{ flexDirection: 'row', borderWidth: 0.5 }} >
              <View style={{ width: 50 }}>
                <Text style={[styles.text, { marginTop: 3 }]}>Par: </Text>
              </View>
              {holes.map(hole => (
                <View style={{ width: 36.25, height: 25, justifyContent: 'center', alignItems: 'center', borderLeftWidth: 0.5, borderBottomWidth: 0.5, borderRightWidth: 0.5, borderColor: 'grey', borderTopWidth: 0.5, backgroundColor: hole.num == holeNumber ? '#222' : hole.num % 2 == 0 ? color1 : color2 }} key={hole.id}>
                  <Text style={[styles.text, { color: 'whitesmoke' }]}>{hole.par}</Text>
                </View>
              ))}

            </View>

            {/* Score Row
            <View style={{ flexDirection: 'row', borderWidth: 0.5 }}>
              <View style={{ width: 50 }}>
                <Text style={[styles.text, { marginLeft: 0, marginTop: 3 }]}>Score</Text>
              </View>
              {holes.map(hole => (
                <View
                  style={{
                    width: 36.25,
                    height: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderLeftWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderRightWidth: 0.5,
                    borderColor: 'grey',
                    borderTopWidth: 0.5,
                    backgroundColor: hole.num == holeNumber ? '#222' : hole.num % 2 == 0 ? color1 : color2
                  }}
                  key={hole.id}
                >
                  <Text style={[styles.text, { color: round.holes[hole.num] ? round.holes[hole.num].toPar > 0 ? 'salmon' : round.holes[hole.num].toPar < 0 ? 'yellowgreen' :'white' : 'white' }]}>{round.holes[hole.num] ? round.holes[hole.num].toPar >0 ? '+' : '' :'' }{round.holes[hole.num] ? round.holes[hole.num].toPar : '-'}</Text>
                </View>
              ))}
            </View> */}

            {/* Score Row */}
<View style={{ flexDirection: 'row', borderWidth: 0.5 }}>
  <View style={{ width: 50 }}>
    <Text style={[styles.text, { marginLeft: 0, marginTop: 3 }]}>Score</Text>
  </View>
  {holes.map(hole => (
    <View
      style={{
        width: 36.25,
        height: 35,
        
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 0.5,
        borderBottomWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: '#222',
        borderTopWidth: 0.5,
        backgroundColor: hole.num == holeNumber ? '#222' : hole.num % 2 == 0 ? '#555' : '#444'
      }}
      key={hole.id}
    >
      {round.holes[hole.num] && (
        <View >
          
          <Text
            style={[
              styles.text,
              { 
                // color: round.holes[hole.num].toPar > 0 ? 'salmon' : 
                //        round.holes[hole.num].toPar < 0 ? 'yellowgreen' : 'white',
                // color: '#222',
                fontSize: 25
              }
            ]}
          >
            {round.holes[hole.num].toPar + round.holes[hole.num].hole.par}
          </Text>
        </View>
      )}
      {!round.holes[hole.num] && (
        <Text style={[styles.text, { color: 'white' }]}>-</Text>
      )}
    </View>
  ))}
</View>


            {/* Score Row */}
            <View style={{ flexDirection: 'row', borderWidth: 0.5 }}>
  <View style={{ width: 50 }}>
    <Text style={[styles.text, { marginLeft: 0, marginTop: 3 }]}>Total</Text>
  </View>
  {holes.map(hole => (
    <View
      style={{
        width: 36.25,
        height: 25,
        
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 0.5,
        borderBottomWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: '#222',
        borderTopWidth: 0.5,
        backgroundColor: hole.num == holeNumber ? '#222' : hole.num % 2 == 0 ? '#555' : '#444'
      }}
      key={hole.id}
    >
      {round.holes[hole.num] && (
        <View style={{flexDirection:'row', alignItems:'center'}}>
          
          <Text
            style={[
              styles.text,
              { 
                color: round.holes[hole.num].toPar > 0 ? 'salmon' : 
                       round.holes[hole.num].toPar < 0 ? 'yellowgreen' : 'white',
                // color: '#222',
                fontSize: 10
              }
            ]}
          >
            {round.holes[hole.num].toPar > 0 ? '+' : ''}
          </Text>
          <Text
            style={[
              styles.text,
              { 
                color: round.holes[hole.num].toPar > 0 ? 'salmon' : 
                       round.holes[hole.num].toPar < 0 ? 'yellowgreen' : 'white',
                // color: '#222',
                fontSize: 20
              }
            ]}
          >
            {round.holes[hole.num].toPar}
          </Text>
        </View>
      )}
      {!round.holes[hole.num] && (
        <Text style={[styles.text, { color: 'white' }]}>-</Text>
      )}
    </View>
  ))}
</View>
        






          
            {/* Puut Row */}
            <View style={{ flexDirection: 'row', borderWidth: 0.5 }}>
              <View style={{ width: 50 }}>
                <Text style={[styles.text, { marginTop: 3, }]}>Putts: </Text>
              </View>
              {holes.map(hole => (
                <View
                  style={{
                    width: 36.25,
                    height: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderLeftWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderRightWidth: 0.5,
                    borderColor: 'grey',
                    borderTopWidth: 0.5,
                    backgroundColor: hole.num == holeNumber ? '#222' : hole.num % 2 == 0 ? color1 : color2
                  }}
                  key={hole.id}
                >
                  <View >
                    <Text style={[styles.text, { color: round.holes[hole.num]?.putts ? round.holes[hole.num]?.putts >= 3 ? 'salmon' : 'whitesmoke' : 'whitesmoke' }]}>{round.holes[hole.num] ? Number(round.holes[hole.num]?.putts) : '-'}</Text>
                  </View>
                </View>
              ))}
            </View>
            

            
 
            <View style={{ flexDirection: 'row', borderWidth: 0.5 }}>
              <View style={{ width: 50 }}>
                <Text style={[styles.text, { marginTop: 3, }]}>FIR</Text>
              </View>
              {holes.map(hole => (
                <View
                  style={{
                    width: 36.25,
                    height: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderLeftWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderRightWidth: 0.5,
                    borderColor: 'grey',
                    borderTopWidth: 0.5,
                    backgroundColor: hole.num == holeNumber ? '#222' : hole.num % 2 == 0 ? color1 : color2
                  }}
                  key={hole.id}
                >
                    {round.holes[hole.num]?
                  <View style={{backgroundColor: round.holes[hole.num].firEligible ? round.holes[hole.num].fir ?'yellowgreen':'salmon':'#333', width:'100%',height:'100%'}}/>
                  :''
                    }
                </View>
              ))}
            </View>
            <View style={{ flexDirection: 'row', borderWidth: 0.5 }}>
              <View style={{ width: 50 }}>
                <Text style={[styles.text, { marginTop: 3, }]}>GIR</Text>
              </View>
              {holes.map(hole => (
                <View
                  style={{
                    width: 36.25,
                    height: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderLeftWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderRightWidth: 0.5,
                    borderColor: 'grey',
                    borderTopWidth: 0.5,
                    backgroundColor: hole.num == holeNumber ? '#222' : hole.num % 2 == 0 ? color1 : color2
                  }}
                  key={hole.id}
                >
                    {round.holes[hole.num]?
                  <View style={{backgroundColor: round.holes[hole.num].gir ? 'yellowgreen': 'salmon',width:'100%',height:'100%'}}/>
                  :''
                    }
                </View>
              ))}
            </View>
         






        </View>
        </View >

      )
}
export default Score9;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#888",
      // paddingTop:10,
      width: '100%',
  
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
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
  
    pureText: { color: 'skyblue' },
    pureBackground: { backgroundColor: 'skyblue' },
    goodText: { color: 'yellowgreen' },
    goodBackground: { backgroundColor: 'yellowgreen' },
    badText: { color: 'salmon' },
    badBackground: { backgroundColor: 'salmon' },
    puttText: { color: '#E1CAB2' },
    puttBackground: { backgroundColor: '#E1CAB2' },
  
    disabledColor: { color: 'grey' },
    disabledBackgtound: { color: 'grey' },
  
    BtnCountContainer: {
      width: 50, paddingHorizontal: 10, paddingVertical: 10, borderBottomLeftRadius: 20, borderTopLeftRadius: 20,
      opacity: 0.8
    },
    BtnCountContainer2: {
      width: 75, paddingHorizontal: 10, paddingVertical: 8, borderBottomLeftRadius: 15, borderTopLeftRadius: 15,
      opacity: 0.8
    },
    BtnCount: {
      fontSize: 40,
      textAlign: 'center',
      marginLeft: 5,
      fontStyle: 'italic',
      fontWeight: '400',
      fontFamily: 'Arial',
    },
    shotBtn: {
      width: 155,
      // backgroundColor: '#999',
      borderRadius: 20,
      // borderWidth:1,
      // borderColor:"#777",
  
    },
    shotBtn2: {
      width: 225,
      marginVertical: 5,
    },
    BtnText: {
      textAlign: 'center',
      fontSize: 30,
      fontStyle: 'italic',
      fontWeight: '600',
      paddingHorizontal: 15,
      fontFamily: 'Arial',
  
    },
    BtnText2: {
      textAlign: 'center',
      fontSize: 40,
      fontStyle: 'italic',
      fontWeight: '600',
      paddingHorizontal: 15,
      fontFamily: 'Arial',
  
    },
    centeredRow: { flexDirection: 'row', alignItems: 'center', },
  
    shadowView1: {
      justifyContent: 'center', alignItems: 'center', shadowColor: '#ddd',
      shadowOffset: { width: -7, height: -5 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
    },
  
    shadowView2: {
      justifyContent: 'center', alignItems: 'center', shadowColor: '#ccc',
      shadowOffset: { width: 5, height: -5 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
    },
    shadowView3: {
      justifyContent: 'center', alignItems: 'center', shadowColor: 'whitesmoke',
      shadowOffset: { width: 7, height: 7 },
      shadowOpacity: 0.4,
      shadowRadius: 5,
    },
  
    shadowView4: {
      justifyContent: 'center', alignItems: 'center', shadowColor: '#666',
      shadowOffset: { width: -7, height: 7 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
    },
    shadowView5: {
      alignItems: 'center',
      backgroundColor: '#b1b1b1', paddingHorizontal: 10, borderRadius: 20, borderWidth: 0.5, borderTopColor: '#bbb', borderBottomColor: '#999', borderLeftColor: '#bbb', borderRightColor: '#888'
    },
  
    textShadow: {
      shadowColor: '#555',
      shadowOffset: { width: 2, height: 1 },
      shadowOpacity: .7,
      shadowRadius: 1,
    },
    // textShadowMarquee: {
    //   shadowColor: '#222',
    //   shadowOffset: { width: 3, height: 2 },
    //   shadowOpacity: .7,
    //   shadowRadius: 2,
    // },
  
    holeStatText: { fontFamily: 'Arial', fontStyle: 'italic', fontSize: 30, color: '#222' },
  
    roundStatText: {
      fontFamily: 'Arial', fontStyle: 'italic', fontSize: 17, color: '#ddd', fontWeight: '500',
      shadowColor: '#222',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 2,
    },
    roundStat: {
      fontStyle: 'italic', fontSize: 20, color: '#ddd', fontWeight: '800',
      shadowColor: '#222',
      shadowOffset: { width: 2, height: 1 },
      shadowOpacity: .7,
      shadowRadius: 1,
    },
    roundStatView: { justifyContent: 'center', alignItems: 'center' },
  
  
    scorecard: {
      flexDirection: 'column',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      overflow: 'hidden',
    },
    text: {
      textAlign: 'center', fontFamily: 'Arial', fontSize: 17, fontStyle: 'italic', color:'whitesmoke'
    },
    newHoleInfoText: {
      fontSize: 40,
      fontFamily: 'Arial',
      fontStyle: 'italic',
    }, 
    titleText: {
      color: 'white',
      fontSize: 15,
      fontStyle: 'italic',
      fontWeight: '600',
      marginBottom: 5,
      marginRight: 2
    },
  
  })