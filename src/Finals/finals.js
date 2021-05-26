  const rp = require('request-promise-native')
  const fs = require('fs');
  const { resolve } = require('path');

async function fetchFinals(){
    const results = await rp({
        uri: "https://match.uefa.com/v2/matches?matchId=2029498&offset=0&limit=1",
        headers: {
            "Referer" : "https://www.uefa.com/",
            "sec-ch-ua-mobile" : '?0',
            "User-Agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
        },
        json: true
    })
    const fileExists = fs.existsSync("finals.json");
    
    if(fileExists){
        console.log("File already exists!");
        return;
    }

    await fs.promises.writeFile("finals.json", JSON.stringify(results, null,2));
}

function finalMatchInfo(){
    const finalMatchData = require("./finals.json");

    const finalMatchResults = finalMatchData.map((item) => {
        const finalMatchObject = {};
        finalMatchObject["Match Type"] = item.matchday.type;
        finalMatchObject["Match Day"] = item.matchday.dateFrom;
        finalMatchObject["Away Team"] = item.awayTeam.internationalName;
        finalMatchObject["Home Team"] = item.homeTeam.internationalName;
        finalMatchObject["Stadium"] = item.stadium.translations.mediaName.EN;
        finalMatchObject["Country"] = item.stadium.countryCode;
        

        return finalMatchObject;
    })
    return finalMatchResults;
}

async function main(){
    // fetchFinals();
    console.log(finalMatchInfo())
}

module.exports = {finalMatchInfo};