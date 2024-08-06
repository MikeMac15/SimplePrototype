import * as SQLite from 'expo-sqlite';
import { Course, Teebox, Hole, Round, HoleStats, MostRecentRound, TimelineStats, AllStats, CourseHoleData } from './Classes';


export const openDb = async() => {
    const db = await SQLite.openDatabaseAsync('golfGooderSimple.db');
    return db;
};

export const deleteDb = async() => {
    try {
        const db = await openDb()
        await db.closeAsync()
        await SQLite.deleteDatabaseAsync('golfGooderSimple.db');
        console.log('deleted db')
    } catch (error) {
        console.error('cant delete db');
        console.error(error)
    }
};



// old tables {
//     await db.execAsync(`
//     PRAGMA journal_mode = WAL;
//     PRAGMA foreign_keys = ON;
//     CREATE TABLE IF NOT EXISTS course (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT UNIQUE CHECK(LENGTH(name) <= 20) NOT NULL
//     );
//     CREATE TABLE IF NOT EXISTS teebox (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         course_id INTEGER NOT NULL,
//         color TEXT CHECK(LENGTH(color) <= 10) NOT NULL,
//         par INTEGER DEFAULT 0,
//         yardage INTEGER DEFAULT 0,
//         FOREIGN KEY (course_id) REFERENCES course(id)
//     );
//     CREATE TABLE IF NOT EXISTS hole (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         teebox_id INTEGER NOT NULL,
//         num INTEGER NOT NULL,
//         par INTEGER NOT NULL,
//         yardage INTEGER NOT NULL,
//         FOREIGN KEY (teebox_id) REFERENCES teebox(id)
//     );
//     CREATE TABLE IF NOT EXISTS round (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         teebox_id INTEGER,
//         date DATE DEFAULT (date('now')),
//         totalFIR INTEGER NOT NULL,
//         totalGIR INTEGER NOT NULL,
//         totalPutts INTEGER NOT NULL,
//         great INTEGER NOT NULL, 
//         good INTEGER NOT NULL,
//         bad INTEGER NOT NULL,
//         totalStrokes INTEGER NOT NULL,
//         totalPars INTEGER NOT NULL,
//         totalBirdiesOrBetter INTEGER NOT NULL,
//         totalBogiesOrWorse INTEGER NOT NULL,
//         toPar INTEGER NOT NULL,
//         toPar3 INTEGER NOT NULL,
//         toPar4 INTEGER NOT NULL,
//         toPar5 INTEGER NOT NULL,
//         FOREIGN KEY (teebox_id) REFERENCES teebox(id)
//     );
//     CREATE TABLE IF NOT EXISTS holestats (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         hole_id INTEGER NOT NULL,
//         round_id INTEGER NOT NULL,
//         putts INTEGER NOT NULL,
//         GIR BOOLEAN NOT NULL,
//         FIR BOOLEAN NOT NULL,
//         FIR_ELIGIBLE BOOLEAN NOT NULL, 
//         toPar INTEGER NOT NULL,
//         strat INTEGER NOT NULL,
//         FOREIGN KEY (hole_id) REFERENCES hole(id),
//         FOREIGN KEY (round_id) REFERENCES round(id)
//     );`)

