import { Text, View, StyleSheet } from 'react-native'
import { PieChart } from 'react-native-gifted-charts';

interface RoundSumPieChartProps {
    great: number;
    good: number;
    bad: number;
    putts: number;
}

const RoundSumPieChart: React.FC<RoundSumPieChartProps> = ({ great,good,bad,putts }) => {
    const renderLegend = (text:string, color:string) => {
        return (
            <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                <View
                    style={{
                        height: 18,
                        width: 18,
                        marginHorizontal: 10,
                        borderRadius: 4,
                        backgroundColor: color || '#777',
                    }}
                />
                <Text style={{ color: 'white', fontSize: 14 }}>{text || ''}</Text>
            </View>
        );
    };

    return (
        <View>
            <View
                style={{
                    marginVertical: 20,
                    marginHorizontal: 0,
                    borderRadius: 10,
                    paddingVertical: 20,
                    // backgroundColor: '#414141',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>


                <PieChart
                    strokeColor="#777"
                    strokeWidth={1.5}
                    radius={70}
                    
                    data={[
                        { value: great, color: 'skyblue' },
                        { value: good, color: 'yellowgreen' },
                        { value: bad, color: 'salmon' },
                        { value: putts, color: 'tan' },
                    ]}
                    innerRadius={4}
                    innerCircleColor="#777"
                    innerCircleBorderWidth={4}
                    innerCircleBorderColor={'#777'}
                    showValuesAsLabels={true}
                    showText
                    textColor='#333'
                    // textSize={90}
                    // textBackgroundColor='rgba(0,0,0,0.2)'
                    // textSize={30}
                    // showTextBackground={true}
                    centerLabelComponent={() => {
                        return (
                            <View>
                                {/* <Text style={{ color: 'white', fontSize: 26 }}>90</Text>
                                <Text style={{ color: 'white', fontSize: 18 }}>Total</Text> */}
                            </View>
                        );
                    }}
                />


                {/*********************    Custom Legend component      ********************/}
                <View
                    style={{
                        // width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginTop: 20,
                        // marginHorizontal:100,
                    }}>
                        <View>

                    {renderLegend('Great', 'skyblue')}
                    {renderLegend('Good', 'yellowgreen')}
                        </View>
                        <View>

                    {renderLegend('Bad', 'salmon')}
                    {renderLegend('Putts', 'tan')}
                        </View>
                </View>
                {/****************************************************************************/}


            </View>
        </View>
    );
}

export default RoundSumPieChart;



const styles = StyleSheet.create({
    container: {

    },

})