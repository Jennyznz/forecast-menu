function weatherData(location) {
    // Out of date API key
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=C47UFPAW6FJ4DU4DEY66GPR7F&include=hours`)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        displayTemp(data.days);
    }).catch(function() {
        // Display a pop up error msg
    });
}

// Get and display temperature data for 7 days 
function displayTemp(data) {
    const days = document.querySelectorAll('.day');

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 13; j++) {
            const temp = data[i].hours[j].temp;
            const chunks = days[i].querySelectorAll('.chunk');

            const color = getColor(temp);
            chunks[j * 2].style.backgroundColor = color;
            chunks[j * 2 + 1].style.backgroundColor = color;
        }
    }
}

function getColor(temp) {
    temp = Math.floor(temp); // Ensure that temperature value becomes an integer

    const colors = [
        {range: [85, Infinity], color: '#E97777', label: 'Hot'},
        {range: [70, 84], color: '#FF9F9F', label: 'Warm'},
        {range: [55, 69], color: '#EEE9DA', label: 'Average'},
        {range: [40, 54], color: '#93BFCF', label: 'Cool'},
        {range: [-Infinity, 39], color: '#6096B4', label: 'Cold'},
    ];

    for (const c of colors) {
        if (temp >= c.range[0] && temp <= c.range[1]) return c.color;
    }

    return '#000' // Return a random default value if color match fails
}

function getDate() {

}

export { weatherData };