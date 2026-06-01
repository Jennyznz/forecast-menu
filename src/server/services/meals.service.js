import FavoritesList from "../models/Favorite.model.js";
import WeeklyPlan from "../models/WeeklyPlan.model.js";
import * as weatherService from "./weather.service.js";
import * as recipeService from "./recipe.service.js";

async function regenerateMeal(dayName, mealType, userId) {
    const userPlan = await WeeklyPlan.findOne({ userId: userId });
    if (!userPlan) {
        throw new Error("User's weekly plan not found");
    }

    const mealIndex = userPlan.meals.findIndex(
        (meal) => meal.day_name === dayName && meal.meal_type === mealType
    );
    if (!mealIndex) {
        throw new Error("Meal not found in User's weekly plan");
    }
    
    const currentMeal = userPlan.meals[mealIndex];
    const temp = currentMeal.temp;

    const tempCategory = getTempCategory(temp);
    const recipe = await createRecipe(tempCategory, mealType);
    if (!recipe) {
        throw new Error('Error creating recipe object');
    }

    // Check if the newly genereated recipe is in the user's favorites list, just in case
    const userFavorites = await FavoritesList.findOne({ userId: userId });
    if (!userFavorites) {
        throw new Error("User's favorites list not found");
    }
    const isFavorited = userFavorites?.meals.some(meal => meal.recipe_id === recipe.id);

    // Update recipe-specific properties in user's weekly plan
    userPlan.meals[mealIndex].recipe_id          = recipe.id;
    userPlan.meals[mealIndex].recipe_title       = recipe.title;
    userPlan.meals[mealIndex].recipe_ready_time  = recipe.readyInMinutes;
    userPlan.meals[mealIndex].favorite           = isFavorited;

    userPlan.markModified("meals"); // Tells Mongoose to look into the top-level field "meals" for modifications
    await userPlan.save();
}

// Formats the time of a meal
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

// Converts recipe ready time from minutes to Hh Mm form
function formatReadyTime(time) {
    const hrs = Math.floor(time / 60);
    const mins = time % 60;

    if (hrs === 0) return `${mins}m`;
    if (mins === 0) return `${hrs}h`;

    return `${hrs}h ${mins}m`;
}

async function renderCalendar(userId) {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

    // Map meal types to Visual Crossing's datetime format
    const mealTimes = {
        'Breakfast': '08:00:00',
        'Lunch': '12:00:00',
        'Dinner': '18:00:00'
    };

    // Date calculations
    const weekDates = [];

    // Find start date of current week
    const today = new Date();
    const midnightToday = new Date(today).setHours(0, 0, 0, 0); // To later comparison to see if a day of the week has already passed
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    // Populate weekDates array
    const dateTracker= new Date(startOfWeek);
    for (let i = 0; i < weekDays.length; i++) {
        dateTracker.setDate(startOfWeek.getDate() + i);
        weekDates[i] = dateTracker.toISOString();
    }

    // Fetch current plan from MongoDB
    let weeklyPlan = await WeeklyPlan.findOne({ userId: userId });
    
    // If no plan exists, create an empty one
    if (!weeklyPlan) {
        weeklyPlan = new WeeklyPlan({ userId: userId, meals: [] });
    }

    // If the plan is incomplete (less than 21 meals), fill it
    if (weeklyPlan.meals.length < 21) {
        // Get weather data for the next 7 days
        const weatherData = await weatherService.getWeatherData();

        for (let i = 0; i < weekDays.length; i++) {
            const dayName = weekDays[i];

            // Check if the day of the week has already passed
            const currentDate = new Date(startOfWeek);
            currentDate.setDate(startOfWeek.getDate() + i);
            const isPastDay = currentDate.getTime() < midnightToday;

            // Create breakfast, lunch, and dinner, in that order, for each weekday
            for (const mealType of mealTypes) {
                const exists = weeklyPlan.meals.find(m => // Check if this specific slot already exists in the meals array
                    m.day_name === dayName && m.meal_type === mealType
                );
                const mealTime = mealTimes[mealType];

                if (!exists) {
                    if (isPastDay) {
                        // Push a dummy placeholder for past days
                        weeklyPlan.meals.push({
                            day_name: dayName,
                            meal_type: mealType,
                            meal_time: mealTime,
                            recipe_id: null, // Acts as a flag
                            recipe_title: "None",
                            recipe_ready_time: "Zero",
                            temp: "0",
                            favorite: false
                        });
                    // Generate recipes for current and future days
                    } else {   
                        // Find the exact date in the API response
                        const dateString = currentDate.toISOString().split('T')[0]; // Visual Crossing uses YYYY-MM-DD for datetime fields
                        const dayForecast = weatherData.days.find(d => d.datetime === dateString);

                        // Find temperature for the time of the meal
                        const temp = dayForecast.hours.find(h => h.datetime === mealTime).temp;
                        const tempCategory = weatherService.getTempCategory(temp);

                        const recipe = await recipeService.createRecipe(tempCategory, mealType);
                        // Push new meal into the document's array
                        weeklyPlan.meals.push({
                            day_name: dayName,
                            meal_type: mealType,
                            meal_time: formatMealTime(mealTime),
                            recipe_id: recipe.id,
                            recipe_title: recipe.title,
                            recipe_ready_time: formatReadyTime(recipe.readyInMinutes),
                            temp: temp,
                            favorite: false
                        });
                    }
                }
            }
        }
        // Save the updated document to MongoDB
        await weeklyPlan.save();
    }

    // Create a favorites list for user if it doesn't currently exist
    let favoritesList = await FavoritesList.findOne({ userId: userId });
    if (!favoritesList) {
        favoritesList = new FavoritesList({ userId: userId, meals: [] });
        await favoritesList.save();
    }

    // Update favorite status for each meal in user's weekly plan based on whether it's present in user's favorite list
    weeklyPlan.meals.forEach(meal => {
        meal.favorite = favoritesList.meals.some(fav => fav.recipe_id === meal.recipe_id);
    });
    await weeklyPlan.save();

    // Transform the flat array from the database into a nested object for EJS injection
    const formattedPlan = {};
    weeklyPlan.meals.forEach(meal => {
        if (!formattedPlan[meal.day_name]) {
            formattedPlan[meal.day_name] = {};
        }
        formattedPlan[meal.day_name][meal.meal_type] = meal;
    });

    // Find the end date of current week
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

    // Create text containing the start and end dates of the week
    let text = `${months[startOfWeek.getMonth()]}`;
    if (startOfWeek.getMonth() !== endOfWeek.getMonth()) {
        // Ex: Full text becomes Jan - Feb 2026 if the week spans multiple months
        text += ` - ${months[endOfWeek.getMonth()]}`;
    }
    // Otherwise, ex: Jan 2026
    text += ` ${endOfWeek.getFullYear()}`;

    return {
        text,
        weekDays,
        weekDates,
        formattedPlan
    };
}

export { 
    regenerateMeal, 
    renderCalendar
};