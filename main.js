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

const divisionShort = ["metro", "atlantic", "central", "pacific"];

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
 *
 * @param bets.elias
 * @param bets.elias.division
 * @param bets.elias.division[].name
 * @param bets.elias.division[].rank
 * @param bets.elias.division[].wildcards
 * @param bets.elias.president
 * @param bets.elias.antipresident
 *
 * @param bets.viktor
 * @param bets.viktor.division
 * @param bets.viktor.division[].name
 * @param bets.viktor.division[].rank
 * @param bets.viktor.division[].wildcards
 * @param bets.viktor.president
 * @param bets.viktor.antipresident
 *
 * @type {string}
 */
const bets = `{
    "filip" : {
        "division" : [ {
            "name" : "Metropolitan",
            "rank" : [ 
                "Washington Capitals",
                "Pittsburgh Penguins",
                "New Jersey Devils",
                "Columbus Blue Jackets",
                "Philadelphia Flyers",
                "New York Rangers",
                "New York Islanders",
                "Carolina Hurricanes"
                ],
            "wildcards" : [
                "Columbus Blue Jackets",
                "Philadelphia Flyers"
            ]
        }, {
            "name" : "Atlantic",
            "rank" : [ 
                "Toronto Maple Leafs",
                "Tampa Bay Lightning",
                "Boston Bruins",
                "Florida Panthers",
                "Montréal Canadiens",
                "Buffalo Sabres",
                "Detroit Red Wings",
                "Ottawa Senators"
                ],
            "wildcards" : []
        }, {
            "name" : "Central",
            "rank" : [ 
                "Nashville Predators",
                "Winnipeg Jets",
                "St. Louis Blues",
                "Chicago Blackhawks",
                "Colorado Avalanche",
                "Minnesota Wild",
                "Dallas Stars"
                ],
            "wildcards" : [
                "Chicago Blackhawks"
            ]
        }, {
            "name" : "Pacific",
            "rank" : [ 
                "San Jose Sharks",
                "Vegas Golden Knights",
                "Anaheim Ducks",
                "Edmonton Oilers",
                "Los Angeles Kings",
                "Calgary Flames",
                "Arizona Coyotes",
                "Vancouver Canucks"
                ],
            "wildcards" : [
                "Edmonton Oilers"
            ]
        }],
        "president" : "Nashville Predators",
        "antipresident" : "Vancouver Canucks",
        "mostgoals" : "Nikita Kucherov",
        "mostpoints" : "Connor McDavid",
        "mostshutouts" : "Sergei Bobrovsky",
        "mostwins" : "Pekka Rinne"
    },
    "viktor" : {
        "division" : [ {
            "name" : "Metropolitan",
            "rank" : [ 
                "Philadelphia Flyers",
                "Washington Capitals",
                "Carolina Hurricanes",
                "Columbus Blue Jackets",
                "Pittsburgh Penguins",
                "New Jersey Devils",
                "New York Islanders",
                "New York Rangers"
                ],
            "wildcards" : [
                "Columbus Blue Jackets"
            ]
        }, {
            "name" : "Atlantic",
            "rank" : [ 
                "Toronto Maple Leafs",
                "Tampa Bay Lightning",
                "Boston Bruins",
                "Florida Panthers",
                "Montréal Canadiens",
                "Buffalo Sabres",
                "Ottawa Senators",
                "Detroit Red Wings"
                ],
            "wildcards" : [
                "Florida Panthers"
            ]
        }, {
            "name" : "Central",
            "rank" : [ 
                "Winnipeg Jets",
                "Nashville Predators",
                "St. Louis Blues",
                "Dallas Stars",
                "Colorado Avalanche",
                "Minnesota Wild",
                "Chicago Blackhawks"
                ],
            "wildcards" : [
                "Dallas Stars"
            ]
        }, {
            "name" : "Pacific",
            "rank" : [ 
                "San Jose Sharks",
                "Los Angeles Kings",
                "Vegas Golden Knights",
                "Calgary Flames",
                "Arizona Coyotes",
                "Edmonton Oilers",
                "Vancouver Canucks",
                "Anaheim Ducks"
                ],
            "wildcards" : [
                "Calgary Flames"
            ]
        }],
        "president" : "Toronto Maple Leafs",
        "antipresident" : "Detroit Red Wings",
        "mostgoals" : "Patrik Laine",
        "mostpoints" : "Claude Giroux",
        "mostshutouts" : "Andrei Vasilevskiy",
        "mostwins" : "Frederik Andersen"
    },
    "elias" : {
        "division" : [ {
            "name" : "Metropolitan",
            "rank" : [ 
                "Pittsburgh Penguins",
                "Philadelphia Flyers",
                "Washington Capitals",
                "Carolina Hurricanes",
                "Columbus Blue Jackets",
                "New York Islanders",
                "New Jersey Devils",
                "New York Rangers"
                ],
            "wildcards" : [
                "Carolina Hurricanes",
                "Columbus Blue Jackets"
            ]
        }, {
            "name" : "Atlantic",
            "rank" : [ 
                "Toronto Maple Leafs",
                "Tampa Bay Lightning",
                "Boston Bruins",
                "Buffalo Sabres",
                "Florida Panthers",
                "Montréal Canadiens",
                "Detroit Red Wings",
                "Ottawa Senators"
                ],
            "wildcards" : []
        }, {
            "name" : "Central",
            "rank" : [ 
                "Nashville Predators",
                "Dallas Stars",
                "Winnipeg Jets",
                "St. Louis Blues",
                "Colorado Avalanche",
                "Chicago Blackhawks",
                "Minnesota Wild"
                ],
            "wildcards" : [
                "St. Louis Blues"
            ] }, {
            "name" : "Pacific",
            "rank" : [ 
                "San Jose Sharks",
                "Calgary Flames",
                "Anaheim Ducks",
                "Edmonton Oilers",
                "Vegas Golden Knights",
                "Vancouver Canucks",
                "Arizona Coyotes",
                "Los Angeles Kings"
                ],
            "wildcards" : [
                "Edmonton Oilers"
            ]
        }],
        "president" : "Toronto Maple Leafs",
        "antipresident" : "New York Rangers",
        "mostgoals" : "Auston Matthews",
        "mostpoints" : "Connor McDavid",
        "mostshutouts" : "John Gibson",
        "mostwins" : "Frederik Andersen"
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

    let xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            // Typical action to be performed when the document is ready:
            const parsedLeaders = JSON.parse(xhttp.responseText);

            alert(parsedLeaders.goalie[1].measure);

            execute();
        }
    };
    xhttp.open("GET", "https://www.nhl.com/stats/rest/leaders", true);
    xhttp.send();
}

function unmain() {

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            // Typical action to be performed when the document is ready:
            const parsedLeaders = JSON.parse(xhttp.responseText);

            alert(parsedLeaders.goalie[1].measure);

            execute();
        }
    };
    xhttp.open("GET", "https://www.nhl.com/stats/rest/leaders", true);
    xhttp.send();

}

function generateDivisionRankings(divisionIndex, divisionNumTeams) {

    const exact_color = "#91ff96";
    const adjacent_color = "#fff591";

    for (let i = 0; i < divisionNumTeams; i++) {
        const exact_points = 2;
        const adjacent_points = 1;

        const team = parsedStandings.records[divisionIndex].teamRecords[i];
        let teamName = team.team.name;
        const gp = team.gamesPlayed;
        const pts = team.points;
        const wlo = team.leagueRecord.wins + "-" + team.leagueRecord.losses + "-" + team.leagueRecord.ot;
        const strk = team.streak.streakCode;

        const filipRank = parsedBets.filip.division[divisionIndex].rank;
        const viktorRank = parsedBets.viktor.division[divisionIndex].rank;
        const eliasRank = parsedBets.elias.division[divisionIndex].rank;

        const filipExactName = filipRank[i];
        const viktorExactName = viktorRank[i];
        const eliasExactName = eliasRank[i];

        const divisionShortCurrent = divisionShort[divisionIndex];
        const idIndex = i+1;
        const elementActualId = divisionShortCurrent + "Actual" + idIndex;
        const elementFilipId = divisionShortCurrent + "Filip" + idIndex;
        const elementViktorId = divisionShortCurrent + "Viktor" + idIndex;
        const elementEliasId = divisionShortCurrent + "Elias" + idIndex;
        const teamId = divisionShortCurrent + "StatTeam" + idIndex;
        const gpId = divisionShortCurrent + "GP" + idIndex;
        const ptsId = divisionShortCurrent + "PTS" + idIndex;
        const wloId = divisionShortCurrent + "WLO" + idIndex;
        const strkId = divisionShortCurrent + "STRK" + idIndex;
        const teamElement = document.getElementById(teamId);
        document.getElementById(gpId).innerHTML = gp;
        document.getElementById(ptsId).innerHTML = pts;
        document.getElementById(wloId).innerHTML = wlo;
        document.getElementById(strkId).innerHTML = strk;

        let elementActual = document.getElementById(elementActualId);
        let elementFilip = document.getElementById(elementFilipId);
        let elementViktor = document.getElementById(elementViktorId);
        let elementElias = document.getElementById(elementEliasId);
        const filipBetName = filipRank[i];
        const viktorBetName = viktorRank[i];
        const eliasBetName = eliasRank[i];

        for (let j = i - 1; j <= i + 1; j++) {
            if (j < 0 || j >= divisionNumTeams) continue;

            let points = adjacent_points;
            let color = adjacent_color;
            if (i === j) {
                points = exact_points;
                color = exact_color;
            }

            const adjacentTeamName = parsedStandings.records[divisionIndex].teamRecords[j].team.name;

            if (filipBetName === adjacentTeamName) {
                filipTotalPoints += points;
                filipDivisionScore[divisionIndex] += points;
                if (i === j) elementFilip.style.fontStyle="italic";
                elementFilip.style.color=color;
            }
            if (viktorBetName === adjacentTeamName) {
                viktorTotalPoints += points;
                viktorDivisionScore[divisionIndex] += points;
                if (i === j) elementViktor.style.fontStyle="italic";
                elementViktor.style.color=color;
            }
            if (eliasBetName === adjacentTeamName) {
                eliasTotalPoints += points;
                eliasDivisionScore[divisionIndex] += points;
                if (i === j) elementElias.style.fontStyle="italic";
                elementElias.style.color=color;
            }
        }

        if (screen.width < 350) {
            elementActual.innerHTML = pts + "p - " + acrName.teams[teamName];
            elementFilip.innerHTML = acrName.teams[filipExactName];
            elementViktor.innerHTML = acrName.teams[viktorExactName];
            elementElias.innerHTML = acrName.teams[eliasExactName];
        } else if (screen.width < 750) {
            elementActual.innerHTML = pts + "p - " + shortName.teams[teamName];
            elementFilip.innerHTML = shortName.teams[filipExactName];
            elementViktor.innerHTML = shortName.teams[viktorExactName];
            elementElias.innerHTML = shortName.teams[eliasExactName];
        } else {
            elementActual.innerHTML = pts + " p - " + teamName;
            elementFilip.innerHTML = filipExactName;
            elementViktor.innerHTML = viktorExactName;
            elementElias.innerHTML = eliasExactName;
        }

        if (i < 3) playoffTeams.push(teamName);

        const wildcardRank = team.wildCardRank;
        if (wildcardRank === "1" || wildcardRank === "2") {
            playoffTeams.push(teamName);
            elementActual.style.fontFamily="ralewayHeavy";
        }

        if (parsedBets.filip.division[divisionIndex].wildcards.includes(filipExactName))
            elementFilip.style.fontFamily="ralewayHeavy";
        if (parsedBets.viktor.division[divisionIndex].wildcards.includes(viktorExactName))
            elementViktor.style.fontFamily="ralewayHeavy";
        if (parsedBets.elias.division[divisionIndex].wildcards.includes(eliasExactName))
            elementElias.style.fontFamily="ralewayHeavy";

        if (screen.width < 350) {
            teamName = acrName.teams[teamName];
        }

        const teamWildcardRank = team.wildCardRank;
        if (teamWildcardRank === "1" || teamWildcardRank === "2") {
            teamName += " *";
            teamElement.style.fontFamily = "ralewayHeavy";
        }

        teamElement.innerHTML = idIndex + ". " + teamName;
    }
}

function comparePlayoffTeams() {
    let points = 2;

    for (let divisionIndex = 0; divisionIndex < 4; divisionIndex++) { // Division index
        const filipDivision = parsedBets.filip.division[divisionIndex];
        const filipDivisionRanks = filipDivision.rank;
        const filipDivisionWildcards = filipDivision.wildcards;

        const viktorDivision = parsedBets.viktor.division[divisionIndex];
        const viktorDivisionRanks = viktorDivision.rank;
        const viktorDivisionWildcards = viktorDivision.wildcards;

        const eliasDivision = parsedBets.elias.division[divisionIndex];
        const eliasDivisionRanks = eliasDivision.rank;
        const eliasDivisionWildcards = eliasDivision.wildcards;

        for (let rankIndex = 0; rankIndex < 4; rankIndex++) { // Rank index
            if (playoffTeams.includes(filipDivisionWildcards[rankIndex])) {
                filipTotalPoints += points;
                filipDivisionScore[divisionIndex] += points;
            }
            if (playoffTeams.includes(viktorDivisionWildcards[rankIndex])) {
                viktorTotalPoints += points;
                viktorDivisionScore[divisionIndex] += points;
            }
            if (playoffTeams.includes(eliasDivisionWildcards[rankIndex])) {
                eliasTotalPoints += points;
                eliasDivisionScore[divisionIndex] += points;
            }
            if (rankIndex >= 3) {} else {
                const filipBetName = filipDivisionRanks[rankIndex];
                const viktorBetName = viktorDivisionRanks[rankIndex];
                const eliasBetName = eliasDivisionRanks[rankIndex];

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
        }
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

        const idStart = conferenceElementIdString[conferenceIndex];
        let teamId = idStart + "StatTeam" + conferenceRank;
        let gpId = idStart + "GP" + conferenceRank;
        let ptsId = idStart + "PTS" + conferenceRank;
        let wloId = idStart + "WLO" + conferenceRank;
        let strkId = idStart + "STRK" + conferenceRank;

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

function findTrophies() {
    let trophies = ["", "", "", ""];
    let found = 0;
    let foundPres = 0;
    let foundAnti = 0;
    let foundMostGoals = 0;
    let foundMostPoints = 0;
    let foundMostShutouts = 0;
    let foundMostWins = 0;
    let ctli = 0;

    for (let i = 0; !found && i < 8; i++) {
        let metroRec = parsedStandings.records[metropolitanIndex].teamRecords[i];
        let atlanticRec = parsedStandings.records[atlanticIndex].teamRecords[i];
        if (i === 7) ctli = 6;
        else ctli = i;
        let centralRec = parsedStandings.records[centralIndex].teamRecords[ctli];
        let pacificRec = parsedStandings.records[pacificIndex].teamRecords[i];

        let metroRank = metroRec.leagueRank;
        let atlanticRank = atlanticRec.leagueRank;
        let centralRank = centralRec.leagueRank;
        let pacificRank = pacificRec.leagueRank;

        if (!foundPres) {
            if (metroRank === "1") {
                trophies[0] = metroRec.team.name;
                trophies[2] = metroRec.team.name;
                foundPres = 1;
                continue
            }
            else if (atlanticRank === "1") {
                trophies[0] = atlanticRec.team.name;
                trophies[2] = atlanticRec.team.name;
                foundPres = 1;
                continue
            }
            else if (centralRank === "1") {
                trophies[0] = centralRec.team.name;
                trophies[3] = centralRec.team.name;
                foundPres = 1;
                continue
            }
            else if (pacificRank === "1") {
                trophies[0] = pacificRec.team.name;
                trophies[3] = pacificRec.team.name;
                foundPres = 1;
                continue
            }
        }
        if (!foundAnti) {
            if (metroRank === "31") {
                trophies[1] = metroRec.team.name;
                foundAnti = 1;
                continue
            }
            else if (atlanticRank === "31") {
                trophies[1] = atlanticRec.team.name;
                foundAnti = 1;
                continue
            }
            else if (centralRank === "31") {
                trophies[1] = centralRec.team.name;
                foundAnti = 1;
                continue
            }
            else if (pacificRank === "31") {
                trophies[1] = pacificRec.team.name;
                foundAnti = 1;
                continue
            }
        }

        found = foundPres && foundAnti;
    }

    return trophies;
}

function trophies() {
    let nameStrings = [
        findTrophies(),
        [parsedBets.filip.president, parsedBets.filip.antipresident],
        [parsedBets.viktor.president, parsedBets.viktor.antipresident],
        [parsedBets.elias.president, parsedBets.elias.antipresident]];

    let trophyScores = [[0, 0],[0, 0],[0, 0]];

    const userIdString = ["ActualP", "FilipP", "ViktorP", "EliasP"];
    const trophyString = ["president", "antiPresident"];

    // Trophy loop
    for (let userIndex = 0; userIndex < 4; userIndex++) {
        // User loop
        for (let trophyIndex = 0; trophyIndex < 2; trophyIndex++) {

            let teamName = nameStrings[userIndex][trophyIndex];
            let trophyWinner = nameStrings[0][trophyIndex];
            let trophyElement = document.getElementById(trophyString[trophyIndex] + userIdString[userIndex]);

            if (screen.width < 850) {
                // Use short team names for narrow screens
                teamName = shortName.teams[teamName];
                trophyWinner = shortName.teams[trophyWinner];
            }
            if (userIndex !== 0 && teamName === trophyWinner) {
                trophyElement.style.fontStyle="italic";
                trophyScores[userIndex-1][trophyIndex] += 3;
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
    const divName = divisionNames[divisionIndex];

    if (betStatSelect === 0) {
        primaryBoard = document.getElementById(divName + "Scoreboard");
        primaryBtn = document.getElementById(divName + "BetBtn");
        secondaryBoard = document.getElementById(divName + "Statboard");
        secondaryBtn = document.getElementById(divName + "StatBtn");
    } else {
        primaryBoard = document.getElementById(divName + "Statboard");
        primaryBtn = document.getElementById(divName + "StatBtn");
        secondaryBoard = document.getElementById(divName + "Scoreboard");
        secondaryBtn = document.getElementById(divName + "BetBtn");
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
    let primarySection, secondarySection;
    let primaryBtn, secondaryBtn;

    if (viewSelection === 0) {
        primarySection = document.getElementById("divisionsSection");
        primaryBtn = document.getElementById("divisionsBtn");
        secondarySection = document.getElementById("conferencesSection");
        secondaryBtn = document.getElementById("conferencesBtn");
    } else {
        primarySection = document.getElementById("conferencesSection");
        primaryBtn = document.getElementById("conferencesBtn");
        secondarySection = document.getElementById("divisionsSection");
        secondaryBtn = document.getElementById("divisionsBtn");
    }

    primarySection.style.display = "block";
    let primButtonStyle = primaryBtn.style;
    primButtonStyle.color = "white";
    primButtonStyle.webkitTextStrokeColor = "#ee5f60";
    primButtonStyle.transform = "scale(1.1)";

    let secButtonStyle = secondaryBtn.style;
    secondarySection.style.display = "none";
    secButtonStyle.color = "#827e8c";
    secButtonStyle.webkitTextStrokeColor = "transparent";
    secButtonStyle.transform = "scale(0.9)";
}

function execute() {
    let test = ( new Date() ).getTime();
    
    filipTotalPoints = 0;
    viktorTotalPoints = 0;
    eliasTotalPoints = 0;

    filipDivisionScore = [0, 0, 0, 0];
    viktorDivisionScore = [0, 0, 0, 0];
    eliasDivisionScore = [0, 0, 0, 0];

    generateDivisionRankings(metropolitanIndex, metropolitanNumTeams);
    generateDivisionRankings(atlanticIndex, atlanticNumTeams);
    generateDivisionRankings(centralIndex, centralNumTeams);
    generateDivisionRankings(pacificIndex, pacificNumTeams);

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

    document.getElementById("mainContent").style.opacity = "1";

    console.log( ( new Date() ).getTime() - test );
}
