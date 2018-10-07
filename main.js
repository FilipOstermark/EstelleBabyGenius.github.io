/**
 * @desc    Parsed NHL stats API JSON.
 *
 * @param parsedStandings.records[]                                     Records root.
 * @param parsedStandings.records[].teamRecords[]                       Team records.
 * @param parsedStandings.records[].teamRecords[].leagueRank            Team league rank.
 * @param parsedStandings.records[].teamRecords[].team                  Team info.
 * @param parsedStandings.records[].teamRecords[].conferenceRank        Team conference rank.
 * @param parsedStandings.records[].teamRecords[].wildCardRank          Team wildcard rank.
 * @param parsedStandings.records[].teamRecords[].gamesPlayed           Team games played.
 * @param parsedStandings.records[].teamRecords[].leagueRecord.wins     Team wins.
 * @param parsedStandings.records[].teamRecords[].leagueRecord.losses   Team losses.
 * @param parsedStandings.records[].teamRecords[].leagueRecord.ot       Team OT losses.
 * @param parsedStandings.records[].teamRecords[].streak.streakCode     Team streak code.
 *
 * @type {object}
 */
let parsedStandings;

let metropolitanNumTeams = 8;
let atlanticNumTeams = 8;
let centralNumTeams = 7;
let pacificNumTeams = 8;

let filipTotalPoints = 0;
let viktorTotalPoints = 0;
let eliasTotalPoints = 0;

let filipDivisionScore = [0, 0, 0, 0];
let viktorDivisionScore = [0, 0, 0, 0];
let eliasDivisionScore = [0, 0, 0, 0];

const metropolitanIndex = 0;
const atlanticIndex = 1;
const centralIndex = 2;
const pacificIndex = 3;

let playoffTeams = [];

const shortName = {
    "teams" : {
        "New Jersey Devils" : "New Jersey",
        "New York Islanders" : "N.Y.I.",
        "New York Rangers" : "N.Y.R.",
        "Philadelphia Flyers" : "Philadelphia",
        "Pittsburgh Penguins" : "Pittsburgh",
        "Boston Bruins" : "Boston",
        "Buffalo Sabres" : "Buffalo",
        "Montréal Canadiens" : "Montréal",
        "Ottawa Senators" : "Ottawa",
        "Toronto Maple Leafs" : "Toronto",
        "Carolina Hurricanes" : "Carolina",
        "Florida Panthers" : "Florida",
        "Tampa Bay Lightning" : "Tampa Bay",
        "Washington Capitals" : "Washington",
        "Chicago Blackhawks" : "Chicago",
        "Detroit Red Wings" : "Detroit",
        "Nashville Predators" : "Nashville",
        "St. Louis Blues" : "St. Louis",
        "Calgary Flames" : "Calgary",
        "Colorado Avalanche" : "Colorado",
        "Edmonton Oilers" : "Edmonton",
        "Vancouver Canucks" : "Vancouver",
        "Anaheim Ducks" : "Anaheim",
        "Dallas Stars" : "Dallas",
        "Los Angeles Kings" : "L.A.",
        "San Jose Sharks" : "San Jose",
        "Columbus Blue Jackets" : "Columbus",
        "Minnesota Wild" : "Minnesota",
        "Winnipeg Jets" : "Winnipeg",
        "Arizona Coyotes" : "Arizona",
        "Vegas Golden Knights" : "Vegas"
    }
};

const acrName = {
    "teams" : {
        "New Jersey Devils" : "NJD",
        "New York Islanders" : "NYI",
        "New York Rangers" : "NYR",
        "Philadelphia Flyers" : "PHI",
        "Pittsburgh Penguins" : "PIT",
        "Boston Bruins" : "BOS",
        "Buffalo Sabres" : "BUF",
        "Montréal Canadiens" : "MTL",
        "Ottawa Senators" : "OTT",
        "Toronto Maple Leafs" : "TOR",
        "Carolina Hurricanes" : "CAR",
        "Florida Panthers" : "FLA",
        "Tampa Bay Lightning" : "TBL",
        "Washington Capitals" : "WSH",
        "Chicago Blackhawks" : "CHI",
        "Detroit Red Wings" : "DET",
        "Nashville Predators" : "NSH",
        "St. Louis Blues" : "STL",
        "Calgary Flames" : "CGY",
        "Colorado Avalanche" : "COL",
        "Edmonton Oilers" : "EDM",
        "Vancouver Canucks" : "VAN",
        "Anaheim Ducks" : "ANA",
        "Dallas Stars" : "DAL",
        "Los Angeles Kings" : "LAK",
        "San Jose Sharks" : "SJS",
        "Columbus Blue Jackets" : "CBJ",
        "Minnesota Wild" : "MIN",
        "Winnipeg Jets" : "WPG",
        "Arizona Coyotes" : "ARI",
        "Vegas Golden Knights" : "VGK"
    }
};

