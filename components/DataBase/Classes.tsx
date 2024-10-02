import { getCourseHoleData, saveFullRound, saveHoleStats } from "./API";

export interface CourseAndTees {
  id: number;
  name: string;
  teeboxes: Teebox[];
}

export interface CourseEverything {
  id: number;
  name: string;
  teeboxes: { [key: string]: { [key: number]: Round } }
}   ///  Course<-allTeeboxs<-allHoles<-allHoleStats
///////  Course -> teebox -> round

export class Course {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class Teebox {
  id: number;
  course_id: number;
  color1: number;
  color2: number;

  constructor(id: number, course_id: number, color1: number, color2: number) {
    this.id = id;
    this.course_id = course_id;
    this.color1 = color1;
    this.color2 = color2;
  }
}

export class Hole {
  id: number;
  teebox_id: number;
  color: number;
  num: number;
  par: number;
  yardage: number;

  constructor(id: number, teebox_id: number, color: number, num: number, par: number, yardage: number) {
    this.id = id;
    this.teebox_id = teebox_id;
    this.color = color;
    this.num = num;
    this.par = par;
    this.yardage = yardage;
  }

  //   async populateHoleInsights(): Promise<HoleInsights> {
  //     await getCourseHoleData(this.teebox_id);
  //     return {
  //       pastScores: [],
  //       pastPPH: [],
  //       pastGIR: [],
  //       pastFIR: []

  //   }
  // }
}

export interface HoleInsights {
  scores: number[],
  pph: number[],
  gir: number[],
  fir: number[]
}

export class Round {
  id: number;
  teebox_id: number;
  date: string;
  totalStrokes: number;
  totalPutts: number;
  great: number;
  good: number;
  bad: number;
  totalGIR: number;
  totalFIR: number;
  eaglesOless: number;
  birdies: number;
  pars: number;
  bogeys: number;
  doublePlus: number;
  toPar: number;
  toPar3: number;
  toPar4: number;
  toPar5: number;
  eighteen: boolean;
  holes: { [num: number]: HoleStats } = {};
  points: number = 0;

  constructor(
    teebox_id: number,
    id: number = -1,
    date: string = new Date().toLocaleDateString(),
    totalStrokes: number = 0,
    totalPutts: number = 0,
    great: number = 0,
    good: number = 0,
    bad: number = 0,
    totalGIR: number = 0,
    totalFIR: number = 0,
    eaglesOless: number = 0,
    birdies: number = 0,
    pars: number = 0,
    bogeys: number = 0,
    doublePlus: number = 0,
    toPar: number = 0,
    toPar3: number = 0,
    toPar4: number = 0,
    toPar5: number = 0,
    eighteen: boolean = false
  ) {
    this.id = id;
    this.teebox_id = teebox_id;
    this.date = date;
    this.totalStrokes = totalStrokes;
    this.totalPutts = totalPutts;
    this.great = great;
    this.good = good;
    this.bad = bad;
    this.totalGIR = totalGIR;
    this.totalFIR = totalFIR;
    this.eaglesOless = eaglesOless;
    this.birdies = birdies;
    this.pars = pars;
    this.bogeys = bogeys;
    this.doublePlus = doublePlus;
    this.toPar = toPar;
    this.toPar3 = toPar3;
    this.toPar4 = toPar4;
    this.toPar5 = toPar5;
    this.eighteen = eighteen;
  }


  // addRoundHole(hole: Hole, putts: number, great: number, good: number, bad: number, gir: boolean, strat: number, fir: boolean): Round {
  //   const roundHole = new HoleStats(hole, putts, great, good, bad, gir, strat, fir);
  //   const points = roundHole.calculatePoints();

  //   // Create a new copy of the holes object and update it
  //   const updatedHoles = { ...this.holes, [roundHole.hole.num]: roundHole };

