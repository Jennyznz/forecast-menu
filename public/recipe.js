const mainContainer = document.getElementById('main-container');
mainContainer.addEventListener('click', async (e) => {
    // Back button from recipe page
    if (e.target.id === 'back-btn') {
        window.location.href = '/';
        return;
    }
});

const favoritesBtn = document.querySelector('#all-favorites');
favoritesBtn.addEventListener('click', () => {
    try {
        window.location.href = ('/favorites');
    } catch (err) {
        console.error("Failed to load favorites page. ", err);
    }
});