import './styles.css';
import { weatherData, displayTemp } from './weather.js';
import { displayRecipes } from './recipes.js';

displayMain();

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

function displayMain() {
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
    contentArea.append(displayOverview(), displayCalendar());
    return contentArea;
}

// function displayHeader() {
//     const header = document.getElementById('.header');
//     header.append(projName);
//     const projName = document.createElement('div');
//     projName.id = "project-name";
//     projName.textContent = 'Forecast Menu';
// }

// function displaySearch() {
//     // Container
//     const searchContainer = document.createElement('div');
//     searchContainer.id = 'search-container';

//     // Form
//     const searchForm = document.createElement('form');
//     searchForm.id = 'search-form';
//     searchForm.action = '/search';
//     searchForm.method = 'get';

//     // Search Bar
//     const searchBar = document.createElement('input');
//     searchBar.id = 'search-bar';
//     searchBar.type = 'search';
//     searchBar.name = 'search-bar';
//     searchBar.placeholder = "Enter a city name";

//     // Button
//     const searchBtn = document.createElement('button');
//     searchBtn.id = 'search-btn';
//     searchBtn.type = 'submit';

//     // Error message
//     const errorMsg = document.createElement('div');
//     errorMsg.id = 'search-err'

//     // Appends
//     searchForm.append(searchBar, searchBtn,);
//     searchContainer.append(searchForm, errorMsg);

//     return searchContainer;
// }

// function displayLabel() {
//     const calLabel = document.createElement('h1');
//     calLabel.id = 'calendar-label';
//     calLabel.innerHTML = 'Weekly Picks'; 

//     return calLabel;
// }
function displayOverview() {
    const overview = document.createElement('div');
    overview.id = 'overview';

    const summary = document.createElement('p');
    summary.id = 'summary';
    const regen = document.createElement('button');
    regen.id = 'regenerate';
    const shoppingCart = document.createElement('button');
    shoppingCart.id = 'shopping-cart';

    overview.append(summary, regen, shoppingCart);
    return overview;
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

// function displayBtns() {
//     const others = document.createElement('div');
//     others.id = 'others';

//     return others;
// }


