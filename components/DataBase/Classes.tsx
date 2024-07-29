export interface CourseAndTees {
  id: number;
  name: string;
  teeboxes: Teebox[];
}

export interface CourseEverything{
  id:number;
  name:string;
  teeboxes: {[key:string]: {[key:number]:Round}}
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
      date: string = '',
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
  
  
    addRoundHole(hole: Hole, putts: number, great: number, good: number, bad: number, gir: boolean, strat: number, fir: boolean) {
      const roundHole = new HoleStats(hole, putts, great, good, bad, gir, strat, fir);
      const points = roundHole.calculatePoints();
      this.points += points;
      this.holes[roundHole.hole.num] = roundHole;
      // Update aggregated statistics based on the newly added RoundHole

      this.great += great
      this.good += good
      this.bad += bad
      


      this.totalPutts += roundHole.putts;
      this.totalStrokes += (roundHole.putts + roundHole.great + roundHole.good + roundHole.bad);
      this.toPar += roundHole.toPar;
      if (roundHole.hole.par === 3) {
        this.toPar3 += roundHole.toPar;
      } else if (roundHole.hole.par === 4) {
        this.toPar4 += roundHole.toPar;
      } else if (roundHole.hole.par === 5) {
        this.toPar5 += roundHole.toPar;
      }
      if (roundHole.gir) {
        this.totalGIR++;
      }
      if (roundHole.fir && roundHole.firEligible) {
        this.totalFIR++;
      }
  
      if (roundHole.toPar === 0) {
        this.pars++;
    } else if (roundHole.toPar > 0) {
        if (roundHole.toPar >= 2) {
          this.doublePlus++;
      } else {
          this.bogeys++;
      }
    } else if (roundHole.toPar < 0) {
        if (roundHole.toPar <= -2) {
          this.eaglesOless++;
      } else {
          this.birdies++;
      }
    }}
  
    subtractRoundHole(oldHoleData: HoleStats) {
      this.totalPutts -= oldHoleData.putts;
      this.totalStrokes -= (oldHoleData.putts + oldHoleData.great + oldHoleData.good + oldHoleData.bad);
      this.toPar -= oldHoleData.toPar;
  
      if (oldHoleData.hole.par === 3) {
        this.toPar3 -= oldHoleData.toPar;
      } else if (oldHoleData.hole.par === 4) {
        this.toPar4 -= oldHoleData.toPar;
      } else if (oldHoleData.hole.par === 5) {
        this.toPar5 -= oldHoleData.toPar;
      }
      if (oldHoleData.gir) {
        this.totalGIR--;
      }
      if (oldHoleData.fir && oldHoleData.firEligible) {
        this.totalFIR--;
      }
  
      if (oldHoleData.toPar === 0) {
        this.pars--;
    } else if (oldHoleData.toPar > 0) {
        if (oldHoleData.toPar >= 2) {
          this.doublePlus--;
      } else {
          this.bogeys--;
      }
    } else if (oldHoleData.toPar < 0) {
        if (oldHoleData.toPar <= -2) {
          this.eaglesOless--;
      } else {
          this.birdies--;
      }}}
  
    updateRoundHole(newHoleData: HoleStats) {
      this.holes[newHoleData.hole.num] = newHoleData;
  
      this.totalPutts += newHoleData.putts;
      this.totalStrokes += (newHoleData.putts + newHoleData.great + newHoleData.good + newHoleData.bad);
      this.toPar += newHoleData.toPar;
  
      if (newHoleData.hole.par === 3) {
        this.toPar3 += newHoleData.toPar;
      } else if (newHoleData.hole.par === 4) {
        this.toPar4 += newHoleData.toPar;
      } else if (newHoleData.hole.par === 5) {
        this.toPar5 += newHoleData.toPar;
      }
      if (newHoleData.gir) {
        this.totalGIR++;
      }
      if (newHoleData.firEligible && newHoleData.fir) {
        this.totalFIR++;
      }
  
      if (newHoleData.toPar === 0) {
        this.pars++;
      } else if (newHoleData.toPar > 0) {
          if (newHoleData.toPar >= 2) {
            this.doublePlus++;
        } else {
            this.bogeys++;
        }
      } else if (newHoleData.toPar < 0) {
          if (newHoleData.toPar <= -2) {
            this.eaglesOless++;
        } else {
            this.birdies++;
        }

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
      if (this.gir){
        total += .1
      } else {
        total -= .1
      }
      if (this.fir){
        total += .1
      } else {
        if ( this.firEligible){
          total -= .1
        }
      }

      if (this.putts <= 2){
        total += .1
      } else {
        total -= .25
      }


      return total
    }
  }
  





export interface Shot {
    totalPutts:number,
    great:number,
    good:number,
    bad:number
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

export interface ShotData {
  [key: string]: number;
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
  count:number,
  minScore:number,
  maxScore:number,
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
}

export interface TimelineStats {
  totalScore: number,
  totalPutts: number
}