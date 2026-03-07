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
    label.textContent = 'Weekly Picks';
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
        spread.append(displayDay());
    }

    return spread;
}

function displayDay() {
    const day = document.createElement('div');
    day.classList.add('day');

    day.append(createDateLabel(), createWeatherInfo(), createBreakfast(), createLunch(), createDinner());
    return day;
}

function createWeatherInfo() {
    const weather = document.createElement('div');
    weather.classList.add('weather-icon');
    return weather;
}

function createDateLabel() {
    const dateLabel = document.createElement('div');
    dateLabel.classList.add('date-label');

    // Filler content
    dateLabel.textContent = 'Monday (01/01/26)';

    return dateLabel;
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

export { displayCalendarView };