import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Hole } from "@/components/DataBase/Classes";
import NewPieChart from "./NewPieChart";


const { width } = Dimensions.get('window');

interface ShotData {
  [key: string]: number;
}



interface C3HeaderProps {
  courseName: string;
  holeData: Hole;
  roundToPar: number;
  roundGoal: number;
  getTotalShots: () => number;
  shotData: ShotData;
  allShotData: ShotData;
}

const C3Header3: React.FC<C3HeaderProps> = ({ courseName, holeData, roundToPar, roundGoal, getTotalShots, shotData, allShotData }) => {
  const totalShots = getTotalShots();
  const roundToGoal = (roundToPar / holeData.num) - (roundGoal / holeData.num);
  return (
    <View style={{ flexDirection: 'row', width: width, justifyContent:'space-between' }}>
      <View style={{}}>
      <C3HoleData courseName={courseName} holeData={holeData} totalShots={totalShots} />
      </View>
      {/* <C2HScore roundToPar={roundToPar} roundToGoal={roundToGoal} /> */}
      <View style={{}}>

      <NewPieChart shotData={shotData} allShotData={allShotData}/>
      </View>

    </View>
  );
};

export default C3Header3;

interface C2HoleDataProps {
  courseName: string;
  holeData: Hole;
  totalShots: number;
}

const C3HoleData: React.FC<C2HoleDataProps> = ({ courseName, holeData, totalShots }) => {
  return (
    <View style={{ backgroundColor: '#333', transform:'scaleX(1.3)', marginLeft:20}}>
      <Text style={styles.CourseName}>{courseName}</Text>
      <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems:'center',  }}>
        <View style={{ width: width * 0.4 }}>
          <View style={[styles.RowCenter, { justifyContent: 'center' , marginBottom:5}]}>
            <Text style={styles.Hole}>Hole</Text>
            <Text style={styles.HoleNum}>{holeData.num}</Text>
          </View>
          <View style={[styles.RowCenter, { justifyContent: 'space-evenly' }]}>
            <View style={styles.RowCenter}>
              <Text style={[styles.dist, { marginRight: 4 }]}>Par</Text>
              <Text style={styles.distNum}>{holeData.par}</Text>
            </View>
          </View>
            <View style={[styles.RowCenter,{justifyContent:'center'}]}>
              <Text style={styles.distNum}>{holeData.yardage}</Text>
              <Text style={styles.dist}>yrds</Text>
            </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'space-evenly', marginBottom:10 }}>
          <C2HScoreData totalShots={totalShots} holePar={holeData.par} />
        </View>
      </View>
    </View>
  );
};

interface C2HScoreProps {
  roundToPar: number;
  roundToGoal: number;
}

const C2HScore: React.FC<C2HScoreProps> = ({ roundToPar, roundToGoal }) => {
  const [color, setColor] = useState('#999');
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
    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 5,width:90, }}>
      <Text style={{ color: color, fontSize: 45, textAlign:'right' }}>{roundToPar > 0 ? '+' : ''}{roundToPar}</Text>
    </View>
  );
};

interface C2HScoreDataProps {
  totalShots: number;
  holePar: number;
}

const C2HScoreData: React.FC<C2HScoreDataProps> = ({ totalShots, holePar }) => {
    const length = Math.max(holePar, totalShots);
    const combinedShotList = [...Array(length).fill('#444')];
  
    for (let i = 0; i < totalShots; i++) {
      combinedShotList[i] = 'whitesmoke';
    }

  const StringToPar = () => {
    const toPar = totalShots - holePar;
    switch (toPar) {
      case -2:
        return 'Eagle';
      case -1:
        return 'Birdie';
      case 0:
        return 'Par';
      case 1:
        return 'Bogey';
      case 2:
        return 'Double Bogey';
      case 3:
        return 'Triple Bogey';
      case 4:
      case 5:
        return 'Monster Bogey';
      default:
        return `Shot ${totalShots}`;
    }
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', width: width * 0.3, marginTop: 10 }}>
        {combinedShotList.map((shotColor, i) => (
          <Shot key={i} shotNum={i + 1} color={shotColor} />
        ))}
      </View>
      <View style={{ flexDirection: 'row', marginTop: 2 }}>
        <Text style={{ color: 'whitesmoke', fontSize: 12, textAlign: 'center' }}>{StringToPar()}</Text>
      </View>
    </View>
  );
};

interface ShotProps {
  shotNum: number;
  color: string;
}

const Shot: React.FC<ShotProps> = ({ shotNum, color }) => {
  const transformStyle = shotNum > 5 ? { transform: [{ translateX: (shotNum - 6) * 2 }] } : {};
  const positionStyle = shotNum > 5 ? { position: 'absolute' as 'absolute', right: 4 } : {};
  return (
    <View style={[styles.shot, { backgroundColor: color, borderColor: '#222', borderWidth: 0.5 }, transformStyle, positionStyle]}>
      <Text style={{ textAlign: 'center', color: color==='#444' ? 'whitesmoke' : 'black' }}>{shotNum}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  RowCenter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
  shot: {
    padding: 1,
    borderRadius: 500,
    width: 20,
    position: 'relative', //allows stacking
  },
  CourseName: {
    fontSize: 25,
    textAlign: 'center',
    color: 'whitesmoke',
    
  },
  Hole: {
    fontSize: 20,
    marginRight: 4,
    color: 'whitesmoke',
  },
  HoleNum: {
    fontSize: 35,
    color: 'whitesmoke',
  },
  dist: {
    fontSize: 25,
    color: 'whitesmoke',
  },
  distNum: {
    fontSize: 30,

    color: 'whitesmoke',
  },
});
