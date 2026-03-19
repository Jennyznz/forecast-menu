import { createRecipe } from "./spoonacularAPI";
import { getWeatherData, getTempCategory } from "./visualCrossingAPI";
import clockImg from "../assets/clock.svg";

const breakfastTime = '06:00:00';
const lunchTime = '13:00:00';
const dinnerTime = '19:00:00';

let weeklyRecipes = [];

async function createCalendarView() {
    const main = document.getElementById('main-container');
    main.textContent = '';
    main.append(displayCalendarLabel(), await createContent());
    console.log(weeklyRecipes);
}

function displayCalendarLabel() {
    const label = document.createElement('h1');
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

async function createContent() {
    const contentArea = document.createElement('div');
    contentArea.id = 'content-area';
    contentArea.append(createOverview(), await createSpread());
    return contentArea;
}

function createOverview() {
    const overview = document.createElement('div');
    overview.id = 'overview';

    const summary = document.createElement('p');
    summary.id = 'summary';
    // FILLER
    summary.textContent = "";

    const regen = document.createElement('button');
    regen.id = 'regenerate';
    const shoppingCart = document.createElement('button');
    shoppingCart.id = 'shopping-cart';

    overview.append(summary, regen, shoppingCart);
    return overview;
}

async function regenerateMealCards() {
    const meals = document.querySelectorAll('.meal');
    meals.forEach(async (meal, i) => {
        const recipe = await createRecipe(meal.dataset.category, meal.dataset.mealType);

        const recipeTitle = meal.querySelector('.recipe-title');
        recipeTitle.textContent = recipe.title;
        const readyTime = meal.querySelector('.recipe-ready-time');
        readyTime.textContent = formatReadyTime(recipe.readyInMinutes);

        meal.dataset.id = recipe.id;
        meal.dataset.title = recipe.title;
        meal.dataset.readyTime = formatReadyTime(recipe.readyInMinutes);
        if (meal.dataset.favorite === 'true') {
            const faveBtn = document.querySelector('.filled-favorite');
            faveBtn.classList.remove('filled-favorite');
            faveBtn.classList.add('favorite');
        }
        meal.dataset.favorite = 'false';

        // Update recipe in weeklyRecipes
        weeklyRecipes[i] = {
            id: meal.dataset.id,
            title: meal.dataset.title,
            readyTime: meal.dataset.readyTime,
            temp: meal.dataset.temp,
            favorite: meal.dataset.favorite,
            category: meal.dataset.category,
            mealType: meal.dataset.mealType,
        };
    });
    console.log(weeklyRecipes);
}

async function regenerateMeal(meal) {
    const recipe = await createRecipe(meal.dataset.category, meal.dataset.mealType);

    const recipeTitle = meal.querySelector('.recipe-title');
    recipeTitle.textContent = recipe.title;
    const readyTime = meal.querySelector('.recipe-ready-time');
    readyTime.textContent = formatReadyTime(recipe.readyInMinutes);

    let indexToAdd = 0;
    switch (meal.dataset.mealType) {
        case 'breakfast':
            break;
        case 'lunch':
            indexToAdd = 1;
            break;
        case 'dinner':
            indexToAdd = 2;
            break;
    }

    // Find index of recipe in weeklyRecipes
    const index = Number(meal.dataset.weekDay) * 3 + indexToAdd;

    meal.dataset.id = recipe.id;
    meal.dataset.title = recipe.title;
    meal.dataset.readyTime = formatReadyTime(recipe.readyInMinutes);
    if (meal.dataset.favorite === 'true') {
        const faveBtn = document.querySelector('.filled-favorite');
        faveBtn.classList.remove('filled-favorite');
        faveBtn.classList.add('favorite');
    }
    meal.dataset.favorite = 'false';

    console.log('Writing to index:', index, 'array length:', weeklyRecipes.length);
    // Update recipe in weeklyRecipes
    weeklyRecipes[index] = {
        id: meal.dataset.id,
        title: meal.dataset.title,
        readyTime: meal.dataset.readyTime,
        temp: meal.dataset.temp,
        favorite: meal.dataset.favorite,
        category: meal.dataset.category,
        mealType: meal.dataset.mealType,
    };
    console.log(weeklyRecipes);
}

async function createSpread() {
    const spread = document.createElement('div');
    spread.id = 'spread';

    const weatherData = await getWeatherData();

    for (let i = 0; i < 4; i++) {
        spread.append(await createDay(i, weatherData));
    }

    return spread;
}

async function createDay(weekday, weatherData) {
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
        // Add 3 filler meals to weeklyRecipes
        const fillerObj = {}
        weeklyRecipes.push(fillerObj);
        weeklyRecipes.push(fillerObj);
        weeklyRecipes.push(fillerObj);
    } else {
        const dateString = date.toISOString().split('T')[0];

        const dayData = weatherData.days.find(d => d.datetime === dateString);
        // Find temperatures 
        const breakfastTemp = dayData.hours.find(h => h.datetime === breakfastTime).temp;
        const lunchTemp = dayData.hours.find(h => h.datetime === lunchTime).temp;
        const dinnerTemp = dayData.hours.find(h => h.datetime === dinnerTime).temp;
        // Get temperature categories
        const bCategory = getTempCategory(breakfastTemp);
        const lCategory = getTempCategory(lunchTemp);
        const dCategory = getTempCategory(dinnerTemp);

        day.append(
            await createBreakfast(breakfastTemp, bCategory, weekday), 
            await createLunch(lunchTemp, lCategory, weekday), 
            await createDinner(dinnerTemp, dCategory, weekday));
    }

    return day;
}

