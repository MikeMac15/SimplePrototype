import * as SQLite from 'expo-sqlite';
import { Course, Teebox, Hole, Round, HoleStats, MostRecentRound, TimelineStats, AllStats, CourseHoleData, HoleInsights, HoleStatsExtra } from './Classes';



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

    interface id {'id':number}
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
            FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
        );
        CREATE TABLE IF NOT EXISTS hole (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            teebox_id INTEGER NOT NULL,
            color INTEGER NOT NULL,
            num INTEGER NOT NULL,
            par INTEGER NOT NULL,
            yardage INTEGER NOT NULL,
            FOREIGN KEY (teebox_id) REFERENCES teebox(id) ON DELETE CASCADE
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
            FOREIGN KEY (teebox_id) REFERENCES teebox(id) ON DELETE CASCADE
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
            FOREIGN KEY (hole_id) REFERENCES hole(id) ON DELETE CASCADE,
            FOREIGN KEY (round_id) REFERENCES round(id) ON DELETE CASCADE
        );
        CREATE TABLE IF NOT EXISTS clubs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE CHECK(name IN ('Driver', '3w','5w','7w','3hyb','4hyb','5hyb','7hyb','1i','2i', '3i', '4i', '5i', '6i', '7i', '8i', '9i', 'Pw', 'Gw', 'Sw', 'Lw')) NOT NULL,
            hidden BOOLEAN NOT NULL);
        CREATE TABLE IF NOT EXISTS distances (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            club_id INTEGER NOT NULL,
            distance INTEGER NOT NULL,
            contact TEXT CHECK(contact IN ('great', 'good', 'bad', 'shank')) NOT NULL,
            wind BOOLEAN NOT NULL,
            FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE);
        `)
        
            
            await createSnoqualmie(db);
            await createJustPlay(db);
            await createColumbiaPoint(db);
            await createCanyonLakes(db);
            await createWineValley(db);
            
        } catch (error) {
            console.error("Error setting up tables:", error);
        }
    }

    const createJustPlay = async(db:SQLite.SQLiteDatabase) => {
        const result = await db.getFirstAsync(`SELECT id FROM course WHERE name = 'Just Play'`);
if (!result) {
                // Insert course
                await db.execAsync(`
                INSERT INTO course (name) VALUES ('Just Play');
                `);
        
                // Get the new course ID
                const courseId:number|null = await getJustPlayCourse();
                
                // Insert teebox for the course
                if (courseId) {
                const newTee = await db.runAsync('INSERT INTO teebox (course_id, color1, color2) VALUES (?,?,?)', courseId, 8, 0)
                // Get the new teebox ID
               const teeId = newTee.lastInsertRowId; 
               
    
                // Insert holes
                await db.execAsync(`
                INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${teeId}, 8, 1, 3, 0);
                INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${teeId}, 8, 2, 4, 0);
                INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${teeId}, 8, 3, 5, 0);
                `);
            }}
        }

    const createSnoqualmie = async(db:SQLite.SQLiteDatabase) => {
        const ridge = await db.getFirstAsync(`SELECT id FROM course WHERE name = 'Snoqualmie Ridge'`);
        if (!ridge) {
            // Insert course
            await db.execAsync(`
            INSERT INTO course (name) VALUES ('Snoqualmie Ridge');
            `);
    
            // Get the new course ID
            const courseId:id|null = await db.getFirstAsync(`SELECT id FROM course WHERE name = 'Snoqualmie Ridge'`);
            
            // Insert teebox for the course
            if (courseId) {

            try{

            
            const goldTee = await db.runAsync('INSERT INTO teebox (course_id, color1, color2) VALUES (?,?,?)', courseId.id, 5, 0);
            const blueTee = await db.runAsync('INSERT INTO teebox (course_id, color1, color2) VALUES (?,?,?)', courseId.id, 2, 0);
            // Get the new teebox ID
           const goldTeeId = goldTee.lastInsertRowId; 
           const blueTeeId = blueTee.lastInsertRowId;
           console.log('gold teebox id', goldTeeId)
           console.log('blue teebox id', blueTeeId)

            // Insert holes
            await db.execAsync(`
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${goldTeeId}, 5, 1, 5, 530);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${goldTeeId}, 5, 2, 4, 388);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${goldTeeId}, 5, 3, 4, 439);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${goldTeeId}, 5, 4, 4, 400);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${goldTeeId}, 5, 5, 4, 445);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${goldTeeId}, 5, 6, 3, 207);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${goldTeeId}, 5, 7, 4, 354);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${goldTeeId}, 5, 8, 5, 518);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${goldTeeId}, 5, 9, 3, 196);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${goldTeeId}, 5, 10, 4, 324);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${goldTeeId}, 5, 11, 4, 455);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${goldTeeId}, 5, 12, 4, 412);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${goldTeeId}, 5, 13, 3, 181);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${goldTeeId}, 5, 14, 4, 431);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${goldTeeId}, 5, 15, 5, 557);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${goldTeeId}, 5, 16, 4, 368);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${goldTeeId}, 5, 17, 3, 186);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${goldTeeId}, 5, 18, 5, 482);
            `);
            // Insert holes
            await db.execAsync(`
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${blueTeeId}, 2, 1, 5, 514);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${blueTeeId}, 2, 2, 4, 372);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${blueTeeId}, 2, 3, 4, 424);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${blueTeeId}, 2, 4, 4, 376);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${blueTeeId}, 2, 5, 4, 413);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${blueTeeId}, 2, 6, 3, 189);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${blueTeeId}, 2, 7, 4, 336);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${blueTeeId}, 2, 8, 5, 507);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${blueTeeId}, 2, 9, 3, 180);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${blueTeeId}, 2, 10, 4, 283);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${blueTeeId}, 2, 11, 4, 427);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${blueTeeId}, 2, 12, 4, 395);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${blueTeeId}, 2, 13, 3, 156);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${blueTeeId}, 2, 14, 4, 410);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${blueTeeId}, 2, 15, 5, 526);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${blueTeeId}, 2, 16, 4, 352);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${blueTeeId}, 2, 17, 3, 174);
            INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES (${blueTeeId}, 2, 18, 5, 460);
            `);}
            catch (error) {
                console.error("Error setting up tables:", error);
            }
        }}
    }

    const createColumbiaPoint = async(db:SQLite.SQLiteDatabase) => {
        const course = await db.getFirstAsync(`SELECT id FROM course WHERE name = 'Columbia Point'`);
        if (!course) {
            // Insert course
            await db.execAsync(`
            INSERT INTO course (name) VALUES ('Columbia Point');
            `);
    
            // Get the new course ID
            const courseId:id|null = await db.getFirstAsync(`SELECT id FROM course WHERE name = 'Columbia Point'`);
            
            // Insert teebox for the course
            if (courseId) {

            try{

            
            const blackTee = await db.runAsync('INSERT INTO teebox (course_id, color1, color2) VALUES (?,?,?)', courseId.id, 1, 0);
            const blueTee = await db.runAsync('INSERT INTO teebox (course_id, color1, color2) VALUES (?,?,?)', courseId.id, 2, 0);
            // Get the new teebox ID
           const blackTeeId = blackTee.lastInsertRowId; 
           const blueTeeId = blueTee.lastInsertRowId;
           console.log('black teebox id', blackTeeId)
           console.log('blue teebox id', blueTeeId)

            // Insert holes
            await db.execAsync(`
                INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES
                (${blackTeeId}, 1, 1, 4, 345),
                (${blackTeeId}, 1, 2, 4, 312),
                (${blackTeeId}, 1, 3, 4, 373),
                (${blackTeeId}, 1, 4, 3, 141),
                (${blackTeeId}, 1, 5, 5, 591),
                (${blackTeeId}, 1, 6, 5, 496),
                (${blackTeeId}, 1, 7, 4, 410),
                (${blackTeeId}, 1, 8, 3, 241),
                (${blackTeeId}, 1, 9, 5, 594),
                (${blackTeeId}, 1, 10, 4, 402),
                (${blackTeeId}, 1, 11, 4, 400),
                (${blackTeeId}, 1, 12, 3, 183),
                (${blackTeeId}, 1, 13, 5, 518),
                (${blackTeeId}, 1, 14, 4, 282),
                (${blackTeeId}, 1, 15, 3, 206),
                (${blackTeeId}, 1, 16, 4, 388),
                (${blackTeeId}, 1, 17, 3, 146),
                (${blackTeeId}, 1, 18, 5, 489);
            `);
            
            // Insert holes
            await db.execAsync(`
                INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES
                (${blueTeeId}, 2, 1, 4, 308),
                (${blueTeeId}, 2, 2, 4, 289),
                (${blueTeeId}, 2, 3, 4, 343),
                (${blueTeeId}, 2, 4, 3, 130),
                (${blueTeeId}, 2, 5, 5, 548),
                (${blueTeeId}, 2, 6, 5, 483),
                (${blueTeeId}, 2, 7, 4, 372),
                (${blueTeeId}, 2, 8, 3, 204),
                (${blueTeeId}, 2, 9, 5, 538),
                (${blueTeeId}, 2, 10, 4, 366),
                (${blueTeeId}, 2, 11, 4, 350),
                (${blueTeeId}, 2, 12, 3, 158),
                (${blueTeeId}, 2, 13, 5, 478),
                (${blueTeeId}, 2, 14, 4, 265),
                (${blueTeeId}, 2, 15, 3, 177),
                (${blueTeeId}, 2, 16, 4, 355),
                (${blueTeeId}, 2, 17, 3, 129),
                (${blueTeeId}, 2, 18, 5, 472);
            `);
            
        }
            catch (error) {
                console.error("Error setting up tables:", error);
            }
        }}
    }

    const createCanyonLakes = async (db: SQLite.SQLiteDatabase) => {
        const course = await db.getFirstAsync(`SELECT id FROM course WHERE name = 'Canyon Lakes'`);
        if (!course) {
            // Insert course
            await db.execAsync(`
            INSERT INTO course (name) VALUES ('Canyon Lakes');
            `);
    
            // Get the new course ID
            const courseId: id | null = await db.getFirstAsync(`SELECT id FROM course WHERE name = 'Canyon Lakes'`);
    
            // Insert teebox for the course
            if (courseId) {
                try {
                    const blackTee = await db.runAsync('INSERT INTO teebox (course_id, color1, color2) VALUES (?,?,?)', courseId.id, 1, 0);
                    const blueTee = await db.runAsync('INSERT INTO teebox (course_id, color1, color2) VALUES (?,?,?)', courseId.id, 2, 0);
                    // Get the new teebox ID
                    const blackTeeId = blackTee.lastInsertRowId;
                    const blueTeeId = blueTee.lastInsertRowId;
    
                    console.log('black teebox id', blackTeeId);
                    console.log('blue teebox id', blueTeeId);
    
                    // Insert holes for Black tees
                    await db.execAsync(`
                        INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES
                        (${blackTeeId}, 1, 1, 4, 378),
                        (${blackTeeId}, 1, 2, 4, 324),
                        (${blackTeeId}, 1, 3, 5, 615),
                        (${blackTeeId}, 1, 4, 3, 219),
                        (${blackTeeId}, 1, 5, 4, 423),
                        (${blackTeeId}, 1, 6, 4, 374),
                        (${blackTeeId}, 1, 7, 3, 200),
                        (${blackTeeId}, 1, 8, 4, 420),
                        (${blackTeeId}, 1, 9, 5, 527),
                        (${blackTeeId}, 1, 10, 4, 438),
                        (${blackTeeId}, 1, 11, 4, 364),
                        (${blackTeeId}, 1, 12, 3, 181),
                        (${blackTeeId}, 1, 13, 5, 520),
                        (${blackTeeId}, 1, 14, 4, 405),
                        (${blackTeeId}, 1, 15, 5, 559),
                        (${blackTeeId}, 1, 16, 4, 441),
                        (${blackTeeId}, 1, 17, 3, 198),
                        (${blackTeeId}, 1, 18, 4, 440);
                    `);
    
                    // Insert holes for Blue tees
                    await db.execAsync(`
                        INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES
                        (${blueTeeId}, 2, 1, 4, 368),
                        (${blueTeeId}, 2, 2, 4, 320),
                        (${blueTeeId}, 2, 3, 5, 566),
                        (${blueTeeId}, 2, 4, 3, 198),
                        (${blueTeeId}, 2, 5, 4, 403),
                        (${blueTeeId}, 2, 6, 4, 374),
                        (${blueTeeId}, 2, 7, 3, 179),
                        (${blueTeeId}, 2, 8, 4, 388),
                        (${blueTeeId}, 2, 9, 5, 522),
                        (${blueTeeId}, 2, 10, 4, 406),
                        (${blueTeeId}, 2, 11, 4, 354),
                        (${blueTeeId}, 2, 12, 3, 158),
                        (${blueTeeId}, 2, 13, 5, 500),
                        (${blueTeeId}, 2, 14, 4, 382),
                        (${blueTeeId}, 2, 15, 5, 520),
                        (${blueTeeId}, 2, 16, 4, 424),
                        (${blueTeeId}, 2, 17, 3, 188),
                        (${blueTeeId}, 2, 18, 4, 380);
                    `);
                } catch (error) {
                    console.error("Error setting up Canyon Lakes:", error);
                }
            }
        }
    };

    const createWineValley = async (db: SQLite.SQLiteDatabase) => {
        const course = await db.getFirstAsync(`SELECT id FROM course WHERE name = 'Wine Valley'`);
        if (!course) {
            // Insert course
            await db.execAsync(`
            INSERT INTO course (name) VALUES ('Wine Valley');
            `);
    
            // Get the new course ID
            const courseId: id | null = await db.getFirstAsync(`SELECT id FROM course WHERE name = 'Wine Valley'`);
    
            // Insert teebox for the course
            if (courseId) {
                try {
                    const goldTee = await db.runAsync('INSERT INTO teebox (course_id, color1, color2) VALUES (?,?,?)', courseId.id, 5, 0);
                    const blackTee = await db.runAsync('INSERT INTO teebox (course_id, color1, color2) VALUES (?,?,?)', courseId.id, 1, 0);
                    // Get the new teebox ID
                    const goldTeeId = goldTee.lastInsertRowId;
                    const blackTeeId = blackTee.lastInsertRowId;
    
                    console.log('gold teebox id', goldTeeId);
                    console.log('black teebox id', blackTeeId);
    
                    // Insert holes for Gold tees
                    await db.execAsync(`
                        INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES
                        (${goldTeeId}, 5, 1, 4, 470),
                        (${goldTeeId}, 5, 2, 4, 410),
                        (${goldTeeId}, 5, 3, 5, 575),
                        (${goldTeeId}, 5, 4, 4, 390),
                        (${goldTeeId}, 5, 5, 4, 515),
                        (${goldTeeId}, 5, 6, 3, 210),
                        (${goldTeeId}, 5, 7, 5, 625),
                        (${goldTeeId}, 5, 8, 3, 255),
                        (${goldTeeId}, 5, 9, 4, 480),
                        (${goldTeeId}, 5, 10, 5, 610),
                        (${goldTeeId}, 5, 11, 3, 180),
                        (${goldTeeId}, 5, 12, 4, 435),
                        (${goldTeeId}, 5, 13, 4, 505),
                        (${goldTeeId}, 5, 14, 3, 175),
                        (${goldTeeId}, 5, 15, 5, 515),
                        (${goldTeeId}, 5, 16, 3, 195),
                        (${goldTeeId}, 5, 17, 4, 470),
                        (${goldTeeId}, 5, 18, 5, 585);
                    `);
    
                    // Insert holes for Black tees
                    await db.execAsync(`
                        INSERT INTO hole (teebox_id, color, num, par, yardage) VALUES
                        (${blackTeeId}, 1, 1, 4, 405),
                        (${blackTeeId}, 1, 2, 4, 360),
                        (${blackTeeId}, 1, 3, 5, 535),
                        (${blackTeeId}, 1, 4, 4, 350),
                        (${blackTeeId}, 1, 5, 4, 460),
                        (${blackTeeId}, 1, 6, 3, 180),
                        (${blackTeeId}, 1, 7, 5, 535),
                        (${blackTeeId}, 1, 8, 3, 200),
                        (${blackTeeId}, 1, 9, 4, 430),
                        (${blackTeeId}, 1, 10, 5, 580),
                        (${blackTeeId}, 1, 11, 3, 155),
                        (${blackTeeId}, 1, 12, 4, 405),
                        (${blackTeeId}, 1, 13, 4, 435),
                        (${blackTeeId}, 1, 14, 3, 135),
                        (${blackTeeId}, 1, 15, 5, 470),
                        (${blackTeeId}, 1, 16, 3, 175),
                        (${blackTeeId}, 1, 17, 4, 400),
                        (${blackTeeId}, 1, 18, 5, 550);
                    `);
                } catch (error) {
                    console.error("Error setting up Wine Valley:", error);
                }
            }
        }
    };
    
    export const getJustPlayCourse = async (): Promise<number|null> => {
        try {
            const db = await openDb();
            const result:id|null = await db.getFirstAsync(`SELECT id FROM course WHERE name = 'Just Play'`);
            if (result) {
                return result.id;
            }
                return null;
            
        } catch (error) {
            console.error('Error fetching course:', error);
            throw error;
        }   
    }

    export const getJustPlayCourseAndTee = async (): Promise<number[]|null> => {
        try {
            const db = await openDb();
            const course:id|null = await db.getFirstAsync(`SELECT id FROM course WHERE name = 'Just Play'`);
            if (course){
                const tee:id|null = await db.getFirstAsync(`SELECT id FROM teebox WHERE course_id = ?`, course.id);
                if (course && tee) {
                    return [course.id, tee.id];
                }
            }
                return null;
            
        } catch (error) {
            console.error('Error fetching course:', error);
            throw error;
        }   
    }

    export const DeleteCourse = async (courseID: number) => {
        try {
            const db = await openDb();
            await db.runAsync('DELETE FROM course WHERE id = $courseID', { $courseID: courseID });
            console.log('Deleted course');
        } catch (error) {
            console.error('Error deleting course:', error);
            throw error;
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

    export const updateHole = async (holeID: number, par: number, yardage: number): Promise<number> => {
        try {
            const db = await openDb();
            const updated = await db.runAsync('UPDATE hole SET par = ?, yardage = ? WHERE id = ?',  par, yardage, holeID);
            console.log('Updated hole');
            return updated.lastInsertRowId;
        } catch (error) {
            console.error('Error updating hole:', error);
            throw error;
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

    export interface RecentRoundTitleInfo {
        name: string;
        color1: number;
        color2: number;
        id: number;
        date: string;
        teebox_id: number;
        totalStrokes: number;
        toPar: number;
    }

    export const getAllRounds = async (): Promise<RecentRoundTitleInfo[]> => {
        const db = await openDb();
        
        try {
            const rows = await db.getAllAsync(`
                SELECT 
                    course.name,
                    teebox.color1, teebox.color2,
                    round.id, round.date, round.teebox_id, round.totalStrokes, round.toPar
                FROM round
                JOIN teebox ON teebox.id = round.teebox_id
                JOIN course ON course.id = teebox.course_id
                ORDER BY round.date DESC, round.id DESC;
            `);
    
            // Map the result to the RecentRoundTitleInfo type
            const recentRounds: RecentRoundTitleInfo[] = rows.map((row: any) => ({
                name: row.name,
                color1: row.color1,
                color2: row.color2,
                id: row.id,
                date: row.date,
                teebox_id: row.teebox_id,
                totalStrokes: row.totalStrokes,
                toPar: row.toPar
            }));
    
            return recentRounds;
        } catch (error) {
            console.error('Error fetching rounds:', error);
            throw new Error('Failed to fetch rounds');
        }
        //  finally {
        //     await db.closeAsync()
        // }
    };
    export const getLastFiveRounds = async (): Promise<RecentRoundTitleInfo[]> => {
        const db = await openDb();
        
        try {
            const rows = await db.getAllAsync(`
                SELECT 
                    course.name,
                    teebox.color1, teebox.color2,
                    round.id, round.date, round.teebox_id, round.totalStrokes, round.toPar
                FROM round
                JOIN teebox ON teebox.id = round.teebox_id
                JOIN course ON course.id = teebox.course_id
                ORDER BY round.date DESC, round.id DESC
                LIMIT 5;
            `);
    
            // Map the result to the RecentRoundTitleInfo type
            const recentRounds: RecentRoundTitleInfo[] = rows.map((row: any) => ({
                name: row.name,
                color1: row.color1,
                color2: row.color2,
                id: row.id,
                date: row.date,
                teebox_id: row.teebox_id,
                totalStrokes: row.totalStrokes,
                toPar: row.toPar
            }));
    
            return recentRounds;
        } catch (error) {
            console.error('Error fetching rounds:', error);
            throw new Error('Failed to fetch rounds');
        }
        //  finally {
        //     await db.closeAsync()
        // }
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
           ORDER BY round.date DESC, round.id DESC
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

      export const getAllRoundHoles = async (round_id: number): Promise<HoleStatsExtra[] | undefined> => {
        try {
        const db = await openDb();
        const holes: HoleStatsExtra[] = await db.getAllAsync('SELECT * FROM holestats WHERE round_id = $roundID',{$roundID : round_id});
        
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
          ` SELECT 
                COUNT(*) AS count, 
                MIN(totalStrokes) AS minScore, 
                MAX(totalStrokes) AS maxScore, 
                AVG(totalStrokes) AS avgStrokes, 
                SUM(pars) AS pars, 
                SUM(birdies) AS birdies, 
                SUM(bogies) AS bogies, 
                SUM(doublePlus) AS doublePlus, 
                SUM(eaglesOless) AS eaglesOless, 
                AVG(toPar3) AS avgToPar3, 
                AVG(toPar4) AS avgToPar4, 
                AVG(toPar5) AS avgToPar5, 
                SUM(great) AS great, 
                SUM(good) AS good, 
                SUM(bad) AS bad, 
                SUM(totalPutts) AS totalPutts, 
                AVG(totalGIR) AS avgGIR, 
                AVG(totalFIR) AS avgFIR, 
                (SELECT COUNT(par) 
                FROM hole 
                WHERE par > 3 
                AND teebox_id = (SELECT teebox_id FROM round LIMIT 1)
                ) AS firEligible
            FROM round;`
        );
        let totals: AllStats = {
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
          firEligible: 0, // Add this line
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
            avgFIR: data.avgFIR,
            firEligible: data.firEligible,
          };
        }
      
        return totals;
      }
      

    export async function getTeeAllStats(teebox_id:number): Promise<AllStats> {
        const db = await openDb();
        const data: AllStats | null = await db.getFirstAsync(
            `SELECT count(*) as count, 
                min(totalStrokes) as minScore, 
                max(totalStrokes) as maxScore, 
                avg(totalStrokes) as avgStrokes, 
                sum(pars) as pars, 
                sum(birdies) as birdies, 
                sum(bogies) as bogies, 
                sum(doublePlus) as doublePlus, 
                sum(eaglesOless) as eaglesOless, 
                sum(toPar3) as toPar3, 
                sum(toPar4) as toPar4, 
                sum(toPar5) as toPar5, 
                sum(great) as great, 
                sum(good) as good, 
                sum(bad) as bad, 
                sum(totalPutts) as totalPutts, 
                avg(totalGIR) as avgGIR, 
                avg(totalFIR) as avgFIR,
                (SELECT COUNT(par) 
                FROM hole 
                WHERE par > 3 
                AND teebox_id = $teeboxID
                ) AS firEligible
            FROM round WHERE teebox_id = $teeboxID`,{$teeboxID : teebox_id});
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
            firEligible: 0,
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
                avgFIR: data.avgFIR,
                firEligible: data.firEligible,
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


    export async function getHoleStatsByHoleID(holeID: number): Promise<HoleInsights> {
        const db = await openDb();
    
        const query = `
            SELECT 
                holestats.toPar,
                hole.par,
                (holestats.toPar + hole.par) AS score,
                holestats.putts,
                holestats.GIR,
                holestats.FIR
            FROM holestats
            JOIN hole ON holestats.hole_id = hole.id
            WHERE holestats.hole_id = $holeID
        `;
    
        const results = await db.getAllAsync<{ toPar: number; par: number; score: number; putts: number; GIR: number; FIR: number; }>(query, { $holeID: holeID });
       
    
        // Initialize arrays for scores, putts, GIR, and FIR
        const scores: number[] = [];
        const putts: number[] = [];
        const gir: number[] = [];
        const fir: number[] = [];
    
        // Fill arrays with data from the results
        results.forEach(holeStats => {
            scores.push(holeStats.score);
            putts.push(holeStats.putts);
            gir.push(holeStats.GIR);
            fir.push(holeStats.FIR);
        });
    
        const holeStatsData: HoleInsights = {
            scores: scores,
            pph: putts,
            gir: gir,
            fir: fir
        };
    
     
    
        return holeStatsData;
    }



    export const deleteMostRecentRoundAndHoleStats = async () => {
        try {
            const db = await openDb();
            // Step 1: Identify the most recent round
            const mostRecentRoundResult = await db.getFirstAsync<{ id: number }>(
                `SELECT id FROM round ORDER BY id DESC LIMIT 1;`
            );
    
            // Check if a round was found
            if (mostRecentRoundResult && mostRecentRoundResult.id) {
                const roundId = mostRecentRoundResult.id;
    
                // Step 2: Delete associated holestats
                const deleteHolestatsResult = await db.runAsync(
                    `DELETE FROM holestats WHERE round_id = ?;`,
                    [roundId]
                );
    
                // Check how many rows were affected
                if (deleteHolestatsResult.changes > 0) {
                    console.log(`${deleteHolestatsResult.changes} holestats deleted.`);
                } else {
                    console.log('No holestats found for deletion.');
                }
    
                // Step 3: Delete the most recent round
                const deleteRoundResult = await db.runAsync(
                    `DELETE FROM round WHERE id = ?;`,
                    [roundId]
                );
    
                // Check how many rows were affected
                if (deleteRoundResult.changes > 0) {
                    console.log(`Successfully deleted round with id ${roundId}.`);
                } else {
                    console.log('No round found for deletion.');
                }
            } else {
                console.log('No round found to delete.');
            }
        } catch (error) {
            console.error("Error deleting most recent round and holestats:", error);
        }
    };
    