/**
 * @param bets.filip
 * @param bets.filip.division
 * @param bets.filip.division[].name
 * @param bets.filip.division[].rank
 * @param bets.filip.division[].wildcards
 * @param bets.filip.president
 * @param bets.filip.antipresident
 * @param bets.filip.prince
 * @param bets.filip.clarence
 *
 * @param bets.elias
 * @param bets.elias.division
 * @param bets.elias.division[].name
 * @param bets.elias.division[].rank
 * @param bets.elias.division[].wildcards
 * @param bets.elias.president
 * @param bets.elias.antipresident
 * @param bets.elias.prince
 * @param bets.elias.clarenc
 *
 * @param bets.viktor
 * @param bets.viktor.division
 * @param bets.viktor.division[].name
 * @param bets.viktor.division[].rank
 * @param bets.viktor.division[].wildcards
 * @param bets.viktor.president
 * @param bets.viktor.antipresident
 * @param bets.viktor.prince
 * @param bets.viktor.clarenc
 *
 * @type {string}
 */
const bets = `{
    "filip" : {
        "division" : [ {
            "name" : "Metropolitan",
            "rank" : [ 
                "Pittsburgh Penguins",
                "Columbus Blue Jackets",
                "New York Rangers",
                "Washington Capitals",
                "New York Islanders",
                "Philadelphia Flyers",
                "New Jersey Devils",
                "Carolina Hurricanes"
                ],
            "wildcards" : [
                "Washington Capitals"
            ]
        }, {
            "name" : "Atlantic",
            "rank" : [ 
                "Ottawa Senators",
                "Boston Bruins",
                "Montréal Canadiens",
                "Toronto Maple Leafs",
                "Florida Panthers",
                "Tampa Bay Lightning",
                "Buffalo Sabres",
                "Detroit Red Wings"
                ],
            "wildcards" : [
                "Toronto Maple Leafs"
            ]
        }, {
            "name" : "Central",
            "rank" : [ 
                "Nashville Predators",
                "Minnesota Wild",
                "Chicago Blackhawks",
                "Winnipeg Jets",
                "St. Louis Blues",
                "Dallas Stars",
                "Colorado Avalanche"
                ],
            "wildcards" : [
                "Winnipeg Jets",
                "St. Louis Blues"
            ]
        }, {
            "name" : "Pacific",
            "rank" : [ 
                "Edmonton Oilers",
                "Anaheim Ducks",
                "San Jose Sharks",
                "Los Angeles Kings",
                "Calgary Flames",
                "Vegas Golden Knights",
                "Vancouver Canucks",
                "Arizona Coyotes"
                ],
            "wildcards" : []
        }],
        "president" : "Pittsburgh Penguins",
        "antipresident" : "Colorado Avalanche",
        "prince" : "Pittsburgh Penguins",
        "clarence" : "Chicago Blackhawks"
    },
    "viktor" : {
        "division" : [ {
            "name" : "Metropolitan",
            "rank" : [ 
                "Carolina Hurricanes",
                "Pittsburgh Penguins",
                "Columbus Blue Jackets",
                "New York Rangers",
                "Philadelphia Flyers",
                "Washington Capitals",
                "New York Islanders",
                "New Jersey Devils"
                ],
            "wildcards" : [
                "New York Rangers",
                "Philadelphia Flyers"
            ]
        }, {
            "name" : "Atlantic",
            "rank" : [ 
                "Tampa Bay Lightning",
                "Toronto Maple Leafs",
                "Montréal Canadiens",
                "Buffalo Sabres",
                "Boston Bruins",
                "Ottawa Senators",
                "Florida Panthers",
                "Detroit Red Wings"
                ],
            "wildcards" : []
        }, {
            "name" : "Central",
            "rank" : [ 
                "Dallas Stars",
                "Nashville Predators",
                "Winnipeg Jets",
                "Minnesota Wild",
                "Chicago Blackhawks",
                "St. Louis Blues",
                "Colorado Avalanche"
                ],
            "wildcards" : [
                "Minnesota Wild"
            ]
        }, {
            "name" : "Pacific",
            "rank" : [ 
                "Edmonton Oilers",
                "Calgary Flames",
                "Anaheim Ducks",
                "Los Angeles Kings",
                "Arizona Coyotes",
                "San Jose Sharks",
                "Vegas Golden Knights",
                "Vancouver Canucks"
                ],
            "wildcards" : [
                "Los Angeles Kings"
            ]
        }],
        "president" : "Dallas Stars",
        "antipresident" : "Vancouver Canucks",
        "prince" : "Tampa Bay Lightning",
        "clarence" : "Minnesota Wild"
    },
    "elias" : {
        "division" : [ {
            "name" : "Metropolitan",
            "rank" : [ 
                "Pittsburgh Penguins",
                "Washington Capitals",
                "Carolina Hurricanes",
                "New York Rangers",
                "Philadelphia Flyers",
                "Columbus Blue Jackets",
                "New York Islanders",
                "New Jersey Devils"
                ],
            "wildcards" : [
                "New York Rangers",
                "Philadelphia Flyers"
            ]
        }, {
            "name" : "Atlantic",
            "rank" : [ 
                "Tampa Bay Lightning",
                "Toronto Maple Leafs",
                "Montréal Canadiens",
                "Buffalo Sabres",
                "Ottawa Senators",
                "Boston Bruins",
                "Detroit Red Wings",
                "Florida Panthers"
                ],
            "wildcards" : []
        }, {
            "name" : "Central",
            "rank" : [ 
                "Dallas Stars",
                "Nashville Predators",
                "Minnesota Wild",
                "Winnipeg Jets",
                "Chicago Blackhawks",
                "St. Louis Blues",
                "Colorado Avalanche"
                ],
            "wildcards" : [
                "Winnipeg Jets",
                "Chicago Blackhawks"
            ] }, {
            "name" : "Pacific",
            "rank" : [ 
                "Anaheim Ducks",
                "Edmonton Oilers",
                "Calgary Flames",
                "San Jose Sharks",
                "Arizona Coyotes",
                "Los Angeles Kings",
                "Vancouver Canucks",
                "Vegas Golden Knights"
                ],
            "wildcards" : []
        }],
        "president" : "Pittsburgh Penguins",
        "antipresident" : "Vegas Golden Knights",
        "prince" : "Tampa Bay Lightning",
        "clarence" : "Edmonton Oilers"
    }
}`;

