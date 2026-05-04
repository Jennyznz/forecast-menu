# Forecast Menu

## Overview
Forecast Menu is a weather-aware recipe recommendation app that suggests meals based on your local forecast. It uses hourly weather data from the Visual Crossing API, maps results to a temperature-based weather profile, which drives targeted recipe queries to the Spoonacular API. Recommendations are generated three times daily (breakfast, lunch, dinner), each aligned with the expected weather at the time of the meal.

## Features
- **Personalized Recommendations:** Receive a weekly set of weather-matched meals tailored to your local forecast.
- **Favorites:** Save recipes you love and revisit them anytime.
- **Shopping List:** Generate a consolidated ingredient list for your weekly meals.
- **Flexible Regeneration:** Refresh an entire week of suggested recipes, or replace individual recipes as needed.

## Demo
### Homepage / Calendar View
(Full Week)
<img width="1440" height="820" alt="Screenshot 2026-03-20 at 11 36 38 PM" src="https://github.com/user-attachments/assets/8751ae01-4515-4465-9949-73b316050031" />

(Recipes are not generated for the detected days of the week that have passed)
<img width="1440" height="820" alt="Screenshot 2026-03-20 at 11 36 38 PM" src="https://github.com/user-attachments/assets/9e45353d-1015-4377-9988-f975dc984ec5" />

### Recipe View
https://github.com/user-attachments/assets/39ad6edc-017a-45c6-94e0-d9ff0069402a

### Favorites Feature
https://github.com/user-attachments/assets/e335cea0-0f65-4f24-ae1f-31ba97928392

### Regenerate Feature
https://github.com/user-attachments/assets/c5f6006f-c08a-4cd1-a170-e3a2295f82ab

## Getting Started
### 1. Clone the Repository
```bash
git clone https://github.com/Jennyznz/forecast-menu
cd forecast-menu
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Setup MongoDB
  - Create a free account: https://www.mongodb.com/cloud/atlas/register
  - Create a cluster
  - Create a database and the following collections:
    - favorites
    - users
    - weeklyPlans
  - In **Network Access**, add your current IP address
  - Insert your information in the placeholders below to get your connection string:
```
mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
```    
### 4. Get API Keys
  - Visual Crossing: https://www.visualcrossing.com/sign-up/
  - Spoonacular: https://spoonacular.com/food-api/console#Dashboard
### 5. Configure Environmental Variables
  - Create a `.env` file in the project root
  - User `.env.example` as a template.
  - Configure variables using your MongoDB Atlas connection string and API keys.
### 6. Run the App
```bash
npx webpack
npm run dev
```

## Built With
- HTML/CSS
- Javascript
- NodeJS
- MongoDB (Atlas)
- Spoonacular API
- Visual Crossing
