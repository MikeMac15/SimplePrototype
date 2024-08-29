import { openDb, getAllCourses, createCourse, createTeebox, getAllCourseTeeboxes } from "@/components/DataBase/API"
import { LinearGradient } from "expo-linear-gradient";
import { Link, Stack } from "expo-router"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Alert, Modal, Pressable, TextInput, Button, ImageBackground, SafeAreaView } from "react-native"
// import {Picker} from '@react-native-picker/picker';
import { Picker, RenderCustomModalProps } from "react-native-ui-lib";

import { MenuGradients, TeeColors, getRibbonImageSource } from "@/constants/Colors";
import { Course, CourseAndTees, Teebox } from "@/components/DataBase/Classes";
import { getCounterLayoutPref, getMenuGradient, getRibbonImage } from "@/components/DataBase/localStorage";





export default function Play() {
    const [courses, setCourses] = useState<CourseAndTees[]>([]);
    const [courseModalVisible, setCourseModalVisible] = useState(false)
    const [teeModalVisible, setTeeModalVisible] = useState(false)
    const [courseID, setCourseID] = useState(-1)
    const [courseName, setCourseName] = useState('')
    const [teeID, setTeeID] = useState(-1)
    const [teeName, setTeeName] = useState('')
    const [chosenCourse, setChosenCourse] = useState<CourseAndTees>()
    const [gradient, setGradient] = useState('cool-guy')
    const [ribbonImage, setRibbonImage] = useState('proud-parent')
    const [counterLayoutPref, setCounterLayoutPref] = useState('/simpleCounter')
    
    
    const [gir, setGIR] = useState('7')
    const [fir, setFIR] = useState('7')
    const [strokes, setStrokes] = useState('75')
    const [putts, setPutts] = useState('36')
    const [goodToGo, setGTG] = useState(false)

    const getPreferences = async() => {
            const value = await getMenuGradient()
            setGradient(value)
            const ribbonImgTag = await getRibbonImage()
            setRibbonImage(ribbonImgTag)  
            const layoutHref = await getCounterLayoutPref()
            setCounterLayoutPref(layoutHref)
        }
    
        useEffect(()=>{
            getPreferences();
        },[])

    useEffect(() => {
      if (gir != '' && fir != '' && strokes != '' && putts != '' && teeName != '' && courseName != '') {
            setGTG(true)
        }
    }, [gir, fir, strokes, putts, teeName, courseName]);



    const getCourses = async () => {
        const coursesData: Course[] = await getAllCourses();
        const coursesWithTeeboxes: CourseAndTees[] = await Promise.all(coursesData.map(async (course) => {
            const teeData: Teebox[] = await getAllCourseTeeboxes(course.id);
            return { ...course, teeboxes: teeData };
        }));
        setCourses(coursesWithTeeboxes);
    }

    const getCourseByID = (course_id: number) => {
        const selectedCourse = courses.find((course => course.id === course_id));
        if (selectedCourse) {
            return selectedCourse;
        }

    }

    useEffect(() => {
        getCourses();
        const ribbonSource = getRibbonImage()
    }, []);

    useEffect(() => {
        if (courseID) {
            const selectedCourse = getCourseByID(courseID);
            if (selectedCourse) {
                setCourseName(selectedCourse.name)
                setChosenCourse(selectedCourse)
            }
        }
    }, [courseID])

    useEffect(() => {
        if (teeID) {
            if (chosenCourse) {
                const tee = chosenCourse.teeboxes.find(tee => tee.id === teeID)
                if (tee){
                  if (tee.color2 > 0){
                    setTeeName(`${TeeColors[tee.color1]}&${TeeColors[tee.color2]}`)
                    } else {
                      setTeeName(TeeColors[tee.color1])
                    }
                  }

            }
        }
    }, [teeID])

    // const image = require('../../assets/images/retro-ribbon.png');
    // const image = require('../../assets/images/crayon-skies-ribbon.png');
    const ribbonSource = getRibbonImageSource(ribbonImage);

    
    return (
      
      
      <LinearGradient colors={MenuGradients[gradient]} >
            <SafeAreaView>
        <View style={styles.container}>
          
          <Stack.Screen options={{
            title: 'Round Setup',
            headerBackTitle: "Menu",
            headerBackground: () => (
              <ImageBackground
              source={ribbonSource}
              style={StyleSheet.absoluteFill}
              />
            ),
            headerTitleStyle: { color:'#444', fontSize: 25, fontWeight: '800', },
            headerTintColor:'#444'
          }} />
    
          <LinearGradient colors={['#4f4f4f', '#333']} style={styles.gradient}>
          <Picker
                label="What Course Are You Playing?"
                value={courseID}
                placeholder={courseName ? courseName : 'Select a Course'}
                onChange={value => setCourseID(Number(value))}
                labelColor={'whitesmoke'}
                labelStyle={{fontSize:16, textAlign:'center'}}
                placeholderTextColor={"whitesmoke"}
                textAlign="center"
                color={'whitesmoke'}
                topBarProps={{ title: 'Course' }}>
                
                {courses.map((course) => (<Picker.Item key={course.id} label={course.name} value={course.id} />))}
            </Picker>
          </LinearGradient>
    
          <LinearGradient colors={['#4f4f4f', '#333']} style={[styles.gradient, styles.marginVertical]}>
          <Picker
                label="Teebox"
                value={teeID}
                placeholder={teeName ? teeName : 'Select a teebox'}
                onChange={value => setTeeID(Number(value))}
                labelColor={'whitesmoke'}
                labelStyle={{fontSize:16, textAlign:'center'}}
                placeholderTextColor={"whitesmoke"}
                textAlign="center"
                color={'whitesmoke'}
                pickerModalProps={{ title: 'Teebox', height: 300 }}
                
                >
                {chosenCourse?.teeboxes.map((tee) => (
                 <Picker.Item key={tee.id} label={tee.color2>0 ?`${TeeColors[tee.color1]} & ${TeeColors[tee.color2]} combo`: TeeColors[tee.color1]} value={tee.id} />
                  ))}
            </Picker>
          </LinearGradient>
    
          <Text style={styles.title}>Goals for this Round</Text>

      
        <View style={{flexDirection:'row'}}>
          {['Total Strokes', 'Total Putts'].map((goal, index) => (
            <LinearGradient key={index} colors={['#4f4f4f', '#333']} style={styles.inputTable} >
              <Text style={styles.inputTitle}>{goal}</Text>
              <TextInput
                style={styles.goalInput}
                onChangeText={goal === 'Total Strokes' ? setStrokes : setPutts}
                value={goal === 'Total Strokes' ? strokes : putts}
                placeholder={goal === 'Total Strokes' ? "75" : "36"}
                keyboardType="numeric"
                />
            </LinearGradient>
          ))}
   
      </View>

  
        <View style={{flexDirection:'row'}}>
          {["Green's In Reg", "Fwy's In Reg"].map((goal, index) => (
            <LinearGradient key={index} colors={['#4f4f4f', '#333']} style={styles.inputTable} >
              <Text style={styles.inputTitle}>{goal}</Text>
              <TextInput
                style={styles.goalInput}
                onChangeText={goal === 'GIR' ? setGIR : setFIR}
                value={goal === 'GIR' ? gir : fir}
                placeholder={goal === 'GIR' ? "9/18" : "7/14"}
                keyboardType="numeric"
                />
            </LinearGradient>
          ))}
      
      </View>
    
          <View style={styles.buttonContainer}>
              <LinearGradient colors={goodToGo ? ['yellowgreen','darkgreen'] : ['#4f4f4f', '#333']} style={goodToGo ? styles.playBtn : styles.playBtnDisabled} >
            <TouchableOpacity 
              
              onPress={() => {
                if (!goodToGo) {
                  Alert.alert('Set your goals for the round.', 'No goals + No prep = No progress', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                  ]);
                }
              }}
              >

              {goodToGo ? (
                <Link push href={{ pathname: counterLayoutPref, params: { courseID: chosenCourse?.id, courseName, teeID, girGoal: gir, puttGoal: putts, firGoal: fir, strokeGoal: strokes } }}>
                  <Text style={{color:'whitesmoke'}}>Play {chosenCourse?.name} {teeName} tee's</Text>
                </Link>
              ) : (
                <Text>Play</Text>
              )}
            </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
    </SafeAreaView>
    </LinearGradient>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        // backgroundColor: '#111',
        height: '100%',
        padding: 20,
        alignItems: 'center',
      },
      gradient: {
        backgroundColor: '#444',
        width: 300,
        borderRadius: 7,
        borderColor:'#333',
        borderWidth:1,
        paddingVertical: 10,
      },
      marginVertical: {
        marginVertical: 20,
      },
      picker: {
        color: 'whitesmoke',
        textAlign: 'center',
        fontSize: 16,
      },
      placeholder: {
        color: 'whitesmoke',
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        padding:5,
        color:'whitesmoke',
        textShadowColor:'#111',
        textShadowRadius:3.5,
        textShadowOffset:{width:1.25,height:1.25}
      },
      goalTable: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        padding: 10,
      },
      inputTable: {
        display: 'flex',
        flexDirection: 'column',
        borderColor: '#333',
        borderRadius: 10,
        paddingVertical:15,
        borderWidth: 1,
       width:150,
       margin:5
      },
      inputTitle: {
        textAlign: 'center',
        fontSize: 16,
        fontStyle: 'italic',
        fontWeight: 'bold',
        paddingBottom: 10,
        color:'whitesmoke'
      },
      goalInput: {
        fontSize: 20,
        color: 'whitesmoke',
        textAlign:'center'
      },
      buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
      },
      playBtn: {
        // backgroundColor: 'whitesmoke',
        borderRadius:10,
        borderColor: '#333',
        borderWidth: 1.5,
        padding: 10,
      },
      playBtnDisabled: {
        backgroundColor: 'grey',
        opacity: 0.5,
        padding: 10,
      },
    });