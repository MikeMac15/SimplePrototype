import { Hole, Round, ShotData } from "@/components/DataBase/Classes"
import { Dimensions, Text, View } from "react-native"
import ShotPieChartV1 from "./ShotPieChartV1";

const { width } = Dimensions.get('window');

interface CurrentHoleInfoV1Props {
  teeboxHoles: Hole[];
  round: Round;
  holeNumber: number;
  shotData: ShotData;
  allShotData: ShotData;
}

const CurrentHoleInfoV1: React.FC<CurrentHoleInfoV1Props> = ({
  teeboxHoles,
  round,
  holeNumber,
  shotData,
  allShotData
}) => {
    const hole = teeboxHoles.find(hole => hole.num === holeNumber)
    
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: width, backgroundColor: '#444' }}>
        <View style={{ backgroundColor: '#666', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%', width: "100%", paddingBottom: 0 }}>
          <View style={{ flex: 1, backgroundColor: '#555', paddingTop: 5, paddingBottom: 10 }}>
  
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }}>
              <Text style={{
    color: 'white',
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '600',
    marginBottom: 5,
    marginRight: 2
  }}>Hole:</Text>
              <Text style={{ textAlign: 'center', fontSize: 25, color: 'whitesmoke', fontStyle: 'italic', fontWeight: '700' }}>{hole?.num}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center' }}>
              <Text style={{
    color: 'white',
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '600',
    marginBottom: 5,
    marginRight: 2
  }}>Par: </Text>
              <Text style={{ textAlign: 'center', fontSize: 25, color: 'whitesmoke', fontStyle: 'italic', fontWeight: '700' }}>{hole?.par}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center' }}>
              <Text style={{ textAlign: 'center', fontSize: 25, color: 'whitesmoke', fontStyle: 'italic', fontWeight: '700' }}>{hole?.yardage}</Text>
              <Text style={{
    color: 'white',
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '600',
    marginBottom: 5,
    marginRight: 2
  }}>yrds</Text>
            </View>
          </View>
          <View style={{ flex: 1, width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginRight: 5, fontSize: 10, color: 'whitesmoke', fontStyle: 'italic', fontWeight: '700' }}> To Par: </Text>
              {round.toPar <= 0 ?
                <Text style={{ marginRight: 5, textAlign: 'center', fontSize: 20, color: 'limegreen', fontStyle: 'italic', fontWeight: '700' }}>{round.toPar > 0 ? `+${round.toPar}` : round.toPar}</Text>
                : round.toPar > 15 ?
                  <Text style={{ marginRight: 5, textAlign: 'center', fontSize: 20, color: 'red', fontStyle: 'italic', fontWeight: '700' }}>{round.toPar > 0 ? `+${round.toPar}` : round.toPar}</Text>
                  : round.toPar > 10 ?
                    <Text style={{ marginRight: 5, textAlign: 'center', fontSize: 20, color: 'salmon', fontStyle: 'italic', fontWeight: '700' }}>{round.toPar > 0 ? `+${round.toPar}` : round.toPar}</Text>
                    : round.toPar > 5 ?
                      <Text style={{ marginRight: 5, textAlign: 'center', fontSize: 20, color: 'pink', fontStyle: 'italic', fontWeight: '700' }}>{round.toPar > 0 ? `+${round.toPar}` : round.toPar}</Text>
                      :
                      <Text style={{ marginRight: 5, textAlign: 'center', fontSize: 20, color: 'white', fontStyle: 'italic', fontWeight: '700' }}>{round.toPar > 0 ? `+${round.toPar}` : round.toPar}</Text>
                    }
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginRight: 5, fontSize: 10, color: 'whitesmoke', fontStyle: 'italic', fontWeight: '700' }}> PPH:</Text>
                    <Text style={{ marginRight: 5, textAlign: 'center', fontSize: 20, color: 'white', fontStyle: 'italic', fontWeight: '700' }}>{round.totalPutts / Object.keys(round.holes).length}</Text>
              
  
        
        </View>
          </View>
        </View>
  
  
  
              <ShotPieChartV1 shotData={shotData} allShotData={allShotData} />
      </View>
    )
  }

  export default CurrentHoleInfoV1;