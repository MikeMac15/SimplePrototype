import { Hole } from "@/components/DataBase/Classes";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native"
import { Dimensions } from "react-native";
const { width } = Dimensions.get('window');


const C2Header = ({courseName,holeData,shotList,roundToPar,roundGoal}:{courseName:string,holeData:Hole,shotList:string[],roundToPar:number,roundGoal:number, }) => {
    const roundToGoal =  (roundToPar / holeData.num)-(roundGoal / holeData.num)
    return(
        <View style={{flexDirection:'row', width:width}}>
                <C2HoleData courseName={courseName} holeData={holeData} shotList={shotList}/>
                <C2HScore roundToPar={roundToPar} roundToGoal={roundToGoal}/>
        </View>
    )
}
export default C2Header;

const C2HoleData = ({courseName,holeData,shotList}:{courseName:string,holeData:Hole, shotList:string[], }) => {
    return (
        <View style={{width:width*.75, height: 100, backgroundColor:'#333' }}>
            <Text style={styles.CourseName}>{courseName}</Text>

            <View style={{justifyContent:'space-evenly', flexDirection:'row'}}>

            <View style={{width:width*0.4}}>

            <View style={[styles.RowCenter, {justifyContent:'center'}]}>
                <Text style={styles.Hole}>Hole</Text>
                <Text style={styles.HoleNum}>{holeData.num}</Text>
            </View>
            <View style={[styles.RowCenter,{justifyContent:'space-evenly'}]}>
            <View style={styles.RowCenter}>
                <Text style={[styles.dist, {marginRight:4}]}>Par</Text>
                <Text style={styles.distNum}>{holeData.par}</Text>

            </View>
            <View style={styles.RowCenter}>
                <Text style={styles.distNum}>{holeData.yardage}</Text>
                <Text style={styles.dist}>yrds</Text>
            </View>
            </View>
            </View>

            <View style={{alignItems:'center', justifyContent:'space-evenly'}}>
                <C2HScoreData shotList={shotList} holePar={holeData.par} />
         
            </View>

            </View>
        </View>
    )
}

const C2HScore = ({roundToPar,roundToGoal}:{roundToPar:number,roundToGoal:number}) => {
    const [color, setColor] = useState('#999')
    useEffect(() => {
        if (roundToGoal > 0.5) {
          setColor('salmon');
        } else if (roundToGoal < -0.25) {
          setColor('yellowgreen');
        } else {
          setColor('#999');
        }
      }, [roundToGoal]);
    return (
        <View style={{ justifyContent:'center', alignItems:'center', padding:5 }}>
            <Text style={{color:color, fontSize:45}}>{roundToPar > 0 ? '+' : ''}{roundToPar}</Text>

        </View>
    )
}





const C2HScoreData = ({shotList, holePar}:{shotList:string[], holePar:number}) => {

    const combinedShotList = [
        ...shotList,
        ...Array(Math.max(0, holePar - shotList.length)).fill('whitesmoke'),
      ];

    const StringToPar = () => {
        const toPar = shotList.length - holePar
        switch (toPar) {
            case -2:
                return 'For Birdie';
            case -1:
                return 'For Par';
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
            case 5:
                return 'Monster Bogey';
            default:
                return `Shot ${shotList.length}`;
        }
    }


    return (
        <View style={{ alignItems:'center',justifyContent:'center'}}>
        <View style={{flexDirection:'row', justifyContent:'center', width:width*.3, marginTop:10}}>
            { 
                combinedShotList.map((shotColor,i)=>(
                    <Shot key={i} shotNum={i+1} color={shotColor}/>
                ))
                
            }
            
        </View>
        <View style={{flexDirection:'row', marginTop:2}}>
            <Text style={{color:'whitesmoke', fontSize:12, textAlign:'center'}}>{StringToPar()}</Text>

        </View>
        </View>
    )
}



const Shot = ({shotNum, color}:{shotNum:number, color:string}) => {
    const transformStyle = shotNum > 5 ? { transform: [{ translateX: (shotNum-6) * 2 }] } : {};
    const positionStyle = shotNum > 5 ? { position: 'absolute' as 'absolute', right:4  } : {};
    return(
        <View style={[styles.shot,{backgroundColor:color, borderColor:'#222', borderWidth:.5},transformStyle, positionStyle]}>
            <Text style={{textAlign:'center'}}>{shotNum}</Text>
        </View>
    )
}




const styles = StyleSheet.create({
    RowCenter: {
        flexDirection:'row', 
        justifyContent:'flex-start', 
        alignItems:'baseline'},
    shot: {
        padding: 1,
        borderRadius: 500,
        width: 20,
        
        position: 'relative', //allows stacking
          },
    CourseName: {
        fontSize:25,
        textAlign:'center',
        color:'whitesmoke'
    },
    Hole: {
        fontSize:20,
        marginRight:4,
        color:'whitesmoke'

    },
    HoleNum: {
        fontSize:28,
        color:'whitesmoke'
    },
    dist: {
        fontSize:18,
        color:'whitesmoke'
    },
    distNum: {
        
        fontSize:20,
        color:'whitesmoke'
    },
})