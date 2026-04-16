const baseURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const apiKey = process.env.VISUAL_CROSSING_API_KEY;

// Temperature category mapping
const tempCategories = [
        { min: 85, label: 'Hot'},
        { min: 70, label: 'Warm'},
        { min: 55, label: 'Average'}, 
        { min: 40, label: 'Cool'},
        { min: -Infinity, label: 'Cold'},
];

function getTempCategory(temp) {
    return tempCategories.find(category => temp >= category.min).label;
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