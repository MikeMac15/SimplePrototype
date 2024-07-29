import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { QuickStats } from "../DataBase/Classes";


type ParViewProps = {
    par3data: QuickStats,
    par4data: QuickStats,
    par5data: QuickStats,

}


const ParSpecificStatView: React.FC<ParViewProps> = ({ par3data, par4data, par5data}) => {


    const StatView = ({par,stat}:{par:number,stat:number|string}) => {
        return (
            <View>
                <Text style={styles.statTitle}>
                    {`Par ${par}`}
                </Text>
                <Text style={styles.statData}>
                    {stat}
                </Text>
            </View>
        )
    }

    const CategoryView = ({title, data3, data4, data5}:{title: string, data3:number|string, data4:number|string, data5:number|string}) => {
        return (
                <View style={styles.stats}>
                    <Text style={styles.statTitle1}>{title}</Text>
                    <View style={styles.idk}>

                    <StatView stat={data3} par={3} />
                    <StatView stat={data4} par={4} />
                    <StatView stat={data5} par={5} />
          
                    </View>
                </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{`Par Specific Stats`}</Text>
            <View>

                <CategoryView 
                    title="Average Score"
                    data3={(par3data.avgScore + 3).toFixed(2)}
                    data4={(par4data.avgScore + 4).toFixed(2)}
                    data5={(par5data.avgScore + 5).toFixed(2)}
                 />
          
                  
                <View style={styles.spacer} />

                <CategoryView
                    title='Total Score'
                    data3={par3data.totalScore}
                    data4={par4data.totalScore}
                    data5={par5data.totalScore} />
                   
                <View style={styles.spacer} />

                <CategoryView
                    title='Putts Per Hole'
                    data3={(par3data.totalPutts / par3data.count).toFixed(2)}
                    data4={(par4data.totalPutts / par4data.count).toFixed(2)}
                    data5={(par5data.totalPutts / par5data.count).toFixed(2)} />
                
                <View style={styles.spacer} />

                <CategoryView
                    title='Greens In Reg'
                   data3={`${((par3data.totalGIR/par3data.count)*100).toFixed(0)}%`}
                   data4={`${((par4data.totalGIR/par4data.count)*100).toFixed(0)}%`}
                   data5={`${((par5data.totalGIR/par5data.count)*100).toFixed(0)}%`} />
                    
               
                <View style={styles.spacer} />

                <CategoryView
                    title='Fwys In Reg' 
                    data3={`-`}
                    data4={`${((par4data.totalFIR/par4data.count)*100).toFixed(0)}%`}
                    data5={`${((par5data.totalFIR/par5data.count)*100).toFixed(0)}%`} />
                    
                   
                

                    <View style={styles.spacer} />
                    
                <View style={styles.stats}>
                    <Text style={styles.statExt}>Extended Stats</Text>

                </View>
                    <View style={styles.spacer} />

                    {/* <View style={styles.spacer} /> */}

                <CategoryView
                    title='Eagle or Less'
                    data3={par3data.eaglesOrLess}
                    data4={par4data.eaglesOrLess}
                    data5={par5data.eaglesOrLess} />
                <CategoryView
                    title='Birdies'
                    data3={par3data.birdies}
                    data4={par4data.birdies}
                    data5={par5data.birdies} />
                <CategoryView
                    title='Pars'
                    data3={par3data.pars}
                    data4={par4data.pars}
                    data5={par5data.pars} />
                <CategoryView
                    title='Bogeys'
                    data3={par3data.bogeys}
                    data4={par4data.bogeys}
                    data5={par5data.bogeys} />
                <CategoryView
                    title='Double or Worse'
                    data3={par3data.doublePlus}
                    data4={par4data.doublePlus}
                    data5={par5data.doublePlus} />
                 
               
                   

                {/* <View style={styles.spacer} /> */}
            </View>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {

        padding: 10,
        borderRadius: 15,
        flexDirection: 'column',

        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 2,
       
    },
    title: {
        color: 'whitesmoke',
        fontSize: 25,
        fontFamily: 'arial',
        fontStyle: 'italic',
    },
    statTitle1: {
        color: '#ddd', fontSize: 20, fontFamily: 'arial', fontStyle: 'italic', textAlign:'center',
    },
    statTitle: {
        color: '#999', fontSize: 12, fontFamily: 'arial', fontStyle: 'italic', textAlign:'center',
    },
    statData: {
        color: 'whitesmoke', fontSize: 20, fontFamily: 'arial', fontStyle: 'italic', textAlign:'center',
    },
    stats: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    },
    spacer: { height: .5, backgroundColor: '#222', },
    statExt: {
         fontSize:8, color:'#999', textAlign:'center'
    },
    idk: {
        width:'100%',
        flexDirection:'row',
        marginVertical:10,
        justifyContent:'space-evenly'
    }
})

export default ParSpecificStatView;