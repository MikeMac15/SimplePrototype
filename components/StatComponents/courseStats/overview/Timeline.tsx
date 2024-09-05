import { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native"
import { LineChart } from "react-native-gifted-charts";



const Timeline = ({data1}:{data1:number[]}) => {
    const [sections,setSections] = useState(4)
    const [stepValue,setStepValue] = useState(30)
    const width = Dimensions.get('window').width;
        
        
        const xAxis: string[] = []
        data1.map((value)=>(xAxis.push((String(value)))))
        return (
            <View style={{width:'100%'}}>
        {/* <Text style={{color:'whitesmoke', fontSize:20, textAlign:'center', marginVertical:10}}>Scoring Timeline</Text> */}
        <LineChart
        areaChart
        
        data={data1.map(item => {return {value: item, dataPointText:String(item)};})}
        
        startFillColor="yellowgreen"
        startOpacity={0.8}
        endFillColor="#222"
        endOpacity={0.3}
        stepValue={stepValue}
        stepHeight={30}
        width={width * .8}
        scrollToEnd
        curved
        noOfSections={sections}
        dataPointsColor="#ccc"
        textShiftY={20}
        textColor="#ccc"
        textFontSize={14}
        rulesColor={'black'}
        yAxisTextStyle={{color:'#ccc'}}
        color="#ccc"
        />
        {/* Timeline */}
        
    </View>
    )
    
}

export default Timeline;