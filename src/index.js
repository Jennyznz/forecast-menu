import './styles.css';
import { weatherData, displayTemp } from './weather.js';
import { displayRecipes } from './recipes.js';

displayContent();

// Fetch from Visual Crossing API when search is submitted (Button or 'Enter' key)
const form = document.getElementById('search-form');
const input = form.querySelector('#search-bar');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const query = input.value.trim(); // Remove spaces from the input
    const data = await weatherData(query);
    displayTemp(data.days);
    displayRecipes(); 
});

function displayContent() {
    // Get main container
    const contentArea = document.getElementById('content-area');

    // Attach content
    contentArea.append(displaySearch());
    contentArea.append(displayLabel());
    contentArea.append(displayCalendar());
    contentArea.append(displayBtns());
}

function displaySearch() {
    // Container
    const searchContainer = document.createElement('div');
    searchContainer.id = 'search-container';

    // Form
    const searchForm = document.createElement('form');
    searchForm.id = 'search-form';
    searchForm.action = '/search';
    searchForm.method = 'get';

    // Search Bar
    const searchBar = document.createElement('input');
    searchBar.id = 'search-bar';
    searchBar.type = 'search';
    searchBar.name = 'search-bar';
    searchBar.placeholder = "Search for a city";

    // Button
    const searchBtn = document.createElement('button');
    searchBtn.id = 'search-btn';
    searchBtn.type = 'submit';

    // Error message
    const errorMsg = document.createElement('div');
    errorMsg.id = 'search-err'

    // Appends
    searchForm.append(searchBar, searchBtn,);
    searchContainer.append(searchForm, errorMsg);

    return searchContainer;
}

function displayLabel() {
    const calLabel = document.createElement('h1');
    calLabel.id = 'calendar-label';
    calLabel.innerHTML = 'Daily Picks'; // OR: 'What to Cook'

    return calLabel;
}

function displayCalendar() {
    const cal = document.createElement('div');
    cal.id = 'calendar';

    const timeMarks = document.createElement('div');
    timeMarks.id = 'time-marks';

    // Create all time markers
    for (let i = 0; i < 26; i++) {
        const mark = document.createElement('div');
        mark.classList.add('mark');

        // Add hourly markers to every other div
        if (i % 2 === 0) {
            let hourIndex = i / 2;
            let hour = 8 + hourIndex;

            if (hour < 12) {
                mark.innerHTML = `${hour}AM`;
            } else if (hour === 12) {
                mark.innerHTML = '12PM';
            } else {
                mark.innerHTML = `${hour - 12}PM`;
            }
        }
        timeMarks.append(mark);
    }
    cal.append(timeMarks);

    // Create calendar for 7 days
    for (let i = 0; i < 7; i++) {
        const day = document.createElement('div');
        day.classList.add('day');

        for (let j = 0; j < 26; j++) {
            const chunk = document.createElement('div');
            chunk.classList.add('chunk');
            day.append(chunk);
        }
        cal.append(day);
    }
    return cal;
}

function displayBtns() {
    const others = document.createElement('div');
    others.id = 'others';

    return others;
}