let parsedBets = JSON.parse(bets);

function main() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            // Typical action to be performed when the document is ready:
            parsedStandings = JSON.parse(xhttp.responseText);

            execute();
        }
    };
    xhttp.open("GET", "https://statsapi.web.nhl.com/api/v1/standings", true);
    xhttp.send();
}

function generateDivisionRankings(divisionIndex, divisionNumTeams) {
    const elementIdString = ["metro", "atlantic", "central", "pacific"];

    for (let i = 0; i < divisionNumTeams; i++) {
        let teamName = parsedStandings.records[divisionIndex].teamRecords[i].team.name;
        let teamPts = parsedStandings.records[divisionIndex].teamRecords[i].points;
        let filipBetName = parsedBets.filip.division[divisionIndex].rank[i];
        let viktorBetName = parsedBets.viktor.division[divisionIndex].rank[i];
        let eliasBetName = parsedBets.elias.division[divisionIndex].rank[i];

        let elementActualId = elementIdString[divisionIndex] + "Actual" + (i+1);
        let elementFilipId = elementIdString[divisionIndex] + "Filip" + (i+1);
        let elementViktorId = elementIdString[divisionIndex] + "Viktor" + (i+1);
        let elementEliasId = elementIdString[divisionIndex] + "Elias" + (i+1);

        let elementActual = document.getElementById(elementActualId);
        let elementFilip = document.getElementById(elementFilipId);
        let elementViktor = document.getElementById(elementViktorId);
        let elementElias = document.getElementById(elementEliasId);

        if (screen.width < 350) {
            elementActual.innerHTML = teamPts + "p - " + acrName.teams[teamName];
            elementFilip.innerHTML = acrName.teams[filipBetName];
            elementViktor.innerHTML = acrName.teams[viktorBetName];
            elementElias.innerHTML = acrName.teams[eliasBetName];
        } else if (screen.width < 750) {
            elementActual.innerHTML = teamPts + "p - " + shortName.teams[teamName];
            elementFilip.innerHTML = shortName.teams[filipBetName];
            elementViktor.innerHTML = shortName.teams[viktorBetName];
            elementElias.innerHTML = shortName.teams[eliasBetName];
        }else {
            elementActual.innerHTML = teamPts + " p - " + teamName;
            elementFilip.innerHTML = filipBetName;
            elementViktor.innerHTML = viktorBetName;
            elementElias.innerHTML = eliasBetName;
        }

        if (i < 3) playoffTeams.push(teamName);

        if (parsedStandings.records[divisionIndex].teamRecords[i].wildCardRank === "1" ||
            parsedStandings.records[divisionIndex].teamRecords[i].wildCardRank === "2") {
            playoffTeams.push(teamName);
            elementActual.style.fontFamily="ralewayHeavy";
        }

        if (parsedBets.filip.division[divisionIndex].wildcards.includes(filipBetName))
            elementFilip.style.fontFamily="ralewayHeavy";
        if (parsedBets.viktor.division[divisionIndex].wildcards.includes(viktorBetName))
            elementViktor.style.fontFamily="ralewayHeavy";
        if (parsedBets.elias.division[divisionIndex].wildcards.includes(eliasBetName))
            elementElias.style.fontFamily="ralewayHeavy";

        if (teamName === filipBetName) elementFilip.style.fontStyle="italic";
        if (teamName === viktorBetName) elementViktor.style.fontStyle="italic";
        if (teamName === eliasBetName) elementElias.style.fontStyle="italic";
    }
}

