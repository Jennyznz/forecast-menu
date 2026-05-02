const mainContainer = document.getElementById('main-container');
mainContainer.addEventListener('click', async (e) => {
    // Back button from favorites page
    if (e.target.id === 'back-btn') {
        window.location.href = '/';
        return;
    }
});