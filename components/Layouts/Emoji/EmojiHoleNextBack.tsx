import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'


interface EmojiHoleNextBackProps {
    nextHole: () => void;
    prevHole: () => void;
    holeNumber: number;
}

const EmojiHoleNextBack: React.FC<EmojiHoleNextBackProps> = ({ nextHole, prevHole, holeNumber }) => {
    return (
        <View style={styles.container}>
            {
                holeNumber > 1
            ?
            <TouchableOpacity onPress={prevHole}>
                <Text style={styles.text}>{"Last Hole \>"}</Text>
            </TouchableOpacity>
            : <Text style={styles.text}></Text>
            }
            <TouchableOpacity onPress={prevHole}>
                <Text style={styles.text}>{"Next Hole \>"}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EmojiHoleNextBack;



const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        // paddingHorizontal: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginHorizontal: 10,
    }

})