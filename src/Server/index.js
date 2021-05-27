const express = require('express');
const app = express();
let port = process.env.PORT || 8080;
const path = require('path');

app.use(express.static("../public"));

app.get('/api/finalMatches', (req,res) => {
    try {
        const finalMatches = require("../Finals/finals");
        return res.status(200).json({
            result: finalMatches.finalMatchInfo(),
        })
    } catch (err) {
        return res.status(500).json({
            err: err.toString(),
        })
    }
    
})

app.get('/api/semiFinalMatches/legOne', (req,res) => {
    try {
        const semiFinalMatches = require("../SemiFinals/semiFinals");
        //res.send(semiFinalMatches.semiFinalLegOneInfo())
        return res.status(200).json({
            result: semiFinalMatches.semiFinalLegOneInfo(),
        })
    } catch (err) {
        return res.status(500).json({
            err : err.toString(),
        })
    }
})


app.get('/api/semiFinalMatches/legTwo', (req, res) => {
    try {
        const semiFinalMatches = require("../SemiFinals/semiFinals");
        return res.status(200).json({
            result : semiFinalMatches.semiFinalLegTwoInfo(),
        })
        
    } catch (err) {
        return res.status(500).json({
            err : err.toString(),
        })
    }
})

app.get('/app/quarterFinalMatches/legOne', (req, res) => {
    try {
        const quarterFinalMatches = require("../QuarterFinals/quarterFinals");
        return res.status(200).json({
            result : quarterFinalMatches.quarterFinalLegOneInfo(),
        })
        
    } catch (err) {
        return res.status(500).json({
            err : err.toString(),
        })
    }
})

app.get('/api/quarterFinalMatches/legTwo', (req, res) => {
    try {
        const quarterFinalMatches = require("../QuarterFinals/quarterFinals");
        return res.status(200).json({
            result : quarterFinalMatches.quarterFinalLegTwoInfo(),
        })
    } catch (error) {
        return res.status(500).json({
            err : err.toString(),
        })
    }
})

app.get("/api/standings", async (req,res) => {
    try {
        const importStandings = require("../Standings/standings");
        const tables = await importStandings.parseStandingsTable();
        return res.status(200).json({
            result : tables,
        })
    }
    catch(err){
        return res.status(500).json({
            err: err.toString()
        })
    }
})

app.get("/api/clubs", async (req,res) => {
    try {
        const importClubs = require("../Standings/standings");
        const clubs = await importClubs.parseClubInfo();
        const clubInfoFiltered = clubs.filter(value => Object.keys(value).length !== 0);
        return res.status(200).json({
            result : clubInfoFiltered,
        })
    }
    catch(err){
        return res.status(500).json({
            err: err.toString()
        })
    }
})

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
})




