import { Text, View, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native'
import { ClubName, clubNames } from '../DataBase/Classes';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import DefaultModal from '../Modals/DefaultModal';
import * as Location from 'expo-location'

interface ShotTrackerModalProps {
    // maybe add shottype, to update shotbtns?
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

// club
// contact
// distance

const ShotTrackerModal: React.FC<ShotTrackerModalProps> = ({ modalVisible, setModalVisible }) => {
    const [club, setClub] = useState<ClubName>('Driver');
    const [contact, setContact] = useState<string>('');
    const [distance, setDistance] = useState<number>(0);

    const [btnTitle, setBtnTitle] = useState<number>(0);
    const btnTitles = ['Start Tracking', 'End Tracking', 'Save'];
    const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
    const [locationStart, setLocationStart] = useState<number[] | undefined>(undefined);
    const [locationEnd, setLocationEnd] = useState<number[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        checkIfLocationEnabled();
    }, [])
    useEffect(() => {
        console.log('locationStart:', locationStart);
        console.log('locationEnd:', locationEnd);
        if (locationStart && locationEnd) {
        // const distance = getDistanceInYards(locationStart[0], locationStart[1], locationEnd[0], locationEnd[1]);
        const distance = haversine(locationStart[0], locationStart[1], locationEnd[0], locationEnd[1]);
        console.log('distance:', distance);
        setDistance(distance);
        }
    }, [locationEnd])

    const checkIfLocationEnabled = async (): Promise<void> => {
        let enabled = await Location.hasServicesEnabledAsync();       
        if (!enabled) {                     
            Alert.alert('Location not enabled', 'Please enable your Location', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        } else {
            setLocationServicesEnabled(enabled)         
        }
    }

    const getCurrentLocation = async (): Promise<number[] | undefined> => {
        let { status } = await Location.requestForegroundPermissionsAsync();  
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Allow the app to use the location services', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            return undefined;
        }

        setLoading(true);
        try {
            const { coords } = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
            if (coords) {
                console.log('coords:', coords);
                const { latitude, longitude } = coords;
                return [latitude, longitude];
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to get location. Please try again.');
            console.error('Location Error:', error);
        } finally {
            setLoading(false);
        }
        return undefined;
    }

    const getLocationStart = async (): Promise<void> => {
        const location = await getCurrentLocation();
        if (!location) return;
        setLocationStart(location);
        setBtnTitle(1);
    }

    const getLocationEnd = async (): Promise<void> => {
        const location = await getCurrentLocation();
        if (!location) return;
        setLocationEnd(location);
        setBtnTitle(2);
        if (locationStart && locationEnd) {
            // const distance = getDistanceInYards(locationStart[0], locationStart[1], locationEnd[0], locationEnd[1]);
            const distance = haversine(locationStart[0], locationStart[1], locationEnd[0], locationEnd[1]);
            setDistance(distance);
        }
    }

    const saveLocation = (): void => {
        setLocationStart(undefined);
        setLocationEnd(undefined);
        setModalVisible(false);
    }

    // function getDistanceInYards(lat1: number, lon1: number, lat2: number, lon2: number): number {
    //     const R = 6371; 
    //     const dLat = toRadians(lat2 - lat1);
    //     const dLon = toRadians(lon2 - lon1);
    //     const a =
    //         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //         Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    //         Math.sin(dLon / 2) * Math.sin(dLon / 2);
    //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //     const distanceInKm = R * c; 
    //     const distanceInYards = distanceInKm * 1093.61;
    //     return distanceInYards;
    // }
    function haversine(lat1:number, lon1:number, lat2:number, lon2:number): number
    {
        // distance between latitudes
        // and longitudes
        let dLat = (lat2 - lat1) * Math.PI / 180.0;
        let dLon = (lon2 - lon1) * Math.PI / 180.0;
           
        // convert to radiansa
        lat1 = (lat1) * Math.PI / 180.0;
        lat2 = (lat2) * Math.PI / 180.0;
         
        // apply formulae
        let a = Math.pow(Math.sin(dLat / 2), 2) + 
                   Math.pow(Math.sin(dLon / 2), 2) * 
                   Math.cos(lat1) * 
                   Math.cos(lat2);
        let rad = 6371;
        let c = 2 * Math.asin(Math.sqrt(a));
        console.log("km:",rad * c);
        console.log("m:",rad * c * 1000);
        return rad * c * 1093.61;
         
    }

    // function toRadians(degrees: number) {
    //     return degrees * (Math.PI / 180);
    // }

    const ClubSelector = () => (
        <Picker
            selectedValue={club}
            onValueChange={(itemValue) => setClub(itemValue)}
        >
            {clubNames.map(club => (
                <Picker.Item key={club} label={club} value={club} />
            ))}
        </Picker>
    );

    const ContactSelector = () => (
        <Picker
            selectedValue={contact}
            onValueChange={(itemValue) => setContact(itemValue)}
            mode='dropdown'
        >
            <Picker.Item label='Great' value='great' />
            <Picker.Item label='Good' value='good' />
            <Picker.Item label='Bad' value='bad' />
            <Picker.Item label='Thin' value='thin' />
            <Picker.Item label='Fat' value='fat' />
        </Picker>
    );

    const ShotTrackerMainView = () => (
        <View>
            <Text>Shot Tracker</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <View style={styles.selector}>
                    <Text style={styles.Title}>Club</Text>
                    <ClubSelector />
                </View>
                <View style={styles.selector}>
                    <Text style={styles.Title}>Contact</Text>
                    <ContactSelector />
                </View>
            </View>
            <View>
                <Text style={styles.Title}>Distance</Text>
                <Text style={{fontSize:20, textAlign:'center'}}>{distance} Yards</Text>
            </View>
            {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            {btnTitle === 0 ? <Button title='Start Tracking' onPress={getLocationStart} /> : ''}
            {btnTitle === 1 ? <Button title='End Tracking' onPress={getLocationEnd} /> : ''}
            {btnTitle === 2 ? <Button title='Save' onPress={saveLocation} /> : ''}
        </View>
    )

    return (
        <DefaultModal modalVisible={modalVisible} setModalVisible={setModalVisible} ChildComponent={ShotTrackerMainView} />
    )
}

export default ShotTrackerModal;

const styles = StyleSheet.create({
    selector: {
        flex: 1,
        width: '50%',
        transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }]
    },
    Title: {
        color: 'whitesmoke',
        fontSize: 25,
        textAlign: 'center',
        textDecorationLine: 'underline'
    }
})
