import { View } from "react-native";
import { openDb } from "../DataBase/API";
import { HoleStats, QuickStats } from "../DataBase/Classes";
import { useEffect, useState } from "react";
import ParSpecificStatView from "./ParSpecificStatView";

const ParStatistics = () => {
    const [par3Data, setPar3Data] = useState<QuickStats>({totalPutts:0,totalGIR:0,totalFIR:0,totalScore:0,avgScore:0,count:0,eaglesOrLess:0,birdies:0,pars:0,bogeys:0,doublePlus:0})
    const [par4Data, setPar4Data] = useState<QuickStats>({totalPutts:0,totalGIR:0,totalFIR:0,totalScore:0,avgScore:0,count:0,eaglesOrLess:0,birdies:0,pars:0,bogeys:0,doublePlus:0})
    const [par5Data, setPar5Data] = useState<QuickStats>({totalPutts:0,totalGIR:0,totalFIR:0,totalScore:0,avgScore:0,count:0,eaglesOrLess:0,birdies:0,pars:0,bogeys:0,doublePlus:0})
    

    
    
   
    
    async function getAllPar3Data(): Promise<void> {
        try {
            const db = await openDb();
            const data = await db.getFirstAsync<QuickStats>(
                `SELECT 
                SUM(putts) as totalPutts, 
                SUM(CASE WHEN GIR THEN 1 ELSE 0 END) as totalGIR, 
                SUM(CASE WHEN FIR THEN 1 ELSE 0 END) as totalFIR, 
                SUM(toPar) as totalScore, 
                AVG(toPar) as avgScore, 
                COUNT(*) as count,
                SUM(CASE WHEN toPar <= -2 THEN 1 ELSE 0 END) as eaglesOrLess,
                SUM(CASE WHEN toPar = -1 THEN 1 ELSE 0 END) as birdies,
                SUM(CASE WHEN toPar = 0 THEN 1 ELSE 0 END) as pars,
                SUM(CASE WHEN toPar = 1 THEN 1 ELSE 0 END) as bogeys,
                SUM(CASE WHEN toPar >= 2 THEN 1 ELSE 0 END) as doublePlus
             FROM holestats 
             JOIN hole ON hole.id = hole_id 
             WHERE hole.par = 3;`
            );
            if (data)
                setPar3Data(data);
        } catch (error) {
            console.error("Failed to fetch Par 3 data", error);
            throw error;
        }
    }
    async function getAllPar4Data(): Promise<void> {
        try {
            const db = await openDb();
            const data = await db.getFirstAsync<QuickStats>(
                `SELECT 
                SUM(putts) as totalPutts, 
                SUM(CASE WHEN GIR THEN 1 ELSE 0 END) as totalGIR, 
                SUM(CASE WHEN FIR THEN 1 ELSE 0 END) as totalFIR, 
                SUM(toPar) as totalScore, 
                AVG(toPar) as avgScore, 
                COUNT(*) as count,
                SUM(CASE WHEN toPar <= -2 THEN 1 ELSE 0 END) as eaglesOrLess,
                SUM(CASE WHEN toPar = -1 THEN 1 ELSE 0 END) as birdies,
                SUM(CASE WHEN toPar = 0 THEN 1 ELSE 0 END) as pars,
                SUM(CASE WHEN toPar = 1 THEN 1 ELSE 0 END) as bogeys,
                SUM(CASE WHEN toPar >= 2 THEN 1 ELSE 0 END) as doublePlus
             FROM holestats 
             JOIN hole ON hole.id = hole_id 
             WHERE hole.par = 4;`
                
            );
            if (data)
                setPar4Data(data);
        } catch (error) {
            console.error("Failed to fetch Par 4 data", error);
            throw error;
        }
    }
    async function getAllPar5Data(): Promise<void> {
        try {
            const db = await openDb();
            const data = await db.getFirstAsync<QuickStats>(
                `SELECT 
                SUM(putts) as totalPutts, 
                SUM(CASE WHEN GIR THEN 1 ELSE 0 END) as totalGIR, 
                SUM(CASE WHEN FIR THEN 1 ELSE 0 END) as totalFIR, 
                SUM(toPar) as totalScore, 
                AVG(toPar) as avgScore, 
                COUNT(*) as count,
                SUM(CASE WHEN toPar <= -2 THEN 1 ELSE 0 END) as eaglesOrLess,
                SUM(CASE WHEN toPar = -1 THEN 1 ELSE 0 END) as birdies,
                SUM(CASE WHEN toPar = 0 THEN 1 ELSE 0 END) as pars,
                SUM(CASE WHEN toPar = 1 THEN 1 ELSE 0 END) as bogeys,
                SUM(CASE WHEN toPar >= 2 THEN 1 ELSE 0 END) as doublePlus
             FROM holestats 
             JOIN hole ON hole.id = hole_id 
             WHERE hole.par = 5;`
                

            );
            if (data)
            setPar5Data(data);
        } catch (error) {
            console.error("Failed to fetch Par 5 data", error);
            throw error;
        }
    }

    useEffect(()=>{
        getAllPar3Data()
        getAllPar4Data()
        getAllPar5Data()
    },[])

    return ( 
    <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
        <ParSpecificStatView par3data={par3Data} par4data={par4Data} par5data={par5Data}  />
        {/* <ParSpecificStatView data={par4Data} par={4} />
        <ParSpecificStatView data={par5Data} par={5} /> */}
    </View>
     )
}

export default ParStatistics;