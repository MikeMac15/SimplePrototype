// import React, { useEffect, useState } from "react";
// import { Dimensions, StyleSheet, Text, View } from "react-native";
// import { Hole } from "@/components/DataBase/Classes";
// import NewPieChart from "./NewPieChart";


// const { width } = Dimensions.get('window');

// interface ShotData {
//   [key: string]: number;
// }



// interface C3HeaderProps {
//   courseName: string;
//   holeData: Hole;
//   roundToPar: number;
//   roundGoal: number;
//   getTotalShots: () => number;
//   shotData: ShotData;
//   allShotData: ShotData;
// }

// const C3Header3: React.FC<C3HeaderProps> = ({ courseName, holeData, roundToPar, roundGoal, getTotalShots, shotData, allShotData }) => {
//   const totalShots = getTotalShots();
//   const roundToGoal = (roundToPar / holeData.num) - (roundGoal / holeData.num);
//   console.log(shotData);
//   console.log(allShotData);
//   return (
//     <View style={{ flexDirection: 'row', width: width, justifyContent:'space-between' }}>
//       <View style={{}}>
//       <C3HoleData courseName={courseName} holeData={holeData} totalShots={totalShots} />
//       </View>
//       {/* <C2HScore roundToPar={roundToPar} roundToGoal={roundToGoal} /> */}
//       <View style={{}}>

//       <NewPieChart shotData={shotData} allShotData={allShotData}/>
//       </View>

//     </View>
//   );
// };

// export default C3Header3;

// interface C2HoleDataProps {
//   courseName: string;
//   holeData: Hole;
//   totalShots: number;
// }

// const C3HoleData: React.FC<C2HoleDataProps> = ({ courseName, holeData, totalShots }) => {
//   return (
//     <View style={{ backgroundColor: '#333', transform:'scaleX(1.3)', marginLeft:20}}>
//       <Text style={styles.CourseName}>{courseName}</Text>
//       <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems:'center',  }}>
//         <View style={{ width: width * 0.4 }}>
//           <View style={[styles.RowCenter, { justifyContent: 'center' , marginBottom:5}]}>
//             <Text style={styles.Hole}>Hole</Text>
//             <Text style={styles.HoleNum}>{holeData.num}</Text>
//           </View>
//           <View style={[styles.RowCenter, { justifyContent: 'space-evenly' }]}>
//             <View style={styles.RowCenter}>
//               <Text style={[styles.dist, { marginRight: 4 }]}>Par</Text>
//               <Text style={styles.distNum}>{holeData.par}</Text>
//             </View>
//           </View>
//             <View style={[styles.RowCenter,{justifyContent:'center'}]}>
//               <Text style={styles.distNum}>{holeData.yardage}</Text>
//               <Text style={styles.dist}>yrds</Text>
//             </View>
//         </View>
//         <View style={{ alignItems: 'center', justifyContent: 'space-evenly', marginBottom:10 }}>
//           <C2HScoreData totalShots={totalShots} holePar={holeData.par} />
//         </View>
//       </View>
//     </View>
//   );
// };

// interface C2HScoreProps {
//   roundToPar: number;
//   roundToGoal: number;
// }

// const C2HScore: React.FC<C2HScoreProps> = ({ roundToPar, roundToGoal }) => {
//   const [color, setColor] = useState('#999');
//   useEffect(() => {
//     if (roundToGoal > 0.5) {
//       setColor('salmon');
//     } else if (roundToGoal < -0.25) {
//       setColor('yellowgreen');
//     } else {
//       setColor('#999');
//     }
//   }, [roundToGoal]);

//   return (
//     <View style={{ justifyContent: 'center', alignItems: 'center', padding: 5,width:90, }}>
//       <Text style={{ color: color, fontSize: 45, textAlign:'right' }}>{roundToPar > 0 ? '+' : ''}{roundToPar}</Text>
//     </View>
//   );
// };

// interface C2HScoreDataProps {
//   totalShots: number;
//   holePar: number;
// }

// const C2HScoreData: React.FC<C2HScoreDataProps> = ({ totalShots, holePar }) => {
//     const length = Math.max(holePar, totalShots);
//     const combinedShotList = [...Array(length).fill('#444')];
  