function compareDivisionRankings(divisionIndex, divisionNumTeams) {
    for (let i = 0; i < divisionNumTeams; i++) {
        let teamName = parsedStandings.records[divisionIndex].teamRecords[i].team.name;
        let filipBetName = parsedBets.filip.division[divisionIndex].rank[i];
        let viktorBetName = parsedBets.viktor.division[divisionIndex].rank[i];
        let eliasBetName = parsedBets.elias.division[divisionIndex].rank[i];
        let points = 1;

        if (filipBetName === teamName) {
            filipTotalPoints += points;
            filipDivisionScore[divisionIndex] += points;
        }
        if (viktorBetName === teamName) {
            viktorTotalPoints += points;
            viktorDivisionScore[divisionIndex] += points;
        }
        if (eliasBetName === teamName) {
            eliasTotalPoints += points;
            eliasDivisionScore[divisionIndex] += points;
        }
    }
}

function comparePlayoffTeams() {
    let points = 2;

    for (let divisionIndex = 0; divisionIndex < 4; divisionIndex++) { // Division index
        for (let rankIndex = 0; rankIndex < 3; rankIndex++) { // Rank index

            const filipBetName = parsedBets.filip.division[divisionIndex].rank[rankIndex];
            const viktorBetName = parsedBets.viktor.division[divisionIndex].rank[rankIndex];
            const eliasBetName = parsedBets.elias.division[divisionIndex].rank[rankIndex];

            // Filip
            if (playoffTeams.includes(filipBetName)) {
                filipDivisionScore[divisionIndex] += points;
                filipTotalPoints += points;
            }
            // Viktor
            if (playoffTeams.includes(viktorBetName)) {
                viktorDivisionScore[divisionIndex] += points;
                viktorTotalPoints += points;
            }
            // Elias
            if (playoffTeams.includes(eliasBetName)) {
                eliasDivisionScore[divisionIndex] += points;
                eliasTotalPoints += points;
            }
        }

        // Wild Cards
        for (let wildCardIndex = 0; wildCardIndex < 4; wildCardIndex++) { // Wild card index
            if (playoffTeams.includes(parsedBets.filip.division[divisionIndex].wildcards[wildCardIndex])) {
                filipTotalPoints += points;
                filipDivisionScore[divisionIndex] += points;
            }
            if (playoffTeams.includes(parsedBets.viktor.division[divisionIndex].wildcards[wildCardIndex])) {
                viktorTotalPoints += points;
                viktorDivisionScore[divisionIndex] += points;
            }
            if (playoffTeams.includes(parsedBets.elias.division[divisionIndex].wildcards[wildCardIndex])) {
                eliasTotalPoints += points;
                eliasDivisionScore[divisionIndex] += points;
            }
        }
    }
}