async function createBreakfast(temp, category, weekday) {
    const breakfast = document.createElement('div');
    breakfast.classList.add('meal');
    breakfast.dataset.category = category;
    breakfast.dataset.mealType = 'breakfast';

    const actions = document.createElement('div');
    actions.classList.add('actions');
    const regenerate = document.createElement('button');
    regenerate.classList.add('single-regenerate');
    regenerate.dataset.action = 'regenerate';
    const favorite = document.createElement('button');
    favorite.classList.add('favorite');
    favorite.dataset.action = 'favorite';
    actions.append(regenerate, favorite);

    const recipe = await createRecipe(category, 'breakfast');

    const recipeTitle = document.createElement('div');
    recipeTitle.classList.add('recipe-title');
    recipeTitle.textContent = recipe.title;

    const readyTimeContainer = document.createElement('div');
    readyTimeContainer.classList.add('ready-time-container');
    const clockIcon = document.createElement('img');
    clockIcon.src = clockImg;
    clockIcon.classList.add('clock-icon');
    const readyTime = document.createElement('div');
    readyTime.classList.add('recipe-ready-time');
    readyTime.textContent = formatReadyTime(recipe.readyInMinutes);
    readyTimeContainer.append(clockIcon, readyTime);

    const weatherInfo = document.createElement('div');
    weatherInfo.classList.add('weather-info');
    weatherInfo.textContent = `${temp}°F` ;

    const bTime = document.createElement('div');
    bTime.classList.add('time');
    bTime.textContent = formatMealTime(breakfastTime);

    breakfast.dataset.id = recipe.id;
    breakfast.dataset.title = recipe.title;
    breakfast.dataset.readyTime = readyTime.textContent;
    breakfast.dataset.favorite = 'false';
    breakfast.dataset.weekDay = weekday;

    const basicInfo = {
        id: recipe.id,
        title: recipe.title,
        readyTime: readyTime.textContent,
        favorite: 'false',
        temp: temp,
        category: category,
        mealType: 'breakfast',
        weekDay: weekday,
    };
    weeklyRecipes.push(basicInfo);
    breakfast.append(actions, recipeTitle, readyTimeContainer, weatherInfo, bTime);
    return breakfast;
}

async function createLunch(temp, category, weekday) {
    const lunch = document.createElement('div');
    lunch.classList.add('meal');
    lunch.dataset.category = category;
    lunch.dataset.mealType = 'lunch';

    const actions = document.createElement('div');
    actions.classList.add('actions');
    const regenerate = document.createElement('button');
    regenerate.classList.add('single-regenerate');
    regenerate.dataset.action = 'regenerate';
    const favorite = document.createElement('button');
    favorite.classList.add('favorite');
    favorite.dataset.action = 'favorite';
    actions.append(regenerate, favorite);

    const recipe = await createRecipe(category, 'lunch');

    const recipeTitle = document.createElement('div');
    recipeTitle.classList.add('recipe-title');
    recipeTitle.textContent = recipe.title;

    const readyTimeContainer = document.createElement('div');
    readyTimeContainer.classList.add('ready-time-container');
    const clockIcon = document.createElement('img');
    clockIcon.src = clockImg;
    clockIcon.classList.add('clock-icon');
    const readyTime = document.createElement('div');
    readyTime.classList.add('recipe-ready-time');
    readyTime.textContent = formatReadyTime(recipe.readyInMinutes);
    readyTimeContainer.append(clockIcon, readyTime);

    const weatherInfo = document.createElement('div');
    weatherInfo.classList.add('weather-info');
    weatherInfo.textContent = `${temp}°F` ;

    const lTime = document.createElement('div');
    lTime.classList.add('time');
    lTime.textContent = formatMealTime(lunchTime);

    lunch.dataset.id = recipe.id;
    lunch.dataset.title = recipe.title;
    lunch.dataset.readyTime = readyTime.textContent;
    lunch.dataset.favorite = 'false';
    lunch.dataset.weekDay = weekday;


    const basicInfo = {
        id: recipe.id,
        title: recipe.title,
        readyTime: readyTime.textContent,
        favorite: 'false',
        temp: temp,
        category: category,
        mealType: 'lunch',
        weekDay: weekday,
    };
    weeklyRecipes.push(basicInfo);

    lunch.append(actions, recipeTitle, readyTimeContainer, weatherInfo, lTime);
    return lunch;
}

