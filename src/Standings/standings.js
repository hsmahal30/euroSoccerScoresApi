const cheerio = require('cheerio') //makes it easier to navigate the DOM use css selector to target elements 
const rp = require('request-promise-native')
const fs = require('fs')


async function downloadUclTableHtml(){
    const uri = 'https://www.uefa.com/uefachampionsleague/standings/'
    const fileName = 'standings.html'

    const fileExists = fs.existsSync(fileName);
    if(fileExists){
        console.log("File already exists")
        return
    }

    console.log(`Dowloading HTML file form ${uri}...`)
    const results =  await rp({uri: uri});

    await fs.promises.writeFile(fileName, results);
}

async function parseStandingsTable(){
    
    const htmlFileName = 'standings.html'
    const html = await fs.promises.readFile(htmlFileName)
    const $ = cheerio.load(html)

    const $trs = $('.table--standings tbody tr')
    const keys = [
        'Club',
        'GP',
        'W',
        'D',
        'L',
        'GF',
        'GA',
        'GD',
        'Pts'
    ]
    
    const tableValues = $trs.toArray().map(tr => {
        const tds = $(tr).find('td').toArray()
        const teams = { }

        let index = 0;
        for (td of tds){
            const $td = $(td)
            let value;
    
             if(keys[index] === 'Club'){
                value = $(td).find('img').attr('title')
            }else{
                value = $td.text().trim()
            }       

            teams[keys[index]] = isNaN(+value) ? value : +value
            index++
        }   
       
        return teams
    })
    // console.log($.html($trs))
    return tableValues
}

async function parseClubInfo(){
    const htmlFileName = 'standings.html'
    const html = await fs.promises.readFile(htmlFileName)
    const $ = cheerio.load(html)

    const $img = $(".table_team-name");
 //console.log($.html($img))
    const imageLinks = $img.toArray().map(id => {
        const srcs = $(id).find('img').toArray()
        const obj = {}
        
        const clubLogo = $(srcs).attr('data-srcset')
        const clubName = $(srcs).attr('title')
        const clubSymbol = $(id).find('span.team-code').text()
        
        if(clubName !== undefined && clubLogo !== undefined && clubSymbol !== undefined){
            obj["Symbol"] = clubSymbol
            obj["Club"] = clubName
            obj["Logo"] = clubLogo  
        }
        
        return obj
    })
    return imageLinks
}

async function main(){
    console.log('Starting...')
    await downloadUclTableHtml()
    const table = await parseStandingsTable()
    const clubInfo = await parseClubInfo()
    
    console.log("Done")

    const clubInfoFiltered = clubInfo.filter(value => Object.keys(value).length !== 0);
}

//main();
await downloadUclTableHtml()
//const table = await parseStandingsTable()
//const clubInfo = await parseClubInfo()

module.exports = {parseStandingsTable, parseClubInfo}