function generateStatboard(divisionIndex, divisionNumTeams) {
    const elementIdString = ["metro", "atlantic", "central", "pacific"];

    for (let i = 0; i < divisionNumTeams; i++) {
        let team = parsedStandings.records[divisionIndex].teamRecords[i];
        let teamName = team.team.name;
        if (screen.width < 350) {
            teamName = acrName.teams[teamName];
        }
        let gp = team.gamesPlayed;
        let pts = team.points;
        let wlo = team.leagueRecord.wins + "-" + team.leagueRecord.losses + "-" + team.leagueRecord.ot;
        let strk = team.streak.streakCode;

        let teamId = elementIdString[divisionIndex] + "StatTeam" + (i+1);
        let gpId = elementIdString[divisionIndex] + "GP" + (i+1);
        let ptsId = elementIdString[divisionIndex] + "PTS" + (i+1);
        let wloId = elementIdString[divisionIndex] + "WLO" + (i+1);
        let strkId = elementIdString[divisionIndex] + "STRK" + (i+1);

        if (team.wildCardRank === "1" || team.wildCardRank === "2") {
            teamName += " *";
            document.getElementById(teamId).style.fontFamily = "ralewayHeavy";
        }

        document.getElementById(teamId).innerHTML = (i+1) + ". " + teamName;
        document.getElementById(gpId).innerHTML = gp;
        document.getElementById(ptsId).innerHTML = pts;
        document.getElementById(wloId).innerHTML = wlo;
        document.getElementById(strkId).innerHTML = strk;
    }
}

function generateConferenceStatboard(conferenceIndex, firstDivNumTeams, secDivNumTeams) {
    // Eastern Conference index = 0, Western Conference index = 1

    let conferenceElementIdString = ["eastern", "western"];
    let divisionIndex = conferenceIndex*2;

    let i = 0;
    for (let j = 0; j < firstDivNumTeams + secDivNumTeams; j++) {
        if (j === firstDivNumTeams) {
            divisionIndex++;
            i = 0;
        }

        let team = parsedStandings.records[divisionIndex].teamRecords[i];
        let teamName = team.team.name;
        if (screen.width < 350) {
            teamName = acrName.teams[teamName];
        }
        if (team.wildCardRank === "1" || team.wildCardRank === "2") {
            teamName += " *";
        }

        let gp = team.gamesPlayed;
        let pts = team.points;
        let wlo = team.leagueRecord.wins + "-" + team.leagueRecord.losses + "-" + team.leagueRecord.ot;
        let strk = team.streak.streakCode;
        let conferenceRank = team.conferenceRank;

        let teamId = conferenceElementIdString[conferenceIndex] + "StatTeam" + conferenceRank;
        let gpId = conferenceElementIdString[conferenceIndex] + "GP" + conferenceRank;
        let ptsId = conferenceElementIdString[conferenceIndex] + "PTS" + conferenceRank;
        let wloId = conferenceElementIdString[conferenceIndex] + "WLO" + conferenceRank;
        let strkId = conferenceElementIdString[conferenceIndex] + "STRK" + conferenceRank;

        let leagueRank = team.leagueRank;
        let teamIdLeague = "leagueStatTeam" + leagueRank;
        let gpIdLeague = "leagueGP" + leagueRank;
        let ptsIdLeague = "leaguePTS" + leagueRank;
        let wloIdLeague = "leagueWLO" + leagueRank;
        let strkIdLeague = "leagueSTRK" + leagueRank;

        document.getElementById(teamId).innerHTML = conferenceRank + ". " + teamName;
        document.getElementById(gpId).innerHTML = gp;
        document.getElementById(ptsId).innerHTML = pts;
        document.getElementById(wloId).innerHTML = wlo;
        document.getElementById(strkId).innerHTML = strk;

        document.getElementById(teamIdLeague).innerHTML = leagueRank + ". " + teamName;
        document.getElementById(gpIdLeague).innerHTML = gp;
        document.getElementById(ptsIdLeague).innerHTML = pts;
        document.getElementById(wloIdLeague).innerHTML = wlo;
        document.getElementById(strkIdLeague).innerHTML = strk;

        if (playoffTeams.includes(team.team.name)) {
            document.getElementById(teamId).style.fontFamily = "ralewayHeavy";
            document.getElementById(teamIdLeague).style.fontFamily = "ralewayHeavy";
        }

        i++;
    }
}