async function createDinner(temp, category, weekday) {
    const dinner = document.createElement('div');
    dinner.classList.add('meal');
    dinner.dataset.category = category;
    dinner.dataset.mealType = 'dinner';

    const actions = document.createElement('div');
    actions.classList.add('actions');
    const regenerate = document.createElement('button');
    regenerate.classList.add('single-regenerate');
    regenerate.dataset.action = 'regenerate';
    const favorite = document.createElement('button');
    favorite.classList.add('favorite');
    favorite.dataset.action = 'favorite';
    actions.append(regenerate, favorite);

    const recipe = await createRecipe(category, 'dinner');

    const recipeTitle = document.createElement('div');
    recipeTitle.classList.add('recipe-title');
    recipeTitle.textContent = recipe.title;

    const readyTimeContainer = document.createElement('div');
    readyTimeContainer.classList.add('ready-time-container');
    const clockIcon = document.createElement('img');
    clockIcon.src = clockImg;
    clockIcon.classList.add('clock-icon');
    const readyTime = document.createElement('div');
    readyTime.classList.add('recipe-ready-time');
    readyTime.textContent = formatReadyTime(recipe.readyInMinutes);
    readyTimeContainer.append(clockIcon, readyTime);

    const weatherInfo = document.createElement('div');
    weatherInfo.classList.add('weather-info');
    weatherInfo.textContent = `${temp}°F`;

    const dTime = document.createElement('div');
    dTime.classList.add('time');
    dTime.textContent = formatMealTime(dinnerTime);

    dinner.dataset.id = recipe.id;
    dinner.dataset.title = recipe.title;
    dinner.dataset.readyTime = readyTime.textContent;
    dinner.dataset.favorite = 'false';
    dinner.dataset.weekDay = weekday;

    const basicInfo = {
        id: recipe.id,
        title: recipe.title,
        readyTime: readyTime.textContent,
        favorite: 'false',
        temp: temp,
        category: category,
        mealType: 'dinner',
        weekDay: weekday,

    };
    weeklyRecipes.push(basicInfo);

    dinner.append(actions, recipeTitle, readyTimeContainer, weatherInfo, dTime);
    return dinner;
}

// Converts time from minutes to Hh Mm form
function formatReadyTime(time) {
    const hrs = Math.floor(time / 60);
    const mins = time % 60;

    if (hrs === 0) return `${mins}m`;
    if (mins === 0) return `${hrs}h`;

    return `${hrs}h ${mins}m`;
}

function formatMealTime(time) {
    const [hour, min, sec] = time.split(':');
    const date = new Date();
    date.setHours(hour, min, sec, 0);

    return new Intl.DateTimeFormat(undefined, { // undefined takes default
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }).format(date);
}

// Returning to calendarView from 'back' buttons
function displayCalendarView() {
    const main = document.getElementById('main-container');
    main.textContent = '';
    main.append(displayCalendarLabel(), displayContent());
}

function displayContent() {
    const contentArea = document.createElement('div');
    contentArea.id = 'content-area';
    contentArea.append(createOverview(), displaySpread());
    return contentArea;
}

