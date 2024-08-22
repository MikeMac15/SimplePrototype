
import {getAllCourses, getAllCourseTeeboxes } from "@/components/DataBase/API"

import { useCallback, useEffect, useMemo, useState } from "react"
import { StyleSheet, Text, View, ScrollView, ImageBackground } from "react-native"


import { MenuGradients, getRibbonImageSource } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Teebox, Course, CourseAndTees } from "@/components/DataBase/Classes";
import { getMenuGradient, getRibbonImage } from "@/components/DataBase/localStorage";
import CourseTeeStatView from "@/components/StatComponents/courseStats/CourseTeeStatView";
import { Stack } from "expo-router";
import StackHeader from "@/constants/StackHeader";


const StatsCourse = () => {
  const [courses, setCourses] = useState<CourseAndTees[]>([]);
  const [gradient, setGradient] = useState("OG-Dark");
  const [ribbonImage, setRibbonImage] = useState("retro");

  const getPreferences = useCallback(async () => {
    try {
      const [value, ribbonImgTag] = await Promise.all([getMenuGradient(), getRibbonImage()]);
      setGradient(value);
      setRibbonImage(ribbonImgTag);
    } catch (error) {
      console.error("Failed to fetch preferences", error);
    }
  }, []);

  useEffect(() => {
    getPreferences();
  }, [getPreferences]);

  const getCourses = useCallback(async () => {
    try {
      const coursesData: Course[] = await getAllCourses();
      const coursesWithTeeboxes: CourseAndTees[] = await Promise.all(
        coursesData.map(async (course) => {
          const teeData: Teebox[] = await getAllCourseTeeboxes(course.id);
          return { ...course, teeboxes: teeData };
        })
      );
      setCourses(coursesWithTeeboxes);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  }, []);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  const image = useMemo(() => getRibbonImageSource(ribbonImage), [ribbonImage]);

    

    return (
        <LinearGradient colors={MenuGradients[gradient]} style={{ height:'100%'}}>
       
           
       <StackHeader title='Course Stats' image={image}/>
         

            <ScrollView>
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <View key={course.id}>
                            {course ? (
                                <>
                                    <CourseTeeStatView course={course} />
                                </>
                            ) : (
                                <Text>No course data available</Text>
                            )}
                        </View>
                    ))
                ) : (
                    <Text>Add a Course.</Text>
                )}
            </ScrollView>

       
      
    </LinearGradient>
    )
}


export default StatsCourse;

const styles = StyleSheet.create({
    centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
            
          },
          modalView: {
            margin: 20,
            backgroundColor: 'transparent',
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
          modalText: {
            marginBottom: 15,
            textAlign: 'center',
          },
          textInputBox: {
            fontSize:20,
            color:'black',
            backgroundColor: '#fff',
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius:10
          },
          teebox: {
            // flex: 1,
            // backgroundColor:'blue'
          }
    });