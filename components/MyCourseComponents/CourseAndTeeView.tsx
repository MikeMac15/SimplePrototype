import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { createTeebox, DeleteCourse } from "../DataBase/API";
import { MaterialIcons } from "@expo/vector-icons";
import { Teebox, CourseAndTees } from "../DataBase/Classes";
import { TeeColors, teeTextColor } from "@/constants/Colors";


export default function CourseAndTeeView({course}:{course:CourseAndTees}) {
    const [teeModalVisible, setTeeModalVisible] = useState(false)
    const [teeboxes, setTeeboxes] = useState<Teebox[]>(course.teeboxes);
    const [teeColor, setTeeColor] = useState<number>(1)
    const [teeColor2, setTeeColor2] = useState<number>(0)
    const [combo, setCombo] = useState<boolean>(false)
    const [deleted, setDeleted] = useState<boolean>(course.name === 'Just Play' ? true : false)
    


    

    const addNewTeebox = async () => {
        try {
            if (!teeColor) {
                console.log('no color')
                return
            }
            console.log('color', teeColor)
            const newTeeId = await createTeebox(course.id, teeColor, combo ? teeColor2 : 0);
            if (!newTeeId) return;
    
            setTimeout(()=>{
                const newTee: Teebox = {
                    id: newTeeId,
                    course_id: course.id,
                    color1: Number(teeColor),
                    color2: Number(teeColor2),
                };
                
                // course.teeboxes.push(newTee);
                setTeeboxes([...teeboxes, newTee]);
                // console.log('new', newTeeId, course.teeboxes[newTeeId].color)
            },500)
        } catch (error) {
            console.error('Error adding new teebox:', error);
            // Handle error appropriately (e.g., display error message to the user)
        }
    };

    const [showDeleteBtn, setShowDeleteBtn] = useState(false);

    const DeleteThisCourse = async (id:number) => {
        try {
            await DeleteCourse(id);
            setDeleted(true);
        } catch (error) {
            console.error('Error deleting course:', error);
            // Handle error appropriately (e.g., display error message to the user)
        }
    }

    const DeleteCourseAlert = () => {
        
        Alert.alert(
            "Delete Course",
            "Are you sure you want to delete this course? This will delete all associated data including rounds played.",
          
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Delete", onPress: () => DeleteThisCourse(course.id), style: 'destructive' }
            ]
        );
    }

    if (deleted) {
        return <></>
    }

    return (
        <TouchableOpacity onLongPress={() => setShowDeleteBtn(!showDeleteBtn)}>
        <LinearGradient colors={['#2a2a2a', '#000']} style={styles.fullCourseDiv}>

          { showDeleteBtn &&
            <Button title="Delete Course" onPress={() => DeleteCourseAlert()} />
          }
             {/*///////////////////////// TEE MODAL ///////////////////////*/}
             <Modal
            animationType="slide"
            transparent={true}
            visible={teeModalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setTeeModalVisible(!teeModalVisible);
            }}>
            <View style={styles.centeredView}>
         

                <View style={styles.modalView}>
                  <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <Text>Combo Tee?</Text>
                    <Button title={`${combo ? 'yes' : 'no'}`} onPress={() => setCombo(!combo)}/>
                  </View>
                  <View style={{flexDirection:'row', }}>
                    <View>

                    <Text>Tee Color:</Text>
                    <Picker
            style={{ width: 150 }}
            selectedValue={teeColor}
            onValueChange={(itemValue: number, itemIndex: number) => setTeeColor(itemValue)}
            >
            <Picker.Item label="Black" value={1} />
            <Picker.Item label="Blue" value={2} />
            <Picker.Item label="White" value={3} />
            <Picker.Item label="Red" value={4} />
            <Picker.Item label="Gold" value={5} />
            <Picker.Item label="Silver" value={6} />
            <Picker.Item label="Green" value={7} />
        </Picker>
              </View>
                    { combo
                      ?
                      <View>
                      
                      <Text>Second Color:</Text>
                    <Picker
            style={{ width: 150 }}
            selectedValue={teeColor2}
            onValueChange={(itemValue: number, itemIndex: number) => setTeeColor2(itemValue)}
            >
            <Picker.Item label="Black" value={1} />
            <Picker.Item label="Blue" value={2} />
            <Picker.Item label="White" value={3} />
            <Picker.Item label="Red" value={4} />
            <Picker.Item label="Gold" value={5} />
            <Picker.Item label="Silver" value={6} />
            <Picker.Item label="Green" value={7} />
        </Picker>
        </View>

:
<Text></Text>
        }
                    </View>
                    <Pressable
                    style={[styles.button, styles.buttonSave]}
                    onPress={() => { addNewTeebox(); setTeeModalVisible(!teeModalVisible);}}>
                        <Text style={styles.textStyle}>Save</Text>
                    </Pressable>
                    <Pressable
                    style={[styles.button, styles.buttonCancel]}
                    onPress={() => {setTeeModalVisible(!teeModalVisible);}}>
                        <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                </View>
                    
            </View>
            </Modal>
            {/*///////////////////////// TEE MODAL ///////////////////////*/}
            <View style={styles.courseTitleDiv}>
                <Text style={styles.title}>{course.name}</Text>
            </View>
    
            
              
            <ScrollView horizontal={true} >
            {teeboxes.length > 0 ? (
  teeboxes.map((teebox) => (
    
    <TouchableOpacity key={teebox.id} style={[
      teebox.color2
        ? { borderTopColor: teeTextColor(teebox.color1), borderBottomColor: teeTextColor(teebox.color2), borderEndColor: teeTextColor(teebox.color2), borderStartColor: teeTextColor(teebox.color1) }
        : { borderColor: teeTextColor(teebox.color1) },
      styles.tee
    ]} onPress={() => {router.push({
        pathname: '/(myCourses)/(holes)/Holes',
        params: { teeID: teebox.id, courseName: course.name, teeColor1: teebox.color1, teeColor2: teebox.color2 }
      })}
      }>
    
          <View style={{ padding: 5, alignItems: 'center', flexDirection:'row' }}>
            <Text style={{ color: teeTextColor(teebox.color1), fontSize: 20, fontFamily: 'Arial', fontStyle: 'italic' }}>
              {`${TeeColors[teebox.color1]}`}
            </Text>
            {teebox.color2 > 0
            ?
            <>

              <Text style={{ color: '#666', fontSize: 20, fontFamily: 'Arial', fontStyle: 'italic' }}>
              {`${teebox.color2 ? '&' : ''}`}
            </Text>
              <Text style={{ color: teeTextColor(teebox.color2), fontSize: 20, fontFamily: 'Arial', fontStyle: 'italic' }}>
              {`${teebox.color2 > 0 ? TeeColors[teebox.color2] : ''}${teebox.color2 ? "'s" : ''}`}
            </Text>
            </>
            :''
            }
          </View>
        </TouchableOpacity>
      
    
                    ))
                ) : (
                    <Text>No tee data</Text>
                )}
            </ScrollView>
                
