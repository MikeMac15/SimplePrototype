
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

interface Shot {
  totalPutts: number,
  great: number,
  good: number,
  bad: number
}

export default function AllShotPieChart({ shotTotals }: { shotTotals: Shot }) {


  const renderLegend = (text: string, count: number, color: string) => {
    return (
      <View style={{
        flexDirection: 'column', marginBottom: 12,
      }}>
        <View
          style={{
            alignItems: 'center', justifyContent: 'center',
            height: 50,
            width: 50,
            marginRight: 10,
            borderRadius: 4,
            backgroundColor: color || 'white',
          }}
        >
          <Text style={{ color: 'black', fontSize: 16 }}>{count || ''}</Text>
          <Text style={{ color: 'black', fontSize: 16 }}>{text || ''}</Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        width: 170,
        height: 170,
        marginTop: 20,
        marginHorizontal: 10,
        borderRadius: 10,
        paddingVertical: 0,
        paddingHorizontal: 0,

        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{ transform: 'scale(.65)' }}>
        <View
          style={{





            justifyContent: 'center',
            alignItems: 'center',
          }}>


          {/*********************    Custom Header component      ********************/}

          {/****************************************************************************/}


          <PieChart
            //   strokeColor="white"
            strokeWidth={2}
            donut
            data={[
              { value: shotTotals.good, color: 'lightgreen' },
              { value: shotTotals.bad, color: 'salmon' },
              { value: shotTotals.totalPutts, color: 'gold' },
              { value: shotTotals.great, color: 'rgb(84,219,234)' },
            ]}
            innerCircleColor="#414141"
            innerCircleBorderWidth={2}
            innerCircleBorderColor={'grey'}
            innerRadius={85}

            textColor="whitesmoke"
            textSize={18}
            centerLabelComponent={() => {
              return (
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    transform: 'translateX(-6px)'
                  }}>
                  <View style={{ flexDirection: 'column' }}>
                    {renderLegend('Great', shotTotals.great, 'rgb(84,219,234)')}
                    {renderLegend('Putts', shotTotals.totalPutts, 'gold')}
                  </View>

                  <View style={{ flexDirection: 'column' }}>
                    {renderLegend('Good', shotTotals.good, 'lightgreen')}
                    {renderLegend('Bad', shotTotals.bad, 'salmon')}
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>


      {/*********************    Custom Legend component      ********************/}
      {/* <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20,
              }}>
                <View style={{flexDirection:'column'}}>

              {renderLegend('Great', shotTotals.great, 'rgb(84,219,234)')}
              {renderLegend('Good', shotTotals.good, 'lightgreen')}
                </View>
                <View style={{flexDirection:'column'}}>
              {renderLegend('Bad', shotTotals.bad, 'salmon')}
              {renderLegend('Putts', shotTotals.putts, 'gold')}
                </View>
            </View> */}
      {/****************************************************************************/}







    </View>
  );
}