function findPresident() {
    for (let i = 0; i < metropolitanNumTeams; i++) {
        if (parsedStandings.records[metropolitanIndex].teamRecords[i].leagueRank === "1")
            return parsedStandings.records[metropolitanIndex].teamRecords[i].team.name;
    }
    for (let i = 0; i < atlanticNumTeams; i++) {
        if (parsedStandings.records[atlanticIndex].teamRecords[i].leagueRank === "1")
            return parsedStandings.records[atlanticIndex].teamRecords[i].team.name;
    }
    for (let i = 0; i < centralNumTeams; i++) {
        if (parsedStandings.records[centralIndex].teamRecords[i].leagueRank === "1")
            return parsedStandings.records[centralIndex].teamRecords[i].team.name;
    }
    for (let i = 0; i < pacificNumTeams; i++) {
        if (parsedStandings.records[pacificIndex].teamRecords[i].leagueRank === "1")
            return parsedStandings.records[pacificIndex].teamRecords[i].team.name;
    }
}

function findAntiPresident() {
    for (let i = 0; i < metropolitanNumTeams; i++) {
        if (parsedStandings.records[metropolitanIndex].teamRecords[i].leagueRank === "31")
            return parsedStandings.records[metropolitanIndex].teamRecords[i].team.name;
    }
    for (let i = 0; i < atlanticNumTeams; i++) {
        if (parsedStandings.records[atlanticIndex].teamRecords[i].leagueRank === "31")
            return parsedStandings.records[atlanticIndex].teamRecords[i].team.name;
    }
    for (let i = 0; i < centralNumTeams; i++) {
        if (parsedStandings.records[centralIndex].teamRecords[i].leagueRank === "31")
            return parsedStandings.records[centralIndex].teamRecords[i].team.name;
    }
    for (let i = 0; i < pacificNumTeams; i++) {
        if (parsedStandings.records[pacificIndex].teamRecords[i].leagueRank === "31")
            return parsedStandings.records[pacificIndex].teamRecords[i].team.name;
    }
}

function findPrinceOfWales() {
    // Eastern
    for (let i = 0; i < metropolitanNumTeams; i++) {
        if (parsedStandings.records[metropolitanIndex].teamRecords[i].conferenceRank === "1")
            return parsedStandings.records[metropolitanIndex].teamRecords[i].team.name;
    }
    for (let i = 0; i < atlanticNumTeams; i++) {
        if (parsedStandings.records[atlanticIndex].teamRecords[i].conferenceRank === "1")
            return parsedStandings.records[atlanticIndex].teamRecords[i].team.name;
    }
}

function findClarenceSCambell() {
    // Western
    for (let i = 0; i < centralNumTeams; i++) {
        if (parsedStandings.records[centralIndex].teamRecords[i].conferenceRank === "1")
            return parsedStandings.records[centralIndex].teamRecords[i].team.name;
    }
    for (let i = 0; i < pacificNumTeams; i++) {
        if (parsedStandings.records[pacificIndex].teamRecords[i].conferenceRank === "1")
            return parsedStandings.records[pacificIndex].teamRecords[i].team.name;
    }
}

