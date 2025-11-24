// Fetch from Visual Crossing API when search is submitted (Button or 'Enter' key)
const form = document.getElementById('search-form');
const input = form.querySelector('#search-bar');
form.addEventListener('submit', (e) => {
    const query = input.value.trim(); // Remove spaces from the input
    weatherData(query);
});

function weatherData(location) {
    // Out of date API key
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=23QQ79QWYC6K5T66G5765H9RD&include=hours`)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        // get and display temp data for 14 days (this week and next week)
        // get and display precipitation data. Cloud, rain, snow, sun
        
    }).catch(function() {
        // Pop up error msg
    });
}


// Color scheme

// Days array

// Day object: date, temp, precipitation (for all hours; accomplish using an array)
