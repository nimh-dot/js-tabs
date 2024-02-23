const linesAPI = 'https://api.tfl.gov.uk/line/mode/tube';
const stationsAPI = 'https://api.tfl.gov.uk/line/insert/arrivals';
const stationSet = new Set();


// get array of lines
async function getLines (url) {
    const lines = [];
    try {
        const response = await fetch(url);
        const data = await response.json();
        

        for (let line of data){
            lines.push(line.id)
        }

    } catch(err) {
        alert(err);
    }

    return lines
}

// get set of Underground Stations
async function getStations (linesURL, stationsURL) {
    const lineData = await getLines(linesURL);

    for (let line of lineData) {
        let url = stationsURL.replace('insert', line)

        try {
            const response = await fetch(url);
            const data = await response.json();
    
            for (let station of data){
                stationSet.add(station.stationName.replace(' Underground Station',''))
            }

        } catch(err) {
            alert(err);
        }
    }
}

getStations(linesAPI, stationsAPI)

let input = document.querySelector(".input");
let predictions = document.querySelector(".predictions");

input.addEventListener("keyup", (event) => {
    const word = event.target.value;
    let html = [];

    for (let station of stationSet) {
        let stationString = station.toLowerCase()
        let indexOfInclude = stationString.indexOf(word.toLowerCase())

        if (indexOfInclude !== -1) {
            let stationHl = station.slice(0, indexOfInclude) +
                            `<b>${station.slice(indexOfInclude, indexOfInclude + word.length)}</b>` + 
                            station.slice(indexOfInclude + word.length);
            html.push(`<li class="station">${stationHl}</li>`);
        }
    }

    html = html.slice(0, 10); // size of showing suggestions
    html.sort();

    predictions.innerHTML = html.join('') || 'No Matches';
})
