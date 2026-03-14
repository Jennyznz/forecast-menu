// spoonacular.ks
function getRecipes() {

}

class Recipe {
    constructor(fullData) {   
        if (!fullData) {
            this.id = null;
            this.title = "No recipe found";
            this.ingredients = [];
            this.steps = [];
            return;
        } else {
            this.id = fullData.id;
            this.title = fullData.title || 'No recipes found';
            this.image = fullData.image;
            this.summary = fullData.summary;

            this.servings = fullData.servings;
            this.readyInMinutes = fullData.readyInMinutes;

            // Store ingredients as strings
            this.ingredients = fullData.extendedIngredients?.map(i => i.original) || [];

            // Store important/basic information about available nutrients
            this.nutrients = fullData.nutrition?.nutrients?.map(n => ({
                name: n.name,
                amount: n.amount,
                unit: n.unit,
                percent: n.percentOfDailyNeeds
            })) || [];

            this.steps = fullData.analyzedInstructions?.[0]?.steps.map(s => s.step) || [];
        }
    }
}