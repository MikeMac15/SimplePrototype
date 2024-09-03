import { Text, View, StyleSheet } from 'react-native'

interface EmojiStatsBtnProps {
  
}

const EmojiStatsBtn: React.FC<EmojiStatsBtnProps> = ({}) => {
  return (
<View style={styles.container}>
<Text>Statistics</Text>
</View>
)
}

export default EmojiStatsBtn;



const styles = StyleSheet.create({
container: {

},

})