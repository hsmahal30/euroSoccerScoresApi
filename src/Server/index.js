const express = require('express');
const app = express();
// const port = 8080;
let port = process.env.PORT || 8080;
const path = require('path');


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname+'/home.html'))
})

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

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
})





