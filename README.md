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

(Recipes are not generated for the days of the week that have passed)
### Detailed Recipe View
### Favorite Recipes Feature
### User Profile
### Shopping Cart Generator


## Getting Started
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