function trophies() {
    let nameStrings = [
        [findPresident(), findAntiPresident(), findPrinceOfWales(), findClarenceSCambell()],
        [parsedBets.filip.president, parsedBets.filip.antipresident, parsedBets.filip.prince, parsedBets.filip.clarence],
        [parsedBets.viktor.president, parsedBets.viktor.antipresident, parsedBets.viktor.prince, parsedBets.viktor.clarence],
        [parsedBets.elias.president, parsedBets.elias.antipresident, parsedBets.elias.prince, parsedBets.elias.clarence]];

    let trophyScores = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];

    const userIdString = ["ActualP", "FilipP", "ViktorP", "EliasP"];
    const trophyString = ["president", "antiPresident", "prince", "clarence"];

    // Trophy loop
    for (let trophyIndex = 0; trophyIndex < 4; trophyIndex++) {
        // User loop
        for (let userIndex = 0; userIndex < 4; userIndex++) {

            let teamName = nameStrings[trophyIndex][userIndex];
            let trophyWinner = nameStrings[0][userIndex];
            let trophyElement = document.getElementById(trophyString[userIndex] + userIdString[trophyIndex]);

            if (screen.width < 850) {
                // Use short team names for narrow screens
                teamName = shortName.teams[teamName];
                trophyWinner = shortName.teams[trophyWinner];
            }
            if (trophyIndex !== 0 && teamName === trophyWinner) {
                trophyElement.style.fontStyle="italic";
                trophyScores[trophyIndex-1][userIndex] += 3;
            }

            trophyElement.innerHTML = teamName;
        }
    }

    filipTotalPoints += trophyScores[0].reduce(add, 0);
    viktorTotalPoints += trophyScores[1].reduce(add, 0);
    eliasTotalPoints += trophyScores[2].reduce(add, 0);

    return trophyScores;
}

function add(a, b) {
    return a + b;
}

function toggleBetStat(divisionIndex, betStatSelect) {
    const divisionNames = ["metro", "atlantic", "central", "pacific"];
    let primaryBoard, secondaryBoard;
    let primaryBtn, secondaryBtn;

    if (betStatSelect === 0) {
        primaryBoard = document.getElementById(divisionNames[divisionIndex] + "Scoreboard");
        primaryBtn = document.getElementById(divisionNames[divisionIndex] + "BetBtn");
        secondaryBoard = document.getElementById(divisionNames[divisionIndex] + "Statboard");
        secondaryBtn = document.getElementById(divisionNames[divisionIndex] + "StatBtn");
    } else {
        primaryBoard = document.getElementById(divisionNames[divisionIndex] + "Statboard");
        primaryBtn = document.getElementById(divisionNames[divisionIndex] + "StatBtn");
        secondaryBoard = document.getElementById(divisionNames[divisionIndex] + "Scoreboard");
        secondaryBtn = document.getElementById(divisionNames[divisionIndex] + "BetBtn");
    }

    primaryBoard.style.display = "flex";
    primaryBtn.style.color = "white";
    primaryBtn.style.webkitTextStrokeColor = "#ee5f60";
    primaryBtn.style.transform = "scale(1.1)";

    secondaryBoard.style.display = "none";
    secondaryBtn.style.color = "#827e8c";
    secondaryBtn.style.webkitTextStrokeColor = "transparent";
    secondaryBtn.style.transform = "scale(0.9)";
}

function toggleView(viewSelection) {
    const sectionNames = ["divisions", "conferences"];
    let primarySection, secondarySection;
    let primaryBtn, secondaryBtn;

    if (viewSelection === 0) {
        primarySection = document.getElementById(sectionNames[0] + "Section");
        primaryBtn = document.getElementById(sectionNames[0] + "Btn");
        secondarySection = document.getElementById(sectionNames[1] + "Section");
        secondaryBtn = document.getElementById(sectionNames[1] + "Btn");
    } else {
        primarySection = document.getElementById(sectionNames[1] + "Section");
        primaryBtn = document.getElementById(sectionNames[1] + "Btn");
        secondarySection = document.getElementById(sectionNames[0] + "Section");
        secondaryBtn = document.getElementById(sectionNames[0] + "Btn");
    }

    primarySection.style.display = "block";
    primaryBtn.style.color = "white";
    primaryBtn.style.webkitTextStrokeColor = "#ee5f60";
    primaryBtn.style.transform = "scale(1.1)";

    secondarySection.style.display = "none";
    secondaryBtn.style.color = "#827e8c";
    secondaryBtn.style.webkitTextStrokeColor = "transparent";
    secondaryBtn.style.transform = "scale(0.9)";
}

