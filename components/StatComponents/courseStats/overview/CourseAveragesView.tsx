import { StyleSheet, Text, View } from "react-native"

type AveragesProps = {
    best: number,
    worst: number,
    avgScore: number,
    avgPPR: number,
    avgGIR: number,
    avgFIR: number,
    count: number
}

const CourseAveragesView: React.FC<AveragesProps> = ({ best, worst, avgScore, avgPPR, avgGIR, avgFIR, count }) => {
    return (
        <View style={{flexDirection:'column'}}>
        <View style={styles.cont}>
            <View style={styles.column}>
                <View style={styles.square}>
                    <Text style={styles.statTitle}>Avg Putts</Text>
                    <Text style={styles.statNumber}>{avgPPR.toFixed(1)}</Text>
                </View>
                
                <View style={styles.square}>
                    <Text style={styles.statTitle}>Rounds</Text>
                    <Text style={styles.statNumber}>{count}</Text>
                </View>
            </View>
            <View style={styles.column}>
                <View style={styles.circle}>
                    <Text style={styles.statTitle}>Avg Strokes</Text>
                    <Text style={styles.statNumber}>{avgScore}</Text>
                </View>
            </View>
            <View style={styles.column}>
                <View style={styles.square}>
                    <Text style={styles.statTitle}>Avg FIR</Text>
                    <Text style={styles.statNumber}>{(avgFIR).toFixed(1)}%</Text>
                </View>
                
                <View style={styles.square}>
                    <Text style={styles.statTitle}>Avg GIR</Text>
                    <Text style={styles.statNumber}>{(avgGIR).toFixed(1)}%</Text>
                </View>
            </View>
        </View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', }}>
                <View style={{justifyContent:'space-evenly', alignItems:'center', marginHorizontal:20}}>
                    <Text style={styles.statTitle}>Best Score</Text>
                    <Text style={styles.statNumber}>{best}</Text>
                </View>
                <View style={{justifyContent:'space-evenly', alignItems:'center', marginHorizontal:20}}>
                    <Text style={styles.statTitle}>Worst Score</Text>
                    <Text style={styles.statNumber}>{worst}</Text>
                </View>
                </View>
                </View>
    )
}
export default CourseAveragesView;

const styles = StyleSheet.create({
    cont: {
     
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    column: {
        margin:10
    },
    square: {
        justifyContent:'center', 
        alignItems:'center',
        width:150,
        marginVertical:10
    },
    circle: {
        justifyContent:'center', 
        alignItems:'center',
        backgroundColor:'#444',
        paddingHorizontal:20,
        paddingVertical:30,
        borderRadius:500,
        marginVertical:15
    },
    statTitle: {
        color:'whitesmoke',
    },
    statNumber: {
        color:'whitesmoke',
        fontSize:30
    },
    
})