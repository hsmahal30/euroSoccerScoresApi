const rp = require('request-promise-native')
const fs = require('fs');

async function delay(){
    const durationMs = Math.random() * 800 + 300;
    return new Promise(resolve => {
        setTimeout(() => resolve(), durationMs)
    })
}

async function fetchSemiFinalsLeg1(){
    const results = await rp({
        uri: "https://match.uefa.com/v2/matches?matchId=2029494,2029495&offset=0&limit=2",
        headers: {
            "Referer" : "https://www.uefa.com/",
            "sec-ch-ua-mobile" : '?0',
            "User-Agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
        },
        json: true
    })

    await fs.promises.writeFile("semiFinal1.json", JSON.stringify(results, null,2));
}

async function fetchSemiFinalsLeg2(){
    const results = await rp({
        uri: "https://match.uefa.com/v2/matches?matchId=2029496,2029497&offset=0&limit=2",
        headers: {
            "Referer" : "https://www.uefa.com/",
            "sec-ch-ua-mobile" : '?0',
            "User-Agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
        },
        json: true
    })

    await fs.promises.writeFile("semiFinal2.json", JSON.stringify(results, null,2));
}

function semiFinalLegOneInfo(){
    const matchData = require("./semiFinal1.json");

    const legOneResults = matchData.map((item) => {
        const legOneObject = {};

        legOneObject["Round"] = item.round.metaData.name.toString();
        legOneObject["Match Type"] = item.leg.translations.name.EN.toString();
        legOneObject["Home Team"] = item.homeTeam.internationalName;
        legOneObject["Away Team"] = item.awayTeam.internationalName;
        legOneObject["Home Score"] = item.score.total.home;
        legOneObject["Away Score"] = item.score.total.away;

        return legOneObject;
    })
    return legOneResults;
}

function semiFinalLegTwoInfo(){
    const legTwoData = require("./semiFinal2.json");

    const legTwoResults = legTwoData.map((item) => {
        const legTwoObject = {};

        legTwoObject["Round"] = item.round.metaData.name.toString();
        legTwoObject["Match Type"] = item.leg.translations.name.EN.toString();
        legTwoObject["Home Team"] = item.homeTeam.internationalName;
        legTwoObject["Away Team"] = item.awayTeam.internationalName;
        legTwoObject["Home Score"] = item.score.total.home;
        legTwoObject["Away Score"] = item.score.total.away;
        legTwoObject["Aggregate Home Score"] = item.score.aggregate.home;
        legTwoObject["Aggregate Away Score"] = item.score.aggregate.away;
        legTwoObject["Winner"] = item.winner.aggregate.team.internationalName;


        return legTwoObject;
    })
    return legTwoResults;
}

async function main(){
    // fetchSemiFinalsLeg1();
    // delay();
    // fetchSemiFinalsLeg2();
   // console.log(semiFinalLegTwoInfo())
}



module.exports = {semiFinalLegOneInfo, semiFinalLegTwoInfo};