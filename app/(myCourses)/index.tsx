import { openDb, getAllCourses, createCourse, getAllCourseTeeboxes } from "@/components/DataBase/API"
import { Stack } from "expo-router"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Alert, Modal, Pressable, TextInput, ImageBackground, ScrollView } from "react-native"
import CourseAndTeeView from "@/components/MyCourseComponents/CourseAndTeeView";
import { MenuGradients, getRibbonImageSource, useTextColor } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Teebox, Course, CourseAndTees } from "@/components/DataBase/Classes";
import { getMenuGradient, getRibbonImage } from "@/components/DataBase/localStorage";
import { MaterialIcons } from "@expo/vector-icons";

/**
 * Courses component that manages and displays a list of golf courses.
 * 
 * @component
 * @returns {JSX.Element} The rendered component.
 * 
 * @description
 * This component handles the display and management of golf courses. It includes functionality for:
 * - Fetching and displaying a list of courses with their respective teeboxes.
 * - Adding a new course through a modal interface.
 * - Managing user preferences for gradient and ribbon images.
 * 
 * @example
 * <Courses />
 * 
 * @remarks
 * The component uses several hooks to manage state and side effects:
 * - `useState` for managing modal visibility, course creation, course name, courses list, gradient, and ribbon image.
 * - `useEffect` for fetching user preferences and courses data on component mount, and for handling new course creation.
 * 
 * @function getPreferences
 * Fetches user preferences for gradient and ribbon image.
 * 
 * @function getCourses
 * Fetches all courses and their respective teeboxes from the database.
 * 
 * @function addNewCourse
 * Adds a new course to the database and updates the courses list.
 * 
 * @function NewCourseBtn
 * Renders a button for adding a new course.
 * 
 * @param {boolean} modalVisible - State to control the visibility of the modal.
 * @param {boolean} createNewCourse - State to control the creation of a new course.
 * @param {string} courseName - State to manage the name of the new course.
 * @param {CourseAndTees[]} courses - State to manage the list of courses.
 * @param {string} gradient - State to manage the gradient preference.
 * @param {string} ribbonImage - State to manage the ribbon image preference.
 * @param {string} textColor - Computed text color based on the ribbon image.
 * @param {JSX.Element} image - The source of the ribbon image.
 * 
 * @requires getMenuGradient
 * @requires getRibbonImage
 * @requires getAllCourses
 * @requires getAllCourseTeeboxes
 * @requires openDb
 * @requires createCourse
 * @requires getRibbonImageSource
 * @requires useTextColor
 * @requires LinearGradient
 * @requires TouchableOpacity
 * @requires MaterialIcons
 * @requires Text
 * @requires Stack
 * @requires Modal
 * @requires Alert
 * @requires View
 * @requires ImageBackground
 * @requires TextInput
 * @requires Pressable
 * @requires ScrollView
 * @requires CourseAndTeeView
 */


export default function Courses() {
    const [modalVisible, setModalVisible] = useState(false)
    const [createNewCourse, setCreateNewCourse] = useState(false)
    const [courseName, setCourseName] = useState('')
    const [courses, setCourses] = useState<CourseAndTees[]>([]);
    const [gradient, setGradient] = useState('OG-Dark')
    const [ribbonImage, setRibbonImage] = useState('retro')

    const textColor = useTextColor(ribbonImage);

    const getPreferences = async () => {
        const value = await getMenuGradient()
        setGradient(value)
        const ribbonImgTag = await getRibbonImage()
        setRibbonImage(ribbonImgTag)
    }

    useEffect(() => {
        getPreferences();
    }, [])

    const getCourses = async () => {

        const coursesData: Course[] = await getAllCourses();
        const coursesWithTeeboxes: CourseAndTees[] = await Promise.all(coursesData.map(async (course) => {
            const teeData: Teebox[] = await getAllCourseTeeboxes(course.id);
            return { ...course, teeboxes: teeData };
        }));

        setCourses(coursesWithTeeboxes);
    }

    useEffect(() => {
        getCourses();

    }, []);


    useEffect(() => {
        if (courseName.length > 0 && createNewCourse) {
            const addNewCourse = async () => {
                const db = await openDb();
                const newCourseID = await createCourse(courseName);
                if (newCourseID) {
                    const NewCourse: CourseAndTees = { id: Number(newCourseID), name: courseName, teeboxes: [] }
                    setCourses([...courses, NewCourse])
                }
            };


            addNewCourse(); // Call the function to add a new course\

            setCourseName(''); // Reset courseName state
            setCreateNewCourse(false); // Reset createNewCourse state

        }
        // add course to course list to be displayed

    }, [createNewCourse]); // Dependency array includes createNewCourse and courseName


    const image = getRibbonImageSource(ribbonImage);



    const NewCourseBtn = () => {
        return (
            <LinearGradient colors={['#5a5a5a', '#333']} style={styles.fullCourseDiv}>
                <TouchableOpacity style={{ alignItems: 'center', borderRadius: 10, marginVertical: 10, flexDirection: 'row' }} onPress={() => setModalVisible(true)}>
                    <MaterialIcons name="add-circle" color={'#aaa'} size={20} />
                    <Text style={{ fontSize: 16, color: "white" }}>Add New Course</Text>
                </TouchableOpacity>

            </LinearGradient>)
    }



    return (
        <LinearGradient colors={MenuGradients[gradient]} style={{ height: '100%' }}>
            <Stack.Screen options={{
                headerRight: () => (
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={{ flex: 1, color: textColor, fontSize: 16, fontWeight: 'bold', fontStyle: 'italic' }}>Add</Text>
                    </TouchableOpacity>
                ),
            }} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>


                    <ImageBackground
                        source={image}
                        imageStyle={{ resizeMode: 'cover' }}
                        style={{ width: 300, height: 200, }}
                    >
                        <View style={styles.modalView}>
                            <TextInput style={styles.textInputBox} value={courseName} placeholder="Enter Course Name" onChangeText={(text) => setCourseName(text)} />

                            <Pressable
                                style={[styles.button, styles.buttonSave]}
                                onPress={() => { setCreateNewCourse(true); setModalVisible(!modalVisible); }}>
                                <Text style={styles.textStyle}>Save</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonCancel]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                        </View>
                    </ImageBackground>

                </View>
            </Modal>




            <ScrollView>
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <View key={course.id}>
                            {course ? (
                                <>
                                    <CourseAndTeeView course={course} />
                                </>
                            ) : (
                                <Text>No course data available</Text>
                            )}
                        </View>
                    ))
                ) : (
                    <>
                        <Text>Add a Course.</Text>
                    </>
                )}
            </ScrollView>
            <NewCourseBtn />



        </LinearGradient>
    )
}








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
        fontSize: 20,
        color: 'black',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10
    },
    teebox: {
        // flex: 1,
        // backgroundColor:'blue'
    },


    fullCourseDiv: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12,


        borderWidth: 1,
        borderColor: '#222',
        borderRadius: 20,

        padding: 5,
        marginBottom: 25,
    },
    courseTitleDiv: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingLeft: 10,

        width: '100%',

        // backgroundColor:'#c7f4fc',
        opacity: .9,
        paddingVertical: 10
    },
});