import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import {Stack} from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { createTeeHoles, getAllTeeboxHoles, openDb } from "@/components/DataBase/API";
import { TeeColors } from "@/constants/Colors";


interface Hole {
    id: number;
    teebox_id: number;
    color: number;
    num: number;
    par: number;
    yardage: number;
}

export const Scorecard = ( holes:Hole[] ) => {
    return (
        <View style={{backgroundColor:'tan'}}>

      <View style={styles.scorecard}>
        <Text style={{textAlign:'center', fontFamily:'Arial', fontSize:17, fontStyle:'italic'}}> Front 9</Text>
        <View style={{flexDirection:'row', borderWidth:0.5}} >
          <View >
            <Text style={styles.text}>Hole: </Text>
          </View>
          {holes.slice(0,9).map(hole => (
              <View style={{width:36.25, borderLeftWidth:0.5, borderRightWidth:0.5, borderColor:'grey', borderTopWidth:0.5, backgroundColor: hole.num%2==0 ? 'tan' : 'antiquewhite'}} key={hole.id}>
              <Text style={styles.text}>{hole.num}</Text>
            </View>
          ))}
          
        </View>
        <View style={{flexDirection:'row', borderWidth:0.5}} >
          <View >
            <Text style={[styles.text,{marginLeft:5.7, marginTop:3}]}>Dist: </Text>
          </View>
          {holes.slice(0,9).map(hole => (
              <View style={{width:36.25, height:25, justifyContent:'center', alignItems:'center', borderLeftWidth:0.5, borderBottomWidth:0.5, borderRightWidth:0.5, borderColor:'grey', borderTopWidth:0.5, backgroundColor: hole.num%2==0 ? 'tan' : 'antiquewhite'}} key={hole.id}>
              <Text style={[styles.text, {color:'#555'}]}>{hole.yardage}</Text>
            </View>
          ))}
          
        </View>
        <View style={{flexDirection:'row', borderWidth:0.5}} >
          <View >
            <Text style={[styles.text,{marginLeft:8, marginTop:3}]}>Par: </Text>
          </View>
          {holes.slice(0,9).map(hole => (
              <View style={{width:36.35, height:25, justifyContent:'center', alignItems:'center', borderLeftWidth:0.5, borderBottomWidth:0.5, borderRightWidth:0.5, borderColor:'grey', borderTopWidth:0.5, backgroundColor: hole.num%2==0 ? 'tan' : 'antiquewhite'}} key={hole.id}>
              <Text style={[styles.text, {color:'#444'}]}>{hole.par}</Text>
            </View>
          ))}
          
        </View>
        </View>
      <View style={styles.scorecard}>
          <Text style={{textAlign:'center', fontFamily:'Arial', fontSize:17, fontStyle:'italic'}}>Back 9 </Text>
        
        <View style={{flexDirection:'row', borderWidth:0.5}} >
          <View >
            <Text style={styles.text}>Hole: </Text>
          </View>
          {holes.slice(9,18).map(hole => (
              <View style={{width:36.25, borderLeftWidth:0.5, borderRightWidth:0.5, borderColor:'grey', borderTopWidth:0.5, backgroundColor: hole.num%2!=0 ? 'tan' : 'antiquewhite'}} key={hole.id}>
              <Text style={[styles.text,{}]}>{hole.num}</Text>
            </View>
          ))}
          
        </View>
        <View style={{flexDirection:'row', borderWidth:0.5}} >
          <View >
            <Text style={[styles.text,{marginLeft:5.7, marginTop:3}]}>Dist: </Text>
          </View>
          {holes.slice(9,18).map(hole => (
              <View style={{width:36.25, height:25, justifyContent:'center', alignItems:'center', borderLeftWidth:0.5, borderBottomWidth:0.5, borderRightWidth:0.5, borderColor:'grey', borderTopWidth:0.5, backgroundColor: hole.num%2!=0 ? 'tan' : 'antiquewhite'}} key={hole.id}>
              <Text style={[styles.text, {color:'#555'}]}>{hole.yardage}</Text>
            </View>
          ))}
          
        </View>
        <View style={{flexDirection:'row', borderWidth:0.5}} >
          <View >
            <Text style={[styles.text,{marginLeft:8, marginTop:3}]}>Par: </Text>
          </View>
          {holes.slice(9,18).map(hole => (
              <View style={{width:36.25, height:25, justifyContent:'center', alignItems:'center', borderLeftWidth:0.5, borderBottomWidth:0.5, borderRightWidth:0.5, borderColor:'grey', borderTopWidth:0.5, backgroundColor: hole.num%2!=0 ? 'tan' : 'antiquewhite'}} key={hole.id}>
              <Text style={[styles.text, {color:'#444'}]}>{hole.par}</Text>
            </View>
          ))}
          
        </View>
        </View>
        
     
          </View>
    );
  };
  

