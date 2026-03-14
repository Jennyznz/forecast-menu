import { getWeatherData, getTempCategory } from "./visualCrossingAPI";

const breakfastTime = '06:00:00';
const lunchTime = '13:00:00';
const dinnerTime = '19:00:00';

async function displayCalendarView() {
    const main = document.getElementById('main-container');
    main.append(displayCalendarLabel(), await displayContent());
}

function displayCalendarLabel() {
    const label = document.createElement('h2');
    label.id = 'calendar-label';

    // Find start and end dates of current week
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    const months = [
        "January",
        "Febuary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    let text = `${months[startOfWeek.getMonth()]}`;
    if (startOfWeek.getMonth() !== endOfWeek.getMonth()) {
        text += ` - ${months[endOfWeek.getMonth()]}`;
    }
    text += ` ${endOfWeek.getFullYear()}`;

    label.textContent = `Weekly Picks (${text})`;
    return label;
}

async function displayContent() {
    const contentArea = document.createElement('div');
    contentArea.id = 'content-area';
    contentArea.append(displayOverview(), await displaySpread());
    return contentArea;
}

function displayOverview() {
    const overview = document.createElement('div');
    overview.id = 'overview';

    const summary = document.createElement('p');
    summary.id = 'summary';

    // Filler
    summary.textContent = "Rainy day recipes."

    const regen = document.createElement('button');
    regen.id = 'regenerate';
    const shoppingCart = document.createElement('button');
    shoppingCart.id = 'shopping-cart';

    overview.append(summary, regen, shoppingCart);
    return overview;
}

async function displaySpread() {
    const spread = document.createElement('div');
    spread.id = 'spread';

    const weatherData = await getWeatherData();

    for (let i = 0; i < 7; i++) {
        spread.append(displayDay(i, weatherData));
    }

    return spread;
}

function displayDay(weekday, weatherData) {
    const day = document.createElement('div');
    day.classList.add('day');

    const dateHeader = document.createElement('div');
    dateHeader.classList.add('date-header');

    const weekdayLabel = document.createElement('div');
    weekdayLabel.classList.add('weekday');
    const dateLabel = document.createElement('div');
    dateLabel.classList.add('date');

    // Display weekday
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    weekdayLabel.textContent = days[weekday];

    // Display date
    const today = new Date();
    // Find start date of current week
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    // Find the current date
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + weekday);
    
    dateLabel.textContent = `${date.getDate()}`;

    dateHeader.append(weekdayLabel, dateLabel);
    day.append(dateHeader);

    if (date < today.setHours(0, 0, 0, 0)) {
        day.classList.add("past");    // Deactivated day display if the date has passed
    } else {
        const dateString = date.toISOString().split('T')[0];
        const dayData = weatherData.days.find(d => d.datetime === dateString);
        // console.log(dayData);
        // Find temperatures 
        const breakfastTemp = dayData.hours.find(h => h.datetime === breakfastTime).temp;
        // console.log(breakfastTemp);
        const lunchTemp = dayData.hours.find(h => h.datetime === lunchTime).temp;
        const dinnerTemp = dayData.hours.find(h => h.datetime === dinnerTime).temp;
        // Get temperature categories
        const bCategory = getTempCategory(breakfastTemp);
        // console.log(bCategory);
        const lCategory = getTempCategory(lunchTemp);
        const dCategory = getTempCategory(dinnerTemp);

        day.append(createBreakfast(bCategory), createLunch(lCategory), createDinner(dCategory));
    }

    return day;
}

function createBreakfast(category) {
    const breakfast = document.createElement('div');
    breakfast.classList.add('meal');

    const recipe = document.createElement('div');
    recipe.classList.add('calendar-recipe');
    recipe.textContent = category;

    const bTime = document.createElement('div');
    bTime.classList.add('time');
    bTime.textContent = breakfastTime;

    breakfast.append(recipe, bTime);
    return breakfast;
}

function createLunch(category) {
    const lunch = document.createElement('div');
    lunch.classList.add('meal');

    const recipe = document.createElement('div');
    recipe.classList.add('calendar-recipe');
    recipe.textContent = category;

    const lTime = document.createElement('div');
    lTime.classList.add('time');
    lTime.textContent = lunchTime;

    lunch.append(recipe, lTime);
    return lunch;
}

function createDinner(category) {
    const dinner = document.createElement('div');
    dinner.classList.add('meal');

    const recipe = document.createElement('div');
    recipe.classList.add('calendar-recipe');
    recipe.textContent = category;

    const dTime = document.createElement('div');
    dTime.classList.add('time');
    dTime.textContent = dinnerTime;

    dinner.append(recipe, dTime);
    return dinner;
}

// function displayWeather() {
//     const weather = document.createElement('div');
//     weather.classList.add('weather');

//     // Get temp

//     // Get precipation icon4

//     return weather
// }

// function createWeatherInfo() {
//     const weather = document.createElement('div');
//     weather.classList.add('weather-icon');
//     return weather;
// }

export { displayCalendarView };