import { getEmoji } from '@/constants/Emojis';
import LottieView from 'lottie-react-native';
import { Text, View, StyleSheet } from 'react-native'

interface EmojiShotsProps {
  shotEmojis: string[];
  par: number;
}

const EmojiShots: React.FC<EmojiShotsProps> = ({shotEmojis, par}) => {
    let emojiSize = 60;
    
    if (!shotEmojis) return null;
    
    if (shotEmojis.length >=7) {
        emojiSize = 40;
    } 


    const getScoreString = () => {
        const toPar = shotEmojis.length - par;
        switch (toPar) {
          case -2:
            return 'Eagle';
          case -1:
            return 'Birdie';
          case 0:
            return 'Par';
          case 1:
            return 'Bogey';
          case 2:
            return 'Double Bogey';
          case 3:
            return 'Triple Bogey';
          case 4:
            return 'Monster Bogey';
          default:
            return `Shot ${shotEmojis.length}`;
        }
      };


  return (
    <View style={{justifyContent:'center',alignItems:'center', height:100, width:'100%'}}>
<View style={styles.container}>
    {shotEmojis.length < 10
    ? 
    shotEmojis.map((emoji, index) => {
        return (
            <LottieView key={index} source={getEmoji(emoji)} autoPlay loop style={{ width: emojiSize, height: emojiSize }} />
        )
    })

    :
    <LottieView source={getEmoji('bandage')} autoPlay loop style={{ width: 60, height: 60 }} />
    }

</View>
    <View>
        <Text>{getScoreString()}</Text>
    </View>



</View>
)
}

export default EmojiShots;



const styles = StyleSheet.create({
container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
},

})