function execute() {
    filipTotalPoints = 0;
    viktorTotalPoints = 0;
    eliasTotalPoints = 0;

    filipDivisionScore = [0, 0, 0, 0];
    viktorDivisionScore = [0, 0, 0, 0];
    eliasDivisionScore = [0, 0, 0, 0];

    compareDivisionRankings(metropolitanIndex, metropolitanNumTeams);
    compareDivisionRankings(atlanticIndex, atlanticNumTeams);
    compareDivisionRankings(centralIndex, centralNumTeams);
    compareDivisionRankings(pacificIndex, pacificNumTeams);

    generateDivisionRankings(metropolitanIndex, metropolitanNumTeams);
    generateDivisionRankings(atlanticIndex, atlanticNumTeams);
    generateDivisionRankings(centralIndex, centralNumTeams);
    generateDivisionRankings(pacificIndex, pacificNumTeams);

    generateStatboard(metropolitanIndex, metropolitanNumTeams);
    generateStatboard(atlanticIndex, atlanticNumTeams);
    generateStatboard(centralIndex, centralNumTeams);
    generateStatboard(pacificIndex, pacificNumTeams);

    generateConferenceStatboard(0, metropolitanNumTeams, atlanticNumTeams);
    generateConferenceStatboard(1, centralNumTeams, pacificNumTeams);

    comparePlayoffTeams();

    let trophyScoreSet = trophies();

    let filipTrophyScoreSum = trophyScoreSet[0].reduce(add, 0);
    let viktorTrophyScoreSum = trophyScoreSet[1].reduce(add, 0);
    let eliasTrophyScoreSum = trophyScoreSet[2].reduce(add, 0);

    document.getElementById("trophySummaryFilipP").innerHTML = "<b>" + filipTrophyScoreSum + " p</b>";
    document.getElementById("trophySummaryViktorP").innerHTML = "<b>" + viktorTrophyScoreSum + " p</b>";
    document.getElementById("trophySummaryEliasP").innerHTML = "<b>" + eliasTrophyScoreSum + " p</b>";

    document.getElementById("filipTotal").innerHTML = filipTotalPoints + " p";
    document.getElementById("viktorTotal").innerHTML = viktorTotalPoints + " p";
    document.getElementById("eliasTotal").innerHTML = eliasTotalPoints + " p";

    const divisionShort = ["metro", "atlantic", "central", "pacific"];
    for (let divisionIndex = 0; divisionIndex < 4; divisionIndex++) {
        document.getElementById(divisionShort[divisionIndex] + "FilipScore").innerHTML = filipDivisionScore[divisionIndex] + " p";
        document.getElementById(divisionShort[divisionIndex] + "ViktorScore").innerHTML = viktorDivisionScore[divisionIndex] + " p";
        document.getElementById(divisionShort[divisionIndex] + "EliasScore").innerHTML = eliasDivisionScore[divisionIndex] + " p";

        toggleBetStat(divisionIndex, 0);
        toggleView(0);
    }

    let leaderCrowns = [
        document.getElementById("filipLeaderCrown"),
        document.getElementById("viktorLeaderCrown"),
        document.getElementById("eliasLeaderCrown")];
    if (filipTotalPoints === Math.max(filipTotalPoints, viktorTotalPoints, eliasTotalPoints)) leaderCrowns[0].style.opacity="1";
    if (viktorTotalPoints === Math.max(filipTotalPoints, viktorTotalPoints, eliasTotalPoints)) leaderCrowns[1].style.opacity="1";
    if (eliasTotalPoints === Math.max(filipTotalPoints, viktorTotalPoints, eliasTotalPoints)) leaderCrowns[2].style.opacity="1";

    const sectionIds = ["leagueSection", "viewSection", "metropolitanSection", "atlanticSection", "centralSection", "pacificSection", "easternSection", "westernSection", "leagueStatSection", "trophySection"];

    for (let sectionIndex = 0; sectionIndex < sectionIds.length; sectionIndex++) {
        document.getElementById(sectionIds[sectionIndex]).style.opacity = "0.85";
    }
}
