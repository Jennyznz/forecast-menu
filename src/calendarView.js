const breakfastTime = '6:00AM';
const lunchTime = '1:00PM';
const dinnerTime = '7:00PM';

function displayCalendarView() {
    const main = document.getElementById('main-container');
    main.append(displayCalendarLabel(), displayContent());
}

function displayCalendarLabel() {
    const label = document.createElement('h2');
    label.id = 'calendar-label';

    const textLabel = document.createElement

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

function displayContent() {
    const contentArea = document.createElement('div');
    contentArea.id = 'content-area';
    contentArea.append(displayOverview(), displaySpread());
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

function displaySpread() {
    const spread = document.createElement('div');
    spread.id = 'spread';

    for (let i = 0; i < 7; i++) {
        spread.append(displayDay(i));
    }

    return spread;
}

function displayDay(weekday) {
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
    // Mark past days
    if (date < today.setHours(0, 0, 0, 0)) {
        day.classList.add("past");    // Deactivated day display if the date has passed
    }
    dateLabel.textContent = `${date.getDate()}`;

    dateHeader.append(weekdayLabel, dateLabel);
    day.append(dateHeader, createBreakfast(), createLunch(), createDinner());
    return day;
}

function createWeatherInfo() {
    const weather = document.createElement('div');
    weather.classList.add('weather-icon');
    return weather;
}

function createBreakfast() {
    const breakfast = document.createElement('div');
    breakfast.classList.add('meal');

    const recipe = document.createElement('div');
    recipe.classList.add('calendar-recipe');
    recipe.textContent = 'Oatmeal';

    const bTime = document.createElement('div');
    bTime.classList.add('time');
    bTime.textContent = breakfastTime;

    breakfast.append(recipe, bTime);
    return breakfast;
}

function createLunch() {
    const lunch = document.createElement('div');
    lunch.classList.add('meal');

    const recipe = document.createElement('div');
    recipe.classList.add('calendar-recipe');
    recipe.textContent = 'Salad';

    const lTime = document.createElement('div');
    lTime.classList.add('time');
    lTime.textContent = lunchTime;

    lunch.append(recipe, lTime);
    return lunch;
}

function createDinner() {
    const dinner = document.createElement('div');
    dinner.classList.add('meal');

    const recipe = document.createElement('div');
    recipe.classList.add('calendar-recipe');
    recipe.textContent = 'Pasta';

    const dTime = document.createElement('div');
    dTime.classList.add('time');
    dTime.textContent = dinnerTime;

    dinner.append(recipe, dTime);
    return dinner;
}

function displayWeather() {

}

export { displayCalendarView };