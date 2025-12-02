# Weather-based Weekly Meal Planner

## Overview
This project is a weather-aware meal recommendation web application that integrates multiple APIs to generate dynamic weekly menus. 
Users can input any location into a search bar, after which the app retrieves the upcoming week’s hourly temperature data (8 AM–9 PM) from the Visual Crossing API 
and displays it on a calendar-style interface. Based on temperatures at designated meal times, the application selects appropriate recipe categories 
and queries the Spoonacular API using a guided yet partially randomized approach to ensure both relevance and variety in the meal suggestions. 

## Build and Run
```bash
npm install
npx webpack
open dist/index.html
```