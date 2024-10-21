import { Round } from "./Classes";

export const pointSystemHighHcp = {
    dbl: -0.01,
    bogey: -0.005,
    par: .02,
    birdie: .025,
    eagle: .03,
    gir: .001,
    noGir: -0.001,
    fir: .001,
    noFir: -0.001,
    great: 0.003,
    good: 0.002,
    bad: -0.0005
};
export const pointSystemLowHcp = {
    dbl: -0.005,
    bogey: -0.001,
    par: .001,
    birdie: .005,
    eagle: .01,
    gir: .001,
    noGir: -0.001,
    fir: .001,
    noFir: -0.001,
    great: 0.002,
    good: 0.001,
    bad: -0.001
};

export const gradeSystemLowHcp = (score:number, hcp:number, par:number) => {
    const scoreDiff = (score - hcp) - par;
    if (hcp <= 18) {
        if (scoreDiff <= -3)return 0.95;
        if (scoreDiff <= 0) return 0.85;
        if (scoreDiff <= 2) return 0.8;
        if (scoreDiff <= 4) return 0.75;
        if (scoreDiff <= 6) return 0.7;
        if (scoreDiff <= 8) return 0.65;
        if (scoreDiff <= 10)return 0.6;
        return 0.6;
    } else {
        if (scoreDiff <= -5) return 1;
        if (scoreDiff <= 3) return 0.95;
        if (scoreDiff <= 5) return 0.85;
        if (scoreDiff <= 7) return 0.8;
        if (scoreDiff <= 10) return 0.75;
        if (scoreDiff <= 15) return 0.7;
        if (scoreDiff <= 18) return 0.65;
        return 0.6;
    
    }
};

export const calculateScore = (round: Round, hcp:number): number => {
    // Calculate the scores
   
    let pointSystem = pointSystemHighHcp;
    if (hcp <= 18) pointSystem = pointSystemLowHcp;

    
    const grade = gradeSystemLowHcp(round.totalStrokes, hcp, (round.totalStrokes - round.toPar));
  
  
  // Adjust total score based on deviation
//   const adjustmentFactor = hcp > 18 ? 0.1 : 0.05;
//   totalScore -= deviation * adjustmentFactor;

  // Get the letter grade based on the adjusted score
    let totalScore = grade;

      
  
    // Score for quality of shots
    totalScore += round.great * pointSystem.great;
    totalScore += round.good * pointSystem.good;
    totalScore += round.bad * pointSystem.bad;
  
    // Score for Putts (assuming two-putts is neutral and three-putts are negative)
    const puttScore = (round.totalPutts <= 36) ? 0.05 : -0.05;
    totalScore += puttScore;
  
    // Score for GIR
    totalScore += round.totalGIR * pointSystem.gir;
    totalScore += (18 - round.totalGIR) * pointSystem.noGir;  // Subtract for holes without GIR
  
    // Score for FIR
    totalScore += round.totalFIR * pointSystem.fir;
    totalScore += (14 - round.totalFIR) * pointSystem.noFir;  // Assuming 14 driveable holes
  
    // Score for birdies, eagles, etc.
    totalScore += round.eaglesOless * pointSystem.eagle;
    totalScore += round.birdies * pointSystem.birdie;
    totalScore += round.pars * pointSystem.par;
    totalScore += round.bogeys * pointSystem.bogey;
    totalScore += round.doublePlus * pointSystem.dbl;
  
    return totalScore;
};

export const getLetterGrade = (totalScore: number): string => {
    if (totalScore >= .95) return "A+";
    if (totalScore >= 0.9) return "A";
    if (totalScore >= 0.85) return "B+";
    if (totalScore >= 0.8) return "B";
    if (totalScore >= 0.75) return "C+";
    if (totalScore >= 0.7) return "C";
    if (totalScore >= 0.6) return "D";
    return "F";
};

export const getRoundGrade = (round: Round, hcp:number): string => {
    const totalScore = calculateScore(round, hcp);
    return getLetterGrade(totalScore);
};