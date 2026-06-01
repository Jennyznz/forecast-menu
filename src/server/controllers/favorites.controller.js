import * as favoritesService from "../services/favorites.service.js";

async function toggleFavorite(req, res) {
    try {
        // Unpack data sent from the frontend's JSON body
        const { recipeId, action } = req.body;
        // Safety check
        if (!recipeId || !action) {
            return res.status(400).json({ error: "Missing required data" });
        }

        const userId = req.session.userId;
        await favoritesService.toggleFavorite(recipeId, action, userId);

        return res.status(200).json({ message: "Favorite status updated successfully" });
        
    } catch (error) {
        // Handle server/database crashes
        console.error("Failed to toggle favorite:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export { toggleFavorite };