  //   return {
  //     ...this,
  //     holes: updatedHoles,
  //     points: this.points + points,
  //     great: this.great + great,
  //     good: this.good + good,
  //     bad: this.bad + bad,
  //     totalPutts: this.totalPutts + roundHole.putts,
  //     totalStrokes: this.totalStrokes + (roundHole.putts + roundHole.great + roundHole.good + roundHole.bad),
  //     toPar: this.toPar + roundHole.toPar,
  //     toPar3: hole.par === 3 ? this.toPar3 + roundHole.toPar : this.toPar3,
  //     toPar4: hole.par === 4 ? this.toPar4 + roundHole.toPar : this.toPar4,
  //     toPar5: hole.par === 5 ? this.toPar5 + roundHole.toPar : this.toPar5,
  //     totalGIR: roundHole.gir ? this.totalGIR + 1 : this.totalGIR,
  //     totalFIR: roundHole.fir && roundHole.firEligible ? this.totalFIR + 1 : this.totalFIR,
  //     pars: roundHole.toPar === 0 ? this.pars + 1 : this.pars,
  //     bogeys: roundHole.toPar === 1 ? this.bogeys + 1 : this.bogeys,
  //     doublePlus: roundHole.toPar >= 2 ? this.doublePlus + 1 : this.doublePlus,
  //     birdies: roundHole.toPar === -1 ? this.birdies + 1 : this.birdies,
  //     eaglesOless: roundHole.toPar <= -2 ? this.eaglesOless + 1 : this.eaglesOless,
  //   };
  // }

  addRoundHole(hole: Hole, putts: number, great: number, good: number, bad: number, gir: boolean, strat: number, fir: boolean): Round {
    const roundHole = new HoleStats(hole, putts, great, good, bad, gir, strat, fir);
    const points = roundHole.calculatePoints();

    // Create a new copy of the holes object and update it
    const updatedHoles = { ...this.holes, [roundHole.hole.num]: roundHole };

    // Create a new instance of Round
    const updatedRound = new Round(this.teebox_id);
    
    // Copy all current properties to the new instance
    Object.assign(updatedRound, this);

    // Update the necessary properties for the new round instance
    updatedRound.holes = updatedHoles;
    updatedRound.points = this.points + points;
    updatedRound.great = this.great + great;
    updatedRound.good = this.good + good;
    updatedRound.bad = this.bad + bad;
    updatedRound.totalPutts = this.totalPutts + roundHole.putts;
    updatedRound.totalStrokes = this.totalStrokes + (roundHole.putts + roundHole.great + roundHole.good + roundHole.bad);
    updatedRound.toPar = this.toPar + roundHole.toPar;
    updatedRound.toPar3 = hole.par === 3 ? this.toPar3 + roundHole.toPar : this.toPar3;
    updatedRound.toPar4 = hole.par === 4 ? this.toPar4 + roundHole.toPar : this.toPar4;
    updatedRound.toPar5 = hole.par === 5 ? this.toPar5 + roundHole.toPar : this.toPar5;
    updatedRound.totalGIR = roundHole.gir ? this.totalGIR + 1 : this.totalGIR;
    updatedRound.totalFIR = roundHole.fir && roundHole.firEligible ? this.totalFIR + 1 : this.totalFIR;
    updatedRound.pars = roundHole.toPar === 0 ? this.pars + 1 : this.pars;
    updatedRound.bogeys = roundHole.toPar === 1 ? this.bogeys + 1 : this.bogeys;
    updatedRound.doublePlus = roundHole.toPar >= 2 ? this.doublePlus + 1 : this.doublePlus;
    updatedRound.birdies = roundHole.toPar === -1 ? this.birdies + 1 : this.birdies;
    updatedRound.eaglesOless = roundHole.toPar <= -2 ? this.eaglesOless + 1 : this.eaglesOless;
    
    return updatedRound;
  }
  subtractRoundHole(oldHoleData: HoleStats): this {
    // Create a new copy of the holes object without the old hole
    const updatedHoles = { ...this.holes };
    delete updatedHoles[oldHoleData.hole.num];  // Remove the old hole
  
    // Calculate points to subtract
    const points = oldHoleData.calculatePoints();
  
    // Return a new instance of Round with updated properties
    const updatedRound = new Round(this.teebox_id); // Assuming you have a constructor that uses `teebox_id`
  
    return Object.assign(updatedRound, {
      ...this,
      holes: updatedHoles,
      points: this.points - points,
      totalPutts: this.totalPutts - oldHoleData.putts,
      totalStrokes: this.totalStrokes - (oldHoleData.putts + oldHoleData.great + oldHoleData.good + oldHoleData.bad),
      toPar: this.toPar - oldHoleData.toPar,
      toPar3: oldHoleData.hole.par === 3 ? this.toPar3 - oldHoleData.toPar : this.toPar3,
      toPar4: oldHoleData.hole.par === 4 ? this.toPar4 - oldHoleData.toPar : this.toPar4,
      toPar5: oldHoleData.hole.par === 5 ? this.toPar5 - oldHoleData.toPar : this.toPar5,
      totalGIR: oldHoleData.gir ? this.totalGIR - 1 : this.totalGIR,
      totalFIR: oldHoleData.fir && oldHoleData.firEligible ? this.totalFIR - 1 : this.totalFIR,
      pars: oldHoleData.toPar === 0 ? this.pars - 1 : this.pars,
      bogeys: oldHoleData.toPar === 1 ? this.bogeys - 1 : this.bogeys,
      doublePlus: oldHoleData.toPar >= 2 ? this.doublePlus - 1 : this.doublePlus,
      birdies: oldHoleData.toPar === -1 ? this.birdies - 1 : this.birdies,
      eaglesOless: oldHoleData.toPar <= -2 ? this.eaglesOless - 1 : this.eaglesOless,
    });
  }