//     for (let i = 0; i < totalShots; i++) {
//       combinedShotList[i] = 'whitesmoke';
//     }

//   const StringToPar = () => {
//     const toPar = totalShots - holePar;
//     switch (toPar) {
//       case -2:
//         return 'Eagle';
//       case -1:
//         return 'Birdie';
//       case 0:
//         return 'Par';
//       case 1:
//         return 'Bogey';
//       case 2:
//         return 'Double Bogey';
//       case 3:
//         return 'Triple Bogey';
//       case 4:
//       case 5:
//         return 'Monster Bogey';
//       default:
//         return `Shot ${totalShots}`;
//     }
//   };

//   return (
//     <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//       <View style={{ flexDirection: 'row', justifyContent: 'center', width: width * 0.3, marginTop: 10 }}>
//         {combinedShotList.map((shotColor, i) => (
//           <Shot key={i} shotNum={i + 1} color={shotColor} />
//         ))}
//       </View>
//       <View style={{ flexDirection: 'row', marginTop: 2 }}>
//         <Text style={{ color: 'whitesmoke', fontSize: 12, textAlign: 'center' }}>{StringToPar()}</Text>
//       </View>
//     </View>
//   );
// };

// interface ShotProps {
//   shotNum: number;
//   color: string;
// }

// const Shot: React.FC<ShotProps> = ({ shotNum, color }) => {
//   const transformStyle = shotNum > 5 ? { transform: [{ translateX: (shotNum - 6) * 2 }] } : {};
//   const positionStyle = shotNum > 5 ? { position: 'absolute' as 'absolute', right: 4 } : {};
//   return (
//     <View style={[styles.shot, { backgroundColor: color, borderColor: '#222', borderWidth: 0.5 }, transformStyle, positionStyle]}>
//       <Text style={{ textAlign: 'center', color: color==='#444' ? 'whitesmoke' : 'black' }}>{shotNum}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   RowCenter: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'baseline',
//   },
//   shot: {
//     padding: 1,
//     borderRadius: 500,
//     width: 20,
//     position: 'relative', //allows stacking
//   },
//   CourseName: {
//     fontSize: 25,
//     textAlign: 'center',
//     color: 'whitesmoke',
    
//   },
//   Hole: {
//     fontSize: 20,
//     marginRight: 4,
//     color: 'whitesmoke',
//   },
//   HoleNum: {
//     fontSize: 35,
//     color: 'whitesmoke',
//   },
//   dist: {
//     fontSize: 25,
//     color: 'whitesmoke',
//   },
//   distNum: {
//     fontSize: 30,

//     color: 'whitesmoke',
//   },
// });

import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Hole, ShotData } from "@/components/DataBase/Classes";
import NewPieChart from "./NewPieChart";
import useTheme from "@/constants/Theme";

const { width } = Dimensions.get('window');

// Define the structure of shot data


// Define the props for C3Header3 component
interface C3HeaderProps {
  courseName: string;
  holeData: Hole;
  shotColors: string[];
  getTotalShots: () => number;
  shotData: ShotData;
  allShotData: ShotData;
}

// C3Header3 component to display the header with hole and shot data
const C3Header3: React.FC<C3HeaderProps> = ({
  courseName,
  holeData,
  shotColors,
  getTotalShots,
  shotData,
  allShotData
}) => {
  const totalShots = getTotalShots();
  // const roundToGoal = (roundToPar / holeData.num) - (roundGoal / holeData.num);

  
  return (
    <View style={styles.headerContainer}>
      <View>
        <C3HoleData courseName={courseName} holeData={holeData} totalShots={totalShots} shotColors={shotColors} />
      </View>
      <View>
        <NewPieChart shotData={shotData} allShotData={allShotData} />
      </View>
    </View>
  );
};

export default C3Header3;

// Define the props for C3HoleData component
interface C2HoleDataProps {
  courseName: string;
  holeData: Hole;
  totalShots: number;
  shotColors: string[];
}