export default function Holes() {
    const params = useLocalSearchParams();
    const { teeID, courseName, teeColor1, teeColor2 } = params;
    const [newHoleNumber, setNewHoleNumber] = useState(0)
    const [newPar, setNewPar] = useState(4);
    const [newYardage, setNewYardage] = useState('');
    const [teeYardage, setTeeYardage] = useState(0);
    const [userTeePar, setUserTeePar] = useState(0);
    const [holeColorIndex, setHoleColorIndex] = useState<number>(0);
    const [teeBoxColors, setTeeBoxColors] = useState<number[]>([Number(teeColor1),Number(teeColor2)]);
   

    const [holes, setHoles] = useState<Hole[]>([]);

    useEffect(()=>{console.log(TeeColors[teeBoxColors[holeColorIndex]])},[holeColorIndex])

    const getHoles = async () => {
      try {
          const holeData : Hole[] | undefined = await getAllTeeboxHoles(Number(teeID));
            if (holeData){
                setHoles(holeData)
                setNewHoleNumber(holeData.length + 1)

            }
      } catch (error)
      {
        console.error(error);
        
      }
      
    }

  

    const resetNewHoleBtn = () => {
        setNewYardage('')
    }

    const addNewHole = async() => {
        if (newHoleNumber > 0 && newYardage.length > 0) {

            
            const newHoleID = await createTeeHoles(Number(teeID), teeBoxColors[holeColorIndex], newHoleNumber, newPar, Number(newYardage))
            if (newHoleID > 0)
                {

                    const newHole: Hole = {
                        id: newHoleID, 
                        teebox_id: Number(teeID), 
                        color: teeBoxColors[holeColorIndex],
                        num: newHoleNumber, 
                        par: newPar, 
                        yardage: Number(newYardage)
                    };
                    setHoles([...holes, newHole])
                    setNewHoleNumber(holes.length + 1)
                    resetNewHoleBtn()
                    console.log(newHole); // Verify the new Hole object
                }
            else {
                return;
            }
                }
                
        return;
    }

    const teeDistance = () => {
        const dist = holes.reduce((total, hole)=> total + hole.yardage, 0)
        return dist
    }
    const teePar = () => {
        const par = holes.reduce((total, hole)=> total + hole.par, 0)
        return par
    }


    useEffect(()=>{
        getHoles(); 
        if (holes){
            const dist = teeDistance()
            const par = teePar()
            setTeeYardage(dist)
            setUserTeePar(par)
        }
    },[holes])
    
    



    




    return (
        <View>
            <Stack.Screen options={{ title:`${courseName}`,headerBackTitle:'Courses', headerTitleStyle:{color:'antiquewhite',fontSize:20, fontWeight:'800'},}}/>

                    {
                      teeBoxColors[1] > 0
                      ?
                      <View style={{flexDirection:'row'}}>
                        <View style={{width:'50%', height:5, backgroundColor:`${TeeColors[teeBoxColors[0]].toLowerCase()}`}}/>
                        <View style={{width:'50%', height:5, backgroundColor:`${TeeColors[teeBoxColors[1]].toLowerCase()}`}}/>
                      </View>
                      :
                      <View style={{width:'100%', height:5, backgroundColor:`${TeeColors[teeBoxColors[0]].toLowerCase()}`}}/>
                    }


<View style={{flexDirection:'row', justifyContent:'space-evenly', backgroundColor:'#666', padding:10}}>


      


                    <View>

                    <Text>Total Par:</Text>
                    <Text>{userTeePar}</Text>
                    </View>
                    <View>

                    <Text>Total Distance:</Text>
                    <Text>{teeYardage}</Text>
                    </View>
</View>

            {holes && holes.length > 0 
           ?
                Scorecard(holes)
            
            : <Text>No hole data</Text>}




{
                    newHoleNumber <= 18
                    ?
            <View style={[styles.newHoleBtn,{justifyContent:'space-evenly', alignItems:'center', backgroundColor:'#aaa'}]}>
                <Text style={styles.text}>Hole {newHoleNumber}</Text>

                <View style={styles.newHoleColumn}>

                <Text style={[styles.text,{marginBottom:10}]}>Yardage:</Text>
                <TextInput style={styles.textInputBox} value={newYardage} placeholder="400" onChangeText={(text)=> setNewYardage(text)} keyboardType="numeric" />
                </View>

                <View style={styles.newHoleColumn}>
                <Text style={styles.text}>Par:</Text>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Button title="-" onPress={()=>setNewPar((prev)=> prev > 3 ? prev-1 : prev)} />
                <Text style={styles.text}>{newPar}</Text>
                <Button title="+" onPress={()=>setNewPar((prev)=> prev < 5 ? prev+1 : prev)} />
                </View>
                </View>

                {
                  teeBoxColors[1] > 0
                  ?
                  <View style={styles.newHoleColumn}>
                <Text style={[styles.text, {color:`${TeeColors[teeBoxColors[holeColorIndex]].toLowerCase()}`}]}>color:</Text>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Button title="<" onPress={()=>setHoleColorIndex((prev)=> prev === 1 ? prev-1 : prev)} />
                <Text style={[styles.text, {color:`${TeeColors[teeBoxColors[holeColorIndex]].toLowerCase()}`}]}>{TeeColors[teeBoxColors[holeColorIndex]]}</Text>
                <Button title=">" onPress={()=>setHoleColorIndex((prev)=> prev === 0 ? prev+1 : prev)} />
                </View>
                </View>
                :
                ''
                }
                
                    <Button title="Add" onPress={()=> addNewHole()} />
            </View>
                    : <Text></Text>
                }
                
                <View>
                    <Text>Needs:</Text>
                    <Text>styling</Text>
                    
                    <Text>Allow Edit holes</Text>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textInputBox: {
                backgroundColor: '#FFF',
                color:'black',
                paddingVertical: 5,
                paddingHorizontal: 20,
                borderRadius:10,
                fontSize:20
              },
    newHoleBtn : {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        height:100
    },
    newHoleColumn:{
        flexDirection:'column',
        justifyContent: 'center',
        alignItems:'center'
    },


    scorecard: {
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
      },
      text: {
        textAlign: 'center', fontFamily:'Arial', fontSize:17, fontStyle:'italic'
      },
    
        });