  updateRoundHole(newHoleData: HoleStats): Round {
    const oldHoleData = this.holes[newHoleData.hole.num];
  
    let updatedRound = this;  // Start with the current round object
  
    if (oldHoleData) {
      // Subtract old data and return a new round object
      updatedRound = updatedRound.subtractRoundHole(oldHoleData);
    }
  
    // Add the new hole data to the updated round
    return updatedRound.addRoundHole(
      newHoleData.hole,
      newHoleData.putts,
      newHoleData.great,
      newHoleData.good,
      newHoleData.bad,
      newHoleData.gir,
      newHoleData.strat,
      newHoleData.fir
    );
  }










  addJustPlayRoundHole(holeNum: number, hole: Hole, putts: number, great: number, good: number, bad: number, gir: boolean, strat: number, fir: boolean): Round {
    const roundHole = new HoleStats(hole, putts, great, good, bad, gir, strat, fir);
    const points = roundHole.calculatePoints();
    
    // Create a new copy of the holes object and update it
    const updatedHoles = { ...this.holes, [holeNum]: roundHole };
    
    // Create a new instance of Round
    const updatedRound = new Round(this.teebox_id);
    
    // Copy all current properties to the new instance
    Object.assign(updatedRound, this);
    
    // Update the necessary properties for the new round instance
    updatedRound.holes = updatedHoles;
    updatedRound.points = this.points + points;
    updatedRound.great = this.great + great;
    updatedRound.good = this.good + good;
    updatedRound.bad = this.bad + bad;
    updatedRound.totalPutts = this.totalPutts + roundHole.putts;
    updatedRound.totalStrokes = this.totalStrokes + (roundHole.putts + roundHole.great + roundHole.good + roundHole.bad);
    updatedRound.toPar = this.toPar + roundHole.toPar;
    updatedRound.toPar3 = hole.par === 3 ? this.toPar3 + roundHole.toPar : this.toPar3;
    updatedRound.toPar4 = hole.par === 4 ? this.toPar4 + roundHole.toPar : this.toPar4;
    updatedRound.toPar5 = hole.par === 5 ? this.toPar5 + roundHole.toPar : this.toPar5;
    updatedRound.totalGIR = roundHole.gir ? this.totalGIR + 1 : this.totalGIR;
    updatedRound.totalFIR = roundHole.fir && roundHole.firEligible ? this.totalFIR + 1 : this.totalFIR;
    updatedRound.pars = roundHole.toPar === 0 ? this.pars + 1 : this.pars;
    updatedRound.bogeys = roundHole.toPar === 1 ? this.bogeys + 1 : this.bogeys;
    updatedRound.doublePlus = roundHole.toPar >= 2 ? this.doublePlus + 1 : this.doublePlus;
    updatedRound.birdies = roundHole.toPar === -1 ? this.birdies + 1 : this.birdies;
    updatedRound.eaglesOless = roundHole.toPar <= -2 ? this.eaglesOless + 1 : this.eaglesOless;
    
    return updatedRound;
  }
  subtractJustPlayRoundHole(oldHoleData: HoleStats, holeNum:number): this {
    // Create a new copy of the holes object without the old hole
    const updatedHoles = { ...this.holes };
    delete updatedHoles[holeNum];  // Remove the old hole
  
    // Calculate points to subtract
    const points = oldHoleData.calculatePoints();
  
    // Return a new instance of Round with updated properties
    const updatedRound = new Round(this.teebox_id); // Assuming you have a constructor that uses `teebox_id`
  
    return Object.assign(updatedRound, {
      ...this,
      holes: updatedHoles,
      points: this.points - points,
      totalPutts: this.totalPutts - oldHoleData.putts,
      totalStrokes: this.totalStrokes - (oldHoleData.putts + oldHoleData.great + oldHoleData.good + oldHoleData.bad),
      toPar: this.toPar - oldHoleData.toPar,
      toPar3: oldHoleData.hole.par === 3 ? this.toPar3 - oldHoleData.toPar : this.toPar3,
      toPar4: oldHoleData.hole.par === 4 ? this.toPar4 - oldHoleData.toPar : this.toPar4,
      toPar5: oldHoleData.hole.par === 5 ? this.toPar5 - oldHoleData.toPar : this.toPar5,
      totalGIR: oldHoleData.gir ? this.totalGIR - 1 : this.totalGIR,
      totalFIR: oldHoleData.fir && oldHoleData.firEligible ? this.totalFIR - 1 : this.totalFIR,
      pars: oldHoleData.toPar === 0 ? this.pars - 1 : this.pars,
      bogeys: oldHoleData.toPar === 1 ? this.bogeys - 1 : this.bogeys,
      doublePlus: oldHoleData.toPar >= 2 ? this.doublePlus - 1 : this.doublePlus,
      birdies: oldHoleData.toPar === -1 ? this.birdies - 1 : this.birdies,
      eaglesOless: oldHoleData.toPar <= -2 ? this.eaglesOless - 1 : this.eaglesOless,
    });
  }

