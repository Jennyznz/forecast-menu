import { WeeklyPlan } from "../models/weeklyPlan.js";
import { createRecipe, fetchRecipeInfo } from "../services/recipeService.js";
import { getWeatherData, getTempCategory } from "../services/weatherService.js";


async function getRecipeByID(req, res) {
    try {
    const recipeId = req.params.id;
    const recipe = await fetchRecipeInfo(recipeId);
    res.render('recipe', { recipe });
    } catch (err) {
    console.log('Error loading recipe: ', err);
    res.status(500).send('Could not load recipe');
    }
};

async function renderCalendar(req, res) {
    try {
        const userId = 1;
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
            weekDates[i] = dateTracker.setDate(
                startOfWeek.getDate() + i
            ).toLocaleString('en-US');
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
            const weatherData = await getWeatherData();
            // const dailyForecasts = weatherData.days;

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

                    if (!exists) {
                        if (isPastDay) {
                            // Push a dummy placeholder for past days
                            weeklyPlan.meals.push({
                                day_name: dayName,
                                meal_type: mealType,
                                recipe_id: null // Acts as a flag
                                // Omit title, prep time, and temp
                            });
                        // Generate recipes for current and future days
                        } else {   
                            // Find the exact date in the API response
                            const dateString = currentDate.toISOString().split('T')[0]; // Visual Crossing uses YYYY-MM-DD for datetime fields
                            const dayForecast = weatherData.days.find(d => d.datetime === dateString);

                            // Find temperature for the time of the meal
                            const mealTime = mealTimes[mealType];
                            const temp = dayForecast.hours.find(h => h.datetime === mealTime).temp;
                            const tempCategory = getTempCategory(temp);

                            const recipe = await createRecipe(tempCategory, mealType);
                            // Push new meal into the document's array
                            weeklyPlan.meals.push({
                                day_name: dayName,
                                meal_type: mealType,
                                recipe_id: recipe.id,
                                recipe_title: recipe.title,
                                recipe_prep_time: recipe.readyInMinutes,
                                temp: temp
                            });
                        }
                    }


                }

            }
            // Save the updated document to MongoDB
            await weeklyPlan.save();
        }

        // Transform the flat array from the database into a nested object for EJS injection
        const formattedPlan = {};
        weeklyPlan.meals.forEach(meal => {
            if (!formattedPlan[meal.day_name]) {
                formattedPlan[meal.day_name] = {};
            }
            formattedPlan[meal.day_name][meal.meal_type] = meal;
        });

        res.render('calendar', { 
            weekDays: weekDays, 
            weekDates: weekDates, 
            mealPlan: formattedPlan 
        });

    } catch (err) {
        console.error('Error generating weekly recipes:', err);
        res.status(500).send('Could not load weekly recipe plan.');
    }
}

async function getRecipeDetails(req, res) {
    try {
        const id = req.query;
        const fullRecipeDetails = await fetchRecipeInfo(id);

        // Render the EJS view using the fully populated Recipe object
        res.render('recipe', { recipe: fullRecipeDetails });
    } catch (error) {
        console.error("Error generating recipe:", error);
        res.status(500).send("Error generating recipe.");
    }
};

async function regenerateFullWeek(req, res) {
    try {
        const userId = req.session.userId;
        // Delete all rows for this user
        await WeeklyPlan.clearEntirePlan(userId);
        // Redirect to the main route, which will see the plan is empty and re-generate
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Failed to reset week.");
    }
};

async function regenerateIndividualMeal(req, res) {
    try {
    const userId = req.session.userId;
    const { day, mealType } = req.body; // Sent via a form or fetch request

    const weather = await getCurrentWeather('New York');
    const recipe = await createRecipe('random', mealType);
    await WeeklyPlan.saveMeal(userId, day, mealType, recipe, weather.temp);
    res.redirect('/');
} catch (err) {
    res.status(500).send("Failed to update meal.");
}
};

export { getRecipeByID,
    renderCalendar,
    getRecipeDetails,
    regenerateFullWeek,
    regenerateIndividualMeal
}