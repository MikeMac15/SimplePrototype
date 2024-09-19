import { getMenuGradient, getRibbonImage } from '@/components/DataBase/localStorage';
import { getRibbonImageSource } from '@/constants/Colors';
import StackHeader from '@/constants/StackHeader';
import { Player, SkinsGame } from '@/Games/classes';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Keyboard } from 'react-native'

interface indexProps {

}

const index: React.FC<indexProps> = ({ }) => {
    ////////////////////./////////////////////////  Page Setup  /////////////////////////////////////////////////////////////////////////////////////////////
    const { players, gameLength } = useLocalSearchParams();

    // Handle possible cases where players and gameLength might be an array or string
    const playersParam = Array.isArray(players) ? players[0] : players;
    const gameLengthParam = Array.isArray(gameLength) ? gameLength[0] : gameLength;

    // Deserialize the players array from the string
    const deserializedPlayers = playersParam ? JSON.parse(playersParam) : [];

    // Convert deserialized data into Player class instances
    const [playerObjects, setPlayerObjects] = useState<Player[]>([]);


    // Ref to hold the current SkinsGame instance
    const skinsGameRef = useRef<SkinsGame | null>(null);
 

    useEffect(() => {
        if (deserializedPlayers.length > 0 && gameLengthParam) {
            const playersArray = deserializedPlayers.map((player:Player) =>
                new Player(player.name, player.color, player.buy_in, parseInt(gameLengthParam))
            );
            console.log(playersArray);
            setPlayerObjects(playersArray);
        }
    }, []);
    

    useEffect(() => {
        if (playerObjects.length > 0) {
            // get pot
            const pot = playerObjects.reduce((acc, player) => acc + player.buy_in, 0);
            // create game instance
            skinsGameRef.current = new SkinsGame(parseInt(gameLengthParam), playerObjects, pot);
        }
    }, [playerObjects]);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////  User Preferences  /////////////////////////////////////////////////////////////////////////////////

    const [gradient, setGradient] = useState('cool-guy')
    const [ribbonImage, setRibbonImage] = useState('proud-parent')
    const getPreferences = async () => {
        const value = await getMenuGradient()
        setGradient(value)
        const ribbonImgTag = await getRibbonImage()
        setRibbonImage(ribbonImgTag)
    }

    useEffect(() => {
        getPreferences();
    }, [])

    const image = getRibbonImageSource(ribbonImage);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    const PlayerBreakdown = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                {skinsGameRef.current?.players.map((player, index) => (
                    <View key={index}>
                        <Text>{player.name} </Text>
                        {/* <Text>Buy In: ${player.buy_in.toFixed(2)}</Text>
                        <Text>Skin Value: ${player.skin.toFixed(2)}</Text>
                        <Text>Won: ${player.won.toFixed(2)}</Text>
                        <Text>Lost: ${player.lost.toFixed(2)}</Text> */}
                        <Text>Total: ${player.total.toFixed(2)}</Text>
                    </View>
                ))}
            </View>
        );
    }

    const GameBreakDown = () => {
        return (
            <View>
                <Text>Game Length: {skinsGameRef.current?.length}</Text>
                <Text>Pot: {skinsGameRef.current?.pot}</Text>
                <Text>Current Hole: {skinsGameRef.current?.currentHole}</Text>
            </View>
        );
    }

    const ScoreInput = () => {
        const inputRefs = useRef<any[]>([]);
    
        const handleScoreChange = (index: number, text: string) => {
            setPlayerObjects((prevPlayers) => {
                const updatedPlayers = [...prevPlayers];
                updatedPlayers[index].addScore(parseInt(text)); // Safely update the score
                return updatedPlayers;
            });
        };
    
        if (!skinsGameRef.current) return null;
        
        return (
            <View style={{ flexDirection: 'row' }}>
                {skinsGameRef.current?.players.map((player, index) => (
                    <View key={index}>
                        <Text>{player.name}</Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            placeholder="Score"
                            keyboardType="numeric"
                            onChangeText={(text) => handleScoreChange(index, text)}
                            returnKeyType="done"
                            onSubmitEditing={() => Keyboard.dismiss()}
                        />
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor:'#222' }}>
            <StackHeader image={image} imageTag={ribbonImage} title="Skins Game" />
            <Text>Game Length:{gameLengthParam}</Text>
            <PlayerBreakdown />
            <GameBreakDown />
            <ScoreInput />
        </View>
    );
};

export default index;



const styles = StyleSheet.create({
    container: {

    },

})