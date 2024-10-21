import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { MaterialIcons } from "@expo/vector-icons";
import { Teebox, CourseAndTees } from "@/components/DataBase/Classes";
import { TeeColors, teeTextColor } from "@/constants/Colors";


export default function CourseTeeStatView({course}:{course:CourseAndTees}) {
    
    const teeboxes = course.teeboxes;
    const courseID = course.id;



    return (
        
        <LinearGradient colors={['#222', '#111']} style={styles.fullCourseDiv}>
             
            <LinearGradient colors={['#333', '#1f1f1f']} style={styles.courseTitleDiv}>
                <Text style={styles.title}>{course.name}</Text>
            </LinearGradient>
    
            
            <ScrollView horizontal={true} >
            {teeboxes.length > 0 ? (
  teeboxes.map((teebox) => (
    // <Link
    // key={teebox.id}
    //   href={{
    //     pathname: '(myCourses)/CourseStats',
    //     params: { teeID: teebox.id, courseName: course.name, teeColor1: teebox.color1, teeColor2: teebox.color2 }
    //   }}
    //   style={[
    //     teebox.color2
    //       ? { borderTopColor: teeTextColor(teebox.color1), borderBottomColor: teeTextColor(teebox.color2), borderEndColor: teeTextColor(teebox.color2), borderStartColor: teeTextColor(teebox.color1) }
    //       : { borderColor: teeTextColor(teebox.color1) },
    //     styles.tee
    //   ]}
    //   asChild
    // >
    <TouchableOpacity
    key={teebox.id}
    style={[
        teebox.color2
          ? { borderTopColor: teeTextColor(teebox.color1), borderBottomColor: teeTextColor(teebox.color2), borderEndColor: teeTextColor(teebox.color2), borderStartColor: teeTextColor(teebox.color1) }
          : { borderColor: teeTextColor(teebox.color1) },
        styles.tee
      ]}
      onPress={() => router.push({pathname: '/(myCourses)/CourseStats',
        params: { teeID: teebox.id, courseName: course.name, teeColor1: teebox.color1, teeColor2: teebox.color2 }})}
    >
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
      // </Link>
    
                    ))
                ) : (
                    <Text>No tee data</Text>
                )}
                
            </ScrollView>
        </LinearGradient>
       
    )
}

const styles = StyleSheet.create({
    fullCourseDiv: {
            flexDirection:'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            marginHorizontal:25,
            
            borderWidth:3,
            borderRadius:20,
            borderColor:'#222',
          },
    courseTitleDiv: {
          
            justifyContent: 'center',
            alignItems: 'center',

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
            fontSize:20,
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