export const tableSetUp = async(db:SQLite.SQLiteDatabase) => {
    try {
        await db.execAsync(`
        PRAGMA journal_mode = WAL;
        PRAGMA foreign_keys = ON;
        CREATE TABLE IF NOT EXISTS course (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE CHECK(LENGTH(name) <= 20) NOT NULL
        );
        CREATE TABLE IF NOT EXISTS teebox (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            course_id INTEGER NOT NULL,
            color1 INTEGER NOT NULL,
            color2 INTEGER NOT NULL,
            FOREIGN KEY (course_id) REFERENCES course(id)
        );
        CREATE TABLE IF NOT EXISTS hole (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            teebox_id INTEGER NOT NULL,
            color INTEGER NOT NULL,
            num INTEGER NOT NULL,
            par INTEGER NOT NULL,
            yardage INTEGER NOT NULL,
            FOREIGN KEY (teebox_id) REFERENCES teebox(id)
        );
        CREATE TABLE IF NOT EXISTS round (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            teebox_id INTEGER,
            date DATE DEFAULT (date('now')),
            totalStrokes INTEGER NOT NULL,
            totalPutts INTEGER NOT NULL,
            great INTEGER NOT NULL, 
            good INTEGER NOT NULL,
            bad INTEGER NOT NULL,
            totalGIR INTEGER NOT NULL,
            totalFIR INTEGER NOT NULL,
            eaglesOless INTEGER NOT NULL,
            birdies INTEGER NOT NULL,
            pars INTEGER NOT NULL,
            bogies INTEGER NOT NULL,
            doublePlus INTEGER NOT NULL,
            toPar INTEGER NOT NULL,
            toPar3 INTEGER NOT NULL,
            toPar4 INTEGER NOT NULL,
            toPar5 INTEGER NOT NULL,
            eighteen BOOLEAN NOT NULL,
            FOREIGN KEY (teebox_id) REFERENCES teebox(id)
        );
        CREATE TABLE IF NOT EXISTS holestats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hole_id INTEGER NOT NULL,
            round_id INTEGER NOT NULL,
            putts INTEGER NOT NULL,
            GIR BOOLEAN NOT NULL,
            FIR BOOLEAN NOT NULL,
            FIR_ELIGIBLE BOOLEAN NOT NULL, 
            toPar INTEGER NOT NULL,
            strat INTEGER NOT NULL,
            FOREIGN KEY (hole_id) REFERENCES hole(id),
            FOREIGN KEY (round_id) REFERENCES round(id)
        );`)
        
    }  catch (error) {
        console.error("Error setting up tables:", error);
    }
    }
    
    export const getAllCourses = async (): Promise<Course[]> => {
        // Fetch courses data from the database and format it as Course[]
        const db = await openDb();
        const coursesData: Course[] = await db.getAllAsync('SELECT * FROM course;');
        
        return coursesData;
        
    };

    export const getSingleCourse = async (course_id: number): Promise<Course> => {
        try {
            const db = await openDb();
            const result: Course | null = await db.getFirstAsync('SELECT * FROM course WHERE id = $courseID', { $courseID: course_id });
    
            // Check if a course was found
            if (!result) {
                throw new Error(`Course with ID ${course_id} not found`);
            }
    
            // Create the course object
            const course: Course = {
                id: result.id,
                name: result.name
            };
    
            return course;
        } catch (error) {
            console.error('Error fetching course:', error);
            throw error;
        }
    };
    

    export const createCourse = async (courseName: string): Promise<SQLite.SQLiteRunResult["lastInsertRowId"] | undefined> => {
        try {
            const db = await openDb();
            const newCourse = await db.runAsync('INSERT INTO course (name) VALUES (?)', courseName);
            return newCourse.lastInsertRowId
            
        } catch (error) {
            console.error('Error creating course:', error);
            // throw error; // Rethrow the error to propagate it further if needed
        }
    };


    export const getAllCourseTeeboxes = async (course_id: number): Promise<Teebox[]> => {
        const db = await openDb();
        return await db.getAllAsync('SELECT * FROM teebox WHERE course_id = $courseID',{$courseID : course_id});
    };

    export const createTeebox = async (courseID: number, color1: number, color2: number): Promise<SQLite.SQLiteRunResult["lastInsertRowId"] | undefined> => {
        try {
            const db = await openDb();
            const newTee = await db.runAsync('INSERT INTO teebox (course_id, color1, color2) VALUES (?,?,?)', courseID, color1, color2)
            console.log('created tee')
            return newTee.lastInsertRowId
        } catch (error){
            console.error('couldnt insert new tee')
            console.error(error)
        }
    }
    
    export const getAllTeeboxHoles = async (teebox_id: number): Promise<Hole[] | undefined> => {
        try {
        const db = await openDb();
        const holes: Hole[] = await db.getAllAsync('SELECT * FROM hole WHERE teebox_id = $teeboxID',{$teeboxID : teebox_id});
        
        return holes
        }
        catch(error){
            console.error(error)
        }
    };

    export const createTeeHoles = async (teeID: number, color:number, num: number, par: number, yardage: number ): Promise<number>  => {
        try {
            const db = await openDb();
            const result = await db.runAsync('INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (?,?,?,?,?)', teeID, color, num, par, yardage )
            
            console.log('created hole');
            console.log('Last inserted row ID:', result.lastInsertRowId); // Accessing the lastInsertRowId property
            
            return result.lastInsertRowId; // Returning the last inserted row ID
        } catch (error){
            console.error('couldnt insert new hole');
            console.error(error);
            return -1; // 
        }
    }
    
    //Rounds and HoleStats

    export const saveFullRound = async (
        teebox_id: number,
        totalStrokes: number,
        totalPutts: number,
        great: number,
        good: number,
        bad: number,
        totalGIR: number,
        totalFIR: number,
        eaglesOless: number,
        birdies: number,
        pars: number,
        bogeys: number,
        doublePlus: number,
        toPar: number,
        toPar3: number,
        toPar4: number,
        toPar5: number,
        eighteen: boolean,
    ): Promise<number> => {
        try {
            const db = await openDb();
            const result = await db.runAsync(
                'INSERT INTO round (teebox_id, totalStrokes, totalPutts, great, good, bad, totalGIR, totalFIR, eaglesOless, birdies, pars, bogies, doublePlus, toPar, toPar3, toPar4, toPar5, eighteen) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                teebox_id, totalStrokes, totalPutts, great, good, bad, totalGIR, totalFIR, eaglesOless, birdies, pars, bogeys, doublePlus, toPar, toPar3, toPar4, toPar5, eighteen
            );
            console.log('Saved Round');
            console.log('Last inserted row ID:', result.lastInsertRowId);
            return result.lastInsertRowId; // Return the round ID
        } catch (error) {
            console.error('Couldn\'t save round');
            console.error(error);
            throw error;
        }
    };

      export const getAllRounds = async (): Promise<Round[]> => {
        const db = await openDb();
        return await db.getAllAsync(
        `SELECT round.*, teebox.*, course.*
            FROM round
            JOIN teebox ON teebox.id = round.teebox_id
            JOIN course ON course.id = teebox.course_id
            ORDER BY round.date DESC;`);
    };
    
    /// get recent round or best round
    export const getRecentRounds = async (): Promise<MostRecentRound> => {
        const db = await openDb();
        const recentRound: MostRecentRound | null = await db.getFirstAsync(
          `SELECT round.date, round.totalStrokes, round.totalPutts, round.totalGIR, round.totalFIR, round.toPar3, round.toPar4, round.toPar5, 
                  round.great, round.good, round.bad, course.name as courseName, teebox.color1 as color
           FROM round
           JOIN teebox ON teebox.id = round.teebox_id
           JOIN course ON course.id = teebox.course_id
           ORDER BY round.date DESC
           LIMIT 1;`
        );
      
        if (!recentRound) {
          throw new Error('No recent round found');
        }
        
        const round: MostRecentRound = {
          courseName: recentRound.courseName,
          color: recentRound.color,
          date: recentRound.date,
          totalStrokes: recentRound.totalStrokes,
          totalPutts: recentRound.totalPutts,
          totalGIR: recentRound.totalGIR,
          totalFIR: recentRound.totalFIR,
          toPar3: recentRound.toPar3,
          toPar4: recentRound.toPar4,
          toPar5: recentRound.toPar5,
          great: recentRound.great,
          good: recentRound.good,
          bad: recentRound.bad,
        };
      
        return round;
      };
    
      export const saveHoleStats = async (
        hole_id: number,
        round_id: number,
        putts: number,
        GIR: boolean,
        FIR: boolean,
        FIR_ELIGIBLE: boolean,
        toPar: number,
        strat: number,
      ) => {
        try {
          const db = await openDb();
          const result = await db.runAsync(
            'INSERT INTO holestats (hole_id, round_id, putts, GIR, FIR, FIR_ELIGIBLE, toPar, strat) VALUES (?,?,?,?,?,?,?,?)',
            hole_id, round_id, putts, GIR, FIR, FIR_ELIGIBLE, toPar, strat
          );
          console.log('Saved hole');
          console.log('Saved hole Last inserted row ID:', result.lastInsertRowId);
        } catch (error) {
          console.error('Couldn\'t save hole');
          console.error(error);
          throw error;
        }
      };

      export const getAllRoundHoles = async (round_id: number): Promise<HoleStats[] | undefined> => {
        try {
        const db = await openDb();
        const holes: HoleStats[] = await db.getAllAsync('SELECT * FROM holestats WHERE round_id = $roundID',{$roundID : round_id});
        
        return holes
        }
        catch(error){
            console.error(error)
        }
    };

    interface timestat {
        totalStrokes:number
    }
    export const getTimelineScores = async (): Promise<number[]> => {
    try {
        const db = await openDb();
        const holes: timestat[] | null = await db.getAllAsync('SELECT totalStrokes FROM round');
        if (holes){
            const totalsArray:number[] = []
            holes.forEach(value => {
                totalsArray.push(value.totalStrokes)
            });
            return totalsArray
          
        }
        return []
    }
    catch(error){
        console.error(error)
    }
    return []
    }
    export const getTeeTimelineScores = async (teeboxID:number): Promise<number[]> => {
    try {
        const db = await openDb();
        const holes: timestat[] | null = await db.getAllAsync('SELECT totalStrokes FROM round WHERE teebox_id = $teeboxID',{$teeboxID : teeboxID});
        if (holes){
            const totalsArray:number[] = []
            holes.forEach(value => {
                totalsArray.push(value.totalStrokes)
            });
            return totalsArray
          
        }
        return []
    }
    catch(error){
        console.error(error)
    }
    return []
    }

    export async function getRoundAllStats(): Promise<AllStats> {
        const db = await openDb();
        const data: AllStats | null = await db.getFirstAsync(
            `SELECT count(*) as count, min(totalStrokes) as minScore, max(totalStrokes) as maxScore, avg(totalStrokes) as avgStrokes, sum(pars) as pars, sum(birdies) as birdies, sum(bogies) as bogies, sum(doublePlus) as doublePlus, sum(eaglesOless) as eaglesOless, avg(toPar3) as toPar3, avg(toPar4) as toPar4, avg(toPar5) as toPar5, sum(great) as great, sum(good) as good, sum(bad) as bad, sum(totalPutts) as totalPutts, avg(totalGIR) as avgGIR, avg(totalFIR) as avgFIR FROM round;`);
        let totals:AllStats = {
            count: 0,
            minScore: 0,
            maxScore: 0,
            avgStrokes: 0,
            eaglesOless: 0,
            birdies: 0,
            pars: 0,
            bogies: 0,
            doublePlus: 0,
            toPar3: 0,
            toPar4: 0,
            toPar5: 0,
            great: 0,
            good: 0,
            bad: 0,
            totalPutts: 0,
            avgGIR: 0,
            avgFIR: 0,

        };

        if (data) {
            totals = {
                count: data.count,
                minScore: data.minScore,
                maxScore: data.maxScore,
                avgStrokes: data.avgStrokes,
                eaglesOless: data.eaglesOless,
                birdies: data.birdies,
                pars: data.pars,
                bogies: data.bogies,
                doublePlus: data.doublePlus,
                toPar3: data.toPar3,
                toPar4: data.toPar4,
                toPar5: data.toPar5,
                great: data.great,
                good: data.good,
                bad: data.bad,
                totalPutts: data.totalPutts,
                avgGIR: data.avgGIR,
                avgFIR: data.avgFIR
            };
        }

        return totals

    }

    export async function getTeeAllStats(teebox_id:number): Promise<AllStats> {
        const db = await openDb();
        const data: AllStats | null = await db.getFirstAsync(
            'SELECT count(*) as count, min(totalStrokes) as minScore, max(totalStrokes) as maxScore, avg(totalStrokes) as avgStrokes, sum(pars) as pars, sum(birdies) as birdies, sum(bogies) as bogies, sum(doublePlus) as doublePlus, sum(eaglesOless) as eaglesOless, avg(toPar3) as toPar3, avg(toPar4) as toPar4, avg(toPar5) as toPar5, sum(great) as great, sum(good) as good, sum(bad) as bad, sum(totalPutts) as totalPutts, avg(totalGIR) as avgGIR, avg(totalFIR) as avgFIR FROM round WHERE teebox_id = $teeboxID',{$teeboxID : teebox_id});
        let totals:AllStats = {
            count: 0,
            minScore: 0,
            maxScore: 0,
            avgStrokes: 0,
            eaglesOless: 0,
            birdies: 0,
            pars: 0,
            bogies: 0,
            doublePlus: 0,
            toPar3: 0,
            toPar4: 0,
            toPar5: 0,
            great: 0,
            good: 0,
            bad: 0,
            totalPutts: 0,
            avgGIR: 0,
            avgFIR: 0,

        };

        if (data) {
            totals = {
                count: data.count,
                minScore: data.minScore,
                maxScore: data.maxScore,
                avgStrokes: data.avgStrokes,
                eaglesOless: data.eaglesOless,
                birdies: data.birdies,
                pars: data.pars,
                bogies: data.bogies,
                doublePlus: data.doublePlus,
                toPar3: data.toPar3,
                toPar4: data.toPar4,
                toPar5: data.toPar5,
                great: data.great,
                good: data.good,
                bad: data.bad,
                totalPutts: data.totalPutts,
                avgGIR: data.avgGIR,
                avgFIR: data.avgFIR
            };
        }

        return totals

    }


    export async function getCourseHoleData(teeboxID: number): Promise<CourseHoleData> {
        const db = await openDb();
    
        const combinedQuery = `
            SELECT 
                hole.num, 
                hole.par, 
                avg(holestats.toPar) AS avgScore,
                sum(holestats.toPar) AS totalScore,
                avg(holestats.putts) AS pph,
                sum(holestats.GIR) AS gir,
                sum(holestats.FIR) AS fir,
                count(*) AS totalCount
            FROM holestats                                               
            JOIN hole ON holestats.hole_id = hole.id
            WHERE hole.teebox_id = $teeboxID
            GROUP BY hole.num, hole.par
            ORDER BY hole.num
        `;
    
        const results = await db.getAllAsync<{ num: number; par: number; avgScore: number; totalScore: number; pph: number; gir: number; fir:number; totalCount:number; }>(combinedQuery, { $teeboxID: teeboxID });
        const holePars: number[] = new Array(18).fill(0);
        const avgScores: number[] = new Array(18).fill(0);
        const totalScores: number[] = new Array(18).fill(0);
        const pph: number[] = new Array(18).fill(0);
        const gir: number[] = new Array(18).fill(0);
        const fir: number[] = new Array(18).fill(0);
        let firCount = 0;
        let totalCount = 0;
    
        results.forEach(hole => {
            holePars[hole.num - 1] = hole.par;
            avgScores[hole.num - 1] = hole.avgScore + hole.par;
            totalScores[hole.num - 1] = hole.totalScore;
            pph[hole.num - 1] = hole.pph;
            gir[hole.num - 1] = hole.gir;
            fir[hole.num - 1] = hole.fir;
            if (hole.par > 3)  firCount++;
            totalCount += hole.totalCount;
        });
    
        const courseData: CourseHoleData = {
            holePars: holePars,
            avgScores: avgScores,
            totalScores: totalScores,
            pph: pph,
            gir: gir,  // Update this if you plan to include GIR in the query
            fir: fir,  // Update this if you plan to include FIR in the query
            count: totalCount/18,
            firCount: firCount
        };
        console.log('courseData:', courseData);
    
        return courseData;
    }