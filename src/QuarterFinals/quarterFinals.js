/**
 * Shortcuts M
 * close files: cmd + w 
 * find files: cmd + p
 * Switch tabs: control + tab
 * Switch windows: cmd + tab
 * Command Pallete: cmd + shift + p
 * Bring back closed filed: cmd + shift + t
 * To run program: node fileName.js 
 * Toggle Sidebar: cmd + b
 * Toggle Vim: option + 0
 * Toggle Terminal: cntrl + `
 * Settings: cmd + ,
 * Open file in split window: cmd + \
 * Move word by word: option + arrows
 * Top and bottom of page: cmd + arrows
 * TO copy entire line just hit cmd + c vscode automatically selcts whole line 
 * Duplicate line: option + shift + arrow
 * Choose workspace: control + r
 * Move a line: option + arrows
 * Move up and down: fn + arrows
 * New terminal: shift + cntrl + `
 */
const rp = require('request-promise-native')
const fs = require('fs');
const { resolve } = require('path');

async function delay(){
    const durationMs = Math.random() * 800 + 300;
    return new Promise(resolve => {
        setTimeout(() => resolve(), durationMs);
    })
}

async function fetchQuarterFinalLeg1(){
    const results = await rp({
        uri: "https://match.uefa.com/v2/matches?matchId=2029486,2029487,2029488,2029489&offset=0&limit=4",
        headers: {
            "Referer" : "https://www.uefa.com/",
            "sec-ch-ua-mobile" : '?0',
            "User-Agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
        },
        json: true
    })

    await fs.promises.writeFile("quarterFinal1.json", JSON.stringify(results, null,2));
}

async function fetchQuarterFinalLeg2(){
    const results = await rp({
        uri: "https://match.uefa.com/v2/matches?matchId=2029490,2029491,2029492,2029493&offset=0&limit=4",
        headers: {
            "Referer" : "https://www.uefa.com/",
            "sec-ch-ua-mobile" : '?0',
            "User-Agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
        },
        json: true
    })

    await fs.promises.writeFile("quarterFinal2.json", JSON.stringify(results, null,2));
}

function quarterFinalLegOneInfo(){
    const legOneData = require("./quarterFinal1.json");

    const legOneResults = legOneData.map((item) => {
        const legOneObject = {};
        legOneObject["Round"] = item.round.metaData.name;
        legOneObject["Match Type"] = item.leg.translations.name.EN;
        legOneObject["Home Team"] = item.homeTeam.translations.displayOfficialName.EN;
        legOneObject["Away Team"] = item.awayTeam.translations.displayOfficialName.EN;
        legOneObject["Home Team Score"] = item.score.regular.home;
        legOneObject["Away Team Score"] = item.score.regular.away;

        return legOneObject;
    })
    return legOneResults;
}

function quarterFinalLegTwoInfo(){

    const legTwoData = require('./quarterFinal2.json');

    const legTwoResults = legTwoData.map((item) => {
        const legTwoObject = {};

        legTwoObject["Round"] = item.round.metaData.name;
        legTwoObject["Match Type"] = item.leg.translations.name.EN;
        legTwoObject["Home Team"] = item.homeTeam.translations.displayOfficialName.EN;
        legTwoObject["Away Team"] = item.awayTeam.translations.displayOfficialName.EN;
          
        legTwoObject["Home Team Score"] = item.score.regular.home;
        legTwoObject["Away Team Score"] = item.score.regular.away;
        legTwoObject["Aggregate Home Score"] = item.score.aggregate.home;
        legTwoObject["Aggregate Away Score"] = item.score.aggregate.away;
        legTwoObject["Winner"] = item.winner.aggregate.team.internationalName;
        
        return legTwoObject;
    })

    return legTwoResults;
}


async function main(){
    // await fetchQuarterFinalLeg1();
    // await delay();
    // await fetchQuarterFinalLeg2();
   // console.log(quarterFinalLegOneInfo());

}

module.exports = {quarterFinalLegOneInfo, quarterFinalLegTwoInfo};