  updateJustPlayRoundHole(newHoleData: HoleStats, holeNum:number): Round {
    const oldHoleData = this.holes[holeNum];
  
    let updatedRound = this;  // Start with the current round object
  
    if (oldHoleData) {
      // Subtract old data and return a new round object
      updatedRound = updatedRound.subtractJustPlayRoundHole(oldHoleData, holeNum);
    }
  
    // Add the new hole data to the updated round
    return updatedRound.addJustPlayRoundHole(
      holeNum,
      newHoleData.hole,
      newHoleData.putts,
      newHoleData.great,
      newHoleData.good,
      newHoleData.bad,
      newHoleData.gir,
      newHoleData.strat,
      newHoleData.fir
    );
  }
  
  
  
  
  
  // addRoundHole(hole: Hole, putts: number, great: number, good: number, bad: number, gir: boolean, strat: number, fir: boolean): void {
  //   const roundHole = new HoleStats(hole, putts, great, good, bad, gir, strat, fir);
  //   const points = roundHole.calculatePoints();
  //   this.points += points;
  //   this.holes[roundHole.hole.num] = roundHole;
  //   // Update aggregated statistics based on the newly added RoundHole

  //   this.great += great
  //   this.good += good
  //   this.bad += bad



  //   this.totalPutts += roundHole.putts;
  //   this.totalStrokes += (roundHole.putts + roundHole.great + roundHole.good + roundHole.bad);
  //   this.toPar += roundHole.toPar;
  //   if (roundHole.hole.par === 3) {
  //     this.toPar3 += roundHole.toPar;
  //   } else if (roundHole.hole.par === 4) {
  //     this.toPar4 += roundHole.toPar;
  //   } else if (roundHole.hole.par === 5) {
  //     this.toPar5 += roundHole.toPar;
  //   }
  //   if (roundHole.gir) {
  //     this.totalGIR++;
  //   }
  //   if (roundHole.fir && roundHole.firEligible) {
  //     this.totalFIR++;
  //   }

  //   if (roundHole.toPar === 0) {
  //     this.pars++;
  // } else if (roundHole.toPar > 0) {
  //     if (roundHole.toPar >= 2) {
  //       this.doublePlus++;
  //   } else {
  //       this.bogeys++;
  //   }
  // } else if (roundHole.toPar < 0) {
  //     if (roundHole.toPar <= -2) {
  //       this.eaglesOless++;
  //   } else {
  //       this.birdies++;
  //   }
  // }}

  // subtractRoundHole(oldHoleData: HoleStats): void {

  //   this.points -= oldHoleData.calculatePoints();

  //   this.totalPutts -= oldHoleData.putts;
  //   this.totalStrokes -= (oldHoleData.putts + oldHoleData.great + oldHoleData.good + oldHoleData.bad);
  //   this.toPar -= oldHoleData.toPar;