<TouchableOpacity style={{alignItems: 'center', borderRadius:10, marginVertical:10, flexDirection:'row'}} onPress={() => setTeeModalVisible(true)}>
    <MaterialIcons name="add-circle" color={'#aaa'} size={20} />
    <Text style={{ fontSize: 16, color: "white" }}>Add New Tee</Text>
</TouchableOpacity>
          
        </LinearGradient>
       </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  fullCourseDiv: {
    flexDirection:'column',
    justifyContent: 'center',
            alignItems: 'center',
            margin: 12,
            
            
           borderWidth:1,
           borderColor:'#222',
            borderRadius:20,

            padding:5
            
          },
    courseTitleDiv: {
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'flex-start',
            paddingLeft:10,

            width:'100%',

            // backgroundColor:'#c7f4fc',
            opacity:.9,
            paddingVertical:10
          },
          tee: {
            paddingHorizontal:5,
            borderRadius:12,
            borderWidth:1,
// borderColor:'#999',
            backgroundColor:'#333',
            margin:5
          },
          title: {
            fontSize:25,
            fontStyle:'italic',
            fontFamily:'Arial',
            color:'whitesmoke'
          },
          centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 0,
     
            

          },
          modalView: {
            margin: 20,
            backgroundColor: 'white',
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
        })