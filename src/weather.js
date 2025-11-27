// Color Mapping
const tempColors = [
        {range: [85, Infinity], color: '#E97777', label: 'Hot'},
        {range: [70, 84], color: '#FF9F9F', label: 'Warm'},
        {range: [55, 69], color: '#EEE9DA', label: 'Average'},
        {range: [40, 54], color: '#93BFCF', label: 'Cool'},
        {range: [-Infinity, 39], color: '#6096B4', label: 'Cold'},
];

// Visual Crossing API call
async function weatherData(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=BN6KPDLKJW3PNLDB6DEA9DX6M&include=hours`)    // Out of date API key
    const data = await response.json();
    displayTemp(data.days); // call in index.js?
    return data;
    
    // Display a pop up error msg if location name doesn't match anything
}

// Display temperature data 
function displayTemp(data) {
    const days = document.querySelectorAll('.day');

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 13; j++) {
            const temp = data[i].hours[j].temp;
            const chunks = days[i].querySelectorAll('.chunk');

            const category = getTempCategory(temp);
            const color = category.color;
            const label = category.label;

            chunks[j * 2].style.backgroundColor = color;
            chunks[j * 2 + 1].style.backgroundColor = color;

            chunks[j * 2].dataset.label = label;
            chunks[j * 2 + 1].dataset.label = label;
        }
    }
}

// Assign a category based of given temperature
function getTempCategory(temp) {
    temp = Math.floor(temp); // Ensure that temperature value becomes an integer
    return tempColors.find(color => (temp >= color.range[0] && temp <= color.range[1]));
}

function getDate() {

}

export { weatherData, tempColors };