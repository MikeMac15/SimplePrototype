import { Text, View, StyleSheet } from 'react-native'

interface EmojiHeaderProps {
  
}

const EmojiHeader: React.FC<EmojiHeaderProps> = ({}) => {
  return (
<View style={styles.container}>
<Text>EmojiHeader</Text>
</View>
)
}

export default EmojiHeader;



const styles = StyleSheet.create({
container: {

},

})