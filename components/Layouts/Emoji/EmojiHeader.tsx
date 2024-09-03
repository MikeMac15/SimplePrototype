import { Text, View, StyleSheet } from 'react-native'

interface EmojiHeaderProps {
    courseName: string;
    par: number;
    holeNumber: number;
    distance: number;
}

const EmojiHeader: React.FC<EmojiHeaderProps> = ({courseName}) => {
  return (
<View style={styles.container}>
<Text style={styles.courseName}>EmojiHeader</Text>
<View>
<Text style={styles.stats}>EmojiHeader</Text>
</View>
</View>
)
}

export default EmojiHeader;



const styles = StyleSheet.create({
container: {
justifyContent: 'center',
alignItems: 'center',
},
statRow:{
    justifyContent:'center',
    alignItems:'center',
},
courseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginHorizontal: 10,
},
stats: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginHorizontal: 10,
}

})