  //   if (oldHoleData.hole.par === 3) {
  //     this.toPar3 -= oldHoleData.toPar;
  //   } else if (oldHoleData.hole.par === 4) {
  //     this.toPar4 -= oldHoleData.toPar;
  //   } else if (oldHoleData.hole.par === 5) {
  //     this.toPar5 -= oldHoleData.toPar;
  //   }
  //   if (oldHoleData.gir) {
  //     this.totalGIR--;
  //   }
  //   if (oldHoleData.fir && oldHoleData.firEligible) {
  //     this.totalFIR--;
  //   }

  //   if (oldHoleData.toPar === 0) {
  //     this.pars--;
  // } else if (oldHoleData.toPar > 0) {
  //     if (oldHoleData.toPar >= 2) {
  //       this.doublePlus--;
  //   } else {
  //       this.bogeys--;
  //   }
  // } else if (oldHoleData.toPar < 0) {
  //     if (oldHoleData.toPar <= -2) {
  //       this.eaglesOless--;
  //   } else {
  //       this.birdies--;
  //   }}}

  // updateRoundHole(newHoleData: HoleStats): void {
  //   this.holes[newHoleData.hole.num] = newHoleData;

  //   this.totalPutts += newHoleData.putts;
  //   this.totalStrokes += (newHoleData.putts + newHoleData.great + newHoleData.good + newHoleData.bad);
  //   this.toPar += newHoleData.toPar;

  //   if (newHoleData.hole.par === 3) {
  //     this.toPar3 += newHoleData.toPar;
  //   } else if (newHoleData.hole.par === 4) {
  //     this.toPar4 += newHoleData.toPar;
  //   } else if (newHoleData.hole.par === 5) {
  //     this.toPar5 += newHoleData.toPar;
  //   }
  //   if (newHoleData.gir) {
  //     this.totalGIR++;
  //   }
  //   if (newHoleData.firEligible && newHoleData.fir) {
  //     this.totalFIR++;
  //   }

  //   if (newHoleData.toPar === 0) {
  //     this.pars++;
  //   } else if (newHoleData.toPar > 0) {
  //       if (newHoleData.toPar >= 2) {
  //         this.doublePlus++;
  //     } else {
  //         this.bogeys++;
  //     }
  //   } else if (newHoleData.toPar < 0) {
  //       if (newHoleData.toPar <= -2) {
  //         this.eaglesOless++;
  //     } else {
  //         this.birdies++;
  //     }

  //   }
  // }



  async saveRoundAndHoleStats(this: Round): Promise<void> {

    try {
      const roundId: number = await saveFullRound(
        this.teebox_id,
        this.totalStrokes,
        this.totalPutts,
        this.great,
        this.good,
        this.bad,
        this.totalGIR,
        this.totalFIR,
        this.eaglesOless,
        this.birdies,
        this.pars,
        this.bogeys,
        this.doublePlus,
        this.toPar,
        this.toPar3,
        this.toPar4,
        this.toPar5,
        true,
      );

      for (const key in this.holes) {
        const holeStat = this.holes[key];
        await saveHoleStats(
          holeStat.hole.id,
          roundId,
          holeStat.putts,
          holeStat.gir,
          holeStat.fir,
          holeStat.hole.par === 3 ? true : false, /// FIR_ELI
          holeStat.toPar,
          holeStat.strat ? holeStat.strat : 0 /// if no strat chosen
        );
      }
    } catch (error) {
      console.error('Error saving round and hole stats:', error);
    }
  }
  async saveRoundAndHoleStatsEarlyQuit(this: Round): Promise<void> {

    try {
      const roundId: number = await saveFullRound(
        this.teebox_id,
        this.totalStrokes,
        this.totalPutts,
        this.great,
        this.good,
        this.bad,
        this.totalGIR,
        this.totalFIR,
        this.eaglesOless,
        this.birdies,
        this.pars,
        this.bogeys,
        this.doublePlus,
        this.toPar,
        this.toPar3,
        this.toPar4,
        this.toPar5,
        false,
      );

      for (const key in this.holes) {
        const holeStat = this.holes[key];
        await saveHoleStats(
          holeStat.hole.id,
          roundId,
          holeStat.putts,
          holeStat.gir,
          holeStat.fir,
          holeStat.hole.par === 3 ? true : false, /// FIR_ELI
          holeStat.toPar,
          holeStat.strat ? holeStat.strat : 0 /// if no strat chosen
        );
      }
    } catch (error) {
      console.error('Error saving round and hole stats:', error);
    }
  }
}




export class HoleStats {
  hole: Hole;
  putts: number;
  great: number;
  good: number;
  bad: number;
  gir: boolean;
  fir: boolean;
  firEligible: boolean;
  strat: number;
  toPar: number;

