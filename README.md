# Forecast Menu

## Overview
Forecast Menu is a weather-aware recipe recommendation app that suggests meals tailored to your local forecast. It automatically detects your location (customizable in settings)and fetches hourly weather data from the Visual Crossing API. Conditions are mapped to a temperature-based weather profile, which drives targeted recipe queries to the Spoonacular API. This runs three times daily, pairing breakfast, lunch, and dinner each with the weather expected at that time of day.


## Features
- Recipe recommendations: Get a fresh set of weather-matched meal suggestions each week, tailored to the forecast at your location.
- Favorites:  Save recipes you love and revisit them anytime.
- Shopping list: Generate a consolidated ingredient list for your weekly meals, complete with estimated costs.
- User profile: Personalize your experience by setting dietary preferences and other details.
- Customizable settings: Adjust your location and preferred meal times to fit your schedule and lifestyle.

## Demo
### Weekly Recommendations
(Full Week)
<img width="1440" height="820" alt="Screenshot 2026-03-20 at 11 36 38 PM" src="https://github.com/user-attachments/assets/8751ae01-4515-4465-9949-73b316050031" />

(Recipes are not generated for the days of the week that have passed)
<img width="1440" height="820" alt="Screenshot 2026-03-20 at 11 36 38 PM" src="https://github.com/user-attachments/assets/9e45353d-1015-4377-9988-f975dc984ec5" />

### Detailed Recipe View
https://github.com/user-attachments/assets/39ad6edc-017a-45c6-94e0-d9ff0069402a

### Favorite Recipes Feature
https://github.com/user-attachments/assets/e335cea0-0f65-4f24-ae1f-31ba97928392

### Regenerate
https://github.com/user-attachments/assets/c5f6006f-c08a-4cd1-a170-e3a2295f82ab


## Getting Started
### Setup
```bash
npm install
npx webpack
open dist/index.html
```
### Get API keys:
Visual Crossing: https://www.visualcrossing.com/sign-up/
Spoonacular: https://spoonacular.com/food-api/console#Dashboard

## Built With
- HTML/CSS
- Javascript
- Spoonacular API (recipe searches)
- Visual Crossing (weather/forecast data)
