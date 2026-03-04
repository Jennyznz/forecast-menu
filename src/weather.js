// Color Mapping
const tempColors = [
        {range: [85, Infinity], label: 'Hot'},
        {range: [70, 84], label: 'Warm'},
        {range: [55, 69], label: 'Average'},
        {range: [40, 54], label: 'Cool'},
        {range: [-Infinity, 39], label: 'Cold'},
];

// Visual Crossing API call
async function weatherData(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=cefc940c19b4473faf0decb5e5306fe9&include=hours`);    // Out of date API key
        const data = await response.json();
        return data;
    } catch {
        // Display a pop up error message if location name doesn't match anything
        const errorMsg = document.getElementById('search-err');
        errorMsg.innerHTML = 'Search failed. Please enter a valid city name.';
    }
    
}

// Display temperature data 
function displayTemp(data) {
    const days = document.querySelectorAll('.day');

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 13; j++) {
            const temp = data[i].hours[j].temp;
            const chunks = days[i].querySelectorAll('.chunk');

            const category = getTempCategory(temp);
            const label = category.label;

            chunks[j * 2].dataset.label = label;
            chunks[j * 2 + 1].dataset.label = label;
        }
    }
}

function getDate() {

}

export { weatherData, displayTemp };