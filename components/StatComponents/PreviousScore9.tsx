import { StyleSheet, Text, View } from "react-native"
import { getAllRoundHoles, getAllTeeboxHoles, openDb } from "../DataBase/API";
import { useEffect, useState } from "react";
import { HoleStatsExtra } from "../DataBase/Classes";





interface Hole {
    id: number;
    teebox_id: number;
    num: number;
    par: number;
    yardage: number;
}




const PreviousScore9 = ({roundID, teeboxID}: {roundID:number, teeboxID:number}) => {
    const [holes, setHoles] = useState<Hole[]>([])
    const [roundHoles, setRoundHoles] = useState<HoleStatsExtra[]>([])

    const fetchTeeboxHoles = async() => {
        const holes: Hole[] | undefined = await getAllTeeboxHoles(teeboxID);
        if (holes){
            setHoles(holes)
        }
    }
    const fetchRoundHoles = async() => {
        const holes: HoleStatsExtra[] | undefined = await getAllRoundHoles(roundID);
        if (holes){
            setRoundHoles(holes)
        }
    }

    useEffect(()=>{
        fetchTeeboxHoles();
        fetchRoundHoles();
    },[])

    const Score = ({holes,roundHoles,title}:{holes: Hole[], roundHoles: HoleStatsExtra[], title:string}) => {
    return (
        <View style={styles.container}>
          <View style={styles.scorecard}>
            <Text style={styles.title}>{title}</Text>
            
            <View style={styles.row}>
              <View style={styles.headerCell}>
                <Text style={styles.text}>Hole:</Text>
              </View>
              {holes.map(hole => (
                <View
                  style={[
                    styles.cell,
                    hole.num % 2 === 0 ? styles.evenCell : styles.oddCell,
                  ]}
                  key={hole.id}
                >
                  <Text style={styles.text}>{hole.num}</Text>
                </View>
              ))}
            </View>
    
            <View style={styles.row}>
              <View style={styles.headerCell}>
                <Text style={styles.text}>Par:</Text>
              </View>
              {holes.map(hole => (
                <View
                  style={[
                    styles.cell,
                    hole.num % 2 === 0 ? styles.evenCell : styles.oddCell,
                  ]}
                  key={hole.id}
                >
                  <Text style={[styles.text, styles.darkText]}>{hole.par}</Text>
                </View>
              ))}
            </View>
    
            <View style={styles.row}>
              <View style={styles.headerCell}>
                <Text style={styles.text}>You:</Text>
              </View>
              {holes.map(hole => (
                <View
                  style={[
                    styles.cell,
                    hole.num % 2 === 0 ? styles.evenCell : styles.oddCell,
                  ]}
                  key={hole.id}
                >
                  <Text style={[styles.text, styles.darkText]}>
                    {roundHoles[hole.num-1] ? Number(roundHoles[hole.num-1]?.toPar) : '-'}
                  </Text>
                </View>
              ))}
            </View>
    
            {/* <View style={styles.row}>
              <View style={styles.headerCell}>
                <Text style={styles.text}>Great:</Text>
              </View>
              {holes.map(hole => (
                <View
                  style={[
                    styles.cell,
                    hole.num % 2 === 0 ? styles.evenCell : styles.oddCell,
                  ]}
                  key={hole.id}
                >
                  <View style={styles.innerCell}>
                    <Text style={[styles.text, { color: roundHoles[hole.num-1]?.great ? 'skyblue' : 'grey' }]}>
                      {roundHoles[hole.num-1] ? Number(roundHoles[hole.num-1]?.great) : '-'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
    
            <View style={styles.row}>
              <View style={styles.headerCell}>
                <Text style={styles.text}>Good:</Text>
              </View>
              {holes.map(hole => (
                <View
                  style={[
                    styles.cell,
                    hole.num % 2 === 0 ? styles.evenCell : styles.oddCell,
                  ]}
                  key={hole.id}
                >
                  <View style={styles.innerCell}>
                    <Text style={[styles.text, { color: roundHoles[hole.num-1]?.good ? 'yellowgreen' : 'grey' }]}>
                      {roundHoles[hole.num-1] ? Number(roundHoles[hole.num-1]?.good) : '-'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
    
            <View style={styles.row}>
              <View style={styles.headerCell}>
                <Text style={styles.text}>Bad:</Text>
              </View>
              {holes.map(hole => (
                <View
                  style={[
                    styles.cell,
                    hole.num % 2 === 0 ? styles.evenCell : styles.oddCell,
                  ]}
                  key={hole.id}
                >
                  <View style={styles.innerCell}>
                    <Text style={[styles.text, { color: roundHoles[hole.num-1]?.bad ? 'salmon' : 'grey' }]}>
                      {roundHoles[hole.num-1] ? Number(roundHoles[hole.num-1]?.bad) : '-'}
                    </Text>
                  </View>
                </View>
              ))}
            </View> */}
    
            <View style={styles.row}>
              <View style={styles.headerCell}>
                <Text style={styles.text}>Putts:</Text>
              </View>
              {holes.map(hole => (
                <View
                  style={[
                    styles.cell,
                    hole.num % 2 === 0 ? styles.evenCell : styles.oddCell,
                  ]}
                  key={hole.id}
                >
                  <View style={styles.innerCell}>
                    <Text style={[styles.text, { color: roundHoles[hole.num-1]?.putts ? roundHoles[hole.num-1]?.putts >= 3 ? 'salmon' : 'gold' : 'grey' }]}>
                      {roundHoles[hole.num-1] ? Number(roundHoles[hole.num-1]?.putts) : '-'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* <View style={styles.row}>
              <View style={styles.headerCell}>
                <Text style={styles.text}>Strat:</Text>
              </View>
              {holes.map(hole => (
                <View
                  style={[
                    styles.cell,
                    hole.num % 2 === 0 ? styles.evenCell : styles.oddCell,
                  ]}
                  key={hole.id}
                >
                  <View style={styles.innerCell}>
                    <Text style={[styles.text, { color: roundHoles[hole.num-1]?.putts ? roundHoles[hole.num-1]?.putts >= 3 ? 'salmon' : 'gold' : 'grey' }]}>
                      {roundHoles[hole.num-1] ? Number(roundHoles[hole.num-1]?.strat) : '-'}
                    </Text>
                  </View>
                </View>
              ))}
            </View> */}
          </View>
        </View>
      );
    };

    return(
        <View>
            <Score holes={holes.slice(0, 9)} roundHoles={roundHoles} title="Front 9" />
            <Score holes={holes.slice(9, 18)} roundHoles={roundHoles} title="Back 9" />
        </View>
    )
}
    
    const styles = StyleSheet.create({
      container: {
        backgroundColor: 'tan',
        padding: 10,
      },
      scorecard: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
      },
      title: {
        textAlign: 'center',
        fontFamily: 'Arial',
        fontSize: 17,
        fontStyle: 'italic',
        marginVertical: 10,
      },
      row: {
        flexDirection: 'row',
        borderWidth: 0.5,
      },
      headerCell: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },
      cell: {
        width: 36.25,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 0.5,
        borderBottomWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: 'grey',
      },
      evenCell: {
        backgroundColor: 'tan',
      },
      oddCell: {
        backgroundColor: 'antiquewhite',
      },
      innerCell: {
        backgroundColor: '#444',
        borderRadius: 200,
        paddingHorizontal: 5,
      },
      text: {
        textAlign: 'center',
        fontFamily: 'Arial',
        fontSize: 17,
        fontStyle: 'italic',
      },
      darkText: {
        color: '#444',
      },
      
    });
    

            export default PreviousScore9;