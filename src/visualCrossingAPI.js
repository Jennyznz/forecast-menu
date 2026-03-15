const baseURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const apiKey = "";

// Temperature category mapping
const tempCategories = [
        {range: [85, Infinity], label: 'Hot'},
        {range: [70, 84], label: 'Warm'},
        {range: [55, 69], label: 'Average'},
        {range: [40, 54], label: 'Cool'},
        {range: [-Infinity, 39], label: 'Cold'},
];

function getTempCategory(temp) {
    return tempCategories.find(item => item.range[0] <= temp && item.range[1] >= temp).label;
}

async function getWeatherData() {
    try {
        const response = await fetch(`${baseURL}london/next7days?include=hours&key=${apiKey}`);   
        if (!response.ok) {
            throw new Error(`Visual Crossing API error: ${response.status}`);
        }
        const data = await response.json()
        return data;
    } catch (err) {
        console.error("Visual Crossing call failed.", err);
    }
}

export { getWeatherData, getTempCategory }