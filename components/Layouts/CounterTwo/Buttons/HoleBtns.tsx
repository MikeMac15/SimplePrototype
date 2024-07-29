import { Button, View } from "react-native"
interface NextHoleProps {
    holeNum:number;
    nextHole: () => void;
}
const HoleBtns: React.FC<NextHoleProps> = ({holeNum, nextHole}) => {
    
    return (
        <View style={{width:'100%', flexDirection:'row'}}>

            <View style={{width:'50%', alignItems:'flex-start'}}>
                {/* <Button title={`< Hole ${holeNum - 1}`} onPress={()=>''}/> */}
            </View>

            <View style={{width:'50%',alignItems:'flex-end'}}>
                <Button title={`Hole ${holeNum + 1} >`} onPress={()=>nextHole()}/>
            </View>
        </View>
    )
}
export default HoleBtns;