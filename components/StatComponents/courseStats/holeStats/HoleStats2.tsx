import { CourseHoleData } from '@/components/DataBase/Classes';
import { AvgScoreColors, GIRFIRColors, PuttColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View, StyleSheet } from 'react-native'

interface HoleStats2Props {
   
    data: CourseHoleData,
    
}

const HoleStats2: React.FC<HoleStats2Props> = ({ data}) => {

    const DataTableHeader = () => {
        return (
            <View style={styles.row}>
                    <Text style={[styles.square, styles.holeText,{backgroundColor:'#333', width:80}]}></Text>
                    <View style={[styles.square,{backgroundColor:'#555'}]}>
                        <Text style={{color:'whitesmoke'}}>Avg</Text>
                        <Text style={{color:'whitesmoke'}}>Score</Text>
                    </View>
                    <View style={[styles.square,{backgroundColor:'#333'}]}>
                        <Text style={{color:'whitesmoke'}} >Total</Text>
                        <Text style={{color:'whitesmoke'}} >Score</Text>
                    </View>
                    <View style={[styles.square,{backgroundColor:'#555'}]}>
                        <Text  style={{color:'whitesmoke'}}>Avg</Text>
                        <Text  style={{color:'whitesmoke'}}>Putts</Text>
                    </View>
                    <View style={[styles.square,{backgroundColor:'#333', flexDirection:'row'}]}>
                        <Text style={{color:'whitesmoke'}} >GIR</Text>
                        <Text style={{color:'whitesmoke'}} >%</Text>
                    </View>
                    <View style={[styles.square,{backgroundColor:'#555', flexDirection:'row'}]}>
                        <Text  style={{color:'whitesmoke'}}>FIR</Text>
                        <Text  style={{color:'whitesmoke'}}>%</Text>
                    </View>
   
                    
                </View>
            )}

            const NineHoleData = ({ data, startIdx }: { data: CourseHoleData, startIdx: number }) => {
                const endIdx = startIdx + 9;
                const subsetAvgScores = data.avgScores.slice(startIdx, endIdx);
                const subsetTotalScores = data.totalScores.slice(startIdx, endIdx);
                const subsetPPH = data.pph.slice(startIdx, endIdx);
                const subsetGIR = data.gir.slice(startIdx, endIdx);
                const subsetFIR = data.fir.slice(startIdx, endIdx);
                const subsetPars = data.holePars.slice(startIdx, endIdx);
            
                const avg = (arr: number[]) => arr.reduce((sum, val) => sum + val, 0) / arr.length;
            
                // Filter out par 3 holes for FIR calculations
                const validFIR = subsetFIR.filter((_, i) => subsetPars[i] > 3);
                const validFIRTotal = validFIR.reduce((sum, val) => sum + val, 0);
                const avgAvgScores = avg(subsetAvgScores);
                const avgTotalScores = avg(subsetTotalScores);
                const avgPPH = avg(subsetPPH);
                const avgGIR = avg(subsetGIR);
                const avgFIR = validFIR.length > 0 ? avg(validFIR) : 0; // Avoid division by zero
                const sumPars = subsetPars.reduce((sum, val) => sum + val, 0);
            
                return (
                    <View>
                        {data.avgScores.slice(startIdx, startIdx + 9).map((avgScore, idx) => (
                            <View key={idx + startIdx} style={styles.row}>
                                <View style={[styles.square, { backgroundColor: '#333', width: 80 }]}>
                                    <Text style={styles.holeText}>Hole {idx + 1 + startIdx}</Text>
                                    <Text style={styles.parText}>(Par {data.holePars[idx + startIdx]})</Text>
                                </View>
                                <View style={[styles.square]}>
                                    <Text style={[styles.dataText, { color: AvgScoreColors(avgScore, 0, data.holePars[idx + startIdx]) }]}>{(avgScore).toFixed(1)}</Text>
                                </View>
                                <View style={[styles.square, { backgroundColor: '#333', flexDirection: 'row' }]}>
                                    <Text style={{ color: 'whitesmoke', fontSize: 10 }}>{data.totalScores[idx + startIdx] > 0 ? "+" : ''}</Text>
                                    <Text style={[styles.dataText, {}]}>{data.totalScores[idx + startIdx]}</Text>
                                </View>
                                <View style={[styles.square]}>
                                    <Text style={[styles.dataText, { color: PuttColors(data.pph[idx + startIdx]) }]}>{(data.pph[idx + startIdx]).toFixed(1)}</Text>
                                </View>
            
                                <View style={[styles.square, { flexDirection: 'row' }, { backgroundColor: '#333' }]}>
                                    <Text style={[styles.dataText, { color: GIRFIRColors(data.gir[idx + startIdx], data.count) }]}>{((data.gir[idx + startIdx] / data.count) * 100).toFixed(0)}</Text>
                                    <Text style={[styles.percent, { color: GIRFIRColors(data.gir[idx + startIdx], data.count) }]}>%</Text>
                                </View>
                                <View style={[styles.square, { flexDirection: 'row' },]}>
                                    <Text style={[styles.dataText, { color: data.holePars[idx + startIdx] === 3 ? 'whitesmoke' : GIRFIRColors(data.fir[idx + startIdx], data.count) }]}>{data.holePars[idx + startIdx] !== 3 ? ((data.fir[idx + startIdx] / data.count) * 100).toFixed(0) : '-'}</Text>
                                    <Text style={[styles.percent, { color: GIRFIRColors(data.fir[idx + startIdx], data.count) }]}>{data.holePars[idx + startIdx] === 3 ? '' : '%'}</Text>
                                </View>
                            </View>
                        ))}
                        <View style={[styles.row, { backgroundColor: '#111' }]}>
                            <View style={[styles.square, { backgroundColor: '#555', width: 80 }]}>
                                <Text>{startIdx === 0 ? 'Front 9' : 'Back 9'}</Text>
                                <Text style={[styles.parText, { color: 'black' }]}> (Par {sumPars})</Text>
                            </View>
                            <View style={[styles.square, { backgroundColor: AvgScoreColors(avgAvgScores, 0, avg(subsetPars)) }]}>
                                <Text style={[styles.dataText, { color: 'black' }]}>{(avgAvgScores).toFixed(1)}</Text>
                            </View>
                            <View style={[styles.square]}>
                                <Text style={[styles.dataText]}>{(avgTotalScores).toFixed(1)}</Text>
                            </View>
                            <View style={[styles.square, { backgroundColor: PuttColors(avgPPH) }]}>
                                <Text style={[styles.dataText, { color: 'black' }]}>{(avgPPH).toFixed(1)}</Text>
                            </View>
                            <View style={[styles.square, { flexDirection: 'row' }, { backgroundColor: GIRFIRColors(avgGIR, data.count) }]}>
                                <Text style={[styles.dataText, { color: 'black' }]}>{((avgGIR / data.count) * 100).toFixed(1)}</Text>
                                <Text style={[styles.percent, { color: 'black' }]}>%</Text>
                            </View>
                            <View style={[styles.square, { flexDirection: 'row', backgroundColor: GIRFIRColors(validFIRTotal, (validFIR.length * data.count)) }]}>
                                <Text style={[styles.dataText, { color: 'black' }]}>{((validFIRTotal / (validFIR.length * data.count))*100).toFixed(1)}</Text>
                                <Text style={[styles.percent, { color: 'black' }]}>%</Text>
                            </View>
                        </View>
                    </View>
                );
            };


    return (
        <LinearGradient colors={['#555','#111']} style={styles.container}>
                <DataTableHeader />
                <NineHoleData data={data} startIdx={0}/>
                <DataTableHeader />
                <NineHoleData data={data} startIdx={9}/>
        </LinearGradient>
    )
}

export default HoleStats2;



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222',
        paddingBottom:40
    },
    square: {
        width: 60,
        height: 40,
        flexDirection: 'column',
        
        marginVertical: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'whitesmoke'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    holeText: { color: 'whitesmoke',
        fontSize: 20,
        
     }, 
    dataText: {
        color: 'whitesmoke',
        fontSize: 22,
        textAlignVertical: 'center',
       
    },
    percent: {
        color: 'whitesmoke',
        fontSize: 10,
        textAlignVertical: 'bottom'
    },
    parText: {
        color: 'whitesmoke',
        fontSize: 10
    }

})