  constructor(hole: Hole, putts: number, great: number, good: number, bad: number, gir: boolean, strat: number, fir: boolean) {
    this.hole = hole;
    this.putts = putts;
    this.great = great;
    this.good = good;
    this.bad = bad;
    this.gir = gir;
    this.fir = fir;
    if (this.hole.par === 3) {
      this.firEligible = false;
    } else {
      this.firEligible = true;
    }
    this.strat = strat;
    this.toPar = this.calculateToPar();
  }

  calculateToPar(): number {
    return (this.great + this.good + this.bad + this.putts) - this.hole.par;
  }

  calculatePoints(): number {
    let total = 0;
    switch (this.toPar) {
      case -3:
        total += 1.5
        break;
      case -2:
        total += 1.25
        break;
      case -1:
        total += 1
        break;
      case 0:
        total += .5
        break;
      case 1:
        total -= .25
        break;
      default:
        total -= 1
        break;
    }
    if (this.gir) {
      total += .1
    } else {
      total -= .1
    }
    if (this.fir) {
      total += .1
    } else {
      if (this.firEligible) {
        total -= .1
      }
    }

    if (this.putts <= 2) {
      total += .1
    } else {
      total -= .25
    }


    return total
  }
}






export interface Shot {
  totalPutts: number,
  great: number,
  good: number,
  bad: number
}
export interface toPars {
  totalStrokes: number,
  eaglesOless: number,
  birdies: number,
  pars: number,
  bogies: number,
  doublePlus: number,
  toPar3: number,
  toPar4: number,
  toPar5: number,
}
// Why you idiot?
export interface ShotData {
  great: number,
  good: number,
  bad: number,
  putt: number
}

export interface QuickStats {
  totalPutts: number,
  totalGIR: number,
  totalFIR: number,
  totalScore: number,
  avgScore: number,
  count: number,
  eaglesOrLess: number,
  birdies: number,
  pars: number,
  bogeys: number,
  doublePlus: number
}

export interface MostRecentRound {
  courseName: string,
  color: string,
  date: string,
  totalStrokes: number,
  totalPutts: number,
  totalGIR: number,
  totalFIR: number,
  toPar3: number,
  toPar4: number,
  toPar5: number,
  great: number,
  good: number,
  bad: number
}

export interface AllStats {
  count: number,
  minScore: number,
  maxScore: number,
  avgStrokes: number,
  eaglesOless: number,
  birdies: number,
  pars: number,
  bogies: number,
  doublePlus: number,
  toPar3: number,
  toPar4: number,
  toPar5: number,
  great: number,
  good: number,
  bad: number,
  totalPutts: number,
  avgGIR: number,
  avgFIR: number,
  firEligible: number
}

export interface TimelineStats {
  totalScore: number,
  totalPutts: number
}

export interface CourseHoleData {
  holePars: number[],
  avgScores: number[],
  totalScores: number[],
  pph: number[],
  gir: number[],
  fir: number[],
  count: number,
  firCount: number,
}

export type ClubName =
  | 'Driver'
  | '3w'
  | '5w'
  | '7w'
  | '3hyb'
  | '4hyb'
  | '5hyb'
  | '7hyb'
  | '1i'
  | '2i'
  | '3i'
  | '4i'
  | '5i'
  | '6i'
  | '7i'
  | '8i'
  | '9i'
  | 'Pw'
  | 'Gw'
  | 'Sw'
  | 'Lw';

export const clubNames: ClubName[] = [
  'Driver', '3w', '5w', '7w', '3hyb', '4hyb', '5hyb', '7hyb', '1i', '2i', '3i', '4i', '5i', '6i', '7i', '8i', '9i', 'Pw', 'Gw', 'Sw', 'Lw'
];

export interface HoleStatsExtra {
  id: number,
  hole_id: number,
  round_id: number,
  putts: number,
  great: number,
  good: number,
  bad: number,
  GIR: number,
  FIR: number,
  toPar: number,
  strat: number
}