function displaySpread() {
    const spread = document.createElement('div');
    spread.id = 'spread';
    for (let i = 0; i < 4; i++) {
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
    
    dateLabel.textContent = `${date.getDate()}`;

    dateHeader.append(weekdayLabel, dateLabel);
    day.append(dateHeader);

    if (date < today.setHours(0, 0, 0, 0)) {
        day.classList.add("past");    // Deactivated day display if the date has passed
    } else {
        day.append(displayBreakfast(weekday), displayLunch(weekday), displayDinner(weekday));
    }

    return day;
}

function displayBreakfast(weekday) {
    const breakfast = document.createElement('div');
    breakfast.classList.add('meal');

    const actions = document.createElement('div');
    actions.classList.add('actions');
    const regenerate = document.createElement('button');
    regenerate.classList.add('single-regenerate');
    regenerate.dataset.action = 'regenerate';
    const favorite = document.createElement('button');
    favorite.classList.add('favorite');
    favorite.dataset.action = 'favorite';
    actions.append(regenerate, favorite);

    const recipe = weeklyRecipes[weekday * 3];

    breakfast.dataset.id = recipe.id;
    breakfast.dataset.title = recipe.title;
    breakfast.dataset.readyTime = recipe.readyTime;
    breakfast.dataset.favorite = recipe.favorite;
    breakfast.dataset.category = recipe.category;
    breakfast.dataset.mealType = recipe.mealType;

    const recipeTitle = document.createElement('div');
    recipeTitle.classList.add('recipe-title');
    recipeTitle.textContent = recipe.title;

    const readyTimeContainer = document.createElement('div');
    readyTimeContainer.classList.add('ready-time-container');
    const clockIcon = document.createElement('img');
    clockIcon.src = clockImg;
    clockIcon.classList.add('clock-icon');
    const readyTime = document.createElement('div');
    readyTime.classList.add('recipe-ready-time');
    readyTime.textContent = recipe.readyTime;
    readyTimeContainer.append(clockIcon, readyTime);

    const weatherInfo = document.createElement('div');
    weatherInfo.classList.add('weather-info');
    weatherInfo.textContent = `${recipe.temp}°F` ;

    const bTime = document.createElement('div');
    bTime.classList.add('time');
    bTime.textContent = formatMealTime(breakfastTime);

    breakfast.append(actions, recipeTitle, readyTimeContainer, weatherInfo, bTime);
    return breakfast;
}

function displayLunch(weekday) {
    const lunch = document.createElement('div');
    lunch.classList.add('meal');

    const actions = document.createElement('div');
    actions.classList.add('actions');
    const regenerate = document.createElement('button');
    regenerate.classList.add('single-regenerate');
    regenerate.dataset.action = 'regenerate';
    const favorite = document.createElement('button');
    favorite.classList.add('favorite');
    favorite.dataset.action = 'favorite';
    actions.append(regenerate, favorite);

    const recipe = weeklyRecipes[weekday * 3 + 1];

    lunch.dataset.id = recipe.id;
    lunch.dataset.title = recipe.title;
    lunch.dataset.readyTime = recipe.readyTime;
    lunch.dataset.favorite = recipe.favorite;
    lunch.dataset.category = recipe.category;
    lunch.dataset.mealType = recipe.mealType;

    const recipeTitle = document.createElement('div');
    recipeTitle.classList.add('recipe-title');
    recipeTitle.textContent = recipe.title;

    const readyTimeContainer = document.createElement('div');
    readyTimeContainer.classList.add('ready-time-container');
    const clockIcon = document.createElement('img');
    clockIcon.src = clockImg;
    clockIcon.classList.add('clock-icon');
    const readyTime = document.createElement('div');
    readyTime.classList.add('recipe-ready-time');
    readyTime.textContent = recipe.readyTime;
    readyTimeContainer.append(clockIcon, readyTime);

    const weatherInfo = document.createElement('div');
    weatherInfo.classList.add('weather-info');
    weatherInfo.textContent = `${recipe.temp}°F` ;

    const lTime = document.createElement('div');
    lTime.classList.add('time');
    lTime.textContent = formatMealTime(lunchTime);

    lunch.append(actions, recipeTitle, readyTimeContainer, weatherInfo, lTime);
    return lunch;
}

function displayDinner(weekday) {
    const dinner = document.createElement('div');
    dinner.classList.add('meal');

    const actions = document.createElement('div');
    actions.classList.add('actions');
    const regenerate = document.createElement('button');
    regenerate.classList.add('single-regenerate');
    regenerate.dataset.action = 'regenerate';
    const favorite = document.createElement('button');
    favorite.classList.add('favorite');
    favorite.dataset.action = 'favorite';
    actions.append(regenerate, favorite);

    const recipe = weeklyRecipes[weekday * 3 + 2];

    dinner.dataset.id = recipe.id;
    dinner.dataset.title = recipe.title;
    dinner.dataset.readyTime = recipe.readyTime;
    dinner.dataset.favorite = recipe.favorite;
    dinner.dataset.category = recipe.category;
    dinner.dataset.mealType = recipe.mealType;

    const recipeTitle = document.createElement('div');
    recipeTitle.classList.add('recipe-title');
    recipeTitle.textContent = recipe.title;

    const readyTimeContainer = document.createElement('div');
    readyTimeContainer.classList.add('ready-time-container');
    const clockIcon = document.createElement('img');
    clockIcon.src = clockImg;
    clockIcon.classList.add('clock-icon');
    const readyTime = document.createElement('div');
    readyTime.classList.add('recipe-ready-time');
    readyTime.textContent = recipe.readyTime;
    readyTimeContainer.append(clockIcon, readyTime);

    const weatherInfo = document.createElement('div');
    weatherInfo.classList.add('weather-info');
    weatherInfo.textContent = `${recipe.temp}°F` ;

    const dTime = document.createElement('div');
    dTime.classList.add('time');
    dTime.textContent = formatMealTime(dinnerTime);

    dinner.append(actions, recipeTitle, readyTimeContainer, weatherInfo, dTime);
    return dinner;
}

export { createCalendarView, displayCalendarView, regenerateMealCards, regenerateMeal, formatReadyTime };