// C3HoleData component to display information about the hole
const C3HoleData: React.FC<C2HoleDataProps> = ({ courseName, holeData, totalShots, shotColors }) => {
  const theme = useTheme();
  return (
    <View style={styles.holeDataContainer}>
      <Text style={styles.courseName}>{courseName}</Text>
      <View style={styles.centerColumn}>
        <View style={styles.holeInfoContainer}>
          <View style={styles.rowCenter}>
            <Text style={[styles.dist,{color:theme.color}]}>Hole </Text>
            <Text style={[styles.distNum,{color:theme.color}]}>{holeData.num}</Text>
          </View>
          
            <View style={styles.rowCenter}>
              <Text style={[styles.dist,{color:theme.color}]}>Par </Text>
              <Text style={[styles.distNum,{color:theme.color}]}>{holeData.par}</Text>
            </View>
          
          <View style={styles.rowCenter}>
            <Text style={[styles.distNum,{color:theme.color}]}>{holeData.yardage}</Text>
            <Text style={[styles.dist,{color:theme.color}]}>yrds</Text>
          </View>
        </View>
        <View style={styles.scoreDataContainer}>
          <C2HScoreData totalShots={totalShots} holePar={holeData.par} shotColors={shotColors} />
        </View>
      </View>
    </View>
  );
};

// Define the props for C2HScoreData component
interface C2HScoreDataProps {
  totalShots: number;
  holePar: number;
  shotColors: string[];
}

// C2HScoreData component to display score and shot information
export const C2HScoreData: React.FC<C2HScoreDataProps> = ({ totalShots, holePar, shotColors }) => {
  const theme = useTheme();
  const length = Math.max(holePar, totalShots);
      const combinedShotList = [...Array(length).fill('#444')];
      for (let i = 0; i < totalShots; i++) {
        combinedShotList[i] = shotColors[i];
      }
  // Function to get the score string based on the shots to par
  const getScoreString = () => {
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
        return 'Monster Bogey';
      default:
        return `Shot ${totalShots}`;
    }
  };

  return (
    <View style={styles.scoreData}>
      <View style={styles.shotRow}>
        {combinedShotList.map((shotColor, i) => (
          <Shot key={i} shotNum={i + 1} color={shotColor} />
        ))}
      </View>
      <View style={styles.scoreStringRow}>
        <Text style={[styles.scoreString,{color:theme.color}]}>{getScoreString()}</Text>
      </View>
    </View>
  );
};

// Define the props for Shot component
interface ShotProps {
  shotNum: number;
  color: string;
}

// Shot component to display individual shots
const Shot: React.FC<ShotProps> = ({ shotNum, color }) => {
  const transformStyle = shotNum > 5 ? { transform: [{ translateX: (shotNum - 6) * 2 }] } : {};
  const positionStyle = shotNum > 5 ? { position: 'absolute' as 'absolute', right: 4 } : {};
  
  return (
    <View style={[styles.shot, { backgroundColor: color, shadowOffset: { width: .5, height: 1 },
      shadowOpacity: 0.25, 
      shadowRadius: 3, shadowColor: color }, transformStyle, positionStyle]}>
      <Text style={[styles.shotText, { color: color === '#444' ? 'whitesmoke' : 'black' }]}>{shotNum}</Text>
    </View>
  );
};

// Define styles for the components
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
  },
  holeDataContainer: {
    // backgroundColor: '#333',
    transform: 'scaleX(1.3)',
    marginLeft: 20,
  },
  courseName: {
    fontSize: 25,
    textAlign: 'center',
    color: 'whitesmoke',
  },
  centerColumn: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  holeInfoContainer: {
    width: width * 0.4,
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
    // backgroundColor: '#333',
    // shadowColor: '#333',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.7,
    // shadowRadius: 2,
    

  },
  rowSpaceEvenly: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  hole: {
    fontSize: 20,
    marginRight: 4,
    color: 'whitesmoke',
  },
  holeNum: {
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
  scoreDataContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  scoreData: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shotRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: width * 0.3,
    marginTop: 10,
  },
  shot: {
    padding: 1,
    borderRadius: 500,
    width: 20,
    position: 'relative', // Allows stacking
    borderColor: '#222',
    borderWidth: 0.5,
  },
  shotText: {
    textAlign: 'center',
  },
  scoreStringRow: {
    flexDirection: 'row',
    marginTop: 2,
  },
  scoreString: {
    color: 'whitesmoke',
    fontSize: 12,
    textAlign: 'center',
  },
});