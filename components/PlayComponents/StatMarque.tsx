import { Marquee } from "@animatereactnative/marquee";
import { StyleSheet, Text, View } from "react-native";
import { Round, Hole, HoleStats } from "../DataBase/Classes";

const StatMarquee = ({round, holeNumber, girGoal, firGoal, puttGoal}:{round: Round, holeNumber:number, girGoal:number, firGoal:number, puttGoal:number}) => {
    const formatPercentage = (value: number) => (value * 100).toFixed(2);

    return (
      <View style={{ width: '100%', backgroundColor: '#222', paddingVertical: 10, }}>
        <Marquee speed={0.25}>
          {holeNumber < 2 ? (
            <View style={{ flexDirection: 'row' }}>
              <Text style={[{ color: 'white', marginHorizontal: 10, fontFamily: 'Arial' }, styles.textShadowMarquee]}>
                Have a great round!
              </Text>
              <Text style={[{ color: 'white', marginHorizontal: 10, fontFamily: 'Arial' }, styles.textShadowMarquee]}>
                #GitGooderGolf
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: 'row' }}>
              {/* GIR % */}
              <Text
                style={[
                  styles.marqueeText,
                  styles.textShadowMarquee,
                  (round.totalGIR / Object.keys(round.holes).length) * 100 >= Number(girGoal) / 18
                    ? styles.goodText
                    : styles.badText,
                ]}
              >
                GIR: {formatPercentage(round.totalGIR / Object.keys(round.holes).length)}%
              </Text>

              {/* FIR % */}
              <Text
                style={[
                  styles.marqueeText,
                  styles.textShadowMarquee,
                  (round.totalFIR / Object.keys(round.holes).length) * 100 >= Number(firGoal) / 18
                    ? styles.goodText
                    : styles.badText,
                ]}
              >
                FIR: {formatPercentage(round.totalFIR / Object.keys(round.holes).length)}%
              </Text>

              {/* PPH */}
              <Text
                style={[
                  styles.marqueeText,
                  styles.textShadowMarquee,
                  round.totalPutts / Object.keys(round.holes).length <= 40 / 18 ? styles.goodText : styles.badText,
                ]}
              >
                PPH: {(round.totalPutts / Object.keys(round.holes).length).toFixed(2)}
              </Text>

              {/* Birdies */}
              <Text style={[styles.marqueeText, styles.textShadowMarquee, styles.goodText]}>
                Birdies: {round.birdies}
              </Text>

              {/* Pars */}
              <Text style={[styles.marqueeText, styles.textShadowMarquee, styles.goodText]}>
                {`Pars: ${round.pars}`}
              </Text>

              {/* Bogeys */}
              <Text
                style={[
                  styles.marqueeText,
                  styles.textShadowMarquee,
                  ((round.bogeys + round.doublePlus) / Object.keys(round.holes).length) * 100 <= 15 / 18
                    ? styles.goodText
                    : styles.badText,
                ]}
              >
                Bogeys: {round.bogeys}
              </Text>
              <Text
                style={[
                  styles.marqueeText,
                  styles.textShadowMarquee,
                  ((round.doublePlus + round.bogeys) / Object.keys(round.holes).length) * 100 <= 15 / 18
                    ? styles.goodText
                    : styles.badText,
                ]}
              >
                DblBogey+: {round.doublePlus}
              </Text>
            </View>
          )}
        </Marquee>
      </View>
    );
  };

  const styles = StyleSheet.create({
    marqueeText: {
        fontFamily: 'Arial',
        marginHorizontal: 10
        ,
        fontStyle: 'italic',
        fontWeight: '500'
      },
      pureText: { color: 'skyblue' },
      pureBackground: { backgroundColor: 'skyblue' },
      goodText: { color: 'yellowgreen' },
      goodBackground: { backgroundColor: 'yellowgreen' },
      badText: { color: 'salmon' },
      badBackground: { backgroundColor: 'salmon' },
      puttText: { color: 'gold' },
      puttBackground: { backgroundColor: 'gold' },
      textShadowMarquee: {
        shadowColor: '#222',
        shadowOffset: { width: 3, height: 2 },
        shadowOpacity: .7,
        shadowRadius: 2,
      },
    

  })


  export default StatMarquee;